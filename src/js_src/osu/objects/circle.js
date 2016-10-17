/**
 * circle.js
 * Created by Ugrend on 11/06/2016.
 */


osu = osu || {};
osu.objects = osu.objects || {};
osu.objects.Circle = class Circle{
    constructor(hitObject){
        this.hitObject = hitObject;
        this.last_draw_time = 0;
        this.drawn = false;
        this.destroyed = false;
        this.hidden_time = this.hitObject.approachRate / 3.3;
        this.beenHit = false;
        this.isScoreAble = true; //just prevents the point animation from appearing
        this.radius = 0;
        this.missArray = [];

        this.hit_numbers = {
            num_0: osu.skins.resources.default_0.texture,
            num_1: osu.skins.resources.default_1.texture,
            num_2: osu.skins.resources.default_2.texture,
            num_3: osu.skins.resources.default_3.texture,
            num_4: osu.skins.resources.default_4.texture,
            num_5: osu.skins.resources.default_5.texture,
            num_6: osu.skins.resources.default_6.texture,
            num_7: osu.skins.resources.default_7.texture,
            num_8: osu.skins.resources.default_8.texture,
            num_9: osu.skins.resources.default_9.texture
        };

    }





    init(){
        this.radius = this.hitObject.size/2;
        this.circleContainer = new PIXI.Container();
        this.endCircleSprite =  new PIXI.Sprite(osu.skins.resources.hitcircle.texture);
        this.endCircleSprite.tint = this.hitObject.colour;
        this.endCircleSprite.anchor.set(0.5);
        this.endCircleSprite.height = this.hitObject.size;
        this.endCircleSprite.width = this.hitObject.size;
        this.radius = this.hitObject.size /2;

        if(!this.hitObject.game.is_hidden) {
            this.approchCircleSprite = new PIXI.Sprite(osu.skins.resources.approachcircle.texture);
            this.approchCircleSprite.tint = this.hitObject.colour;
            this.approchCircleSprite.anchor.set(0.5);
            this.approchCircleSprite.width = this.hitObject.size * 2.5;
            this.approchCircleSprite.height = this.hitObject.size * 2.5;
            this.circleContainer.addChild(this.approchCircleSprite);
        }


        this.circleOverlaySprite =  new PIXI.Sprite(osu.skins.resources.hitcicleoverlay.texture);
        this.circleOverlaySprite.height = this.hitObject.size;
        this.circleOverlaySprite.width = this.hitObject.size;
        this.circleOverlaySprite.anchor.set(0.5);
        this.circleContainer.addChild(this.endCircleSprite);
        this.circleContainer.addChild(this.circleOverlaySprite);

        var comboString = this.hitObject.combo.toString();
        this.comboNumSprites = [];
        for(var i = 0; i< comboString.length ; i++){
            this.comboNumSprites.push(new PIXI.Sprite(this.hit_numbers["num_"+comboString.charAt(i)]));
        }

        if(this.comboNumSprites.length > 1){
            this.comboSprite1 = this.comboNumSprites[0];
            this.comboSprite2 = this.comboNumSprites[1];
            this.comboSprite1.x -= this.hitObject.size/10;
            this.comboSprite2.x += this.hitObject.size/10;
            this.comboSprite1.anchor.set(0.5);
            this.comboSprite2.anchor.set(0.5);
            this.circleContainer.addChild(this.comboSprite1);
            this.circleContainer.addChild(this.comboSprite2);
        }else{
            this.comboSprite1 = this.comboNumSprites[0];
            this.comboSprite1.anchor.set(0.5);
            this.circleContainer.addChild(this.comboSprite1);
        }
        this.circleContainer.x = this.hitObject.x;
        this.circleContainer.y =  this.hitObject.y;


        this.hitSounds = osu.audio.HitSound.getHitSounds(this.hitObject.hitSounds,this.hitObject.timing)
    }

    updatePositions(){
        this.circleContainer.x =  this.hitObject.x;
        this.circleContainer.y =  this.hitObject.y;
    }


    draw(cur_time){
        if(cur_time >= (this.hitObject.hitTime)){
            this.hit(cur_time);
        }
        if(this.destroyed) {
            if (!this.beenHit && cur_time > this.hitObject.startTime + this.hitObject.hitOffset.HIT_50) {
                //never been hit
                if (this.isScoreAble) this.hitObject.ScorePoint.displayMiss();
                this.beenHit = true;
            }
            //object is no longer rendered but point sprite will be destroyed once this object is finished
            return (cur_time < this.hitObject.startTime + 1000);
        }

        if(this.drawn && this.hitObject.game.is_hidden && cur_time > this.hitObject.startTime - this.hidden_time){
            this.destroy();
            this.destroyed = true;
        }

        if(!this.destroyed && cur_time > this.hitObject.startTime + 110 ){
            this.destroy();
            this.destroyed = true;
        }

        if(!this.destroyed && cur_time < this.hitObject.startTime + this.hitObject.approachRate){
            if(!this.hitObject.game.is_hidden){
                //dont need to calculate this so often
                if(Date.now() - this.last_draw_time > 35) {
                    var time_diff = this.hitObject.startTime - cur_time;
                    var scale = 1 + (time_diff / this.hitObject.approachRate) * 2.5;
                    if (scale < 1) scale = 1;
                    this.approchCircleSprite.width = this.hitObject.size * scale;
                    this.approchCircleSprite.height = this.hitObject.size * scale;
                    this.last_draw_time = Date.now();
                }
            }
            if(!this.drawn){
                this.hitObject.game.hit_object_container.addChildAt(this.circleContainer,0);
                this.drawn = true;
            }
        }
        return true;
    }

    isInCircle(pos){

        var hitCirclePos = {
            x: this.hitObject.x,
            y: this.hitObject.y
        };
        var distance = osu.helpers.math.vectorDistance(hitCirclePos,pos);
        var result = distance <= this.radius;
        if(!result && DEBUG) this.missArray.push("DISTANCE: " + distance + "RADIUS: " +this.radius + "DIFFERENCE: " + (distance-this.radius) + "STARTIME: "+this.hitObject.startTime
            + " X: " + hitCirclePos.x + " Y: " + hitCirclePos.y);
        return result
    }

    playHitSound(){
        for(var i = 0 ; i < this.hitSounds.length ; i++){
            osu.audio.sound.play_sound(this.hitSounds[i], this.hitObject.timing.volume/100);
        }
    }

    hit(time, pos){

        if(this.beenHit) {
            return;
        }

        switch(this.hitObject.hitType){
            case 'HIT_MISS':
                if(this.isScoreAble) this.hitObject.ScorePoint.displayMiss();
                this.beenHit = true;
                break;
            case 'HIT_50':
                if (this.isScoreAble) this.hitObject.ScorePoint.display50();
                this.playHitSound();
                this.beenHit = true;
                break;
            case 'HIT_100':
                if (this.isScoreAble) this.hitObject.ScorePoint.display100();
                this.playHitSound();
                this.beenHit = true;
                break;
            case 'HIT_300':
                if (this.isScoreAble) this.hitObject.ScorePoint.display300();
                this.playHitSound();
                this.beenHit = true;
                break;
        }



/*
        var difference = this.hitObject.startTime - time;
        if(this.isInCircle(this.hitObject.game.getCursorPos())) {
            if (difference > this.hitObject.hitOffset.HIT_MISS) {
                return;
            }
            if (difference < this.hitObject.hitOffset.HIT_MISS && difference > this.hitObject.hitOffset.HIT_50) {
                //miss
                if (this.isScoreAble) this.hitObject.ScorePoint.displayMiss();
                this.beenHit = true;
            }
            if (difference < this.hitObject.hitOffset.HIT_50 && difference > this.hitObject.hitOffset.HIT_100) {
                //hit50
                if (this.isScoreAble) this.hitObject.ScorePoint.display50();
                this.playHitSound();
                this.beenHit = true;
            }
            if (difference < this.hitObject.hitOffset.HIT_100 && difference > this.hitObject.hitOffset.HIT_300) {
                //hit100
                if (this.isScoreAble) this.hitObject.ScorePoint.display100();
                this.playHitSound();
                this.beenHit = true;
            }
            if (difference < this.hitObject.hitOffset.HIT_300 && time <= this.hitObject.startTime) {
                //hit300
                if (this.isScoreAble) this.hitObject.ScorePoint.display300();
                this.playHitSound();
                this.beenHit = true;

            }
        }

        if(this.beenHit){
          //  this.destroy();
        }
        */
    }

    destroy(){
        this.hitObject.game.hit_object_container.removeChild(this.circleContainer);
    }

};
