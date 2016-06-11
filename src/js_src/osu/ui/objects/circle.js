/**
 * Created by Ugrend on 11/06/2016.
 */

    //TODO: THIS WILL MOVE ONCE SKIN SECTION IS DONE
var hit_circle_texture = PIXI.Texture.fromImage(osu.skins.hitcircle);
var hit_circle_overlay = PIXI.Texture.fromImage(osu.skins.hitcicleoverlay);

//float diameter = 108.848f - (circleSize * 8.9646f);
class Circle{
    constructor(x, y, diameter, colour) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.colour = colour;


    }


    draw(cur_time){
        this.circleSprite = this.circleSprite || new PIXI.Sprite(hit_circle_texture);
        this.circleSprite.tint = this.colour;
        this.circleOverlay = this.circleOverlay || new PIXI.Sprite(hit_circle_overlay);
        this.circleOverlay.tint = this.colour;

    }

    hit(time){

    }
}