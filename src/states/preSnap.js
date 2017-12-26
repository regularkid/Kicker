function setState_PreSnap()
{
    resetBall();
    playBallAnim("idle");
    playRefereeAnim("idle");
    sortBallAboveUprights();
    randomizeWind();
    resetAngleMeterPos();
    showAngleMeter(true);
    showPowerMeter(false);
    updateHUD();
    setCrowdIdle();
    resetInputBindings();

    g.key.upArrow.press = function()
    {
        setState_Snap();
    };

    g.state = preSnap;
}

function preSnap()
{
    updateBall();
    updateAngleMeter();
    updateCrowd();
}