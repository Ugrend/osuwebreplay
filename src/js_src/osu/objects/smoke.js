/**
 * smoke.js
 * Created by Ugrend on 23/07/2016.
 */

osu = osu || {};
osu.objects = osu.objects || {};
osu.objects.Smoke = function (x,y) {
    var sprite = new PIXI.Sprite(osu.skins.resources.cursor_smoke.texture);
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