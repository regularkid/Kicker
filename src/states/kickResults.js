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
        if (getCurWeek() == 20 ||                                       // Super bowl champions
           (getCurWeek() == 17 && numWins <= numLosses) ||              // Didn't make the playoffs
           (getCurWeek() > 17 && ballStatus != BallStatusEnum.Good))    // Loss in the playoffs
        {
            setState_GameOver();
        }
        else
        {
            setState_PreSnap();
        }

        hideResultsText();
    }
}