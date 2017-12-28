function deg2rad(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function hasValueDecreasedTo(value, prevValue, crossedValue)
{
    return value <= crossedValue && prevValue > crossedValue;
}

function resetInputBindings()
{
    g.key.upArrow.press = undefined;
    g.key.leftArrow.press = undefined;
    g.key.rightArrow.press = undefined;
    g.key.r.press = undefined;
    g.key.e.press = undefined;
    g.key.h.press = undefined;
}

var soundOn = true;
function playSound(sound)
{
    if (soundOn)
    {
        sound.play();
    }
}

function toggleSound()
{
    soundOn = !soundOn;
}

var musicOn = true;
function toggleMusic()
{
    musicOn = !musicOn;
    if (musicOn)
    {
        music.play();
    }
    else
    {
        music.pause();
    }
}