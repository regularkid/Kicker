var numWins;
var numLosses;

function initProgression()
{
    resetProgression();
}

function resetProgression()
{
    numWins = 0;
    numLosses = 0;
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
        return "Divisional Playoffs";
    }
    else if (curWeek == 18)
    {
        return "Conference Championship";
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