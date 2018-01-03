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
    ball.x = 310;
    ball.y = 605;
    ballShadow.x = ball.x;
    ballShadow.y = ball.y;
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

    introDescText[0] = g.text("Press 'E' to play EASY mode", "30px upheavtt", "rgb(0, 255, 0)", 320, 755);
    introDescText[1] = g.text("Press 'H' to play HARD mode", "30px upheavtt", "rgb(0, 255, 0)", 320, 785);
    introDescText[2] = g.text("Can you kick the game winning field", "30px upheavtt", "rgb(255, 255, 255)", 320, 140);
    introDescText[3] = g.text("goal? Make your way to the Super Bowl", "30px upheavtt", "rgb(255, 255, 255)", 320, 165);
    introDescText[4] = g.text("to find out if you have what it takes", "30px upheavtt", "rgb(255, 255, 255)", 320, 190);
    introDescText[5] = g.text("to be a champion.", "30px upheavtt", "rgb(255, 255, 255)", 320, 215);
    introDescText[6] = g.text("Controls", "50px upheavtt", "rgb(0, 180, 255)", 320, 310);
    introDescText[7] = g.text("Tap 'up' to stop angle meter", "30px upheavtt", "rgb(255, 255, 255)", 235, 360);
    introDescText[8] = g.text("Mash 'up' to build power meter", "30px upheavtt", "rgb(255, 255, 255)", 257, 385);
    introDescText[9] = g.text("Tap 'left' or 'right' to nudge in air", "30px upheavtt", "rgb(255, 255, 255)", 292, 410);
    introDescText[10] = g.text("Press 's' to toggle sounds", "30px upheavtt", "rgb(255, 255, 255)", 220, 435);
    introDescText[11] = g.text("Press 'm' to toggle music", "30px upheavtt", "rgb(255, 255, 255)", 213, 460);

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

    g.key.e.press = function()
    {
        easyMode = true;
        startGame();
    }

    g.key.h.press = function()
    {
        easyMode = false;
        startGame();
    }

    g.state = intro;
}

function startGame()
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
            introDescText[1].fillStyle = "rgb(0, 255, 0)";
        }
        else
        {
            introDescText[0].fillStyle = "rgb(0, 100, 0)";
            introDescText[1].fillStyle = "rgb(0, 100, 0)";
        }
    }
}