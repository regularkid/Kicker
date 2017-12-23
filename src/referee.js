var referees = [];
var net;

function initReferees()
{
    var refereeFrames = g.filmstrip("sprites/referee.png", 20, 40, 0);
    for (var i = 0; i < 2; i++)
    {
        referees[i] = g.sprite(refereeFrames);
        referees[i].fps = 4;
        referees[i].layer = 3;
    }
    referees[0].setPosition(270 - referees[0].halfWidth, 150);
    referees[1].setPosition(370 - referees[1].halfWidth, 150);
}

function playRefereeAnim(animName)
{
    if (animName == "idle")
    {
        for (var i = 0; i < 2; i++)
        {
            referees[i].playSequence([0]);
        }
    }
    else if (animName == "good")
    {
        for (var i = 0; i < 2; i++)
        {
            referees[i].playSequence([1]);
        }
    }
    else if (animName == "noGood")
    {
        for (var i = 0; i < 2; i++)
        {
            referees[i].playSequence([2, 3]);
        }
    }
}