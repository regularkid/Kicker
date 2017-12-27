var snapTime;

function setState_Snap()
{
    startBallSnap();
    playPlayersAnim("running");
    resetInputBindings();

    // Ensure ball is snapped 7 yrds back
    snapTime = 7.0 / ballVel.y;

    g.state = snap;
}

function snap()
{
    updateBall();
    updateCrowd();
    updatePlayers();
    
    var elapsed = 1.0 / g.fps;
    snapTime -= elapsed;
    if (snapTime <= 0.0)
    {
        setState_RunUp();
    }
}