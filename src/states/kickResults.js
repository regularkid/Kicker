var kickResultsTime;

function setState_KickResults()
{
    resetInputBindings();
    showPowerMeter(false);
    showResultsText();

    if (ballStatus == BallStatusEnum.Good)
    {
        playRefereeAnim("good");
        numWins = numWins + 1;
        maxKickDistance = Math.max(kickDistance, maxKickDistance);

        setCrowdHappy();
    }
    else
    {
        playRefereeAnim("noGood");
        numLosses = numLosses + 1;
    }

    kickResultsTime = 3.0;

    g.state = kickResults;
}

function kickResults()
{
    updateWind();
    updateBall();
    updateCrowd();

    var elapsed = 1.0 / g.fps;
    kickResultsTime -= elapsed;
    if (kickResultsTime <= 0.0)
    {
        // DEBUG
        if ((getCurWeek() == 16 && numWins <= numLosses) || (getCurWeek() > 16 && ballStatus != BallStatusEnum.Good))
        {
            resetProgression();
        }

        hideResultsText();
        setState_PreSnap();
    }
}