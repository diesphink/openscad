from __future__ import print_function
import glob
import sys
import os
import re
import colorama

from colorama import Fore, Back, Style
from subprocess import call
from doit.tools import create_folder
from configobj import ConfigObj

colorama.init()

DOIT_CONFIG = {'verbosity': 1, 'reporter':'executed-only', 'default_tasks': ['scad_to_stl', 'jscad_to_stl', 'stl_to_gcode']}

OPENSCAD = 'openscad'
OPENJSCAD = 'openjscad'

SLIC3R = '/home/sphink/opt/slicer/bin/prusa-slicer'
SLIC3R_PROFILE_FOLDER = './slic3r_profiles'
SLIC3R_DEFAULT_PROFILES = ['pla', 'normal']

OCTOPI_SERVER = 'pi@octopi.local'
OCTOPI_UPLOAD_FOLDER = '.octoprint/uploads/'

TAG_STL = Style.BRIGHT + Back.BLUE + Fore.WHITE + "  STL    " + Style.RESET_ALL
TAG_GCODE = Style.BRIGHT + Back.GREEN + Fore.WHITE + "  GCODE  " + Style.RESET_ALL
TAG_RSYNC = Style.BRIGHT + Back.MAGENTA + Fore.WHITE + "  RSYNC  " + Style.RESET_ALL

TAG_STL_PLAIN =   "[ STL   ]"
TAG_GCODE_PLAIN = "[ GCODE ]"
TAG_RSYNC_PLAIN = "[ RSYNC ]"

def has_ansi():
    return hasattr(sys.stdout, "isatty") and sys.stdout.isatty()

def output_for_scad(scad):
    dir = os.path.join(os.path.dirname(scad), 'stl')
    file = os.path.splitext(os.path.basename(scad))[0] + '.stl'
    file = os.path.join(dir, file)
    return (dir, file)

def output_for_jscad(jscad):
    dir = os.path.join(os.path.dirname(jscad), 'stl')
    file = os.path.splitext(os.path.basename(jscad))[0] + '.stl'
    file = os.path.join(dir, file)
    return (dir, file)

def output_for_stl(stl):
    dir = os.path.dirname(stl)
    file = os.path.splitext(os.path.basename(stl))[0] + '.gcode'
    file = os.path.join(dir, file)
    return (dir, file)

def depfile_for_scad(scad):
    path = os.path.join(os.path.dirname(scad), '.deps')
    file = os.path.basename(scad) + '.deps'
    return os.path.join(path, file)

def dependencies_for_scad(scad):
    deps = [scad]
    if (os.path.exists(depfile_for_scad(scad))):
        with open(depfile_for_scad(scad)) as f:
            next(f)
            for line in f:
                line = re.sub(r'\\', '', line).strip()
                deps += [line]
    return deps

def dependencies_for_jscad(jscad):
    path = os.path.dirname(jscad)
    deps = [jscad]
    pattern = re.compile("include\(['\"](.*)['\"]\)")

    for line in open(jscad):
        for match in re.finditer(pattern, line):
            file = os.path.join(path, match.groups()[0])
            deps += [file]

    return deps

def slic3r_properties_for_stl(stl):
    path = os.path.dirname(stl)


    while path != '':
    # Procura um especifico para aquele stl
        file = os.path.join(path, os.path.splitext(os.path.basename(stl))[0] + '.slic3r.properties')
        if os.path.exists(file):
            return file
        file = os.path.join(path, 'slic3r.properties')
        if os.path.exists(file):
            return file
        path = os.path.dirname(path)

def profiles_from_properties(properties):
    config = ConfigObj(properties)
    if 'profiles' in config:
        profiles = config['profiles']
        return profiles.strip().split(' ')
    return SLIC3R_DEFAULT_PROFILES

def set_env(properties):
    if properties:
        config = ConfigObj(properties)
        if 'm600' in config:
            m600 = config['m600']
            os.environ['SLIC3R_CUSTOM_PAUSES'] = m600
            return

    os.environ['SLIC3R_CUSTOM_PAUSES'] = ''


def profile_files(profiles):
    files = profile_file_if_exists('default')
    if 'chiquinha' in profiles:
        files = []
    for profile in profiles:
        files += profile_file_if_exists(profile)
        for sub_profile in profiles:
            files += profile_file_if_exists(profile + '_' + sub_profile)
    return files

def profile_file_if_exists(profile):
    profile = os.path.join(SLIC3R_PROFILE_FOLDER, profile + '.ini')
    if os.path.exists(profile):
        return [profile]
    else:
        return []

def deploy_folder_for(dir):
    ret = []
    for part in dir.split(os.sep):
        if part != 'files' and part != 'stl':
            ret += [part.replace(' ', '_')]
    return os.path.join(OCTOPI_UPLOAD_FOLDER, os.sep.join(ret))

def title(task):
    name = task.name
    if name.endswith('-rsync'):
        tag = TAG_RSYNC if has_ansi() else TAG_RSYNC_PLAIN
        name = name[:-6]
    elif name.endswith('stl'):
        tag = TAG_STL if has_ansi() else TAG_STL_PLAIN
    elif name.endswith('gcode'):
        tag = TAG_GCODE if has_ansi() else TAG_GCODE_PLAIN

    basename = os.path.basename(name)
    path = os.path.dirname(name).split(os.sep)[1]
    rest = Style.BRIGHT + basename + Style.RESET_ALL if has_ansi() else basename

    return '%s %s %s' % (tag, path, rest)

def task_scad_to_stl():
    """Generate STLs"""

    for root, dirs, files in os.walk("."):
        if root.endswith('lib'):
            continue
        for scad in glob.glob(root + '/*.scad'):
            (pathstl, stl) = output_for_scad(scad)
            pathdeps = os.path.dirname(depfile_for_scad(scad))
            yield {
                'name': stl,
                'title': title,
                'actions': [
                    (create_folder, [pathstl]),
                    (create_folder, [pathdeps]),
                    [OPENSCAD, "-m", "make", "-o", stl, "-d", depfile_for_scad(scad), scad]],
                'file_dep': dependencies_for_scad(scad),
                'targets': [stl]
            }

def task_jscad_to_stl():
    """Generate STLs"""

    for root, dirs, files in os.walk("."):
        if root.endswith('lib'):
            continue
        for jscad in glob.glob(root + '/*.jscad'):
            (pathstl, stl) = output_for_jscad(jscad)
            # pathdeps = os.path.dirname(depfile_for_jscad(jscad))
            yield {
                'name': stl,
                'title': title,
                'actions': [
                    (create_folder, [pathstl]),
                    [OPENJSCAD, jscad, "-o", stl]],
                'file_dep': dependencies_for_jscad(jscad),
                'targets': [stl]
            }

def task_stl_to_gcode():
    """Generate gcode"""

    for root, dirs, files in os.walk("."):
        for stl in glob.glob(root + '/*.stl'):
            (pathgcode, gcode) = output_for_stl(stl)

            slic3r_properties = slic3r_properties_for_stl(stl)
            if slic3r_properties:
                profiles = profile_files(profiles_from_properties(slic3r_properties)) + [slic3r_properties]
            else:
                profiles = profile_files(SLIC3R_DEFAULT_PROFILES)

            profiles_args = []
            for profile in profiles:
                profiles_args += ['--load', profile]

            common_args = []
            # if not 'chiquinha' in profiles:
            common_args += ['--center', '125,105']

            yield {
                'name': gcode,
                'title': title,
                'actions': [
                    (create_folder, [pathgcode]),
                    (set_env, [slic3r_properties]),
                    [SLIC3R, stl, '-g', '--post-process', './post_process.py', '--output', gcode] + common_args + profiles_args],
                'file_dep': [stl] + profiles,
                'targets': [gcode]
            }


def task_deploy():
    """Send gcode files to server"""

    for root, dirs, files in os.walk("."):
        for gcode in glob.glob(root + '/*.gcode'):
            yield {
                'name': gcode + "-rsync",
                'title': title,
                'actions': [
                    ['ssh', OCTOPI_SERVER, 'mkdir -p "' + deploy_folder_for(root) + '"'],
                    ['rsync', '-azhe', 'ssh', '--partial', '--progress',
                    gcode,  OCTOPI_SERVER + ':"' + os.path.join(deploy_folder_for(root), os.path.basename(gcode)) + '"']],
                'task_dep':['scad_to_stl', 'jscad_to_stl', 'stl_to_gcode'],
                'file_dep': [gcode]
            }
