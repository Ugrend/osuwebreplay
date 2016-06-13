/**
 * Created by Ugrend on 11/06/2016.
 */

    //TODO: THIS WILL MOVE ONCE SKIN SECTION IS DONE
var hit_circle_texture = PIXI.Texture.fromImage(osu.skins.hitcircle);
var hit_circle_overlay = PIXI.Texture.fromImage(osu.skins.hitcicleoverlay);
var approach_circle_texture = PIXI.Texture.fromImage(osu.skins.approachcircle);

class Circle{
    constructor(container,is_hidden, x, y, approach_rate, hit_time,diameter, colour, combo) {
        this.container = container;
        this.x = x;
        this.y = y;
        this.is_hidden = is_hidden;
        this.diameter = diameter;
        this.colour = colour;
        this.circleContainer = new PIXI.Container();
        this.circleSprite =  new PIXI.Sprite(hit_circle_texture);
        this.circleSprite.tint = this.colour;
        this.circleSprite.anchor.set(0.5);
        this.circleSprite.height = diameter;
        this.circleSprite.width = diameter;
        this.approach_rate = approach_rate;
        this.hit_time = hit_time;
        if(!is_hidden) {
            this.approchCircleSprite = new PIXI.Sprite(approach_circle_texture);
            this.approchCircleSprite.tint = colour;
            this.approchCircleSprite.anchor.set(0.5);
            this.approchCircleSprite.width = this.diameter * 3;
            this.approchCircleSprite.height = this.diameter * 3;
            this.circleContainer.addChild(this.approchCircleSprite);
        }


        this.circleOverlaySprite =  new PIXI.Sprite(hit_circle_overlay);
        this.circleOverlaySprite.height = diameter;
        this.circleOverlaySprite.width = diameter;
        this.circleOverlaySprite.anchor.set(0.5);
        this.circleContainer.addChild(this.circleSprite);
        this.circleContainer.addChild(this.circleOverlaySprite);



        this.last_draw_time = 0;


        this.circleContainer.x = x;
        this.circleContainer.y = y;
        this.drawn = false;
        this.destroyed = false;
    }


    draw(cur_time){

        if(this.destroyed){
            return false;
        }

        if(!this.destroyed && cur_time > this.hit_time + 110 ){
            this.destroy();
            this.destroyed = true;
        }


        if(!this.destroyed && cur_time < this.hit_time + this.approach_rate){
            if(!this.is_hidden){
                //dont need to calculate this so often
                if(Date.now() - this.last_draw_time > 35) {
                    var time_diff = this.hit_time - cur_time;
                    var scale = 1 + (time_diff / this.approach_rate) * 3;
                    if (scale < 1) scale = 1;
                    this.approchCircleSprite.width = this.diameter * scale;
                    this.approchCircleSprite.height = this.diameter * scale;
                    this.last_draw_time = Date.now();
                }
            }
            if(!this.drawn){
                this.container.addChildAt(this.circleContainer,0);
                this.drawn = true;
            }
        }
        return true;
    }

    hit(time){

    }

    destroy(){
        this.container.removeChild(this.circleContainer);

    }

}

