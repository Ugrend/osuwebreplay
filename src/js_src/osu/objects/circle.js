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
    constructor(game,container,is_hidden, x, y, approach_rate, hit_time,diameter, colour, combo, next_object) {
        this.game = game;
        this.type = "circle";
        this.stack = 0;
        this.container = container;
        this.x = x;
        this.y = y;
        this.is_hidden = is_hidden;
        this.diameter = diameter;
        this.colour = colour;
        this.approach_rate = approach_rate;
        this.hit_time = hit_time;
        this.next_object = next_object;
        this.last_draw_time = 0;
        this.destroyed_line = false;
        if(!this.next_object) this.destroyed_line = true;
        this.drawn = false;
        this.destroyed = false;

        this.lined_drawn = false;
        this.combo = combo;
    }

    init(){

        this.x = this.game.calculate_x(this.x);
        if(this.game.is_hardrock) this.y = 384 - this.y;
        this.y = this.game.calculate_y(this.y);

        this.circleContainer = new PIXI.Container();
        this.circleSprite =  new PIXI.Sprite(hit_circle_texture);
        this.circleSprite.tint = this.colour;
        this.circleSprite.anchor.set(0.5);
        this.circleSprite.height = this.diameter;
        this.circleSprite.width = this.diameter;




        //TODO: get angle calculate distance only draw if cetain distance etc etc

        if(!this.is_hidden) {
            this.approchCircleSprite = new PIXI.Sprite(approach_circle_texture);
            this.approchCircleSprite.tint = this.colour;
            this.approchCircleSprite.anchor.set(0.5);
            this.approchCircleSprite.width = this.diameter * 3;
            this.approchCircleSprite.height = this.diameter * 3;
            this.circleContainer.addChild(this.approchCircleSprite);
        }
//TODO: correct for offsets
        if(this.next_object){
            this.followPointContainer = new PIXI.Container();
            var line = new PIXI.Graphics();
            line.moveTo(this.x,this.y);
            line.lineStyle(4,0xFFFFFF,0.5);
            line.lineTo(this.next_object.x, this.next_object.y);
            this.followPointContainer.addChild(line);
        }



        this.circleOverlaySprite =  new PIXI.Sprite(hit_circle_overlay);
        this.circleOverlaySprite.height = this.diameter;
        this.circleOverlaySprite.width = this.diameter;
        this.circleOverlaySprite.anchor.set(0.5);
        this.circleContainer.addChild(this.circleSprite);
        this.circleContainer.addChild(this.circleOverlaySprite);


        var comboString = this.combo.toString();
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


        this.circleContainer.x = this.x;
        this.circleContainer.y = this.y;

    }

    draw(cur_time){

        if(this.destroyed && this.destroyed_line){
            return false;
        }

        if(cur_time > this.hit_time - 110){
            if(this.next_object){
                if(!this.lined_drawn) {
                    this.container.addChildAt(this.followPointContainer, 0);
                    this.lined_drawn = true;
                }
            }
        }

        if(!this.destroyed && cur_time > this.hit_time + 110 ){
            this.destroy();
            this.destroyed = true;
        }

        if(!this.destroyed_line && cur_time > this.next_object.t){

            this.container.removeChild(this.followPointContainer);
            this.destroyed_line = true;
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

