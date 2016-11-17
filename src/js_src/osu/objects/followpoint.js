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

        this.drawTime = this.hitObject1.endTime  || this.hitObject1.startTime;
        this.drawTime -= this.hitObject1.approachRate/2;
        var xDiff = this.x2 - this.x1;
        var yDiff = this.y2 - this.y1;
        var angle = Math.atan2(yDiff, xDiff);
        var distance = osu.helpers.math.distance(this.x1, this.y1, this.x2, this.y2);
        var numPoints = Math.round(distance / (this.hitObject1.size/1.5));
        var steps = 1/(numPoints+1);
        var nextStep = steps;
        this.followPointContainer = new PIXI.Container();
        var arrowTexture = osu.skins.resources.followpoint.texture;
        for(var i = 0 ; i < numPoints; i++){
            var arrowSprite = new PIXI.Sprite(arrowTexture);

            arrowSprite.rotation = angle;
            arrowSprite.position.x = this.x1 + (xDiff * nextStep);
            arrowSprite.position.y = this.y1 + (yDiff * nextStep);
            this.followPointContainer.addChild(arrowSprite);
            nextStep += steps;
        }
    }

    reset(){
        this.destroyed = false;
        this.drawn = false;
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

