/**
 * circle.js
 * Created by Ugrend on 11/06/2016.
 */

    //TODO: THIS WILL MOVE ONCE SKIN SECTION IS DONE
var hit_circle_texture = PIXI.Texture.fromImage(osu.skins.hitcircle);
var hit_circle_overlay = PIXI.Texture.fromImage(osu.skins.hitcicleoverlay);
var approach_circle_texture = PIXI.Texture.fromImage(osu.skins.approachcircle);
var num_0 = PIXI.Texture.fromImage(osu.skins.default_1);
var num_1 = PIXI.Texture.fromImage(osu.skins.default_1);
var num_2 = PIXI.Texture.fromImage(osu.skins.default_2);
var num_3 = PIXI.Texture.fromImage(osu.skins.default_3);
var num_4 = PIXI.Texture.fromImage(osu.skins.default_4);
var num_5 = PIXI.Texture.fromImage(osu.skins.default_5);
var num_6 = PIXI.Texture.fromImage(osu.skins.default_6);
var num_7 = PIXI.Texture.fromImage(osu.skins.default_7);
var num_8 = PIXI.Texture.fromImage(osu.skins.default_8);
var num_9 = PIXI.Texture.fromImage(osu.skins.default_9);


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


        var comboString = combo.toString();
        this.comboNumSprites = [];
        for(var i = 0; i< comboString.length ; i++){
            switch(comboString.charAt(i)){
                case "0":
                    this.comboNumSprites.push(new PIXI.Sprite(num_0));
                    break;
                case "1":
                    this.comboNumSprites.push(new PIXI.Sprite(num_1));
                    break;
                case "2":
                    this.comboNumSprites.push(new PIXI.Sprite(num_2));
                    break;
                case "3":
                    this.comboNumSprites.push(new PIXI.Sprite(num_3));
                    break;
                case "4":
                    this.comboNumSprites.push(new PIXI.Sprite(num_4));
                    break;
                case "5":
                    this.comboNumSprites.push(new PIXI.Sprite(num_5));
                    break;
                case "6":
                    this.comboNumSprites.push(new PIXI.Sprite(num_6));
                    break;
                case "7":
                    this.comboNumSprites.push(new PIXI.Sprite(num_7));
                    break;
                case "8":
                    this.comboNumSprites.push(new PIXI.Sprite(num_8));
                    break;
                case "9":
                    this.comboNumSprites.push(new PIXI.Sprite(num_9));
                    break;
            }

        }

        if(this.comboNumSprites.length > 1){
            this.comboSprite1 = this.comboNumSprites[0];
            this.comboSprite2 = this.comboNumSprites[1];
            this.comboSprite1.x -= this.diameter/10;
            this.comboSprite2.x += this.diameter/10;
            this.comboSprite1.anchor.set(0.5);
            this.comboSprite2.anchor.set(0.5);
            this.circleContainer.addChild(this.comboSprite1);
            this.circleContainer.addChild(this.comboSprite2);
        }else{
            this.comboSprite1 = this.comboNumSprites[0];
            this.comboSprite1.anchor.set(0.5);
            this.circleContainer.addChild(this.comboSprite1);
        }

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

