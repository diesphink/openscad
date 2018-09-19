#!/usr/bin/env python

import fileinput
import os
import re


pauses = os.environ["SLIC3R_CUSTOM_PAUSES"]
pauses = pauses.strip().split(' ')
print "Pauses: %s" % pauses
if pauses:

    pattern = re.compile("^;CURRENT_Z: ([0-9.]+)$")

    for line in fileinput.input(inplace=True, backup='.original'):
        print line, # this goes to the current file
        for match in re.finditer(pattern, line):
            z = match.groups()[0]
            if z in pauses:
                print '; Pause for color change at %s \nM600\n' % z
