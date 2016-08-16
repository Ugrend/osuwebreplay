/**
 * spinner.js
 * Created by Ugrend on 11/06/2016.
 */

//TODO: this will be part of skins once coded

var spinner_approachcircleTexture = PIXI.Texture.fromImage(osu.skins.spinner_approachcircle);
var spinner_backgroundTexture = PIXI.Texture.fromImage(osu.skins.spinner_background);
var spinner_bottomTexture = PIXI.Texture.fromImage(osu.skins.spinner_bottom);
var spinner_circleTexture = PIXI.Texture.fromImage(osu.skins.spinner_circle);
var spinner_clearTexture = PIXI.Texture.fromImage(osu.skins.spinner_clear);
var spinner_glowTexture = PIXI.Texture.fromImage(osu.skins.spinner_glow);
var spinner_metreTexture = PIXI.Texture.fromImage(osu.skins.spinner_metre);
var spinner_middleTexture = PIXI.Texture.fromImage(osu.skins.spinner_middle);
var spinner_middle2Texture = PIXI.Texture.fromImage(osu.skins.spinner_middle2);
var spinner_osuTexture = PIXI.Texture.fromImage(osu.skins.spinner_osu);
var spinner_rpmTexture = PIXI.Texture.fromImage(osu.skins.spinner_rpm);
var spinner_spinTexture = PIXI.Texture.fromImage(osu.skins.spinner_spin);
var spinner_topTexture = PIXI.Texture.fromImage(osu.skins.spinner_top);
var spinner_warningTexture = PIXI.Texture.fromImage(osu.skins.spinner_warning);

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
    init(){
        this.drawn = false;
        this.destroyed = false;
        this.x = this.hitObject.game.getRenderWidth()/2;
        this.y = this.hitObject.game.getRenderHeight()/2;
        this.spinnerContainer = new PIXI.Container();
        var backgroundSprite = new PIXI.Sprite(spinner_backgroundTexture);
        backgroundSprite.width = this.hitObject.game.getRenderWidth();
        backgroundSprite.height =this.hitObject.game.getRenderHeight();
        this.spinnerCirle = new PIXI.Sprite(spinner_circleTexture);
        this.spinnerCirle.position.x = this.x;
        this.spinnerCirle.position.y = this.y;
        this.spinnerCirle.anchor.set(0.5);
        this.spinnerContainer.addChild(backgroundSprite);
        this.spinnerContainer.addChild(this.spinnerCirle);
        this.currentRotation
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
                    if(this.rotations[i].t >= cur_time){
                        this.currentRotation = i+1;
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
