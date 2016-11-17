/**
 * spinner.js
 * Created by Ugrend on 11/06/2016.
 */


osu = osu || {};
osu.objects = osu.objects || {};
osu.objects.Spinner = class Spinner{
    constructor(hitObject){
        this.hitObject = hitObject;
        this.drawn = false;
        this.destroyed = false;
        this.rotations = [];
        this.currentRotation = 0;
    }

    reset(){
        //Reset the object so that it can be used again
        this.drawn = false;
        this.destroyed = false;
        this.beenHit = false;
        this.isScoreAble = true;
        this.currentRotation = 0;
    }

    init(){
        this.drawn = false;
        this.destroyed = false;
        this.x = this.hitObject.game.getRenderWidth()/2;
        this.y = this.hitObject.game.getRenderHeight()/2;
        this.spinnerContainer = new PIXI.Container();
        var backgroundSprite = new PIXI.Sprite(osu.skins.resources.spinner_background.texture);
        backgroundSprite.width = this.hitObject.game.getRenderWidth();
        backgroundSprite.height =this.hitObject.game.getRenderHeight();
        this.spinnerCirle = new PIXI.Sprite(osu.skins.resources.spinner_circle.texture);
        this.spinnerCirle.position.x = this.x;
        this.spinnerCirle.position.y = this.y;
        this.spinnerCirle.anchor.set(0.5);
        this.spinnerContainer.addChild(backgroundSprite);
        this.spinnerContainer.addChild(this.spinnerCirle);
    }
    draw(cur_time){
        if(!this.drawn){
            if(cur_time > this.hitObject.startTime){
                this.hitObject.game.hit_object_container.addChild(this.spinnerContainer);
                this.drawn = true;
            }
        }
        if(!this.destroyed){
            if(this.rotations.length === 0){
                this.spinnerCirle.rotation -= 0.1;
            }else{
                for(var i = this.currentRotation; i<this.rotations.length; i++){
                    if(this.rotations[i].t <= cur_time){
                        this.currentRotation = i;
                        this.spinnerCirle.rotation = this.rotations[i].a;
                    }else{
                        break;
                    }
                }

            }

            if(cur_time > this.hitObject.endTime){
                this.destroy();
                this.destroyed = true;
            }
        }

        return !this.destroyed;

    }
    destroy(){
        this.hitObject.game.hit_object_container.removeChild(this.spinnerContainer);
    }

};
