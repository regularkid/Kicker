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
    "sounds/boinkReverb.wav",
    "sounds/crowd.wav",
    "sounds/gameOver.wav",
    "sounds/champions.wav",
    "sounds/ballReset.wav"
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
    initCrowd();
    initGameOver();

    g.key.m = g.keyboard(77);
    g.key.r = g.keyboard(82);
    g.key.s = g.keyboard(83);

    setState_PreSnap();
}