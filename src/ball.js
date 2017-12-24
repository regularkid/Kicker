var ball;
var ballShadow;
var ballPos = {x: 25, y: 30, z: 0};
var ballVel = {x: 0, y: 0, z: 0};
var prevPos = {x: 0, y: 0, z: 0};
var ballGravity = -35;
var airControlValue = 0;
var airControlStartValue = 0.675;
var airConrolDecreasePct = 0.9;
var netPositionY = -7.0;
var netVelocityDamp = 0.9;
var hikeSfx;
var kickUpSfx;
var kickHitSfx;
var goodSfx;
var noGoodSfx;
var landSfx;
var boinkHitSfx;
var boinkReverbSfx;

var BallStatusEnum =
{
    None: 0,
    Good : 1,
    NoGood : 2,
    Boink : 3,
    Blocked : 4,
};
var ballStatus = BallStatusEnum.None;

function initBall()
{
    var ballFrames = g.filmstrip("sprites/ball.png", 16, 16, 0);

    ball = g.sprite(ballFrames);
    ball.fps = 10;

    ballShadow = g.sprite(ballFrames);
    ballShadow.fps = 10;

    updateBallDisplay();
    playBallAnim("idle");
    sortBallAboveUprights();

    hikeSfx = g.sound("sounds/hike.wav");
    kickUpSfx = g.sound("sounds/kickUp.wav");
    kickHitSfx = g.sound("sounds/kickHit.wav");
    goodSfx = g.sound("sounds/good.wav");
    noGoodSfx = g.sound("sounds/noGood.wav");
    landSfx = g.sound("sounds/land.wav");
    boinkHitSfx = g.sound("sounds/boinkHit.wav");
    boinkReverbSfx = g.sound("sounds/boinkReverb.wav");
    boinkReverbSfx.volume = 0.2;
}

function updateBall()
{
    updateBallPhysics();
    updateBallStatus();
    updateBallDisplay();
}

function updateBallPhysics()
{
    var elapsed = 1.0 / g.fps;

    prevPos = {x: ballPos.x, y: ballPos.y, z: ballPos.z};
    ballVel.z += ballGravity * elapsed;
    ballPos.x += ballVel.x * elapsed;
    ballPos.y += ballVel.y * elapsed;
    ballPos.z = Math.max(ballPos.z + (ballVel.z * elapsed), 0.0);

    if (hasValueDecreasedTo(ballPos.z, prevPos.z, 0.0))
    {
        ballVel = {x: 0, y: 0, z: 0};
        playBallAnim("idle");
        landSfx.play();

        if (ballStatus == BallStatusEnum.None)
        {
            ballStatus = BallStatusEnum.NoGood;
            noGoodSfx.play();
        }
    }
}

function updateBallStatus()
{
    // This is super ugly / hacky, but... oh well :)
    if (hasValueDecreasedTo(ballPos.y, prevPos.y, -5.5))
    {
        // Hit bottom support
        if (ballPos.x >= 24.5 && ballPos.x <= 25.5 && ballPos.z >= 0.0 && ballPos.z <= 12.0)
        {
            ballStatus = BallStatusEnum.Boink;
        }
        // Hit cross-bar
        else if (ballPos.x >= 21.25 && ballPos.x <= 28.75 && ballPos.z >= 8.5 && ballPos.z <= 12.0)
        {
            ballStatus = BallStatusEnum.Boink;
        }
        // Hit side uprights
        else if ((ballPos.x >= 21.25 && ballPos.x < 22.25) || (ballPos.x > 27.75 && ballPos.x <= 28.75) &&
                 (ballPos.z >= 12.0 && ballPos.z <= 30.5))
        {
            ballStatus = BallStatusEnum.Boink;
        }
        // Through the center
        else if (ballPos.x >= 22.25 && ballPos.x <= 27.75 && ballPos.z >= 12.0)
        {
            ballStatus = BallStatusEnum.Good;
        }
        else
        {
            ballStatus = BallStatusEnum.NoGood;
        }

        // Boink velocity adjustment
        if (ballStatus == BallStatusEnum.Boink)
        {
            ballVel.y = -ballVel.y * 0.3;
            ballVel.x = -10.0 + (Math.random() * 20.0);

            boinkHitSfx.play();
            boinkReverbSfx.play();
        }

        if (ballStatus == BallStatusEnum.Good)
        {
            goodSfx.play();
        }
        else
        {
            noGoodSfx.play();
        }
    }
}

function updateBallDisplay()
{
    setFieldPos(ball, ballPos.x, ballPos.y, ballPos.z);
    setFieldPos(ballShadow, ballPos.x, ballPos.y, 0);
    ballShadow.x -= 1;
    ballShadow.y += 1;

    if (hasValueDecreasedTo(ballPos.y, prevPos.y, -8.0))
    {
        sortBallBelowUprights();
    }
}

function resetBall()
{
    ballPos = {x: 21.5 + Math.random()*7.0, y: 20 + Math.random()*25, z: 0};
    ballVel = {x: 0, y: 0, z: 0};
    updateBallDisplay();

    ballStatus = BallStatusEnum.None;
}

function playBallAnim(animName)
{
    if (animName == "idle")
    {
        ball.playSequence([0]);
        ballShadow.playSequence([2]);
    }
    else if (animName == "flipping")
    {
        ball.playSequence([0, 1]);
        ballShadow.playSequence([2, 3]);
    }
}

function startBallSnap()
{
    ballVel.y = 25;
    hikeSfx.play();
}

function startBallKick()
{
    playBallAnim("flipping");
    kickUpSfx.play();
    kickHitSfx.play();

    ballVel.x = getAngleMeterValue() * 8;
    ballVel.y = -10 - (getPowerMeterValue() * 23);
    ballVel.z = 40;
    airControlValue = airControlStartValue;

    g.key.leftArrow.press = function()
    {
        ballVel.x -= airControlValue;
        airControlValue *= airConrolDecreasePct;
    };

    g.key.rightArrow.press = function()
    {
        ballVel.x += airControlValue;
        airControlValue *= airConrolDecreasePct;
    };
}

function sortBallAboveUprights()
{
    ball.layer = 6;
    ballShadow.layer = 5;
}

function sortBallBelowUprights()
{
    ball.layer = 2;
    ballShadow.layer = 1;
}