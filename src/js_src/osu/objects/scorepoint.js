/**
 *
 *
 * Created by Ugrend on 18/07/2016.
 */

//TODO: THIS WILL MOVE ONCE SKIN SECTION IS DONE
//TODO: support animation
var hit300Texture = PIXI.Texture.fromImage(osu.skins.hit300);
var hit100Texture = PIXI.Texture.fromImage(osu.skins.hit100);
var hit50Texture = PIXI.Texture.fromImage(osu.skins.hit50);
var hitMissTexure = PIXI.Texture.fromImage(osu.skins.hit0);

osu = osu || {};
osu.objects = osu.objects || {};
osu.objects.ScorePoint = class ScorePoint {

    constructor(x,y,size){
        this.hit300Sprite = new PIXI.Sprite(hit300Texture);
        this.hit100Sprite = new PIXI.Sprite(hit100Texture);
        this.hit50Sprite = new PIXI.Sprite(hit50Texture);
        this.hitMissSprite = new PIXI.Sprite(hitMissTexure);

        this.hit300Sprite.visible = false;
        this.hit100Sprite.visible = false;
        this.hit50Sprite.visible = false;
        this.hitMissSprite.visible = false;

        this.hitContainer = new PIXI.Container();
        this.hitContainer.addChild(this.hit300Sprite);
        this.hitContainer.addChild(this.hit100Sprite);
        this.hitContainer.addChild(this.hit50Sprite);
        this.hitContainer.addChild(this.hitMissSprite);

        this.hitContainer.position.x = x;
        this.hitContainer.position.y = y;
    }

    getContainer(){
        return this.hitContainer;
    }

    display300(){
        this.hit300Sprite.visible = true;
    }
    display100(){
        this.hit100Sprite.visible = true;
    }
    display50(){
        this.hit100Sprite.visible = true;
    }
    displayMiss(){
        this.hitMissSprite.visible = true;
    }
};