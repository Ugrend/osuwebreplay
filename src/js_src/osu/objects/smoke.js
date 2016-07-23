/**
 * smoke.js
 * Created by Ugrend on 23/07/2016.
 */


//TODO: THIS WILL MOVE ONCE SKIN SECTION IS DONE
var smokeTexture = PIXI.Texture.fromImage(osu.skins.cursor_smoke);
osu = osu || {};
osu.objects = osu.objects || {};
osu.objects.Smoke = function (x,y) {
    var sprite = new PIXI.Sprite(smokeTexture);
    sprite.position.x = x;
    sprite.position.y = y;
    sprite.anchor.set(0.5);
    sprite.destroyer = function () {
        var self = this;
        setTimeout(function () {
            self.visible = false;
        }, 3500);
    };
    sprite.destroyer();
    return sprite

};