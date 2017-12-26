function setState_InAir()
{
    resetInputBindings();
    startBallKick(); 

    g.state = inAir;
}

function inAir()
{
    updateWind();
    updateBall();
    updateCrowd();

    if (ballStatus != BallStatusEnum.None)
    {
        setState_KickResults();
    }
}