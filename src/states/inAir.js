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

    if (ballStatus != BallStatusEnum.None)
    {
        setState_KickResults();
    }
}