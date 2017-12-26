var uprights;
var net;

function initField()
{
    var field = g.sprite("sprites/field.png");
    field.layer = -3;

    uprights = g.sprite("sprites/uprights.png");
    uprights.setPosition((g.canvas.width / 2) - uprights.halfWidth, 61);
    uprights.layer = 3
}

function setFieldPos(sprite, xField, yField, zField)
{
    var xScreen = (xField / 50) * g.canvas.width;
    var yScreen = 291 + (yField * 10.2);

    var zScale = (zField / 25.0);
    var zOffset = zScale * 100.0;
    yScreen -= zOffset;

    sprite.setPosition(xScreen - sprite.halfWidth, yScreen - sprite.halfHeight);
    sprite.scaleX = 1.0 + (zScale * 0.25);
    sprite.scaleY = sprite.scaleX;
}