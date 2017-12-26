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
}