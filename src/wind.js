var windFlags = [];
var wind = 0;
var windMax = 9;

function initWind()
{
    var windFlagFrames = g.filmstrip("sprites/windFlag.png", 4, 32, 0);
    for (var i = 0; i < 2; i++)
    {
        windFlags[i] = g.sprite(windFlagFrames);
        windFlags[i].fps = 2;
        windFlags[i].play();
        windFlags[i].layer = 4;
        windFlags[i].pivotY = 0.0;
        windFlags[i].rotation = deg2rad(10);
    }
    windFlags[0].setPosition(277, 61);
    windFlags[1].setPosition(359, 61);
}

function updateWind()
{
    var elapsed = 1.0 / g.fps;

    if (ballPos.z > 0.0)
    {
        ballVel.x += wind * elapsed;
    }
}

function randomizeWind()
{
    wind = -windMax + Math.random()*windMax*2.0;
    var pct = wind / windMax;
    windFlags[0].rotation = deg2rad(pct * -50.0);
    windFlags[1].rotation = deg2rad(pct * -50.0);
    windFlags[0].fps = 2 + Math.abs(pct)*10;
    windFlags[1].fps = 2 + Math.abs(pct)*10;
    windFlags[0].play();
    windFlags[1].play();
}