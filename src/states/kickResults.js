var kickResultsTime;

function setState_KickResults()
{
    resetInputBindings();
    showPowerMeter(false);
    showResultsText();

    if (ballStatus == BallStatusEnum.Good)
    {
        playRefereeAnim("good");
    }
    else
    {
        playRefereeAnim("noGood");
    }

    kickResultsTime = 2.0;

    g.state = kickResults;
}

function kickResults()
{
    updateWind();
    updateBall();

    var elapsed = 1.0 / g.fps;
    kickResultsTime -= elapsed;
    if (kickResultsTime <= 0.0)
    {
        hideResultsText();
        setState_PreSnap();
    }
}