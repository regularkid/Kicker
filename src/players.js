var playersBlue = [];
var playersRed = [];
var numPlayersPerTeam = 11;
var maxPlayerMoveTime = 1.5;
var minPlayerMoveSpeed = 10.0;
var maxPlayerMoveSpeed = 20.0;
var rushPlayerIdx = 0;
var rushTime;
var rushPlayerTime;
var blockedSfx;

function initPlayers()
{
    var playerBlueFrames = g.filmstrip("sprites/playerBlue.png", 24, 32, 0);
    var playerRedFrames = g.filmstrip("sprites/playerRed.png", 24, 32, 0);
    for (var i = 0; i < numPlayersPerTeam; i++)
    {
        playersBlue[i] = g.sprite(playerBlueFrames);
        playersBlue[i].fps = 8;

        playersRed[i] = g.sprite(playerRedFrames);
        playersRed[i].fps = 8;
    }

    blockedSfx = g.sound("sounds/blocked.wav");
}

function resetPlayers()
{
    var playerLineWidth = 23.0;
    var playerOffset = playerLineWidth / 10.0;
    for (var i = 0; i < numPlayersPerTeam; i++)
    {
        playersBlue[i].playSequence([0]);
        playersBlue[i].layer = 8;
        playersBlue[i].moveTime = Math.random() * maxPlayerMoveTime * 0.5;
        playersBlue[i].moveSpeed = minPlayerMoveSpeed + (Math.random() * (maxPlayerMoveSpeed - minPlayerMoveSpeed)) * 0.5;
        setFieldPos(playersBlue[i], (ballPos.x - playerLineWidth*0.5) + (i*playerOffset) + getRandomPlayerOffsetX(), ballPos.y + getRandomPlayerOffsetY(), 0);

        playersRed[i].playSequence([0]);
        playersRed[i].layer = 7;
        playersRed[i].moveTime = Math.random() * maxPlayerMoveTime;
        playersRed[i].moveSpeed = minPlayerMoveSpeed + (Math.random() * (maxPlayerMoveSpeed - minPlayerMoveSpeed));
        setFieldPos(playersRed[i], (ballPos.x - playerLineWidth*0.5) + (i*playerOffset) + getRandomPlayerOffsetX(), ballPos.y - 2.0 + getRandomPlayerOffsetY(), 0);
    }

    // Force outside defenders to move enough to reach outside offensive linemen
    playersRed[0].moveTime = 2.5;
    playersRed[10].moveTime = 2.5;

    playersBlue[0].moveTime = 0.0;
    setFieldPos(playersBlue[0], ballPos.x - 3.5, ballPos.y + 13.0, 0);
    playersBlue[0].xStart = playersBlue[0].x;
    playersBlue[0].yStart = playersBlue[0].y;

    setFieldPos(playersBlue[10], ballPos.x + 1.5, ballPos.y + 7.0, 0);
    playersBlue[10].moveTime = 0.0;

    rushPlayerIdx = -1;
}

function getRandomPlayerOffsetX()
{
    return -0.25 + Math.random()*0.5;
}

function getRandomPlayerOffsetY()
{
    return -0.25 + Math.random()*0.5;
}

function playPlayersAnim(animName)
{
    animSequence = [0];
    if (animName == "running")
    {
        animSequence = [1, 2];
    }

    for (var i = 0; i < numPlayersPerTeam; i++)
    {
        playersBlue[i].fps = 5 + Math.floor(Math.random() * 6);
        playersBlue[i].playSequence(animSequence);

        playersRed[i].fps = 5 + Math.floor(Math.random() * 6);
        playersRed[i].playSequence(animSequence);
    }

    playersBlue[0].playSequence([0]);
    playersBlue[10].playSequence([0]);
}

function updatePlayers()
{
    var elapsed = 1.0 / g.fps;

    for (var i = 0; i < numPlayersPerTeam; i++)
    {
        playersBlue[i].moveTime -= elapsed;
        if (playersBlue[i].moveTime > 0.0)
        {
            moveTowardsBall(playersBlue[i], playersBlue[i].moveSpeed * elapsed);
        }

        playersRed[i].moveTime -= elapsed;
        if (playersRed[i].moveTime > 0.0)
        {
            moveTowardsBall(playersRed[i], playersRed[i].moveSpeed * elapsed);
        }
    }

    if (rushPlayerIdx >= 0 && g.state != inAir)
    {
        rushPlayerTime += elapsed;

        var rushPct = rushPlayerTime / rushTime;
        var rushPlayer = playersRed[rushPlayerIdx];
        rushPlayer.x = rushPlayer.xRushStart + (ball.x - rushPlayer.xRushStart)*rushPct;
        rushPlayer.y = rushPlayer.yRushStart + (ball.y - rushPlayer.yRushStart)*rushPct;

        if (rushPlayer.y + rushPlayer.height > ball.y &&
            (rushPlayer.x + rushPlayer.width) >= ball.x &&
            (rushPlayer.x <= (ball.x + ball.width)))
        {
            ballStatus = BallStatusEnum.Blocked;
            ballVel.x = -10.0 + (Math.random() * 20.0);
            ballVel.y = 10.0;
            ballVel.z = 20.0;
            sortPlayersBelowBall();
            blockedSfx.play();

            setState_KickResults();
        }
    }
}

function moveTowardsBall(player, moveAmount)
{
    var vToBall = {x: ball.x - player.x, y: ball.y - player.y};
    var dist = Math.sqrt(vToBall.x*vToBall.x + vToBall.y*vToBall.y);
    vToBall.x /= dist;
    vToBall.y /= dist;
    player.x += vToBall.x * moveAmount;
    player.y += vToBall.y * moveAmount;
}

function sortPlayersBelowBall()
{
    for (var i = 0; i < numPlayersPerTeam; i++)
    {
        playersBlue[i].layer = 1;
        playersRed[i].layer = 0;
    }
}

function startRushPlayer()
{
    rushPlayerIdx = Math.floor(Math.random() * 10);
    playersRed[rushPlayerIdx].xRushStart = playersRed[rushPlayerIdx].x;
    playersRed[rushPlayerIdx].yRushStart = playersRed[rushPlayerIdx].y;
    rushTime = 2.0 - (getCurWeek() / 19.0)*0.45;
    if (easyMode)
    {
        rushTime += 1.0;
    }

    rushPlayerTime = 0;
}

function setKickPlayerPos(runUpPct)
{
    var runUpPlayer = playersBlue[0];
    runUpPlayer.x = runUpPlayer.xStart + (ball.x - runUpPlayer.xStart)*runUpPct;
    runUpPlayer.y = runUpPlayer.yStart + (ball.y - runUpPlayer.yStart)*runUpPct;
}

function startKickerRunUp()
{
    playersBlue[0].playSequence([1, 2]);
}