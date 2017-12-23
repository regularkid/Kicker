var angleMeterBg;
var angleMeterFg;
var angleMeterTime = 0;
var angleMeterTimeMax = 1.0;
var powerMeterBg;
var powerMeterFg;
var powerMeterIncreaseAmount = 17;
var powerMeterDecreasePerSec = 40;
var resultsText;

function initUI()
{
    angleMeterBg = g.rectangle(200, 12, "#111111", "#FFD800", 5, (g.canvas.width / 2) - 100, 470);
    angleMeterFg = g.rectangle(12, 12, "#FFD800", "#FFD800", 5, (g.canvas.width / 2) - 6, 470);
    angleMeterBg.layer = 1;
    angleMeterFg.layer = 2;

    powerMeterBg = g.rectangle(12, 150, "#111111", "#00FF21", 5, 100, 100);
    powerMeterFg = g.rectangle(12, 12, "#00FF21", "#00FF21", 5, 100, 100);
    powerMeterBg.layer = 1;
    powerMeterFg.layer = 2;
}

function resetAngleMeterPos()
{
    angleMeterBg.x = (ball.x + ball.halfWidth) - 100;
    angleMeterBg.y = ball.y - 50;
    angleMeterFg.y = angleMeterBg.y;
    updateAngleMeter();

    powerMeterBg.x = ball.x + 150;
    powerMeterBg.y = ball.y - 150;
    powerMeterFg.x = powerMeterBg.x;
    powerMeterFg.y = powerMeterBg.y;
    powerMeterFg.height = 20;
    updatePowerMeter();
}

function updateAngleMeter()
{
    var elapsed = 1.0 / g.fps;

    angleMeterTime = (angleMeterTime + elapsed) % angleMeterTimeMax;
    var timePct = angleMeterTime / angleMeterTimeMax;

    var xMin = angleMeterBg.x;
    var xMax = angleMeterBg.x + 188;
    if (timePct < 0.5)
    {
        angleMeterFg.x = xMin + (xMax - xMin) * (timePct / 0.5);
    }
    else
    {
        angleMeterFg.x = xMin + (xMax - xMin) * ((1.0 - timePct) / 0.5);
    }
}

function showAngleMeter(show)
{
    angleMeterBg.visible = show;
    angleMeterFg.visible = show;
}

function getAngleMeterValue()
{
    var xCenter = angleMeterBg.x + 100;
    return ((angleMeterFg.x + 6) - xCenter) / 94.0;
}

function updatePowerMeter()
{
    elapsed = 1.0 / g.fps;

    powerMeterFg.height = Math.max(powerMeterFg.height - (powerMeterDecreasePerSec * elapsed), 0.0);
    powerMeterFg.y = (powerMeterBg.y + powerMeterBg.height) - powerMeterFg.height;
}

function increasePowerMeter()
{
    powerMeterFg.height = Math.min(powerMeterFg.height + powerMeterIncreaseAmount, powerMeterBg.height);
    powerMeterFg.y = (powerMeterBg.y + powerMeterBg.height) - powerMeterFg.height;
}

function showPowerMeter(show)
{
    powerMeterBg.visible = show;
    powerMeterFg.visible = show;
}

function getPowerMeterValue()
{
    return powerMeterFg.height / powerMeterBg.height;
}

function showResultsText()
{
    if (ballStatus == BallStatusEnum.Good)
    {
        resultsText = g.text("It's Good!", "50px upheavtt", "rgb(0, 255, 0)", 200, 187);
        g.tweenProperty(resultsText, "x", -100, resultsText.x, 60, "deceleration10");
    }
    else
    {
        resultsText = g.text("No Good!", "50px upheavtt", "red", 220, 187);
        g.tweenProperty(resultsText, "x", 640, resultsText.x, 60, "deceleration10");
    }

    resultsText.layer = 10;
    resultsText.shadow = true;
    resultsText.shadowColor = "rgba(0, 0, 0, 1)";
    resultsText.shadowOffsetX = -3;
    resultsText.shadowOffsetY = 3;
    resultsText.shadowBlur = 0;
}

function hideResultsText()
{
    g.remove(resultsText);
}