#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2021.2.3),
    on Wed Jan 25 13:24:50 2023
If you publish work using this script the most relevant publication is:

    Peirce J, Gray JR, Simpson S, MacAskill M, Höchenberger R, Sogo H, Kastman E, Lindeløv JK. (2019) 
        PsychoPy2: Experiments in behavior made easy Behav Res 51: 195. 
        https://doi.org/10.3758/s13428-018-01193-y

"""

from __future__ import absolute_import, division

from psychopy import locale_setup
from psychopy import prefs
from psychopy import sound, gui, visual, core, data, event, logging, clock, colors
from psychopy.constants import (NOT_STARTED, STARTED, PLAYING, PAUSED,
                                STOPPED, FINISHED, PRESSED, RELEASED, FOREVER)

import numpy as np  # whole numpy lib is available, prepend 'np.'
from numpy import (sin, cos, tan, log, log10, pi, average,
                   sqrt, std, deg2rad, rad2deg, linspace, asarray)
from numpy.random import random, randint, normal, shuffle, choice as randchoice
import os  # handy system and path functions
import sys  # to get file system encoding

from psychopy.hardware import keyboard


def make_sound(name, filepath):
    return sound.Sound(
        win=win,
        value=filepath,
        secs=-1,
        stereo=True,
        hamming=True,
        name=name
    )

def make_img(name, file_name, pos, size, opacity):
    return visual.ImageStim(
        win=win,
        name=name,
        image=file_name,
        pos=pos,
        size=size,
        opacity=opacity
    )

def make_slide(name, pos=(0, 0), size=SLIDE_SIZE):
    return make_img(
        name,
        f"{SLIDES_DIR}/{name}.png",
        pos, size, 1
    )

def make_rect(
    name, pos, size, opacity,
    lineColor="green",
    lineWidth=3,
    fillColor=None
):
    if fillColor is not None:
        fillColor = util.Color(fillColor)
    if lineColor is not None:
        lineColor = util.Color(lineColor)
    return visual.Rect(
        win=win,
        name=name,
        width=size[0],
        height=size[1],
        pos=pos,
        lineWidth=lineWidth,
        lineColor=lineColor,
        fillColor=fillColor,
        opacity=opacity
    )

def make_boxes(names, xys, sizes, opacity=CLICK_BOX_OPACITY, lineColor="green"):
    cimgs = []
    for i in range(len(names)):
        cimgs.append(make_rect(names[i], xys[i], sizes[i], opacity, lineColor))
    return cimgs

def make_circle(
    name, pos, size,
    fillColor="black",
    lineColor="black",
    lineWidth=3,
    opacity=1
):
    if lineColor is not None:
        lineColor = util.Color(lineColor)
    if fillColor is not None:
        fillColor = util.Color(fillColor)
    return visual.Polygon(
        win=win,
        name=name,
        edges=360,
        size=size,
        pos=pos,
        lineWidth=lineWidth,
        lineColor=lineColor,
        fillColor=fillColor,
        opacity=opacity
    )

def make_radio0(name, pos):
    return make_circle(name, pos, (0.03, 0.03), None, "black")

def make_radio1(name, pos):
    return make_circle(name, pos, (0.023, 0.023), "black", None, 0)

def find_min_y(cimgs):
    min_y = 0.5
    for cimg in cimgs:
        y = cimg.pos[1] - (cimg.height / 2)
        if min_y > y:
            min_y = y
    return min_y

def make_radios(func, cimgs, res=[], offset=-0.05):
    min_y = find_min_y(cimgs)
    for cimg in cimgs:
        radio_y = min_y + offset
        res.append(func(cimg.name, (cimg.pos[0], radio_y)))
    return res



# Ensure that relative paths start from the same directory as this script
_thisDir = os.path.dirname(os.path.abspath(__file__))
os.chdir(_thisDir)

# Store info about the experiment session
psychopyVersion = '2021.2.3'
expName = 'S-CLAS'  # from the Builder filename that created this script
expInfo = {'participant': '', 'Audio': ['Yes', 'No'], 'Debug': ['No', 'Yes']}
dlg = gui.DlgFromDict(dictionary=expInfo, sortKeys=False, title=expName)
if dlg.OK == False:
    core.quit()  # user pressed cancel
expInfo['date'] = data.getDateStr()  # add a simple timestamp
expInfo['expName'] = expName
expInfo['psychopyVersion'] = psychopyVersion

# Data file name stem = absolute path + name; later add .psyexp, .csv, .log, etc
filename = _thisDir + os.sep + u'data/%s_%s_%s' % (expInfo['participant'], expName, expInfo['date'])

# An ExperimentHandler isn't essential but helps with data saving
thisExp = data.ExperimentHandler(name=expName, version='',
    extraInfo=expInfo, runtimeInfo=None,
    originPath='/Users/lanxm/workspace/vscode/bbi-sol/sound-check/sound-check_lastrun.py',
    savePickle=True, saveWideText=True,
    dataFileName=filename)
# save a log file for detail verbose info
logFile = logging.LogFile(filename+'.log', level=logging.EXP)
logging.console.setLevel(logging.WARNING)  # this outputs to the screen, not a file

endExpNow = False  # flag for 'escape' or other condition => quit the exp
frameTolerance = 0.001  # how close to onset before 'same' frame

# Start Code - component code to be run after the window creation

# Setup the Window
win = visual.Window(
    size=[1512, 982], fullscr=True, screen=0, 
    winType='pyglet', allowGUI=False, allowStencil=False,
    monitor='testMonitor', color=[1,1,1], colorSpace='rgb',
    blendMode='avg', useFBO=True, 
    units='height')
# store frame rate of monitor if we can measure it
expInfo['frameRate'] = win.getActualFrameRate()
if expInfo['frameRate'] != None:
    frameDur = 1.0 / round(expInfo['frameRate'])
else:
    frameDur = 1.0 / 60.0  # could not measure, so guess

# Setup eyetracking
ioDevice = ioConfig = ioSession = ioServer = eyetracker = None

# create a default keyboard (e.g. to check for escape)
defaultKeyboard = keyboard.Keyboard()

# Initialize components for Routine "intr1"
intr1Clock = core.Clock()

# Might want to remove audio toggle eventually
#expInfo["Debug"] = "No"
#expInfo["Audio"] = "Yes"

expVersion = "2022.09.23"
AUD_DIR = "resources/aud"
IMGS_DIR = "resources/imgs"
SLIDES_DIR = f"{IMGS_DIR}/slides"

USE_AUDIO = expInfo["Audio"] == "Yes"
SHOW_DEBUG = expInfo["Debug"] == "Yes"

CLICK_BOX_OPACITY = 0.2 if SHOW_DEBUG else 0

"""
Slides are 1920 × 1080 pixels.
Positions and sizes of clickable areas are hard 
coded, so changing this will break _everything_!

"""
SLIDE_H = 0.7
SLIDE_W = SLIDE_H / 1080 * 1920
SLIDE_SIZE = (SLIDE_W, SLIDE_H)

# "Next" button at top-right
NEXT_POS = (0.515, 0.290)
NEXT_SIZE = (0.165, 0.075)
NEXT = make_rect("next", NEXT_POS, NEXT_SIZE, CLICK_BOX_OPACITY)

PLAY_POS = (-0.005, -0.109)
PLAY_SIZE = (0.108, 0.108)
PLAY =  make_circle("play", PLAY_POS, PLAY_SIZE, None, "black")

# For covering "Next" button
COVER_SIZE = (0.17, 0.08)
COVER = make_rect("cover", NEXT_POS, COVER_SIZE, None, "white", 0, "white")


# Global mouse
MOUSE = core.Mouse(win=win)
MOUSE_L = 0
MOUSE_L_prev = 0

# Global sound
SOUND = None

begin_text = visual.TextStim(win=win, name='begin_text',
    text=None,
    font='Open Sans',
    pos=(0.6, 0), height=0.02, wrapWidth=None, ori=0.0, 
    color='black', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-2.0);

# Initialize components for Routine "intr2"
intr2Clock = core.Clock()

run_anim = False
aimgs = None
starts = None
ends = None

def anim_q03():
    # Slide 04
    names = ["box_cheetah", "box_tortoise"]
    y0 = 0.042
    xys = [(-0.19, y0), (0.2, y0)]
    sizes = [(0.34, 0.31), (0.31, 0.31)]
    starts = [1.7, 4.2]
    ends = [3.2, 5.7]
    return make_boxes(names, xys, sizes, 1, "red"), starts, ends

def anim_q04():
    # Slide 05
    names = ["box_feather", "box_rock"]
    y0 = 0.015
    xys = [(-0.228, y0), (0.175, y0)]
    sizes = [(0.28, 0.34), (0.32, 0.34)]
    starts = [2.3, 5.5]
    ends = [4, 7]
    return make_boxes(names, xys, sizes, 1, "red"), starts, ends

def anim_q08():
    # Slide 09
    names = ["box_playing", "box_played"]
    y0 = -0.252
    h0 = 0.105
    xys = [(-0.257, y0), (0.27, y0)]
    sizes = [(0.42, h0), (0.39, h0)]
    starts = [9.8, 18]
    ends = [14, 22]
    return make_boxes(names, xys, sizes, 1, "red"), starts, ends

def anim_q12():
    # Slide 15
    names = ["box_monkey", "box_goose"]
    y0 = -0.12
    h0 = 0.3
    xys = [(0.043, y0), (0.315, y0)]
    sizes = [(0.2, h0), (0.28, h0)]
    starts = [7.5, 11]
    ends = [9.5, 12]
    return make_boxes(names, xys, sizes, 1, "red"), starts, ends

def anim_q13():
    # Slide 16
    names = ["box_leaf", "box_cup", "box_book"]
    y0 = -0.13
    h0 = 0.22
    xys = [(-0.09, y0), (0.125, y0), (0.35, y0)]
    sizes = [(0.16, h0), (0.15, h0), (0.21, h0)]
    starts = [8.2, 11.4, 14.6]
    ends = [9.7, 12.5, 15.7]
    return make_boxes(names, xys, sizes, 1, "red"), starts, ends

def anim_q14():
    # Slide 17
    names = ["box_car", "box_rice", "box_map"]
    y0 = -0.135
    h0 = 0.2
    xys = [(-0.075, y0), (0.15, y0), (0.368, y0)]
    sizes = [(0.23, h0), (0.18, h0), (0.2, h0)]
    starts = [7.6, 10.6, 13.2]
    ends = [8.8, 11.5, 14.2]
    return make_boxes(names, xys, sizes, 1, "red"), starts, ends

all_anims = {
    "Q03": anim_q03,
    "Q04": anim_q04,
    "Q08": anim_q08,
    "Q12": anim_q12,
    "Q13": anim_q13,
    "Q14": anim_q14,
}

intr2_text = visual.TextStim(win=win, name='intr2_text',
    text=None,
    font='Open Sans',
    pos=(0.6, 0), height=0.02, wrapWidth=None, ori=0.0, 
    color='black', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-2.0);

# Create some handy timers
globalClock = core.Clock()  # to track the time since experiment started
routineTimer = core.CountdownTimer()  # to track time remaining of each (non-slip) routine 

# ------Prepare to start Routine "intr1"-------
continueRoutine = True
# update component parameters for each repeat

slide = make_slide("slide-01")
slide.autoDraw = True
NEXT.autoDraw = True
COVER.autoDraw = True
COVER.opacity = 0.9

if USE_AUDIO: 
    aud_file = f"{AUD_DIR}/slide-01.m4a"
    SOUND = make_sound("sound", aud_file)
    SOUND_DUR = SOUND.getDuration()
    SOUND_START = 0
    SOUND.play()


# keep track of which components have finished
intr1Components = [begin_text]
for thisComponent in intr1Components:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
intr1Clock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "intr1"-------
while continueRoutine:
    # get current time
    t = intr1Clock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=intr1Clock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # Clicking on "Next" is always enabled here
    MOUSE_L = MOUSE.getPressed()[0]
    if MOUSE_L_prev != MOUSE_L:
        MOUSE_L_prev = MOUSE_L
        if MOUSE_L and NEXT.contains(MOUSE):
            continueRoutine = False
            
    if t - SOUND_START - 1 >= SOUND_DUR:
        continueRoutine = False
    
    if SHOW_DEBUG:
        begin_text.text = f"""
    aud_file = {aud_file}
    t = {round(t, 3)}
    sound_completed = {t - SOUND_START >= SOUND_DUR}
    """
    
    
    # *begin_text* updates
    if begin_text.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        begin_text.frameNStart = frameN  # exact frame index
        begin_text.tStart = t  # local t and not account for scr refresh
        begin_text.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(begin_text, 'tStartRefresh')  # time at next scr refresh
        begin_text.setAutoDraw(True)
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in intr1Components:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "intr1"-------
for thisComponent in intr1Components:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)

NEXT.autoDraw = False
slide.autoDraw = False

if USE_AUDIO:
    SOUND.stop()

# the Routine "intr1" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# ------Prepare to start Routine "intr2"-------
continueRoutine = True
# update component parameters for each repeat

thisExp.addData("expVersion", expVersion)

response = None
has_responded = False

slide = make_slide("slide-02")
slide.autoDraw = True

PLAY.autoDraw = True
NEXT.autoDraw = True
COVER.autoDraw = True
COVER.opacity = 1

if USE_AUDIO:
    aud_file = f"{AUD_DIR}/slide-02.m4a"
    SOUND = make_sound("sound", aud_file)
    SOUND_DUR = SOUND.getDuration()
    SOUND_START = 0
    SLIDE_SOUND_START = 0
    SOUND.play()


 
# keep track of which components have finished
intr2Components = [intr2_text]
for thisComponent in intr2Components:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
intr2Clock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "intr2"-------
while continueRoutine:
    # get current time
    t = intr2Clock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=intr2Clock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # Adding a block comment here will screw everything up! Bet you didn't know that!
    
    MOUSE_L = MOUSE.getPressed()[0]
    if MOUSE_L_prev != MOUSE_L:
        MOUSE_L_prev = MOUSE_L
        if MOUSE_L:
            if has_responded and NEXT.contains(MOUSE):
                continueRoutine = False
            if PLAY.contains(MOUSE):
                has_responded = True
                COVER.opacity = 0
                if t - SOUND_START < SOUND_DUR:
                    # Will only work if the sound has not ended yet
                    SOUND.stop()
                aud_file = f"{AUD_DIR}/Tone audio.m4a"
                SOUND = make_sound("sound", aud_file)
                SOUND_DUR = SOUND.getDuration()
                SOUND_START = t
                SLIDE_SOUND_START = t
                SOUND.play()
    
    
    if SHOW_DEBUG:
        intr2_text.text = f"""
    aud_file = {aud_file}
    slide_num = {slide.name}
    response = {response}
    has_responded = {has_responded}
    t = {round(t, 3)}
    """
    
     
    
    # *intr2_text* updates
    if intr2_text.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        intr2_text.frameNStart = frameN  # exact frame index
        intr2_text.tStart = t  # local t and not account for scr refresh
        intr2_text.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(intr2_text, 'tStartRefresh')  # time at next scr refresh
        intr2_text.setAutoDraw(True)
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in intr2Components:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "intr2"-------
for thisComponent in intr2Components:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)

if USE_AUDIO:
    SOUND.stop()

 
slide.size = (0, 0)
slide.autoDraw = False
NEXT.autoDraw = False
PLAY.autoDraw = False
COVER.autoDraw = False

thisExp.addData("response", response)

# Record timestamp and total time
thisExp.addData("end_timestamp", util.MonotonicClock.getDateStr())
thisExp.addData("total_seconds", globalClock.getTime())

 
# the Routine "intr2" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# Flip one final time so any remaining win.callOnFlip() 
# and win.timeOnFlip() tasks get executed before quitting
win.flip()

# these shouldn't be strictly necessary (should auto-save)
thisExp.saveAsWideText(filename+'.csv', delim='auto')
thisExp.saveAsPickle(filename)
logging.flush()
# make sure everything is closed down
thisExp.abort()  # or data files will save again on exit
win.close()
core.quit()
