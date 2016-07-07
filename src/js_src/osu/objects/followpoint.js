/**
 * followpoint.js
 * Created by Ugrend on 6/07/2016.
 */
osu = osu || {};
osu.objects = osu.objects || {};
osu.objects.FollowPoint = class FollowPoint{
    constructor(hitObject1, hitObject2){
        this.hitObject1 = hitObject1;
        this.hitObject2 = hitObject2;
        this.drawn = false;
        this.destroyed = false;
    }

    init(){
        this.x1 = this.hitObject1.endX || this.hitObject1.x;
        this.y1 = this.hitObject1.endY  || this.hitObject1.y;
        this.x2 = this.hitObject2.x;
        this.y2 = this.hitObject2.y;
        this.drawTime = this.hitObject1.endTime || this.hitObject1.startTime;
        this.points = osu.helpers.math.getLiniearPoints(this.x1, this.y1, this.x2, this.y2, 20);
        this.angle = osu.helpers.math.angleDeg(this.x1, this.y1, this.x2, this.y2);

        this.followPointContainer = new PIXI.Container();
        var arrowTexture =  PIXI.Texture.fromImage(osu.skins.followpoint);
        for(var i = 0 ; i < this.points.length; i++){
            var arrowSprite = new PIXI.Sprite(arrowTexture);
            arrowSprite.anchor.set(0.5);
            arrowSprite.position.x = this.points[i].x;
            arrowSprite.position.y = this.points[i].y;
            this.followPointContainer.addChild(arrowSprite);
        }
        var graphicsLine = new PIXI.Graphics();
        graphicsLine.moveTo(this.x1, this.y1);
        graphicsLine.lineStyle(3,0xFFFFFF);
        graphicsLine.lineTo(this.x2,this.y2);
        this.followPointContainer.addChild(graphicsLine);

    }

    draw(cur_time){
        if(this.destroyed){
            return false;
        }

        if(!this.drawn && cur_time >= this.drawTime){
            this.hitObject1.game.hit_object_container.addChildAt(this.followPointContainer,0);
            this.drawn = true;
            return true;
        }
        if(!this.destroyed && cur_time > this.hitObject2.startTime){
            this.destroy();
            this.destroyed = true;
        }


        return true;
    }
    destroy(){
        this.hitObject1.game.hit_object_container.removeChild(this.followPointContainer);
    }

};

