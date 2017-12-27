var angleMeterBg;
var angleMeterFg;
var angleMeterTime = 0;
var angleMeterTimeMax = 1.0;
var powerMeterBg;
var powerMeterFg;
var powerMeterIncreaseAmount = 17;
var powerMeterDecreasePerSec = 40;
var resultsText;
var curRecordText;
var curWeekText;
var curDistanceText;
var maxDistanceText;

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
    angleMeterBg.y = ball.y - 70;
    angleMeterFg.y = angleMeterBg.y;
    updateAngleMeter();

    powerMeterBg.x = ball.x + 200;
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
        resultsText = g.text("It's Good!", "70px upheavtt", "rgb(0, 255, 0)", 320, 200);
        g.tweenProperty(resultsText, "x", -100, resultsText.x, 60, "deceleration10");
    }
    else
    {
        if (ballStatus == BallStatusEnum.Blocked)
        {
            resultsText = g.text("Blocked!", "70px upheavtt", "red", 320, 200);
        }
        else
        {
            resultsText = g.text("No Good!", "70px upheavtt", "red", 320, 200);
        }
        g.tweenProperty(resultsText, "x", 640, resultsText.x, 60, "deceleration10");
    }

    resultsText.layer = 10;
    resultsText.shadow = true;
    resultsText.shadowColor = "rgba(0, 0, 0, 1)";
    resultsText.shadowOffsetX = -3;
    resultsText.shadowOffsetY = 3;
    resultsText.shadowBlur = 0;
    resultsText.textAlign = "center";
}

function hideResultsText()
{
    g.remove(resultsText);
}

function showHUD()
{
    curWeekText = g.text(getCurWeekText(), "35px upheavtt", "rgb(255, 255, 255)", 10, 5);
    curWeekText.layer = 10;
    curWeekText.shadow = true;
    curWeekText.shadowColor = "rgba(0, 0, 0, 1)";
    curWeekText.shadowOffsetX = -3;
    curWeekText.shadowOffsetY = 3;
    curWeekText.shadowBlur = 0;

    curRecordText = g.text(getCurRecordText(), "35px upheavtt", "rgb(255, 255, 255)", 10, 32);
    curRecordText.layer = 10;
    curRecordText.shadow = true;
    curRecordText.shadowColor = "rgba(0, 0, 0, 1)";
    curRecordText.shadowOffsetX = -3;
    curRecordText.shadowOffsetY = 3;
    curRecordText.shadowBlur = 0;

    curDistanceText = g.text(getCurDistanceText(), "35px upheavtt", "rgb(255, 255, 255)", 630, 5);
    curDistanceText.layer = 10;
    curDistanceText.shadow = true;
    curDistanceText.shadowColor = "rgba(0, 0, 0, 1)";
    curDistanceText.shadowOffsetX = -3;
    curDistanceText.shadowOffsetY = 3;
    curDistanceText.shadowBlur = 0;
    curDistanceText.textAlign = "right";

    maxDistanceText = g.text(getMaxDistanceText(), "35px upheavtt", "rgb(255, 255, 255)", 630, 32);
    maxDistanceText.layer = 10;
    maxDistanceText.shadow = true;
    maxDistanceText.shadowColor = "rgba(0, 0, 0, 1)";
    maxDistanceText.shadowOffsetX = -3;
    maxDistanceText.shadowOffsetY = 3;
    maxDistanceText.shadowBlur = 0;
    maxDistanceText.textAlign = "right";
}

function updateHUD()
{
    curWeekText.content = getCurWeekText();
    curRecordText.content = getCurRecordText();
    curDistanceText.content = getCurDistanceText();
    maxDistanceText.content = getMaxDistanceText();
}

function updateHUDRecordOnly()
{
    curRecordText.content = getCurRecordText();
}