var runTime;

function setState_RunUp()
{
    resetInputBindings();
    showAngleMeter(false);

    runTime = -1.0;
    g.key.upArrow.press = function()
    {
        if (runTime < 0.0)
        {
            runTime = 1.0;
            showPowerMeter(true);
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
    if (runTime > 0.0)
    {
        updatePowerMeter();

        var elapsed = 1.0 / g.fps;
        runTime -= elapsed;
        if (runTime <= 0.0)
        {
            setState_InAir();
        }
    }
}