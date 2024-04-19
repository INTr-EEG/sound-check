/******************** 
 * Sound-Check Test *
 ********************/

import { core, data, sound, util, visual } from './lib/psychojs-2021.2.3.js';
const { PsychoJS } = core;
const { TrialHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'sound-check';  // from the Builder filename that created this script
let expInfo = {'participant': '', 'Audio': ['Yes', 'No'], 'Debug': ['No', 'Yes']};

// Start code blocks for 'Before Experiment'

function make_sound(name, filepath) {
    return new sound.Sound({"win": psychoJS.window, "value": filepath, "secs": (- 1), "stereo": true, "hamming": true, "name": name});
}

function make_img(name, file_name, pos, size, opacity) {
    return new visual.ImageStim({"win": psychoJS.window, "name": name, "image": file_name, "pos": pos, "size": size, "opacity": opacity});
}

function make_slide(name, pos = [0, 0], size = SLIDE_SIZE) {
    return make_img(name, `${SLIDES_DIR}/${name}.png`, pos, size, 1);
}

var fillColor;
var lineColor;
function make_rect(name, pos, size, opacity, lineColor = "green", lineWidth = 3, fillColor = null) {
    if ((fillColor !== null)) {
        fillColor = new util.Color(fillColor);
    }
    if ((lineColor !== null)) {
        lineColor = new util.Color(lineColor);
    }
    return new visual.Rect({"win": psychoJS.window, "name": name, "width": size[0], "height": size[1], "pos": pos, "lineWidth": lineWidth, "lineColor": lineColor, "fillColor": fillColor, "opacity": opacity});
}

var cimgs;
function make_boxes(names, xys, sizes, opacity = CLICK_BOX_OPACITY, lineColor = "green") {
    var cimgs;
    cimgs = [];
    for (var i, _pj_c = 0, _pj_a = util.range(names.length), _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        i = _pj_a[_pj_c];
        cimgs.push(make_rect(names[i], xys[i], sizes[i], opacity, lineColor));
    }
    return cimgs;
}

function make_circle(name, pos, size, fillColor = "black", lineColor = "black", lineWidth = 3, opacity = 1) {
    if ((lineColor !== null)) {
        lineColor = new util.Color(lineColor);
    }
    if ((fillColor !== null)) {
        fillColor = new util.Color(fillColor);
    }
    return new visual.Polygon({"win": psychoJS.window, "name": name, "edges": 360, "size": size, "pos": pos, "lineWidth": lineWidth, "lineColor": lineColor, "fillColor": fillColor, "opacity": opacity});
}

function make_radio0(name, pos) {
    return make_circle(name, pos, [0.03, 0.03], null, "black");
}

function make_radio1(name, pos) {
    return make_circle(name, pos, [0.023, 0.023], "black", null, 0);
}

var min_y;
function find_min_y(cimgs) {
    var min_y, y;
    min_y = 0.5;
    for (var cimg, _pj_c = 0, _pj_a = cimgs, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        cimg = _pj_a[_pj_c];
        y = (cimg.pos[1] - (cimg.height / 2));
        if ((min_y > y)) {
            min_y = y;
        }
    }
    return min_y;
}

function make_radios(func, cimgs, res = [], offset = (- 0.05)) {
    var min_y, radio_y;
    min_y = find_min_y(cimgs);
    for (var cimg, _pj_c = 0, _pj_a = cimgs, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        cimg = _pj_a[_pj_c];
        radio_y = (min_y + offset);
        res.push(func(cimg.name, [cimg.pos[0], radio_y]));
    }
    return res;
}

// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([1, 1, 1]),
  units: 'height',
  waitBlanking: true
});
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(intr1RoutineBegin());
flowScheduler.add(intr1RoutineEachFrame());
flowScheduler.add(intr1RoutineEnd());
flowScheduler.add(intr2RoutineBegin());
flowScheduler.add(intr2RoutineEachFrame());
flowScheduler.add(intr2RoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    {'name': 'resources/aud/Tone audio.m4a', 'path': 'resources/aud/Tone audio.m4a'},
    {'name': 'resources/imgs/slides/slide-01.png', 'path': 'resources/imgs/slides/slide-01.png'},
    {'name': 'resources/aud/slide-01.m4a', 'path': 'resources/aud/slide-01.m4a'},
    {'name': 'resources/imgs/slides/slide-02.png', 'path': 'resources/imgs/slides/slide-02.png'},
    {'name': 'resources/aud/slide-02.m4a', 'path': 'resources/aud/slide-02.m4a'}
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var frameDur;
async function updateInfo() {
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2021.2.3';
  expInfo['OS'] = window.navigator.platform;

  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  
  return Scheduler.Event.NEXT;
}


var intr1Clock;
var expVersion;
var AUD_DIR;
var IMGS_DIR;
var SLIDES_DIR;
var USE_AUDIO;
var SHOW_DEBUG;
var CLICK_BOX_OPACITY;
var SLIDE_H;
var SLIDE_W;
var SLIDE_SIZE;
var NEXT_POS;
var NEXT_SIZE;
var NEXT;
var PLAY_POS;
var PLAY_SIZE;
var PLAY;
var COVER_SIZE;
var COVER;
var MOUSE;
var MOUSE_L;
var MOUSE_L_prev;
var SOUND;
var begin_text;
var intr2Clock;
var intr2_text;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "intr1"
  intr1Clock = new util.Clock();
  expVersion = "2022.09.23";
  AUD_DIR = "resources/aud";
  IMGS_DIR = "resources/imgs";
  SLIDES_DIR = `${IMGS_DIR}/slides`;
  USE_AUDIO = (expInfo["Audio"] === "Yes");
  SHOW_DEBUG = (expInfo["Debug"] === "Yes");
  CLICK_BOX_OPACITY = (SHOW_DEBUG ? 0.2 : 0);
  /*
  Slides are 1920 × 1080 pixels.
  Positions and sizes of clickable areas are hard
  coded, so changing this will break _everything_!
  */
  SLIDE_H = 0.7;
  SLIDE_W = ((SLIDE_H / 1080) * 1920);
  SLIDE_SIZE = [SLIDE_W, SLIDE_H];
  NEXT_POS = [0.515, 0.29];
  NEXT_SIZE = [0.165, 0.075];
  NEXT = make_rect("next", NEXT_POS, NEXT_SIZE, CLICK_BOX_OPACITY);
  PLAY_POS = [(- 0.005), (- 0.109)];
  PLAY_SIZE = [0.108, 0.108];
  PLAY = make_circle("play", PLAY_POS, PLAY_SIZE, null, "white");
  COVER_SIZE = [0.17, 0.08];
  COVER = make_rect("cover", NEXT_POS, COVER_SIZE, null, "white", 0, "white");
  MOUSE = new core.Mouse({"win": psychoJS.window});
  MOUSE_L = 0;
  MOUSE_L_prev = 0;
  SOUND = null;
  
  begin_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'begin_text',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.6, 0], height: 0.02,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('black'),  opacity: undefined,
    depth: -2.0 
  });
  
  // Initialize components for Routine "intr2"
  intr2Clock = new util.Clock();
  intr2_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'intr2_text',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.6, 0], height: 0.02,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('black'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var slide;
var aud_file;
var SOUND_DUR;
var SOUND_START;
var intr1Components;
function intr1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'intr1'-------
    t = 0;
    intr1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    slide = make_slide("slide-01");
    slide.autoDraw = true;
    NEXT.autoDraw = true;
    if (USE_AUDIO) {
        aud_file = `${AUD_DIR}/slide-01.m4a`;
        SOUND = make_sound("sound", aud_file);
        SOUND_DUR = SOUND.getDuration();
        SOUND_START = 0;
        SOUND.play();
    }
    
    // keep track of which components have finished
    intr1Components = [];
    intr1Components.push(begin_text);
    
    for (const thisComponent of intr1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function intr1RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'intr1'-------
    // get current time
    t = intr1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    MOUSE_L = MOUSE.getPressed()[0];
    if ((MOUSE_L_prev !== MOUSE_L)) {
        MOUSE_L_prev = MOUSE_L;
        if ((MOUSE_L && NEXT.contains(MOUSE))) {
            continueRoutine = false;
        }
    }
    if ((((t - SOUND_START) - 1) >= SOUND_DUR)) {
        continueRoutine = false;
    }
    if (SHOW_DEBUG) {
        begin_text.text = `
    aud_file = ${aud_file}
    t = ${round(t, 3)}
    sound_completed = ${((t - SOUND_START) >= SOUND_DUR)}`
    ;
    }
    
    
    // *begin_text* updates
    if (t >= 0.0 && begin_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      begin_text.tStart = t;  // (not accounting for frame time here)
      begin_text.frameNStart = frameN;  // exact frame index
      
      begin_text.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of intr1Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function intr1RoutineEnd() {
  return async function () {
    //------Ending Routine 'intr1'-------
    for (const thisComponent of intr1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    NEXT.autoDraw = false;
    slide.autoDraw = false;
    if (USE_AUDIO) {
        SOUND.stop();
    }
    
    // the Routine "intr1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var response;
var has_responded;
var SLIDE_SOUND_START;
var intr2Components;
function intr2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'intr2'-------
    t = 0;
    intr2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData("expVersion", expVersion);
    response = null;
    has_responded = false;
    slide = make_slide("slide-02");
    slide.autoDraw = true;
    PLAY.autoDraw = true;
    NEXT.autoDraw = true;
    COVER.autoDraw = true;
    COVER.opacity = 1;
    if (USE_AUDIO) {
        aud_file = `${AUD_DIR}/slide-02.m4a`;
        SOUND = make_sound("sound", aud_file);
        SOUND_DUR = SOUND.getDuration();
        SOUND_START = 0;
        SLIDE_SOUND_START = 0;
        SOUND.play();
    }
    
    // keep track of which components have finished
    intr2Components = [];
    intr2Components.push(intr2_text);
    
    for (const thisComponent of intr2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function intr2RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'intr2'-------
    // get current time
    t = intr2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    MOUSE_L = MOUSE.getPressed()[0];
    if ((MOUSE_L_prev !== MOUSE_L)) {
        MOUSE_L_prev = MOUSE_L;
        if (MOUSE_L) {
            if ((has_responded && NEXT.contains(MOUSE))) {
                continueRoutine = false;
            }
            if (PLAY.contains(MOUSE)) {
                has_responded = true;
                COVER.opacity = 0;
                if (((t - SOUND_START) < SOUND_DUR)) {
                    SOUND.stop();
                }
                aud_file = `${AUD_DIR}/Tone audio.m4a`;
                SOUND = make_sound("sound", aud_file);
                SOUND_DUR = SOUND.getDuration();
                SOUND_START = t;
                SLIDE_SOUND_START = t;
                SOUND.play();
            }
        }
    }
    if (SHOW_DEBUG) {
        intr2_text.text = `
    aud_file = ${aud_file}
    slide_num = ${slide.name}
    response = ${response}
    has_responded = ${has_responded}
    t = ${round(t, 3)}`
    ;
    }
    
    
    // *intr2_text* updates
    if (t >= 0.0 && intr2_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      intr2_text.tStart = t;  // (not accounting for frame time here)
      intr2_text.frameNStart = frameN;  // exact frame index
      
      intr2_text.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of intr2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function intr2RoutineEnd() {
  return async function () {
    //------Ending Routine 'intr2'-------
    for (const thisComponent of intr2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    if (USE_AUDIO) {
        SOUND.stop();
    }
    slide.size = [0, 0];
    slide.autoDraw = false;
    NEXT.autoDraw = false;
    PLAY.autoDraw = false;
    COVER.autoDraw = false;
    psychoJS.experiment.addData("response", response);
    psychoJS.experiment.addData("end_timestamp", util.MonotonicClock.getDateStr());
    psychoJS.experiment.addData("total_seconds", globalClock.getTime());
    
    // the Routine "intr2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


function endLoopIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        const thisTrial = snapshot.getCurrentTrial();
        if (typeof thisTrial === 'undefined' || !('isTrials' in thisTrial) || thisTrial.isTrials) {
          psychoJS.experiment.nextEntry(snapshot);
        }
      }
    return Scheduler.Event.NEXT;
    }
  };
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
