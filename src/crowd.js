var crowd = [];
var crowdSize = 250;
var crowdUpdateSize = 50;
var crowdUpdateTimeStep = 0.025;
var curCrowdStartIndex = 0;
var curCrowdUpdateTime = 0;
var crowdMoveAmount = 2.0;
var crowdMoveSpeed = 2.0;
var flashes = [];
var flashUpdateSpeed = 0.0;

function initCrowd()
{
    var size = 5;
    var colors =
    [
        "#330000",
        "#003300",
        "#000033",
        "#333300",
        "#330033",
        "#003333",
        "#333333",
    ];

    for (var i = 0; i < crowdSize; i++)
    {
        var randColor = colors[Math.floor(Math.random() * colors.length)];
        crowd[i] = g.rectangle(size, size, randColor, randColor, 0, Math.random() * (640.0 - size), Math.random() * (120.0 - size));
        crowd[i].xOrigin = crowd[i].x;
        crowd[i].yOrigin = crowd[i].y;
        crowd[i].moveTime = Math.random() * 1.0;
        crowd[i].layer = -2;
    }

    size = 17;
    for (var i = 0; i < 20; i++)
    {
        flashes[i] = g.rectangle(size, size, "white", "white", 0, Math.random() * (640.0 - size), Math.random() * (120.0 - size));
        flashes[i].layer = -1;
        flashes[i].visible = false;
        flashes[i].flashTime = Math.random() * 1.0;
    }
}

function updateCrowd()
{
    var elapsed = 1.0 / g.fps;

    for (var i = 0; i < crowdSize; i++)
    {
        crowd[i].moveTime += elapsed;
        crowd[i].y = crowd[i].yOrigin - Math.abs(Math.sin(crowd[i].moveTime * crowdMoveSpeed)*crowdMoveAmount);
    }

    for (var i = 0; i < flashes.length; i++)
    {
        flashes[i].flashTime = (flashes[i].flashTime + elapsed*flashUpdateSpeed) % 1.0;
        flashes[i].visible = flashes[i].flashTime < 0.065 && flashUpdateSpeed > 0.0;
    }
}

function setCrowdIdle()
{
    crowdMoveSpeed = 2.0;
    crowdMoveAmount = 2.0;
    flashUpdateSpeed = 0.0;
}

function setCrowdHappy()
{
    crowdMoveSpeed = 9.0;
    crowdMoveAmount = 7.0;
    flashUpdateSpeed = 0.4;
}