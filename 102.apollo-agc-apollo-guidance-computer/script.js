"use strict";
//*****************************************************
//* V37N01E : will run the initial IMU alignment program
//* V35E    : This will light up all of the DSKY annunciators
//* V16N36E : Monitor the current time
//* 
//* 
//* 
//* 
/*--- Pre-launch & Service
P00	CMC Idling    (V37N00E - Major Mode 01 Prelaunch Service Initialization)
P01	Pre-launch or service initialisation
P02	Pre-launch or service - gyro compassing
P03	Pre-launch or service - optical verification of gyro --- --- compassing
P06	GNCS Power down
P07	Systems Test
--- Boost/Coast
P11	Earth orbit insertion monitor (EOI)
P20	Universal tracking
P21	Ground track determination
P25	Contingency VHF Range-Rate
P27	CMC Update
P29	Time-to-longitude
--- Pre-thrust Targeting
P30	External delta-V
P31	First phasing maneuvre (NC1)
P32	Second phasing maneuvre (NC2)
P33	Corrective combination maneuvre (NCC)
P34	Co-elliptic maneuvre(NSR)
P35	Transfer Phase Initiation (TPI)
P36	Transfer Phase Midcourse (TPM)
P37	Rendezvous Final Phase
P38	Plane Change (PC)
--- Thrusting
P40	SPS
P41	RCS
P47	Thrust Monitor
P48	Rendezvous thrust monitor
--- Alignment
P50	ATM Orientation determination
P51	IMU Orientation determination
P52	IMU Realign
P53	Back-up IMU orientation determination
P54	Back-up IMU realign
P55	ATM star tracker gimbal angles
--- Entry
P61	Entry preparation
P62	Entry CM/SM separation and pre-entry maneuvre
P63	Entry initialisation
P64	Entry-Post 0.05g
P65	Entry-Up control
P66	Entry-ballistics
P67	Entry-Final phase
--- Post Thrusting
P77	CSM Velocity vector updating

Commands
V35 Quick lamps tests and display tests for DSKY
V21N27 others checks for read/write RAM memory and words ROM access
V91 accessing randomly words in read only memory ROM
P01 Prelaunch initialization and IMU calibration during 640s (11mns)
    and Coarse alignment with Pitch Roll Yaw
P02 Prelaunch Gyrocompassing Alingning IMU without externals references
    To accurately align the platform . P02 ends only after detecting the liftoff
    Note: if launch delayed, V78 (V06N29) is used to re-enter the new launch azimuth
    value and a new computation time of 320 seconds is started to reorient the platform
    It’s used to avoid contact between Saturn 5 and the platform
V75 is entered to switch to the P11 program (gyrocompassing is still running until liftoff)
P11 when liftoff mission clock starts to initiate the beginning of the mission
V06N62 is used to display the velocity, altitude rate and altitude on the DSKY and
       is continuously updated
P15 TLI manœuver and initiation switches directly to V06N33 and V06N14
V06N33 entering time value for TLI
V06N14 to change velocity used for TLI
N95 at 9mns38secs to start TLI procedure. Leaving the orbit of 167 km
P63 Breaking phase (PDI powered descent initialization 250 miles far from the landing
    site 50000 foot 15 km above the lunar surface The aim is to reach the altitude of 8000 foot
    2,4 km and to reduce speed
V37N63 runs V06N61 to engage autopilot until the end of P63.
P64 is to display altitude and speed . This program is directly called by the P63
P65 Approach phase begins. The LM pitches to see the lunar surface and the landing site .
    Tranquility base is wide and they have to choose the right site depending on the fuel they have.
    The coas (crewman optical alignment sight) is used to help Amstrong and lovell to find the right
    alignment for the landing site. The landing point designator LPD are lines and graduations on
    the side window of the LM that will help the crew to adjust parameters for the IMU
    (Inertial Management Unit) calculation unit. At the end of the breaking phase,
    the last datas reception is made to adjust with the N69 command the exact landing site.
P66 Landing phase . The ROD (Rate Of Descent) must be controlled by the crew.

****************************************************/
var verbs = [
    { ref: 'VL', lib: 'Verbs list' },
    { ref: 'V01', lib: 'With noun 02, display contents of erasable memory location' },
    { ref: 'V03', lib: 'Display R1 in octal' },
    { ref: 'V04', lib: 'Display R1 & R2 in octal' },
    { ref: 'V05', lib: 'Display R1, R2 and R3 in octal' },
    { ref: 'V06', lib: 'Display data in decimal' },
    { ref: 'V11', lib: 'With noun 02, monitor contents of erasable memory location' },
    { ref: 'V16', lib: 'Monitor data in decimal' },
    { ref: 'V33', lib: 'Proceed without data' },
    { ref: 'V34', lib: 'Terminate current program' },
    { ref: 'V37', lib: 'Run program' },
    { ref: 'V46', lib: 'Select manual control during launch' },
    { ref: 'V69', lib: 'Restart' },
    { ref: 'V75', lib: 'Start launch control program' },
    { ref: 'V82', lib: 'Display orbit information during launch' },
    { ref: 'V91', lib: 'Display memory checksum' },
    { ref: 'V99', lib: 'Confirm burn' }
];
var nouns = [
    { ref: 'NL', lib: 'Nouns list' },
    { ref: 'N09', lib: 'Last three program alarms (always octal)' },
    { ref: 'N14', lib: 'Desired delta-v' },
    { ref: 'N18', lib: 'Desired or actual pitch, roll, yaw angles.' },
    { ref: 'N23', lib: 'Number of passes, time to burn, burn delta-V.' },
    { ref: 'N25', lib: 'Perform checklist action' },
    { ref: 'N29', lib: 'Launch azimuth' },
    { ref: 'N33', lib: 'Time to ignition' },
    { ref: 'N34', lib: 'Time of next program event' },
    { ref: 'N35', lib: 'Time to next program event' },
    { ref: 'N38', lib: 'Time since boot' },
    { ref: 'N43', lib: 'Latitude, Longitude, Altitude' },
    { ref: 'N44', lib: 'Orbit information during launch or other maneuvers' },
    { ref: 'N50', lib: 'Apoapsis, periapsis, fuel percentage' },
    { ref: 'N60', lib: 'Forward velocity, altitude rate, altitude.' },
    { ref: 'N61', lib: 'Time-to-go, time from ignition, crossrange (in 0.1km)' },
    { ref: 'N62', lib: 'Velocity information during launch and landing' },
    { ref: 'N63', lib: 'Delta-altitude, altitude rate and altitude.' },
    { ref: 'N64', lib: 'LPD time and angle (seconds and degrees), altitude rate, altitude.' },
    { ref: 'N68', lib: 'Downrange distance, time-to-go in braking phase (minutes and seconds), velocity.' },
    { ref: 'N73', lib: 'Flight trajectory' },
    { ref: 'N74', lib: 'Time from ignition, yaw after vertical rise, pitch after vertical rise.' },
    { ref: 'N76', lib: 'Desired downrange velocity, desired radial velocity, cross-range.' },
    { ref: 'N89', lib: 'Landing latitude, landing longitude / 2' },
    { ref: 'N94', lib: 'Apoapsis, current altitude, target apoapsis' },
    { ref: 'N95', lib: 'Burn details' }
];
var progs = [
    { ref: 'PL', lib: 'Progs list' },
    { ref: 'P00', lib: 'Idle' },
    { ref: 'P01', lib: 'Pre-launch IMU alignment' },
    { ref: 'P02', lib: 'Pre-launch setup' },
    { ref: 'P06', lib: 'Computer standby mode' },
    { ref: 'P11', lib: 'Launch control' },
    { ref: 'P12', lib: 'LEM: ascent to orbit' },
    { ref: 'P15', lib: 'TLI burn' },
    { ref: 'P16', lib: 'LOI: Lunar Orbit Insertion' },
    { ref: 'P17', lib: 'DOI: Descent Orbit Insertion' },
    { ref: 'P18', lib: 'Orbit Plane/Surface Alignment' },
    { ref: 'P19', lib: 'Orbit Adjustment- In Plane' },
    { ref: 'P32', lib: 'CSI: Coelliptic Sequence Initiation' },
    { ref: 'P33', lib: 'CDH: Constant Delta Height' },
    { ref: 'P34', lib: 'TPI: Transfer Phase Initiation' },
    { ref: 'P35', lib: 'TPM: Transfer Phase Midcourse' },
    { ref: 'P36', lib: 'Rendezvous Braking and station keeping' },
    { ref: 'P40', lib: 'LEM: DPS: Descent Propulsion System Burn' },
    { ref: 'P41', lib: 'RCS: RCS Burn' },
    { ref: 'P42', lib: 'LEM: APS: Ascent Propulsion System Burn' },
    { ref: 'P63', lib: 'LEM: LM PDI Braking' },
    { ref: 'P64', lib: 'LEM: LM Approach' },
    { ref: 'P65', lib: 'LEM: LM Auto Landing' },
    { ref: 'P66', lib: 'LEM: LM Manual landing' },
    { ref: 'P68', lib: 'LEM: Landing confirmation' },
    { ref: 'P70', lib: 'LEM: LM DPS Abort' },
    { ref: 'P71', lib: 'LEM: LM APS Abort' }
];
var commands = [
    { ref: 'Pre-launch & Service', lib: '********************************' },
    { ref: 'P00', lib: 'CMC Idling (V37N00E - Major Mode 01 Prelaunch Service Initialization)' },
    { ref: 'P01', lib: 'Pre-launch or service initialisation' },
    { ref: 'P02', lib: 'Pre-launch or service - gyro compassing' },
    { ref: 'P03', lib: 'Pre-launch or service - optical verification of gyro compassing' },
    { ref: 'P06', lib: 'GNCS Power down' },
    { ref: 'P07', lib: 'Systems Test' },
    { ref: 'Boost/Coast', lib: '********************************' },
    { ref: 'P11', lib: 'Earth orbit insertion monitor (EOI)' },
    { ref: 'P20', lib: 'Universal tracking' },
    { ref: 'P21', lib: 'Ground track determination' },
    { ref: 'P25', lib: 'Contingency VHF Range-Rate' },
    { ref: 'P27', lib: 'CMC Update' },
    { ref: 'P29', lib: 'Time-to-longitude' },
    { ref: 'Pre-thrust Targeting', lib: '********************************' },
    { ref: 'P30', lib: 'External delta-V' },
    { ref: 'P31', lib: 'First phasing maneuvre (NC1)' },
    { ref: 'P32', lib: 'Second phasing maneuvre (NC2)' },
    { ref: 'P33', lib: 'Corrective combination maneuvre (NCC)' },
    { ref: 'P34', lib: 'Co-elliptic maneuvre(NSR)' },
    { ref: 'P35', lib: 'Transfer Phase Initiation (TPI)' },
    { ref: 'P36', lib: 'Transfer Phase Midcourse (TPM)' },
    { ref: 'P37', lib: 'Rendezvous Final Phase' },
    { ref: 'P38', lib: 'Plane Change (PC)' },
    { ref: 'Thrusting', lib: '********************************' },
    { ref: 'P40', lib: 'SPS' },
    { ref: 'P41', lib: 'RCS' },
    { ref: 'P47', lib: 'Thrust Monitor' },
    { ref: 'P48', lib: 'Rendezvous thrust monitor' },
    { ref: 'Alignment', lib: '********************************' },
    { ref: 'P50', lib: 'ATM Orientation determination' },
    { ref: 'P51', lib: 'IMU Orientation determination' },
    { ref: 'P52', lib: 'IMU Realign' },
    { ref: 'P53', lib: 'Back-up IMU orientation determination' },
    { ref: 'P54', lib: 'Back-up IMU realign' },
    { ref: 'P55', lib: 'ATM star tracker gimbal angles' },
    { ref: 'Entry', lib: '********************************' },
    { ref: 'P61', lib: 'Entry preparation' },
    { ref: 'P62', lib: 'Entry CM/SM separation and pre-entry maneuvre' },
    { ref: 'P63', lib: 'Entry initialisation' },
    { ref: 'P64', lib: 'Entry-Post 0.05g' },
    { ref: 'P65', lib: 'Entry-Up control' },
    { ref: 'P66', lib: 'Entry-ballistics' },
    { ref: 'P67', lib: 'Entry-Final phase' },
    { ref: 'Post Thrusting', lib: '********************************' },
    { ref: 'P77', lib: 'CSM Velocity vector updating' }
];
var wflag = false;
var keyUrl = 'http://users.encs.concordia.ca/~kharma/PersonalWeb/sounds/button.WAV';
var keyAudio = new Audio(keyUrl);
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
var w = (canvas.width = window.innerWidth);
var h = (canvas.height = window.innerHeight);
var ctx = canvas.getContext("2d");
var center = [w / 2, h / 2];
var imu = null;
var tal = null;
var CLRKEY = false;
var IMU_INIT_TIME = 10;
var runTAL = false;
var wait = 0;
var abort = false;
var runIMU = false;
// Main Loop
$(window).click(function (e) {
    var TypDom = e.target.class;
    var key = e.target.id;
    showKey(key);
    readDSKY(key.trim());
});
// Debug
function showKey(key) {
    document.getElementById("resu").innerHTML = '[' + key.trim() + ']';
}
function readDSKY(key) {
    setControlPanel(key);
}
function setControlPanel(key) {
    keyStroke();
    switch (key) {
        case '18': // Reset DSKY
            resetDSKY();
            break;
        case '29': // Set Prog value  
            resetDSKY();
            setLightActive("prog", true);
            setBlinkDisplay("prog00", true);
            runDisplayReg('R1', 500);
            break;
        case '17': // verb or noun
        case '31':
            setLightActive("prog", true);
            if (key == '17') { // VERB Key
                setLightError("opr_err", false);
                setBlinkDisplay("verb00", true);
                setBlinkDisplay("prog00", false);
                setBlinkDisplay("noun00", false);
                changeValue("verb00", -1, 2, "");
            }
            if (key == '31') { // NOUN Key
                setBlinkDisplay("verb00", false);
                setBlinkDisplay("prog00", false);
                setBlinkDisplay("noun00", true);
                changeValue("noun00", -1, 2, "");
            }
            break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            if (isBlinkDisplay("prog00")) {
                changeValue("prog00", key, 2, "");
            }
            else if (isBlinkDisplay("noun00")) {
                changeValue("noun00", key, 2, "");
            }
            else if (isBlinkDisplay("verb00")) {
                changeValue("verb00", key, 2, "");
            }
            break;
        case '101':
        case '102':
        case '103':
        case '104':
        case '105':
        case '106':
        case '107':
        case '108':
        case '109':
        case '100':
            changeValue("ags_mem_loc", key - 100, 3, "");
            break;
        case '28': // ENTR Key
            if (isBlinkDisplay("noun00")) {
                if (getDisplayValue("noun00") != 0) {
                    setBlinkDisplay("noun00", false);
                    setLightError("opr_err", false);
                }
                else
                    setLightError("opr_err", true);
            }
            if (isBlinkDisplay("verb00")) {
                if (getDisplayValue("verb00") != 0) {
                    setBlinkDisplay("verb00", false);
                }
                else
                    setLightError("opr_err", true);
            }
            if (isBlinkDisplay("prog00")) {
                if (getDisplayValue("prog00") != 0) {
                    setBlinkDisplay("prog00", false);
                    setLightError("opr_err", false);
                }
                else
                    setLightError("opr_err", true);
            }
            debug(getDSKYCommand());
            runAGCCommand();
            break;
        case '111':
            runAGSClear();
            break;
        case '114':
            runAGSCommand();
            break;
        case 'btn_abort':
            clickOnBtn("btn_abort");
            runLaunchProcedure(false);
            break;
        case 'chk_imu':
            runLaunchProcedure(getIMUStatus());
            break;
        case 'verbs':
            readCommands("VERBS");
            break;
        case 'nouns':
            readCommands("NOUNS");
            break;
        case 'commands':
            readCommands("COMMANDS");
            break;
    }
}
function runLaunchProcedure(flag) {
    setABORT(!flag);
    setrunTAL(flag);
    startTAL(flag);
    setLED("imu_status", flag);
}
function setrunIMU(flag) {
    runIMU = flag;
}
function isrunIMU() {
    return runIMU;
}
function setABORT(flag) {
    abort = flag;
}
function isABORT() {
    return abort;
}
function setrunTAL(flag) {
    runTAL = flag;
}
function isrunTAL() {
    return runTAL;
}
function getDSKYCommand() {
    var progId = padNumber(getDisplayValue("prog00").toString(), 2);
    var verbId = padNumber(getDisplayValue("verb00").toString(), 2);
    var nounId = padNumber(getDisplayValue("noun00").toString(), 2);
    return ("P" + progId + "V" + verbId + "N" + nounId).trim();
}
function getAGSCommand() {
    var pgmId = padNumber(getDisplayValue("ags_mem_loc").toString(), 3);
    return pgmId.trim();
}
function runAGSCommand() {
    var pgmId = getAGSCommand();
    debug(pgmId);
    switch (pgmId) {
        case '425': // Get Time
            changeValue("ags_value_display", getCurTime("STR"), 6, "");
            break;
        case '426': // Set Time
            break;
    }
}
function runAGCCommand() {
    var pgmId = getDSKYCommand();
    debug(pgmId);
    switch (pgmId) {
        case 'P00V35N00': // Check All AGC Functions
            runP00V35N00();
            break;
        case 'P63V00N00': // PDI Function
            runP63V00N00();
            break;
        case 'P00V37N00': // Major Mode 01 Prelaunch Service Initialization
            runP00V37N00();
            break;
        case 'P00V16N36': // Current time to be displayed R1, R2, R3
            runP00V16N36();
            break;
        case 'P00V05N09': // Check for error codes
            runP00V05N09();
            break;
        default:
            setLightError("opr_err", true);
            break;
    }
}
// Major Mode 01 Prelaunch Service Initialization
function runP00V37N00() {
    setCompActive(true);
    changeValue("prog00", 0, 2, "");
    changeValue("verb00", -1, 2, "");
    changeValue("noun00", -1, 2, "");
}
// Lunar PDI Function
function runP63V00N00() {
    setCompActive(true);
}
// Check for error codes
function runP00V05N09() {
    setCompActive(true);
    changeValue("R1", 1105, 6, "+");
    changeValue("R2", 1106, 6, "+");
    changeValue("R3", 0, 6, "+");
    setCompActive(false);
}
// Current time to be displayed R1, R2, R3
function runP00V16N36() {
    showTimeRegister();
}
// Check All AGC Functions
function runP00V35N00() {
    resetDSKY();
    setPanelLightsTo(true);
    setLightError("opr_err", true);
    setLightError("key_rel", true);
    changeValue("verb00", 88, 2, "");
    changeValue("noun00", 88, 2, "");
    changeValue("R1", 888888, 6, "+");
    changeValue("R2", 888888, 6, "+");
    changeValue("R3", 888888, 6, "+");
    setBlinkDisplay("verb00", true);
    setBlinkDisplay("noun00", true);
    waitSeconds(15);
    setPanelLightsTo(false);
    resetDSKY();
}
function runAGSClear() {
    changeValue("ags_mem_loc", -1, 3, "");
    changeValue("ags_value_display", -1, 5, "+");
}
function waitSeconds(sectime) {
    var wait = sectime;
    var w = setInterval(function () {
        debug(padNumber(wait, 2));
        if (wait == 0)
            clearInterval(w);
        wait -= 1;
    }, 1000);
}
function getDisplayValue(pId) {
    return parseInt(document.getElementById(pId).innerText);
}
function setLightActive(pId, flag) {
    if (flag)
        document.getElementById(pId).classList.add("active");
    else
        document.getElementById(pId).classList.remove("active");
}
function setLED(pId, flag) {
    if (flag) {
        document.getElementById(pId).classList.remove("led-off");
        document.getElementById(pId).classList.add("led-green");
    }
    else {
        document.getElementById(pId).classList.remove("led-green");
        document.getElementById(pId).classList.add("led-off");
    }
}
function setLED_Error(pId, flag) {
    setLED(pId, false);
    if (flag) {
        document.getElementById(pId).classList.add("led-red");
    }
    else {
        document.getElementById(pId).classList.remove("led-red");
    }
}
function setPanelLightsTo(flag) {
    wflag = false;
    setLightActive("temp", flag);
    setLightActive("prog", flag);
    setLightActive("tracker", flag);
    setLightActive("uplink_acty", flag);
    setLightActive("no_att", flag);
    setLightActive("stby", flag);
    setLightError("opr_err", flag);
    setLightActive("key_rel", flag);
    setBlinkDisplay("prog00", flag);
    setBlinkDisplay("verb00", flag);
    setBlinkDisplay("noun00", flag);
    setCompActive(flag);
}
function setLightError(pId, flag) {
    if (flag) {
        document.getElementById(pId).classList.add("active");
        setBlinkDisplay(pId, true);
    }
    else {
        document.getElementById(pId).classList.remove("active");
        setBlinkDisplay(pId, false);
    }
}
function changeValue(pId, value, nDigits, sign) {
    var dom = document.getElementById(pId);
    var curDsp = dom.innerText;
    debug(curDsp);
    dom.innerText = sign + leftPad(curDsp, value, nDigits);
}
function padNumber(num, size) {
    var s = num + "";
    while (s.length < size)
        s = "0" + s;
    return s;
}
function leftPad(curDsp, newValue, nDigits) {
    var resu = 0;
    if (newValue >= 0)
        resu = (parseInt(curDsp) * 10) + parseInt(newValue);
    return padNumber(resu, nDigits);
}
function keyStroke() {
    keyAudio.play();
    setKeyRel();
}
function setKeyRel() {
    document.getElementById("key_rel").classList.remove("keystroke");
    document.getElementById("key_rel").offsetWidth;
    document.getElementById("key_rel").classList.add("keystroke");
}
function setCompActive(flag) {
    if (flag)
        document.getElementById("comp_acty").classList.add("compBlink");
    else
        document.getElementById("comp_acty").classList.remove("compBlink");
}
function setBlinkDisplay(pId, flag) {
    if (flag) {
        document.getElementById(pId).classList.add("blink");
    }
    else {
        document.getElementById(pId).classList.remove("blink");
    }
}
function isBlinkDisplay(pId) {
    return document.getElementById(pId).classList.contains('blink');
}
function isLightIndicatorActive(pId) {
    return document.getElementById(pId).classList.contains('active');
}
function runDisplayReg(cntRef, value) {
    var i;
    for (i = 0; i <= value; i++) {
        setInterval(setDisplayReg(cntRef, i), 1500);
    }
}
function setDisplayReg(pId, value) {
    document.getElementById(pId).innerText = padNumber(value, 7);
}
function resetAGS() {
    changeValue("ags_mem_loc", -1, 3, "");
    changeValue("ags_value_display", -1, 5, "+");
    setLightError("ags_opr_err", false);
}
function resetDSKY() {
    CLRKEY = true;
    changeValue("noun00", -1, 2, "");
    changeValue("verb00", -1, 2, "");
    changeValue("prog00", -1, 2, "");
    changeValue("R1", -1, 7, ""); // reset Pitch Indicator
    changeValue("R2", -1, 7, ""); // reset Roll Indicator
    changeValue("R3", -1, 7, ""); // reset Yaw Indicator
    setCompActive(false);
    setPanelLightsTo(false);
}
function debug(value) {
    document.getElementById("debug").innerText = '[' + value.toString().trim() + ']';
}
/*
document.querySelectorAll('.computer__indicator').forEach((indicator) => {
  indicator.addEventListener('click', function() {
    indicator.classList.toggle('active');
  });
});
*/
//*******************************************************************
// Calculation parts
//*******************************************************************
// Main functions
//*******************************************************************
// DSKY (Display Keyboard)
//-------------------------------------------------------------------
// dsky.getDigit(c)        get Keyboard Input
// dsky.process(chan, val) process a DSKY output (channels 8, 9 and 11)
// dsky.update()           update DSKY Lights and digits
// dsky.tick()             
//*******************************************************************
// IMU Functions Inertial Measurement Unit (IMU)
//-------------------------------------------------------------------
//
//*******************************************************************
// Source from : http://svtsim.com/moonjs/agc.html
//*******************************************************************
// the main interface functions to the emscripten compiled code    
var advance = Module.cwrap('advance', 'number', []); // int advance()
var sendPort = Module.cwrap('sendPort', 'number', ['number', 'number', 'number']); // int sendPort(port, val, mask)    
var scanPort = Module.cwrap('scanPort', 'number', ['number']); // int scanPort(mask)
var readPort = Module.cwrap('scanPort', 'number', []); // int readPort()
var peek = Module.cwrap('peek', 'number', ['number']);
var poke = Module.cwrap('poke', 'number', ['number', 'number']);
var cpu_time = 0; // in seconds
var abs = Math.abs;
var floor = Math.floor;
var round = Math.round;
var sqrt = Math.sqrt;
var sin = Math.sin;
var cos = Math.cos;
var atan2 = Math.atan2;
var asin = Math.asin;
var PI = Math.PI;
var DEG_TO_RAD = (PI / 180);
var RAD_TO_DEG = (180 / PI);
// A module encapsulating most DSKY related states and functions
var dsky = (function () {
    // digits hold current state DSKY in an array of characters (strings of length==1)
    var digits = '000000+00000+00000+00000'.split('');
    // sign[1|2][p|n] holds the sign bits for the three 5-digit displays R1, R2 and R3
    var sign1p = 0;
    var sign1m = 0;
    var sign2p = 0;
    var sign2m = 0;
    var sign3p = 0;
    var sign3m = 0;
    var status8 = 0; // status bits of AGC output channel 010
    var status9 = 0; // status bits of AGC output channel 011
    var status11 = 0;
    var phase = 0; // a timer used for blinking Verb and Nouns
    var phase0 = -1;
    var flag = 0; // update flag; bit 0: digits, bit 1: status8, bit 2: status 9
    function getDigit(c) {
        var d = 'E';
        switch (c) {
            case 0:
                d = 'H';
                break;
            case 21:
                d = '0';
                break;
            case 3:
                d = '1';
                break;
            case 25:
                d = '2';
                break;
            case 27:
                d = '3';
                break;
            case 15:
                d = '4';
                break;
            case 30:
                d = '5';
                break;
            case 28:
                d = '6';
                break;
            case 19:
                d = '7';
                break;
            case 29:
                d = '8';
                break;
            case 31:
                d = '9';
                break;
        }
        return d;
    }
    // process(chan, val) process a DSKY output (channels 8, 9 and 11)
    function process(chan, val) {
        if (chan === 8) {
            if (!val)
                return flag;
            // see http://www.ibiblio.org/apollo/developer.html for what aa, bb, d1 and d2 mean                                
            var aa = (val >> 11);
            var bb = (val >> 10) & 1;
            var d1 = getDigit((val >> 5) & 0x1f);
            var d2 = getDigit(val & 0x1f);
            switch (aa) {
                case 12: // spacial case for the indicator lights
                    status8 = val;
                    break;
                case 11:
                    digits[0] = d1;
                    digits[1] = d2;
                    break;
                case 10:
                    digits[2] = d1;
                    digits[3] = d2;
                    break;
                case 9:
                    digits[4] = d1;
                    digits[5] = d2;
                    break;
                case 8:
                    digits[7] = d2;
                    break;
                case 7:
                    digits[8] = d1;
                    digits[9] = d2;
                    sign1p = bb;
                    break;
                case 6:
                    digits[10] = d1;
                    digits[11] = d2;
                    sign1m = bb;
                    break;
                case 5:
                    digits[13] = d1;
                    digits[14] = d2;
                    sign2p = bb;
                    break;
                case 4:
                    digits[15] = d1;
                    digits[16] = d2;
                    sign2m = bb;
                    break;
                case 3:
                    digits[17] = d1;
                    digits[19] = d2;
                    break;
                case 2:
                    digits[20] = d1;
                    digits[21] = d2;
                    sign3p = bb;
                    break;
                case 1:
                    digits[22] = d1;
                    digits[23] = d2;
                    sign3m = bb;
                    break;
            }
            flag |= (aa == 12 ? 2 : 1); // flag determines which area of the screen needs refreshing
            // assigns the correct sign symbol
            digits[6] = (sign1p && !sign1m ? '+' : (!sign1p && !sign1m ? 'H' : '-')); // H means space replaced in updateDsky
            digits[12] = (sign2p && !sign2m ? '+' : (!sign2p && !sign2m ? 'H' : '-'));
            digits[18] = (sign3p && !sign3m ? '+' : (!sign3p && !sign3m ? 'H' : '-'));
        }
        else if (chan === 9) {
            status9 = val;
            flag |= 4;
        }
        else if (chan === 11) {
            status11 = val & 0x0200;
            flag |= 8;
        }
        return flag;
    }
    function update() {
        var s = digits.join('');
        var on = (phase >> 1) & 3; // to simulate blinking (phase increases by 1 every 100 ms)                                        
        if (flag & 1) { // bit 0 of flag is set, update digits                
            $('#R1').html(s.slice(6, 12).replace(/H/g, '&nbsp;')); // replaced H with space since spaces confuses String.join
            $('#R2').html(s.slice(12, 18).replace(/H/g, '&nbsp;'));
            $('#R3').html(s.slice(18, 24).replace(/H/g, '&nbsp;'));
            $('#prog00').html(s.slice(0, 2).replace(/H/g, '&nbsp;'));
            //console.log( (Math.round(cpu_time*10)/10) + ': ' + $('#R1').html() + ', ' + $('#R2').html() + ', ' + $('#R3').html());
        }
        if ((flag & 1) || (status9 & 0x0020)) { // VERB and NOUN are updated if flag bit 0 is set or DSKY is blinking mode     
            if (!(status9 & 0x0020) || on) {
                $('#verb00').html(s.slice(2, 4).replace(/H/g, '&nbsp;'));
                $('#noun00').html(s.slice(4, 6).replace(/H/g, '&nbsp;'));
            }
            else {
                $('#verb00').html('&nbsp;&nbsp;');
                $('#noun00').html('&nbsp;&nbsp;');
            }
        }
        if (flag & 2) { // also see http://klabs.org/history/history_docs/mit_docs/1709.pdf section 1.9.3
            $('#vel').css('background-color', status8 & 0x0004 ? '#ffc200' : '#888888');
            $('#no_att').css('background-color', status8 & 0x0008 ? '#ffffff' : '#888888');
            $('#alt').css('background-color', status8 & 0x0010 ? '#ffc200' : '#888888');
            $('#gimbal_lock').css('background-color', status8 & 0x0020 ? '#ffc200' : '#888888');
            $('#tracker').css('background-color', status8 & 0x0080 ? '#ffc200' : '#888888');
            $('#prog').css('background-color', status8 & 0x0100 ? '#ffc200' : '#888888');
        }
        if (flag & 4) {
            $('#comp_acty').css('background-color', status9 & 0x0002 ? '#ffc200' : '#888888');
            $('#uplink_acty').css('background-color', status9 & 0x0004 ? '#ffffff' : '#888888');
            $('#temp').css('background-color', status9 & 0x0008 ? '#ffc200' : '#888888');
        }
        if ((flag & 4) || (status9 & 0x0050)) { // these two indicators blink
            $('#key_rel').css('background-color', on && (status9 & 0x0010) ? '#ffffff' : '#888888');
            $('#opr_err').css('background-color', on && (status9 & 0x0040) ? '#ffffff' : '#888888');
        }
        if (flag & 8) {
            $('#stby').css('background-color', status11 & 0x0200 ? '#ffffff' : '#888888');
        }
        flag = 0; // are screens that needed to be updated are actually updated! 
    }
    function tick() {
        var s, t, hh, mm, ss;
        if (phase % 10 === 0) {
            t = round(phase / 10);
            hh = floor(t / 3600);
            mm = floor(t / 60) % 60;
            ss = t % 60;
            s = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
            $('#st').html(s);
            if (phase0 >= 0) {
                t = round((phase - phase0) / 10);
                hh = floor(t / 3600);
                mm = floor(t / 60) % 60;
                ss = t % 60;
                s = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
                $('#met').html(s);
            }
        }
        return phase++;
    }
    function met() {
        return round((phase - phase0) / 10);
    }
    return {
        process: process,
        update: update,
        tick: tick,
        liftoff: function () { phase0 = phase; },
        met: met
    };
})(); // dsky
var imu = (function () {
    var CA_ANGLE = 0.043948 * DEG_TO_RAD;
    var FA_ANGLE = 0.617981 / 3600.0 * DEG_TO_RAD;
    var ANGLE_INCR = 360.0 / 32768 * DEG_TO_RAD;
    var PIPA_INCR = 0.0585; // m/s per each PIPA pulse
    var PINC = 0;
    var PCDU = 1;
    var MINC = 2;
    var MCDU = 3;
    var error;
    var imu_angle;
    var euler;
    var pimu;
    var omega;
    var pipa;
    var velocity;
    var gimbalLock;
    var sum = 0;
    var canvas = document.getElementById('fdai');
    var ctx = canvas.getContext('2d');
    var radius = 75;
    zero();
    function adjust(x, a, b) {
        return x - (b - a) * floor((x - a) / (b - a));
    }
    //***************************************************************************************
    //* Funct: Gyro Coarse Align (will be called in case of Channel 0174; 0175; 0176 output)
    //***************************************************************************************
    function gyro_coarse_align(chan, val) {
        var sign = val & 0x4000 ? -1 : +1;
        var cdu_pulses = sign * (val & 0x3FFF);
        // ---- Coarse Align Enable ----
        if (1) { // {$bo(12,4) == 1}
            if (chan === 124) { // 0174
                modify_gimbal_angle([cdu_pulses * CA_ANGLE, 0, 0]);
            }
            else if (chan === 125) { // 0175
                modify_gimbal_angle([0, cdu_pulses * CA_ANGLE, 0]);
            }
            else if (chan === 126) { // 0176
                modify_gimbal_angle([0, 0, cdu_pulses * CA_ANGLE]);
            }
            move_fdai_marker();
        }
        else {
            // ---- Error Needles ----
            error[chan - 124] += cdu_pulses;
        }
    }
    //*****************************************************************************************
    //*** Function: Gyro Fine Align (will be called in case of Channel 0177 output)         ***
    //*****************************************************************************************
    function gyro_fine_align(chan, val) {
        var gyro_sign_minus = val & 0x4000;
        var gyro_selection_a = val & 0x2000;
        var gyro_selection_b = val & 0x1000;
        var gyro_enable = val & 0x0800;
        var sign = gyro_sign_minus ? -1 : +1;
        var gyro_pulses = sign * (val & 0x07FF);
        if (!gyro_selection_a && gyro_selection_b) {
            modify_gimbal_angle([gyro_pulses * FA_ANGLE, 0, 0]);
        }
        if (gyro_selection_a && !gyro_selection_b) {
            modify_gimbal_angle([0, gyro_pulses * FA_ANGLE, 0]);
        }
        if (gyro_selection_a && gyro_selection_b) {
            modify_gimbal_angle([0, 0, gyro_pulses * FA_ANGLE]);
        }
        move_fdai_marker();
    }
    //*************************************************************************************
    //*** Function: Modify a specific IMU Delta Gimbal-Angle par1=X; par2=Y; par3=Z    ****
    //*************************************************************************************
    function modify_gimbal_angle(delta) {
        if (gimbalLock)
            return;
        var ang_delta = 0;
        for (var axis = 0; axis < 3; axis++) {
            if (delta[axis]) {
                // ---- Calculate New Angle ----
                imu_angle[axis] = adjust(imu_angle[axis] + delta[axis], 0, 2 * PI);
                // ---- Calculate Delta between the new Angle and already feeded IMU Angle ----
                var dx = adjust(imu_angle[axis] - pimu[axis], -PI, PI);
                sum += abs(dx);
                // ---- Feed yaAGC with the new Angular Delta ----
                var sign = dx > 0 ? +1 : -1;
                var n = floor(abs(dx) / ANGLE_INCR);
                pimu[axis] = adjust(pimu[axis] + sign * ANGLE_INCR * n, 0, 2 * PI);
                var cdu = peek(26 + axis); // read CDU counter (26 = 0x32 = CDUX)
                cdu = cdu & 0x4000 ? -(cdu ^ 0x7FFF) : cdu; // converts from ones-complement to twos-complement
                cdu += sign * n; // adds the number of pulses 
                poke(26 + axis, cdu < 0 ? (-cdu) ^ 0x7FFF : cdu); // converts back to ones-complement and writes the counter
                //for(;n>0; n--){                
                //    sendPort(0x9A+axis, sign>0 ? PCDU : MCDU, 0xFFFF);  // 0x9A = 0232 = 0200 + 032 
                //}                  
            }
        }
        /*
        if(imu_angle[2] > 85.1*DEG_TO_RAD && imu_angle[2] < 274.9*DEG_TO_RAD){
            gimbalLock = true;
        }
        */
    }
    function move_fdai_marker() {
        var s;
        s = (imu_angle[0] * RAD_TO_DEG).toFixed(2);
        s = '000'.substr(0, 6 - s.length) + s;
        $('#imux').html(s);
        s = (imu_angle[1] * RAD_TO_DEG).toFixed(2);
        s = '000'.substr(0, 6 - s.length) + s;
        $('#imuy').html(s);
        s = (imu_angle[2] * RAD_TO_DEG).toFixed(2);
        s = '000'.substr(0, 6 - s.length) + s;
        $('#imuz').html(s);
        s = (euler[0] * RAD_TO_DEG).toFixed(1);
        $('#roll').html(s);
        s = (euler[1] * RAD_TO_DEG).toFixed(1);
        $('#pitch').html(s);
        s = (euler[2] * RAD_TO_DEG).toFixed(1);
        $('#yaw').html(s);
        /*
        s = (abs(velocity[2])*3.28084).toFixed(0);
        s = '00000'.substr(0, 5-s.length) + s;
        $('#vx').html(s);

        s = round(abs(velocity[1])*3.28084).toFixed(0);
        s = '00000'.substr(0, 5-s.length) + s;
        $('#vy').html(s);
        
        s = round(abs(velocity[0])*3.28084).toFixed(0);
        s = '00000'.substr(0, 5-s.length) + s;
        $('#vz').html(s);
        */
        if (abs(sum) > 0.01) {
            calcEuler();
            paint8ball();
            sum = 0;
        }
    }
    // calculates the Euler angles based on the imu reading
    function calcEuler() {
        var sinOG = sin(imu_angle[0]);
        var sinIG = sin(imu_angle[1]);
        var sinMG = sin(imu_angle[2]);
        var cosOG = cos(imu_angle[0]);
        var cosIG = cos(imu_angle[1]);
        var cosMG = cos(imu_angle[2]);
        // Extract Attitude Euler angles out of the rotation 
        // matrix Stable Member into Navigation Base ----
        // var t11 = cosIG*cosMG;
        var t12 = sinMG;
        // var t13 = -sinIG$cosMG;
        // var t21 = -cosIG*sinMG*cosOG + sinIG*sinOG;
        var t22 = cosMG * cosOG;
        var t23 = sinIG * sinMG * cosOG + cosIG * sinOG;
        var t31 = cosIG * sinMG * sinOG + sinIG * cosOG;
        var t32 = -cosMG * sinOG;
        var t33 = -sinIG * sinMG * sinOG + cosIG * cosOG;
        euler[0] = asin(t32);
        euler[1] = atan2(t31, t33);
        euler[2] = atan2(t12, t22);
        for (var axis = 0; axis < 3; axis++) {
            if (euler[axis] < -2 * PI) {
                euler[axis] += 2 * PI;
            }
            else if (euler[axis] >= 2 * PI) {
                euler[axis] -= 2 * PI;
            }
        }
    }
    // Paints the 8-ball based on the euler angles calculated by calcEuler
    function paint8ball() {
        var roll = euler[0];
        var pitch = euler[1];
        var yaw = euler[2];
        ctx.fillStyle = '#888888';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        for (var i = 0; i < 36; i++) {
            var angle = (i * 10) * DEG_TO_RAD;
            var l = (i % 3 ? 10 : 15);
            ctx.beginPath();
            ctx.moveTo((radius + 2) * cos(angle), (radius + 2) * sin(angle));
            ctx.lineTo((radius + l) * cos(angle), (radius + l) * sin(angle));
            ctx.stroke();
        }
        var s = 1.0;
        ctx.rotate(-roll);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.fillStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.arc(0, 0, radius, 0, 2 * PI, +1);
        ctx.fill();
        ctx.stroke();
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.fillStyle = '#000000';
        if (cos(pitch) < 0) {
            pitch += PI;
            ctx.arc(0, 0, radius, 0, PI, true);
        }
        else {
            ctx.arc(0, 0, radius, 0, PI, false);
        }
        s = sin(pitch);
        if (abs(s) < 0.001) {
            ctx.moveTo(-radius, 0);
            ctx.lineTo(radius, 0);
        }
        else {
            ctx.scale(1, s);
            ctx.arc(0, 0, radius, PI, 0, true);
        }
        ctx.fill();
        ctx.restore();
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = '#aaa';
        if (cos(yaw) < 0) {
            yaw += PI;
        }
        yaw = adjust(yaw, -PI, PI);
        s = -sin(yaw);
        if (abs(s) < 0.01) {
            ctx.lineWidth = 1;
            ctx.moveTo(0, -radius);
            ctx.lineTo(0, radius);
        }
        else {
            ctx.lineWidth = 4;
            ctx.scale(s, 1);
            ctx.arc(0, 0, radius, -PI / 2, PI / 2, true);
        }
        ctx.stroke();
        ctx.restore();
        ctx.beginPath();
        ctx.strokeStyle = '#F00';
        ctx.lineWidth = 2;
        ctx.arc(0, 0, 10, 0, 2 * PI, false);
        ctx.stroke();
    }
    //****************************************************************************************
    //*** Function:  IMU Cage Zero                                                         ***
    //****************************************************************************************
    function zero() {
        error = [0, 0, 0];
        imu_angle = [0, 0, 0];
        euler = [0, 0, 0];
        pimu = [0, 0, 0];
        omega = [0, 0, 0];
        velocity = [0, 0, 0];
        pipa = [0, 0, 0];
        gimbalLock = false;
        sum = 1.0;
        move_fdai_marker();
    }
    //********************************************************************************************
    //*** Function: Transform angular deltas in Body Axes into Stable Member angular deltas    ***
    //********************************************************************************************
    function rotate(delta) {
        // based on Transform_BodyAxes_StableMember {dp dq dr}  
        var MPI = sin(imu_angle[2]);
        var MQI = cos(imu_angle[2]) * cos(imu_angle[0]);
        var MQM = sin(imu_angle[0]);
        var MRI = -cos(imu_angle[2]) * sin(imu_angle[0]);
        var MRM = cos(imu_angle[0]);
        var nenner = MRM * MQI - MRI * MQM;
        //---- Calculate Angular Change ----
        var do_b = adjust(delta[0] - (delta[1] * MRM * MPI - delta[2] * MQM * MPI) / nenner, -PI, PI);
        var di_b = adjust((delta[1] * MRM - delta[2] * MQM) / nenner, -PI, PI);
        var dm_b = adjust((delta[2] * MQI - delta[1] * MRI) / nenner, -PI, PI);
        //--- Rad to Deg and call of Gimbal Angle Modification ----
        modify_gimbal_angle([do_b, di_b, dm_b]);
    }
    //********************************************************************************************
    //*** Function: Modify PIPA Values to match simulated Speed                               ****
    //********************************************************************************************
    function accelerate(delta) {
        // based on proc modify_pipaXYZ 
        var sinOG = sin(imu_angle[0]);
        var sinIG = sin(imu_angle[1]);
        var sinMG = sin(imu_angle[2]);
        var cosOG = cos(imu_angle[0]);
        var cosIG = cos(imu_angle[1]);
        var cosMG = cos(imu_angle[2]);
        var dv = [
            cosMG * cosIG * delta[0] + (-cosOG * sinMG * cosIG + sinOG * sinIG) * delta[1] + (sinOG * sinMG * cosIG + cosOG * sinIG) * delta[2],
            sinMG * delta[0] + cosOG * cosMG * delta[1] - sinOG * cosMG * delta[2],
            -cosMG * sinIG * delta[0] + (cosOG * sinMG * sinIG + sinOG * cosIG) * delta[1] + (-sinOG * sinMG * sinIG + cosOG * cosIG) * delta[2]
        ];
        for (var axis = 0; axis < 3; axis++) {
            velocity[axis] += dv[axis];
            var counts = floor((velocity[axis] - pipa[axis] * PIPA_INCR) / PIPA_INCR);
            pipa[axis] += counts;
            /*
            for(; counts > 0; counts--){
                sendPort(0x9F+axis, PINC, 0xFFFF);          // 0x9F = 0237 = 0200 + 037
            }
            for(; counts < 0; counts++){
                sendPort(0x9F+axis, MINC, 0xFFFF);
            }
            */
            var p = peek(31 + axis); // read PIPA counter (31 = 0x37 = PIPAX)
            p = p & 0x4000 ? -(p ^ 0x7FFF) : p; // converts from ones-complement to twos-complement                
            p += counts; // adds the number of pulses                 
            poke(31 + axis, p < 0 ? (-p) ^ 0x7FFF : p);
        }
    }
    return {
        gyro_coarse_align: gyro_coarse_align,
        gyro_fine_align: gyro_fine_align,
        update: move_fdai_marker,
        zero: zero,
        rotate: rotate,
        accelerate: accelerate,
        angle: function (axis) { return imu_angle[axis]; },
        vel: function (axis) { return velocity[axis]; },
        speed: function () { return sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1] + velocity[2] * velocity[2]); }
    };
})(); // imu
$('.key').click(function (event) {
    sendPort(13, parseInt(event.target.name), 0x7FFF); // sends the key to the input channel 13 = 015
});
$('#pro').click(function (event) {
    //sendPort(282, 0x2000);  // 282 = 0432   note that octal literals are not supported in the strict mode
    sendPort(26, 0, 0x2000); // 26 = 032
    setTimeout(function () {
        //sendPort(282, 0x2000);  
        sendPort(26, 0x2000, 0x2000);
    }, 200);
});
$('#enable_ISS').click(function (event) {
    sendPort(24, 0, 0x2000);
});
var liftoff = false;
var cutoff = false;
var pitch_prog = false;
var paused = false;
var profile = false;
var phase0 = 0;
$.getJSON('https://codepen.io/ueple/pen/wvaWyMz.js', function (data) {
    profile = data;
    console.log('The launch profile is loaded!');
});
function launch(phase) {
    if (!profile) {
        window.alert('The launch profile is not loaded!');
        return;
    }
    var t = dsky.met();
    if (cutoff || t >= profile.length) {
        cutoff = true;
        liftoff = false;
        return;
    }
    imu.accelerate([
        1.08 * profile[t][2], 0, 0
    ]);
    imu.rotate([-profile[t][3] / 10 * DEG_TO_RAD, -profile[t][1] / 10 * DEG_TO_RAD, 0]);
    if (!(phase % 10)) {
        imu.update();
    }
    if (profile[t][4]) {
        var c = round(profile[t][4]);
        $('#SIC').css('background-color', c == 0 ? '#ffc200' : '#888888');
        $('#SII').css('background-color', c == 1 ? '#ffc200' : '#888888');
        $('#SIVB').css('background-color', c == 2 ? '#ffc200' : '#888888');
    }
}
/*
function launch(phase){
    if(pitch_prog){
        imu.rotate([0, 0.002, 0]);
    }
    var pitch = imu.angle(1);
    var speed = imu.speed() * Math.cos(pitch);
    var Re = 6.4e+6;
    var a = (speed*speed/Re)/9.8;

    imu.accelerate([
        1.08 * (3.0 + Math.sin(pitch)*(1-a)),
        0,
        1.08 * Math.cos(pitch)*(1-a)
    ]);
    if(!(phase % 10)){
        imu.update();
    }
}
*/
$('#launch').click(function (event) {
    if (cutoff || liftoff)
        return;
    if ($('#prog00').html() != '02') {
        window.alert('Launch is only possible in Major Mode (Prog) 02. See the "Launch checklist".');
        return;
    }
    sendPort(24, 0x0000, 0x0010);
    liftoff = true;
    dsky.liftoff();
    $('#SIC').css('background-color', '#ffc200');
});
$('#shutdown').click(function () {
    if (!liftoff)
        return;
    cutoff = true;
    liftoff = false;
    $('#SIC').css('background-color', '#888888');
    $('#SII').css('background-color', '#888888');
    $('#SIVB').css('background-color', '#888888');
});
$('#pause').click(function (event) {
    paused = !paused;
    $(event.target).html(paused ? 'Resume' : 'Pause');
});
/*
    This is the main program loop.
    It runs every 100 ms and in turn executes the agc engine.
*/
setInterval(function () {
    var i, d, chan, val;
    var mask = 0x00000F01;
    if (paused)
        return;
    //var now = Date.now();        
    var phase = dsky.tick();
    cpu_time += 0.1;
    for (i = 0; i < 10; i++) {
        advance(); // runs agc engine for 10 ms
        d = scanPort(mask); // scan for ports 8-11            
        debug(" d ports : " + d);
        while (d) {
            chan = d >> 16; // data returned by scanPort is packed as (chan<<16)+val
            val = d & 0xffff;
            switch (chan) {
                case 8:
                case 9:
                case 11:
                    dsky.process(chan, val);
                    break;
                case 10:
                    if (val & 0x0010) {
                        imu.zero();
                    }
                    break;
                case 124: // 0174
                case 125: // 0175
                case 126: // 0176
                    imu.gyro_coarse_align(chan, val);
                    break;
                case 127: // 0177
                    imu.gyro_fine_align(chan, val);
                    break;
            }
            d = scanPort(mask);
        }
    }
    //dsky.update();
    //imu.update();
    if (liftoff) {
        launch(phase);
    }
    //var then = Date.now();
    //console.log(then - now);
}, 100);
//imu.update();
//******************************************
function setHTMLFor(pId, pHtml) {
    document.getElementById(pId).innerHTML = pHtml;
}
function getIMUStatus() {
    return document.getElementById("chk_imu").checked;
}
function startIMU(flag) {
    var cum = 1;
    setLED("imu_status", flag);
    setLightActive("prog", flag);
    setLightActive("no_att", flag);
    if (flag) {
        var countDownDate = new Date().getTime();
        imu = setInterval(function () {
            var now = new Date().getTime();
            var distance = now - countDownDate;
            setrunIMU(flag);
            debug(cum++);
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setHTMLFor("st", padNumber(hours, 2) + ":"
                + padNumber(minutes, 2) + ":" + padNumber(seconds, 2));
            if (cum >= IMU_INIT_TIME) {
                setLightActive("no_att", false);
            }
            if (!isrunIMU())
                clearInterval(imu);
        }, 1000);
    }
    else {
        clearInterval(imu);
        setHTMLFor("st", "00:00:00");
    }
}
function waitSeconds(sectime) {
    var w = setInterval(function () {
        debug(padNumber(sectime--, 2));
        if (sectime < 0)
            clearInterval(w);
    }, 1000);
}
function showTimeRegister() {
    CLRKEY = false;
    imu = setInterval(function () {
        var curTime = [];
        curTime = getCurTime("TAB");
        setHTMLFor("R1", "+" + padNumber(curTime[0], 6));
        setHTMLFor("R2", "+" + padNumber(curTime[1], 6));
        setHTMLFor("R3", "+" + padNumber(curTime[2] + curTime[3], 6));
        if (CLRKEY)
            clearInterval(imu);
    }, 100);
}
function getCurTime(fmt) {
    var now = new Date().getTime();
    var hours = Math.floor((now % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((now % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((now % (1000 * 60)) / 1000);
    var millisec = (parseFloat(now / 1000).toFixed(2).slice(-3));
    switch (fmt) {
        case "TAB":
            var resu = [hours + 1, minutes, seconds, millisec];
            break;
        case "STR":
            var resu = padNumber(hours + 1, 2) + padNumber(minutes, 2) + padNumber(seconds, 2) + padNumber(millisec, 2);
            break;
        default:
            var resu = "ERROR";
    }
    return resu;
}
//*******************************************************
// ROLLING INDICATOR
//******************************************************
(function ($, undefined) {
    var methods = {
        init: function (options) {
            return this.each(function (i, el) {
                var instance = new SVGMeter($(el), options);
                $(el).data('svgmeter', instance);
            });
        },
        widget: function () {
            var instance = this.data('svgmeter');
            return instance;
        },
        paper: function () {
            var instance = this.data('svgmeter');
            return instance.paper;
        },
        value: function (value) {
            var instance = this.data('svgmeter');
            if (typeof value === undefined) {
                return instance.val();
            }
            else {
                instance.val(value);
            }
        },
        minValue: function () {
            var instance = this.data('svgmeter');
            return instance.minValue;
        },
        maxValue: function () {
            var instance = this.data('svgmeter');
            return instance.maxValue;
        },
        randomize: function () {
            return this.each(function (i, el) {
                $(el).data('svgmeter').randomize();
            });
        }
    };
    $.fn.svgMeter = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method ' + method + ' does not exist on jQuery.svgMeter');
        }
    };
    // $('#meter').val(100); // Sets the value of the svgMeter to 100
    // alert($('#meter').val()); // alerts '100'
    var _oldval = $.fn.val;
    $.fn.val = function (value) {
        if (value === undefined) {
            // return the first svgMeter's value
            var instance = this.first().data('svgmeter');
            if (instance instanceof SVGMeter) {
                return instance.val();
            }
            else {
                // else, let the original .val() kick in
                return _oldval.apply(this, arguments);
            }
        }
        else {
            // apply the value to all elements in the set
            return this.each(function (i, el) {
                var $el = $(el), instance = $el.data('svgmeter');
                if (instance instanceof SVGMeter) {
                    instance.val(value);
                }
                else {
                    _oldval.apply($el, [value]);
                }
            });
        }
    };
    /**
     * SVGMeter displays a meter-like widget, either horizontally or vertically
     *
     * @param jqObject
     * @param options
     * @constructor
     */
    function SVGMeter(jqObject, options) {
        this.init();
        $.extend(true, this, this.defaults); // First extend the new instance with the defaults
        $.extend(true, this, options || {}); // Then extend the new instance 
        this.originalOptions = options; // reserved
        this.container = jqObject.get(0);
        this.create();
        this.draw();
        if (options && options['value'] !== undefined) {
            this.val(options.value);
        }
    }
    /**
     * SVGMeter Prototype
     * @type {Object}
     */
    SVGMeter.prototype =
        {
            init: function () {
                if (!Raphael) {
                    var msg = 'Raphael JavaScript Library is required for the jQuery svgMeter plugin.';
                    return (window.console && console.warn(msg)) || alert(msg);
                }
                else if (!Raphael.type) {
                    var msg = 'Your browser does not support vector graphics.';
                    return (window.console && console.warn(msg)) || alert(msg);
                }
                else {
                    this.defaults =
                        {
                            orientation: 'horizontal',
                            width: 300,
                            height: 50,
                            value: 0,
                            minValue: 0,
                            maxValue: 100,
                            majorTicks: 10,
                            minorTicks: 5,
                            // If you do not want minorTicks, set this to zero.
                            hMargin: 10,
                            vMargin: 5,
                            vAlignment: 'bottom',
                            hAlignment: 'right',
                            fontColor: '#000000',
                            fontSize: 10,
                            stepColor: '#000000',
                            majorTicksStrokeWidth: 2,
                            majorTicksLength: 20,
                            minorTicksStrokeWidth: 1,
                            minorTicksLength: 10,
                            meterStrokeWidth: 4,
                            meterOpacity: 0.7,
                            meterColor: '#ff0000',
                            speed: 800,
                            easing: '<>'
                        };
                    this.value = this.defaults.value;
                }
                return true;
            },
            /**
             * This function creates the Raphael paper
             */
            create: function () {
                this.paper = Raphael(this.container, this.width, this.height);
            },
            /**
             * This is a triage function which draws a horizontal/vertical meter
             */
            draw: function () {
                if (this.orientation === 'horizontal') {
                    this._drawHorizontalMeter();
                }
                if (this.orientation === 'vertical') {
                    this._drawVerticalMeter();
                }
            },
            /**
             * This function is called during instantiation, and draws a horizontal meter
             * @private
             */
            _drawHorizontalMeter: function () {
                var objMajorTicksStyle = {
                    'stroke-width': this.majorTicksStrokeWidth,
                    stroke: this.stepColor
                }, objMinorTicksStyle = {
                    'stroke-width': this.minorTicksStrokeWidth,
                    stroke: this.stepColor
                }, objTextStyle = {
                    'text-anchor': 'middle',
                    'font-size': this.fontSize,
                    fill: this.fontColor
                }, objMeterStyle = {
                    fill: this.meterColor,
                    width: this.meterStrokeWidth,
                    opacity: this.meterOpacity,
                    'stroke-width': 0
                }, iBasePos = (this.vAlignment === 'bottom')
                    ? this.height - this.vMargin
                    : 0 + this.vMargin, iLeft = this.hMargin, iRight = this.width - this.hMargin, iWidth = this.width - this.hMargin * 2, objMajorTicks = this.paper.set(), // create Raphael set for major ticks
                objMinorTicks = this.paper.set(), // create Raphael set for minor ticks
                objLabels = this.paper.set(), // create Raphael set for major tick labels
                iTop = (this.vAlignment === 'bottom')
                    ? this.height - this.majorTicksLength - this.vMargin
                    : 0 + this.vMargin, iMinorTop = (this.vAlignment === 'bottom')
                    ? this.height - this.minorTicksLength - this.vMargin
                    : 0 + this.vMargin, iMinorBottom = (this.vAlignment === 'bottom')
                    ? this.height - this.vMargin
                    : this.minorTicksLength + this.vMargin, iBottom = (this.vAlignment === 'bottom')
                    ? this.height - this.vMargin
                    : this.majorTicksLength + this.vMargin, iTextPos = (this.vAlignment === 'bottom')
                    ? iTop - this.fontSize
                    : this.majorTicksLength + this.fontSize, objMajorTickPath, objMinorTickPath, objText;
                this.basePath = this.paper
                    .path('M' + iLeft + ',' + iBasePos + 'L' + iRight + ',' + iBasePos)
                    .attr(objMajorTicksStyle);
                for (var i = 0, j = this.majorTicks + 1, k = iWidth / this.majorTicks, m = iLeft, n = this.minValue, o = (this.maxValue - this.minValue) / this.majorTicks; i < j; i++, m += k, n += o) {
                    objMajorTickPath = this.paper
                        .path('M' + m + ',' + iTop + 'L' + m + ',' + iBottom)
                        .attr(objMajorTicksStyle);
                    objMajorTicks.push(objMajorTickPath);
                    objText = this.paper
                        .text(m, iTextPos, n)
                        .attr(objTextStyle);
                    objLabels.push(objText);
                    if (this.minorTicks > 0) {
                        for (var p = 0, q = this.minorTicks - 1, r = k / this.minorTicks, s = m + r; p < q && i < j - 1; p++, s += r) {
                            objMinorTickPath = this.paper
                                .path('M' + s + ',' + iMinorTop + 'L' + s + ',' + iMinorBottom)
                                .attr(objMinorTicksStyle);
                            objMinorTicks.push(objMinorTickPath);
                        }
                    }
                }
                iTop = (this.vAlignment === 'bottom')
                    ? this.vMargin
                    : 0;
                iBottom = (this.vAlignment === 'bottom')
                    ? this.height
                    : this.vMargin;
                this.meter = this.paper
                    .rect(this.hMargin - this.meterStrokeWidth / 2, iTop, this.meterStrokeWidth, this.height - this.vMargin)
                    .attr(objMeterStyle);
                this.majorTicks = objMajorTicks;
                this.minorTicks = objMinorTicks;
            },
            /**
             * This function is called during instantiation, and draws a vertical meter
             * @private
             */
            _drawVerticalMeter: function () {
                var objMajorTicksStyle = {
                    'stroke-width': this.majorTicksStrokeWidth,
                    stroke: this.stepColor
                }, objMinorTicksStyle = {
                    'stroke-width': this.minorTicksStrokeWidth,
                    stroke: this.stepColor
                }, objTextStyle = {
                    'text-anchor': (this.hAlignment === 'right')
                        ? 'end'
                        : 'start',
                    'font-size': this.fontSize,
                    fill: this.fontColor
                }, objMeterStyle = {
                    fill: this.meterColor,
                    height: this.meterStrokeWidth,
                    opacity: this.meterOpacity,
                    'stroke-width': 0
                }, iBasePos = (this.hAlignment === 'right')
                    ? this.width - this.hMargin
                    : 0 + this.hMargin, iTop = this.vMargin, iBottom = this.height - this.vMargin, iHeight = this.height - this.vMargin * 2, objMajorTicks = this.paper.set(), // create Raphael set for major ticks
                objMinorTicks = this.paper.set(), // create Raphael set for minor ticks
                objLabels = this.paper.set(), // create Raphael set for major tick labels
                iLeft = (this.hAlignment === 'right')
                    ? this.width - this.majorTicksLength - this.hMargin
                    : 0 + this.hMargin, iMinorLeft = (this.hAlignment === 'right')
                    ? this.width - this.minorTicksLength - this.hMargin
                    : 0 + this.hMargin, iMinorRight = (this.hAlignment === 'right')
                    ? this.width - this.hMargin
                    : this.minorTicksLength + this.hMargin, iRight = (this.hAlignment === 'right')
                    ? this.width - this.hMargin
                    : this.majorTicksLength + this.hMargin, iTextPos = (this.hAlignment === 'right')
                    ? iLeft
                    : this.hMargin + this.majorTicksLength, objMajorTickPath, objMinorTickPath, objText;
                this.basePath = this.paper
                    .path('M' + iBasePos + ',' + iTop + 'L' + iBasePos + ',' + iBottom)
                    .attr(objMajorTicksStyle);
                for (var i = 0, j = this.majorTicks + 1, k = iHeight / this.majorTicks, m = iTop, n = this.maxValue, o = (this.maxValue - this.minValue) / this.majorTicks; i < j; i++, m += k, n -= o) {
                    objMajorTickPath = this.paper
                        .path('M' + iLeft + ',' + m + 'L' + iRight + ',' + m)
                        .attr(objMajorTicksStyle);
                    objMajorTicks.push(objMajorTickPath);
                    objText = this.paper
                        .text(iTextPos, m, n)
                        .attr(objTextStyle);
                    objLabels.push(objText);
                    if (this.minorTicks > 0) {
                        for (var p = 0, q = this.minorTicks - 1, r = k / this.minorTicks, s = m + r; p < q && i < j - 1; p++, s += r) {
                            objMinorTickPath = this.paper
                                .path('M' + iMinorLeft + ',' + s + 'L' + iMinorRight + ',' + s)
                                .attr(objMinorTicksStyle);
                            objMinorTicks.push(objMinorTickPath);
                        }
                    }
                }
                iLeft = (this.hAlignment === 'right')
                    ? this.hMargin
                    : this.hMargin;
                iRight = (this.hAlignment === 'right')
                    ? this.width - this.hMargin
                    : this.width - this.hMargin;
                this.meter = this.paper
                    .rect(iLeft, this.height - this.vMargin - this.meterStrokeWidth / 2, iRight - iLeft, this.meterStrokeWidth)
                    .attr(objMeterStyle);
                this.majorTicks = objMajorTicks;
                this.minorTicks = objMinorTicks;
            },
            /**
             * This function sets or gets the value of the meter
             * @param value
             * @return {Number}
             */
            val: function (value) {
                var iLeft, iRight, iTop, iBottom, iWidth, iHeight, iPos, szPath;
                if (value === undefined) {
                    return this.value;
                }
                if (!$.isNumeric(value)) {
                    return false;
                }
                // make sure value is within range
                value = Math.min(value, this.maxValue);
                value = Math.max(value, this.minValue);
                this.value = value;
                if (this.orientation === 'horizontal') {
                    iLeft = this.hMargin + this.meterStrokeWidth / 2;
                    iRight = this.width - this.hMargin - this.meterStrokeWidth / 2;
                    iWidth = this.width - this.hMargin * 2;
                    iPos = ((value - this.minValue) / (this.maxValue - this.minValue) * iWidth) + this.hMargin - this.meterStrokeWidth / 2;
                    this.meter.animate({ x: iPos }, this.speed, this.easing);
                }
                else {
                    iTop = this.vMargin + this.meterStrokeWidth / 2;
                    iBottom = this.height - this.vMargin - this.meterStrokeWidth / 2;
                    iHeight = this.height - this.vMargin * 2;
                    iPos = ((value - this.minValue) / (this.maxValue - this.minValue) * iHeight) + this.vMargin - this.meterStrokeWidth / 2;
                    iPos = iBottom - iPos + this.meterStrokeWidth / 2;
                    this.meter.animate({ y: iPos }, this.speed, this.easing);
                }
            },
            /**
             * For demo purposes
             * @return {*}
             */
            randomize: function () {
                var iMin = this.minValue, iMax = this.maxValue, iRand = Math.floor(Math.random() * (iMax - iMin + 1) + iMin);
                this.val(iRand);
                return this;
            }
        }; // End SVGMeter.prototype
})(jQuery);
var demoTimer;
/*
$(document).ready(function () {
    $('#meter3A').svgMeter({
        orientation: 'vertical',
        width:       50,
        height:      250,
        minorTicks:  10,
        minValue:    -100,
        maxValue:    100
    });
});
*/
function startTAL(flag) {
    if (flag) {
        var countDownDate = new Date().getTime();
        tal = setInterval(function () {
            setrunTAL(true);
            var now = new Date().getTime();
            var distance = now - countDownDate;
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setTALClock(padNumber(minutes, 2), padNumber(seconds, 2));
            if (!isrunTAL())
                clearInterval(tal);
        }, 1000);
    }
    else {
        clearInterval(tal);
        setTALClock(0, 0);
        setrunTAL(false);
    }
}
function setTALClock(minutes, seconds) {
    setHTMLFor("talmin", padNumber(minutes, 2));
    setHTMLFor("talsec", padNumber(seconds, 2));
}
function clickOnBtn(btnId) {
    if (!isBtnActive(btnId))
        document.getElementById(btnId).classList.add("btnactive");
    else
        document.getElementById(btnId).classList.remove("btnactive");
}
function isBtnActive(idBtn) {
    var resu = document.getElementById(idBtn).classList.contains('btnactive');
    debug(resu);
    return resu;
}
//********************************************************
var bind = Function.prototype.bind, $append = bind.call(Element.prototype.appendChild, document.querySelector("terminal")), $new = bind.call(Document.prototype.createElement, document), $text = bind.call(Document.prototype.createTextNode, document), $rnd = function () {
    return (Math.random() * 100 + 0) | 0;
}, $promise = function (thenFn) {
    var args, promise, wait, slice = Array.prototype.slice, isResolved = false;
    var promise = {
        wait: function (ms) {
            wait = ms;
            return promise;
        },
        then: function () {
            args = slice.call(arguments);
            return promise = $promise(thenFn);
        },
        clear: function () {
        },
        resolve: function () {
            isResolved = true;
            if (args) {
                var next = Function.prototype.bind.apply(thenFn, [undefined].concat(args).concat([promise]));
                wait ? setTimeout(next, wait) : next();
            }
        }
    };
    return promise;
};
var process = function (target, chars, promise) {
    var first = chars[0], rest = chars.slice(1);
    if (!first) {
        promise.resolve();
        return;
    }
    target.appendChild(first);
    setTimeout(process.bind(undefined, target, rest, promise), $rnd());
};
function cls() {
    var tty = document.querySelector("terminal");
    tty.innerHTML = "";
}
var type = function (text, promise) {
    var chars = text.split("").map($text);
    promise = promise || $promise(type);
    $append($new("br"));
    process($append($new("q")), chars, promise);
    return promise;
};
/*
type("Loading initialization sequence..")
  .wait(1500)
  .then("Checking datas........OK")
  .then("Datas loaded")
  .wait(1500)
  .then("Running script [1]")
  .then(".....................OK")
  .then("IMU CHECK")
  .then("ST  CHECK")
  .then("RCS CHECK")
  .then("MET CHECK")
  .then("OGA CHECK")
  .then("IGA CHECK")
  .then("MGA CHECK")
  .wait(1500)
  .then("END OF SCRIPT")
  .then("")
  .then("Log out");
*/
function readCommands(comtab) {
    var jsonvalues = arrayToJson(comtab);
    cls();
    type(jsonvalues[0].ref + " " + jsonvalues[0].lib);
    var elem = document.querySelector("q");
    for (var n = 1; n <= jsonvalues.length; n++) {
        type(jsonvalues[n].ref + " " + jsonvalues[n].lib);
    }
}
function writeLine(fldVal) {
    var screen = document.getElementById('screen');
    screen.value = screen.value + "\r\n" + fldVal.trim();
}
function arrayToJson(tabId) {
    var JSONArray = new Array();
    if (tabId == 'VERBS') {
        verbs.forEach(function (element) {
            JSONArray.push(getJSONValues(element));
        });
    }
    if (tabId == 'PROGS') {
        progs.forEach(function (element) {
            JSONArray.push(getJSONValues(element));
        });
    }
    if (tabId == 'COMMANDS') {
        commands.forEach(function (element) {
            JSONArray.push(getJSONValues(element));
        });
    }
    if (tabId == 'NOUNS') {
        nouns.forEach(function (element) {
            JSONArray.push(getJSONValues(element));
        });
    }
    return JSON.parse(JSON.stringify(JSONArray));
}
function getJSONValues(element) {
    var jsonArg = new Object();
    jsonArg.ref = element.ref;
    jsonArg.lib = element.lib;
    return jsonArg;
}