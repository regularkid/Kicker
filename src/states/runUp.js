var runTime;

function setState_RunUp()
{
    resetInputBindings();
    showAngleMeter(false);
    startRushPlayer();

    runTime = -1.0;
    g.key.upArrow.press = function()
    {
        if (runTime < 0.0)
        {
            runTime = 1.0;
            showPowerMeter(true);
            startKickerRunUp();
        }
        else
        {
            increasePowerMeter();
        }
    };

    g.state = runUp;
}

function runUp()
{
    updateCrowd();
    updatePlayers();
    
    if (runTime > 0.0)
    {
        updatePowerMeter();
        setKickPlayerPos(1.0 - runTime);

        var elapsed = 1.0 / g.fps;
        runTime -= elapsed;
        if (runTime <= 0.0)
        {
            setState_InAir();
        }
    }
}