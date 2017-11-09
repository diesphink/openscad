from __future__ import print_function
import glob
import sys
import os
import re

from subprocess import call
from doit.tools import create_folder


import colorama
from colorama import Fore, Back, Style
colorama.init()

DOIT_CONFIG = {'verbosity': 2, 'reporter':'executed-only'}

OPENSCAD = 'openscad'

SLIC3R = '/home/sphink/opt/slic3r/slic3r'
SLIC3R_PROFILE_FOLDER = './slic3r_profiles'
SLIC3R_DEFAULT_PROFILES = ['abs', 'normal', 'brim']

OCTOPI_SERVER = 'pi@192.168.0.106'
OCTOPI_UPLOAD_FOLDER = '.octoprint/uploads/teste/'

TAG_STL = Style.BRIGHT + Back.BLUE + Fore.CYAN + "  STL    " + Style.RESET_ALL
TAG_GCODE = Style.BRIGHT + Back.GREEN + Fore.GREEN + "  GCODE  " + Style.RESET_ALL
TAG_RSYNC = Style.BRIGHT + Back.MAGENTA + Fore.MAGENTA + "  RSYNC  " + Style.RESET_ALL


def output_for_scad(scad):
    dir = os.path.join(os.path.dirname(scad), 'stl')
    file = os.path.splitext(os.path.basename(scad))[0] + '.stl'
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

def slic3r_properties_for_stl(stl):
    file = os.path.join(os.path.dirname(stl), 'slic3r.properties')
    if os.path.exists(file):
        # TODO carregar os profiles desse arquivo tambem
        return file

def profiles():
    args = profiles_load_if_exists('default')
    for profile in SLIC3R_DEFAULT_PROFILES:
        args += profiles_load_if_exists(profile)
        for sub_profile in SLIC3R_DEFAULT_PROFILES:
            args += profiles_load_if_exists(profile + '_' + sub_profile)
    return args

def profiles_load_if_exists(profile):
    profile = os.path.join(SLIC3R_PROFILE_FOLDER, profile + '.ini')
    if os.path.exists(profile):
        return ['--load', profile]
    else:
        return []

def title(task):
    name = task.name
    if name.endswith('-rsync'):
        tag = TAG_RSYNC
        name = name[:-6]
    elif name.endswith('stl'):
        tag = TAG_STL
    elif name.endswith('gcode'):
        tag = TAG_GCODE

    basename = os.path.basename(name)
    path = os.path.dirname(name).split(os.sep)[1]

    return '%s %s %s' % (tag, path, Style.BRIGHT + basename + Style.RESET_ALL)

def task_scad_to_stl():
    """Generate STLs"""

    for root, dirs, files in os.walk("."):
        if root.endswith('lib'):
            continue
        for scad in glob.glob(root + '/*.scad'):
            (pathstl, stl) = output_for_scad(scad)
            yield {
                'name': stl,
                'title': title,
                'actions': [
                    (create_folder, [pathstl]),
                    [OPENSCAD, "-m", "make", "-o", stl, "-d", depfile_for_scad(scad), scad]],
                'file_dep': dependencies_for_scad(scad),
                'targets': [stl]
            }

def task_stl_to_gcode():
    """Generate gcode"""

    for root, dirs, files in os.walk("."):
        for stl in glob.glob(root + '/*.stl'):
            (pathgcode, gcode) = output_for_stl(stl)
            slic3r_properties = slic3r_properties_for_stl(stl)

            yield {
                'name': gcode,
                'title': title,
                'actions': [
                    (create_folder, [pathgcode]),
                    [SLIC3R, stl, '--print-center', '125,105', '--output', gcode] + profiles()],
                'file_dep': [stl],
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
                    ['ssh', OCTOPI_SERVER, 'mkdir -p "' + OCTOPI_UPLOAD_FOLDER + root + '"'],
                    ['rsync', '-azhe', 'ssh', '--partial', '--progress',
                    gcode,  OCTOPI_SERVER + ':"' + OCTOPI_UPLOAD_FOLDER + gcode + '"']],
                'file_dep': [gcode]
            }
