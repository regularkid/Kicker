var assets =
[
    "sprites/field.png",
    "sprites/uprights.png",
    "sprites/ball.png",
    "sprites/windFlag.png",
    "sprites/referee.png",
    "sprites/playerBlue.png",
    "sprites/playerRed.png",
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
    "sounds/ballReset.wav",
    "sounds/blocked.wav",
    "sounds/perihelium.mp3"
];

var g = gaEngine(640, 851, onLoadComplete, assets);
g.start();

var music = g.sound("sounds/perihelium.mp3");

function onLoadComplete()
{
    var actualCanvasWidth = 580;
    g.canvas.style.width = actualCanvasWidth + "px";
    g.canvas.style.height = (g.canvas.style.width * (g.canvas.height / g.canvas.width)) + "px";

    initProgression();
    initField();
    initBall();
    initWind();
    initReferees();
    initUI();
    initCrowd();
    initGameOver();
    initPlayers();

    g.key.m = g.keyboard(77);
    g.key.m.press = function()
    {
        toggleMusic();
    };

    g.key.s = g.keyboard(83);
    g.key.s.press = function()
    {
        toggleSound();
    };

    g.key.r = g.keyboard(82);
    g.key.e = g.keyboard(69);
    g.key.h = g.keyboard(72);

    music.loop = true;
    music.volume = 0.25;
    music.play();

    setState_Intro();
}