var numWins;
var numLosses;
var easyMode;

function initProgression()
{
    resetProgression();
}

function resetProgression()
{
    numWins = 0;
    numLosses = 0;
    maxKickDistance = -1;
}

function getCurWeek()
{
    return numWins + numLosses + 1;
}

function getCurWeekText()
{
    var curWeek = getCurWeek();

    if (curWeek == 17)
    {
        return "Div. Playoffs";
    }
    else if (curWeek == 18)
    {
        return "Conf. Championship";
    }
    else if (curWeek == 19)
    {
        return "Super Bowl"
    }

    return "Week " + curWeek;
}

function getCurRecordText()
{
    return numWins + " - " + numLosses;
}

function getCurDistanceText()
{
    return "Cur: " + kickDistance + " yds";
}

function getMaxDistanceText()
{
    if (maxKickDistance > 0)
    {
        return "Max: " + maxKickDistance + " yds";
    }

    return "Max: --";
}