/**
 * slider.js
 * Created by Ugrend on 11/06/2016.
 */


//TODO: this needs to be placed in skins once coded
var ballTextures = [];
for(var i = 0; i< osu.skins.sliderb.length; i++){
    ballTextures.push(PIXI.Texture.fromImage(osu.skins.sliderb[i]));
}
var sliderFollowTexture = PIXI.Texture.fromImage(osu.skins.sliderfollowcircle);

osu = osu || {};
osu.objects = osu.objects || {};
osu.objects.Slider = class Slider{
    constructor(hitObject){
        this.hitObject = hitObject;
        this.last_draw_time  =0;
        this.drawn = false;
        this.destroyed = false;
        this.initialised = false;
        /*this is just used if we need to move the slider,
        once generated the x,y coords of the slider will differ from the hitObject x,y
        storing the originals will allow to move the slider by the difference
         */
        this.originalX = this.hitObject.x;
        this.originalY = this.hitObject.y;
        this.hidden_time = this.hitObject.approachRate / 3.3;
        this.sliderDirectionBackwards = false;
        this.drawnFollow = false;
        this.totalTime = (this.hitObject.endTime - this.hitObject.startTime);
        this.timePerRepeat = this.totalTime / this.hitObject.repeatCount;
        this.nextRepeatTime = 0;

    }
    init(){
        this.nextRepeatTime = 0;
        this.sliderDirectionBackwards = false;

        this.startCircle = new osu.objects.Circle(this.hitObject);
        this.startCircle.init();
        this.drawnFollow = false;
        this.drawn = false;
        this.destroyed = false;
        this.last_draw_time  =0;

        if(this.initialised) return;

        var sliderGraphics = new PIXI.Graphics();
        var points = this.hitObject.points;
        for(var i = 0 ; i < points.length ; i++){
            points[i].x = this.hitObject.game.calculate_x(points[i].x);
            if(this.hitObject.game.is_hardrock) points[i].y = osu.helpers.constants.OSU_GAME_HEIGHT - points[i].y;
            points[i].y = this.hitObject.game.calculate_y(points[i].y);

        }
        sliderGraphics.beginFill(this.hitObject.colour);
        sliderGraphics.lineStyle(5,0xFFFFFF);
        //startpoint
       // sliderGraphics.drawCircle(this.hitObject.x, this.hitObject.y, (this.hitObject.size -5 )/2);

        //endpoint (technically this is wrong but i no like math)
        var final_x = points[points.length-1].x;
        var final_y = points[points.length-1].y;
        this.hitObject.endX = final_x;
        this.hitObject.endY =final_y;
      //  sliderGraphics.drawCircle(final_x, final_y, (this.hitObject.size -5 )/2);
        sliderGraphics.endFill();
        this.curves = new osu.objects.Curve(this.hitObject);
        //ghetto sliders o babbby!
        sliderGraphics.lineStyle(5,0xFFFFFF);
        sliderGraphics.beginFill(0xFFFFFF);
        for(i = 0; i < this.curves.points.length; i++){
            //draw border
            var drawPoint = this.curves.points[i];
            sliderGraphics.drawCircle(drawPoint.x,drawPoint.y, (this.hitObject.size)/2.15);

        }
        sliderGraphics.lineStyle(5,this.hitObject.colour);
        sliderGraphics.beginFill(this.hitObject.colour);
        for(i = 0 ; i < this.curves.points.length; i++){
            //draw inside
            //TODO: masking might handle the border better so that it is not transparent
            var drawPoint = this.curves.points[i];
            sliderGraphics.drawCircle(drawPoint.x, drawPoint.y, (this.hitObject.size * .9) / 2.15);
        }

        // convert to texture so it doesnt look ugly :D
        // Note: reason why Im not using cache instead is because my slider generation is stupid
        // and it will struggle rendering the 100s of circles even when cached as bitmap

        var t = sliderGraphics.generateTexture();
        var sprite = new PIXI.Sprite(t);
        sprite.position.x = sliderGraphics.getBounds().x;
        sprite.position.y = sliderGraphics.getBounds().y;
        sprite.alpha = 0.6;
        this.sliderGraphicsContainer = new PIXI.Container();
        this.sliderGraphicsContainer.addChild(sprite);


        //create follow circle and ball TODO: THIS
        this.sliderFollowContainer = new PIXI.Container();

        var sliderFollowSprite = new PIXI.Sprite(sliderFollowTexture);
        sliderFollowSprite.height = this.hitObject.size *2;
        sliderFollowSprite.width = this.hitObject.size *2;
        sliderFollowSprite.anchor.set(0.5);

        var sliderBall = new PIXI.extras.MovieClip(ballTextures);
        sliderBall.animationSpeed = 1.2;
        sliderBall.anchor.set(0.5);
        sliderBall.width = this.hitObject.size;
        sliderBall.height = this.hitObject.size;
        sliderBall.play();
        this.sliderFollowContainer.addChild(sliderFollowSprite);
        this.sliderFollowContainer.addChild(sliderBall);
        this.sliderFollowContainer.position.x = this.hitObject.x;
        this.sliderFollowContainer.position.y = this.hitObject.y;
        this.initialised = true;
    }

    updatePositions(){
        this.startCircle.updatePositions();

        var moveX = this.originalX - this.hitObject.x;
        var moveY = this.originalY - this.hitObject.y;
        //the container x,y may differ from the hitobject xy so we move it by the difference change.
        this.sliderGraphicsContainer.x -= moveX;
        this.sliderGraphicsContainer.y -= moveY;
        this.originalX = this.hitObject.x;
        this.originalY = this.hitObject.y;
    }
    hit(time){

    }

    draw(cur_time){
        var drawCircle = this.startCircle.draw(cur_time);
        //object is no longer rendered but still might have some logic (eg being missed, is hidden etc)
        if(this.destroyed && !drawCircle){
            if(cur_time > this.hitObject.endTime + 500){
                return false;
            }
        }
        //TODO: should this be at the slider endtime, or use start time?
        if(this.drawn && this.hitObject.game.is_hidden && cur_time > this.hitObject.startTime - this.hidden_time){
            this.destroy();
            this.destroyed = true;
        }

        if(cur_time >= this.hitObject.startTime){
            if(!this.drawnFollow){
                this.hitObject.game.hit_object_container.addChild(this.sliderFollowContainer);
            }
            if(this.hitObject.repeatCount > 0){
                //TODO: i feel like this is wrong and im overcomplicating it but im tired and this works
                var elpased_time = (cur_time-this.nextRepeatTime) - this.hitObject.startTime;

                var t = (elpased_time / this.timePerRepeat);
                if(this.sliderDirectionBackwards){
                    t = 1-t;
                }
                if(t >= 1 || t < 0){
                    this.hitObject.repeatCount -=1;
                    this.nextRepeatTime += this.timePerRepeat;
                    this.sliderDirectionBackwards = !this.sliderDirectionBackwards;
                    t = 1;
                }

                var moveTo = this.curves.get_point(t);

                this.sliderFollowContainer.position.x = moveTo.x;
                this.sliderFollowContainer.position.y = moveTo.y;
                this.sliderFollowContainer.rotation = moveTo.angle;

            }else{
                this.hitObject.game.hit_object_container.removeChild(this.sliderFollowContainer);
            }

            //animate slider ?
        }

        if(!this.drawn){
            this.hitObject.game.hit_object_container.addChildAt(this.sliderGraphicsContainer,0);
            this.drawn = true;
        }

        if(!this.destroyed && cur_time > this.hitObject.endTime + 110){
            this.destroy();
            this.destroyed = true;
        }
        return true;
    }

    destroy(){
        this.destroyed = true;
        this.hitObject.game.hit_object_container.removeChild(this.sliderGraphicsContainer);

    }



};


