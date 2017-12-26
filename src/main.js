var assets =
[
    "sprites/field.png",
    "sprites/uprights.png",
    "sprites/ball.png",
    "sprites/windFlag.png",
    "sprites/referee.png",
    "fonts/upheavtt.ttf",
    "sounds/hike.wav",
    "sounds/good.wav",
    "sounds/noGood.wav",
    "sounds/kickUp.wav",
    "sounds/kickHit.wav",
    "sounds/land.wav",
    "sounds/boinkHit.wav",
    "sounds/boinkReverb.wav"
];

var g = gaEngine(640, 851, onLoadComplete, assets);
g.start();

function onLoadComplete()
{
    initProgression();
    initField();
    initBall();
    initWind();
    initReferees();
    initUI();

    setState_PreSnap();
}