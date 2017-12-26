var introBackground;
var introTitleText;
var introDescText = [];
var introColorFlashTime = 0.4;
var introColorFlashOn = true;

function setState_Intro()
{
    showAngleMeter(false);
    showPowerMeter(false);
    playBallAnim("idle");
    ball.y = 595;
    ball.scaleX = 10.0;
    ball.scaleY = 10.0;
    sortBallAboveUI();
    resetInputBindings();

    introBackground = g.rectangle(g.canvas.width, g.canvas.height, "#282828", "#282828", 0, 0, 0);
    introBackground.layer = 9;

    introTitleText = g.text("Kicker", "100px upheavtt", "rgb(0, 255, 0)", 320, 40);
    introTitleText.layer = 10;
    introTitleText.shadow = true;
    introTitleText.shadowColor = "rgba(0, 0, 0, 1)";
    introTitleText.shadowOffsetX = -3;
    introTitleText.shadowOffsetY = 3;
    introTitleText.shadowBlur = 0;
    introTitleText.textAlign = "center";

    introDescText[0] = g.text("Press 'up' to start", "30px upheavtt", "rgb(0, 255, 0)", 320, 755);
    introDescText[1] = g.text("Can you kick the game winning field", "30px upheavtt", "rgb(255, 255, 255)", 320, 140);
    introDescText[2] = g.text("goal? Make your way to the Super Bowl", "30px upheavtt", "rgb(255, 255, 255)", 320, 165);
    introDescText[3] = g.text("to find out if you have what it takes", "30px upheavtt", "rgb(255, 255, 255)", 320, 190);
    introDescText[4] = g.text("to be a champion.", "30px upheavtt", "rgb(255, 255, 255)", 320, 215);
    introDescText[5] = g.text("Controls", "50px upheavtt", "rgb(0, 180, 255)", 320, 310);
    introDescText[6] = g.text("Press 'up' to control angle and power", "30px upheavtt", "rgb(255, 255, 255)", 313, 360);
    introDescText[7] = g.text("Press 'left' and 'right' to nudge in air", "30px upheavtt", "rgb(255, 255, 255)", 320, 385);
    introDescText[8] = g.text("Press 's' to toggle sounds", "30px upheavtt", "rgb(255, 255, 255)", 220, 410);
    introDescText[9] = g.text("Press 'm' to toggle music", "30px upheavtt", "rgb(255, 255, 255)", 213, 435);

    for (var i = 0; i < introDescText.length; i++)
    {
        introDescText[i].layer = 10;
        introDescText[i].shadow = true;
        introDescText[i].shadowColor = "rgba(0, 0, 0, 1)";
        introDescText[i].shadowOffsetX = -3;
        introDescText[i].shadowOffsetY = 3;
        introDescText[i].shadowBlur = 0;
        introDescText[i].textAlign = "center";
    }

    g.key.upArrow.press = function()
    {
        g.remove(introBackground);
        g.remove(introTitleText);
        for (var i = 0; i < introDescText.length; i++)
        {
            g.remove(introDescText[i]);
        }

        showHUD();
        setState_PreSnap();
    }

    g.state = intro;
}

function intro()
{
    updateWind();
    updateCrowd();

    var elapsed = 1.0 / g.fps;
    introColorFlashTime -= elapsed;
    if (introColorFlashTime <= 0.0)
    {
        introColorFlashTime = 0.4;
        introColorFlashOn = !introColorFlashOn;

        if (introColorFlashOn)
        {
            introDescText[0].fillStyle = "rgb(0, 255, 0)";
        }
        else
        {
            introDescText[0].fillStyle = "rgb(0, 100, 0)";
        }
    }
}