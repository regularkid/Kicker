var gameOverBackground;
var gameOverTextTitle;
var gameOverTextDesc = [];
var gameOverColorFlashTime = 0.4;
var gameOverColorFlashOn = true;
var gameOverSfx;
var championsSfx;

function initGameOver()
{
    gameOverSfx = g.sound("sounds/gameOver.wav");
    championsSfx = g.sound("sounds/champions.wav");
}

function setState_GameOver()
{
    playRefereeAnim("idle");
    updateHUDRecordOnly();
    resetInputBindings();

    gameOverBackground = g.rectangle(g.canvas.width, 200, "#181818", "#181818", 0, 0, 275);
    gameOverBackground.layer = 9;

    if (getCurWeek() == 20)
    {
        gameOverTextTitle = g.text("Super Bowl Champions!", "50px upheavtt", "rgb(0, 255, 0)", 320, 285);
        g.tweenProperty(gameOverTextTitle, "x", -100, gameOverTextTitle.x, 60, "deceleration10");

        gameOverTextDesc[0] = g.text("Congratulations! You hold the Lombardi", "25px upheavtt", "rgb(255, 255, 255)", 320, 345);
        gameOverTextDesc[1] = g.text("trophy over your head as the crowd cheers!", "25px upheavtt", "rgb(255, 255, 255)", 320, 370);
        gameOverTextDesc[2] = g.text("Press 'r' to play again", "30px upheavtt", "rgb(0, 255, 0)", 320, 425);

        for (var i = 0; i < gameOverTextDesc.length; i++)
        {
            g.tweenProperty(gameOverTextDesc[i], "x", -100, gameOverTextDesc[i].x, 60, "deceleration10");
        }

        playSound(championsSfx);
    }
    else
    {
        gameOverTextTitle = g.text("Game Over!", "70px upheavtt", "rgb(255, 0, 0)", 320, 280);
        g.tweenProperty(gameOverTextTitle, "x", -100, gameOverTextTitle.x, 60, "deceleration10");

        if (getCurWeek() == 17)
        {
            gameOverTextDesc[0] = g.text("You didn't make the playoffs.", "30px upheavtt", "rgb(255, 255, 255)", 320, 345);
            gameOverTextDesc[1] = g.text("Better luck next season.", "30px upheavtt", "rgb(255, 255, 255)", 320, 370);
            gameOverTextDesc[2] = g.text("Press 'r' to play again", "30px upheavtt", "rgb(255, 0, 0)", 320, 425);
        }
        else
        {
            gameOverTextDesc[0] = g.text("You fought hard in the playoffs", "30px upheavtt", "rgb(255, 255, 255)", 320, 345);
            gameOverTextDesc[1] = g.text("but came up short. Tough break.", "30px upheavtt", "rgb(255, 255, 255)", 320, 370);
            gameOverTextDesc[2] = g.text("Press 'r' to play again", "30px upheavtt", "rgb(255, 0, 0)", 320, 425);
        }

        for (var i = 0; i < gameOverTextDesc.length; i++)
        {
            g.tweenProperty(gameOverTextDesc[i], "x", -100, gameOverTextDesc[i].x, 60, "deceleration10");
        }

        playSound(gameOverSfx);
    }

    gameOverTextTitle.layer = 10;
    gameOverTextTitle.shadow = true;
    gameOverTextTitle.shadowColor = "rgba(0, 0, 0, 1)";
    gameOverTextTitle.shadowOffsetX = -3;
    gameOverTextTitle.shadowOffsetY = 3;
    gameOverTextTitle.shadowBlur = 0;
    gameOverTextTitle.textAlign = "center";

    for (var i = 0; i < gameOverTextDesc.length; i++)
    {
        gameOverTextDesc[i].layer = 10;
        gameOverTextDesc[i].shadow = true;
        gameOverTextDesc[i].shadowColor = "rgba(0, 0, 0, 1)";
        gameOverTextDesc[i].shadowOffsetX = -3;
        gameOverTextDesc[i].shadowOffsetY = 3;
        gameOverTextDesc[i].shadowBlur = 0;
        gameOverTextDesc[i].textAlign = "center";
    }

    g.key.r.press = function()
    {
        g.remove(gameOverBackground);
        g.remove(gameOverTextTitle);
        for (var i = 0; i < gameOverTextDesc.length; i++)
        {
            g.remove(gameOverTextDesc[i]);
        }

        resetProgression();
        setState_PreSnap();
    };

    g.state = gameOver;
}

function gameOver()
{
    updateCrowd();

    var elapsed = 1.0 / g.fps;
    gameOverColorFlashTime -= elapsed;
    if (gameOverColorFlashTime <= 0.0)
    {
        gameOverColorFlashTime = 0.4;
        gameOverColorFlashOn = !gameOverColorFlashOn;

        if (gameOverColorFlashOn)
        {
            if (getCurWeek() == 20)
            {
                gameOverTextDesc[2].fillStyle = "rgb(0, 255, 0)";
            }
            else
            {
                gameOverTextDesc[2].fillStyle = "rgb(255, 0, 0)";
            }
        }
        else
        {
            if (getCurWeek() == 20)
            {
                gameOverTextDesc[2].fillStyle = "rgb(0, 100, 0)";
            }
            else
            {
                gameOverTextDesc[2].fillStyle = "rgb(100, 0, 0)";
            }
        }
    }
}