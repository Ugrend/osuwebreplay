/**
 *
 *
 * Created by Ugrend on 18/07/2016.
 */

//TODO: support animation

osu = osu || {};
osu.objects = osu.objects || {};
osu.objects.ScorePoint = class ScorePoint {

    constructor(x,y,game){
        this.game = game;
        this.hit300Sprite = new PIXI.Sprite(osu.skins.resources.hit300_0 && osu.skins.resources.hit300_0.texture || osu.skins.resources.hit300.texture);
        this.hit100Sprite = new PIXI.Sprite(osu.skins.resources.hit100_0 && osu.skins.resources.hit100_0.texture || osu.skins.resources.hit100.texture);
        this.hit50Sprite = new PIXI.Sprite(osu.skins.resources.hit50_0 && osu.skins.resources.hit50_0.texture || osu.skins.resources.hit50.texture);
        this.hitMissSprite = new PIXI.Sprite(osu.skins.resources.hit0_0 && osu.skins.resources.hit0_0.texture || osu.skins.resources.hit0.texture);

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
        this.game.performance.add300();
    }
    display100(){
        this.hit100Sprite.visible = true;
        this.game.performance.add100();
    }
    display50(){
        this.hit50Sprite.visible = true;
        this.game.performance.add50();
    }
    displayMiss(){
        this.hitMissSprite.visible = true;
        this.game.performance.addMiss();
    }
};