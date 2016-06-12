/**
 * Created by Ugrend on 11/06/2016.
 */

    //TODO: THIS WILL MOVE ONCE SKIN SECTION IS DONE
var hit_circle_texture = PIXI.Texture.fromImage(osu.skins.hitcircle);
var hit_circle_overlay = PIXI.Texture.fromImage(osu.skins.hitcicleoverlay);
var approach_circle_texture = PIXI.Texture.fromImage(osu.skins.approachcircle);

class Circle{
    constructor(container,x, y, approach_rate, time,diameter, colour, combo) {
        this.container = container;
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.colour = colour;
        this.circleContainer = new PIXI.Container();
        this.circleSprite =  new PIXI.Sprite(hit_circle_texture);
        this.circleSprite.tint = this.colour;
        this.circleSprite.anchor.set(0.5);
        this.circleSprite.height = diameter;
        this.circleSprite.width = diameter;
        this.approach_rate = approach_rate;
        this.time = time;

        this.approchCircleSprite = new PIXI.Sprite(approach_circle_texture);
        this.approchCircleSprite.tint = colour;
        this.approchCircleSprite.anchor.set(0.5);

        this.circleOverlaySprite =  new PIXI.Sprite(hit_circle_overlay);
        this.circleOverlaySprite.height = diameter;
        this.circleOverlaySprite.width = diameter;
        this.circleOverlaySprite.anchor.set(0.5);

        this.circleContainer.addChild(this.circleSprite);
        this.circleContainer.addChild(this.circleOverlaySprite);
        this.circleContainer.addChild(this.approchCircleSprite);
        this.circleContainer.x = x;
        this.circleContainer.y = y;
        this.drawn = false;
        this.destroyed = false;
    }


    draw(cur_time){
        if(cur_time < this.time + 150){
            if(!this.destroyed && !this.drawn){
                this.container.addChildAt(this.circleContainer,0);
                this.drawn = true;
            }
        }
        else{
            if(!this.destroyed){
                this.destroy();
                this.destroyed = true;
            }
        }
    }

    hit(time){

    }

    destroy(){
        this.container.removeChild(this.circleContainer);

    }

}

