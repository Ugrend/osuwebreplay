/**
 * slider.js
 * Created by Ugrend on 11/06/2016.
 */



osu = osu || {};
osu.objects = osu.objects || {};
osu.objects.Slider = class Slider{
    constructor(hitObject){
        //TODO: fix sliderFollowTexture
        //Should do this better however we only really need to load these once, it would be inefficient to load the textures over and over for every slider
        if(!osu.objects.ballTextures){
            osu.objects.ballTextures = [];
            if(osu.skins.resources.sliderb0){
                for(var i = 0; i < 99; i++){
                    if(osu.skins.resources["sliderb"+i]){
                        osu.objects.ballTextures.push(osu.skins.resources["sliderb"+i].texture);
                    }else{
                        break;
                    }
                }
            }
        }


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
        this.followDestroyed = false;
        this.totalTime = (this.hitObject.endTime - this.hitObject.startTime);
        this.timePerRepeat = this.totalTime / this.hitObject.repeatCount;
        this.nextRepeatTime = 0;
        this.hitSounds = [];
        this.repeatCount = this.hitObject.repeatCount;
        var points = this.hitObject.points;
        //for replay calcs
        if(this.hitObject.game.is_hardrock){
            for(var i = 0 ; i < points.length ; i++){
                points[i].y = osu.helpers.constants.OSU_GAME_HEIGHT - points[i].y;
            }
        }
        this.curves = new osu.objects.Curve(this.hitObject);
        this.ticks = [];
        this.tickPositions = [];
        var  tickLengthDiv = this.hitObject.timing.millisecondsPerBeat / this.hitObject.game.sliderMultiplier / this.hitObject.game.sliderTickRate;
        var sliderDuration = this.hitObject.duration / this.hitObject.repeatCount; //We only need to place the points once
        var  tickCount =  Math.ceil(sliderDuration / tickLengthDiv) - 1;
        if (tickCount > 0) {
            var tickTOffset = 1 / (tickCount + 1);
            var  t = tickTOffset;
            for (i = 0; i < tickCount; i++, t += tickTOffset){
                this.ticks.push(t)
            }
            for (i = 0; i < this.ticks.length; i++) {
                var tickLoc = this.curves.get_point(this.ticks[i]);
                this.tickPositions.push(tickLoc);
            }

        }
        this.scoreBreak = false; //if the slider has been exited early

    }

    reset(){
        //Reset the object so that it can be used again
        this.beenHit = false;
        this.sliderFollowContainer.visible = true;
        this.nextRepeatTime = 0;
        this.sliderDirectionBackwards = false;
        this.repeatCount = this.hitObject.repeatCount;
        this.startCircle.reset();
        this.startCircle.isScoreAble = false;
        this.drawnFollow = false;
        this.drawn = false;
        this.destroyed = false;
        this.last_draw_time  =0;
        this.hitSounds = [];
        for(var i = 0 ; i < this.hitObject.edges.length;i++){
            this.hitSounds.push(osu.audio.HitSound.getHitSounds(this.hitObject.edges[i].sounds, this.hitObject.timing, (i==0)));
        }
        this.displayRepeatArrow();
    }


    init(){
        this.beenHit = false;
        this.nextRepeatTime = 0;
        this.sliderDirectionBackwards = false;
        this.repeatCount = this.hitObject.repeatCount;
        this.startCircle = new osu.objects.Circle(this.hitObject);
        this.startCircle.isScoreAble = false;
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
            points[i].y = this.hitObject.game.calculate_y(points[i].y);
        }
        sliderGraphics.beginFill(this.hitObject.colour);
        sliderGraphics.lineStyle(5,0xFFFFFF);
        var final_x = points[points.length-1].x;
        var final_y = points[points.length-1].y;
        this.hitObject.endX = final_x;
        this.hitObject.endY =final_y;



        sliderGraphics.endFill();
        this.curves = new osu.objects.Curve(this.hitObject);
        //ghetto sliders o babbby!
        sliderGraphics.lineStyle(5,0xFFFFFF);
        sliderGraphics.beginFill(0xFFFFFF);


        //ghetto limit circle count to improve performance;


        var lastPoint = this.curves.points[0];
        sliderGraphics.drawCircle(lastPoint.x,lastPoint.y, (this.hitObject.size)/2.15);
        var distance = osu.helpers.math.vectorDistance;
        for(var i = 1; i< this.curves.points.length; i++){
            var drawPoint = this.curves.points[i];
            if(distance(lastPoint,drawPoint) > this.hitObject.size/15){
                lastPoint = drawPoint;
                sliderGraphics.drawCircle(drawPoint.x,drawPoint.y, (this.hitObject.size)/2.15);
            }
        }
        var finalPoint = this.curves.points[this.curves.points.length-1];
        sliderGraphics.drawCircle(finalPoint.x,finalPoint.y, (this.hitObject.size)/2.15);

        sliderGraphics.lineStyle(5,this.hitObject.colour);
        sliderGraphics.beginFill(this.hitObject.colour);


        //draw inside
        //TODO: masking might handle the border better so that it is not transparent
        lastPoint = this.curves.points[0];
        sliderGraphics.drawCircle(lastPoint.x,lastPoint.y, (this.hitObject.size*.9)/2.15);
        for(var i = 1; i< this.curves.points.length; i++){
            drawPoint = this.curves.points[i];
            if(distance(lastPoint,drawPoint) > this.hitObject.size/15){
                lastPoint = drawPoint;
                sliderGraphics.drawCircle(drawPoint.x,drawPoint.y, (this.hitObject.size *.9)/2.15);
            }
        }
        finalPoint = this.curves.points[this.curves.points.length-1];
        sliderGraphics.drawCircle(finalPoint.x,finalPoint.y, (this.hitObject.size*.9)/2.15);



        var t = sliderGraphics.generateTexture();

        var sprite = new PIXI.Sprite(t);
        sprite.position.x = sliderGraphics.getBounds().x;
        sprite.position.y = sliderGraphics.getBounds().y;
        sprite.alpha = 0.6;
        sprite.cacheAsBitmap = true;
        sliderGraphics.clear();
        sliderGraphics.destroy(); //no longer need this might a well destroy it
        this.sliderGraphicsContainer = new PIXI.Container();
        this.sliderGraphicsContainer.addChild(sprite);


        //Add end circle TODO: check if theres a override skin
        this.endCircleSprite =  new PIXI.Sprite(osu.skins.resources.hitcicleoverlay.texture);
        this.endCircleSprite.anchor.set(0.5);
        this.endCircleSprite.height = this.hitObject.size;
        this.endCircleSprite.width = this.hitObject.size;
        this.endCircleSprite.position.x = final_x;
        this.endCircleSprite.position.y = final_y;

        this.sliderGraphicsContainer.addChild(this.endCircleSprite);

        this.startCircleSprite =  new PIXI.Sprite(osu.skins.resources.hitcicleoverlay.texture);
        this.startCircleSprite.anchor.set(0.5);
        this.startCircleSprite.height = this.hitObject.size;
        this.startCircleSprite.width = this.hitObject.size;
        this.startCircleSprite.position.x = this.hitObject.x;
        this.startCircleSprite.position.y = this.hitObject.y;
        this.sliderGraphicsContainer.addChild(this.startCircleSprite);

        this.arrowSliderEnd = new PIXI.Sprite(osu.skins.resources.reversearrow.texture);
        this.arrowSliderEnd.height = (this.hitObject.size *2)/5;
        this.arrowSliderEnd.width = (this.hitObject.size *2)/5;
        this.arrowSliderEnd.anchor.set(0.5);
        this.arrowSliderEnd.position.x = final_x;
        this.arrowSliderEnd.position.y = final_y;
        var angle = osu.helpers.math.angleVector(this.curves.points[this.curves.points.length -1],
            this.curves.points[this.curves.points.length-2]);
        this.arrowSliderEnd.rotation = angle;
        this.arrowSliderEnd.visible = false;

        this.arrowSliderStart = new PIXI.Sprite(osu.skins.resources.reversearrow.texture);
        this.arrowSliderStart.height = (this.hitObject.size *2) /5;
        this.arrowSliderStart.width = (this.hitObject.size *2) /5 ;
        this.arrowSliderStart.anchor.set(0.5);
        this.arrowSliderStart.position.x = this.hitObject.x;
        this.arrowSliderStart.position.y = this.hitObject.y;
        angle = osu.helpers.math.angleVector(this.curves.points[0], this.curves.points[1]);
        this.arrowSliderStart.rotation = angle;
        this.arrowSliderStart.visible = false;

        this.sliderGraphicsContainer.addChild(this.arrowSliderStart);
        this.sliderGraphicsContainer.addChild(this.arrowSliderEnd);
        this.tickPositions = [];
        for (i = 0; i < this.ticks.length; i++) {
            var tickLoc = this.curves.get_point(this.ticks[i]);
            this.tickPositions.push(tickLoc);
            var tickSprite = new PIXI.Sprite(osu.skins.resources.sliderscorepoint.texture);
            tickSprite.position.x = tickLoc.x;
            tickSprite.position.y = tickLoc.y;
            tickSprite.anchor.set(0.5);
            this.sliderGraphicsContainer.addChild(tickSprite)
        }



        this.sliderFollowContainer = new PIXI.Container();

        var sliderFollowSprite = new PIXI.Sprite(osu.skins.resources.sliderfollowcircle.texture);
        sliderFollowSprite.height = this.hitObject.size *2;
        sliderFollowSprite.width = this.hitObject.size *2;
        sliderFollowSprite.anchor.set(0.5);

        var sliderBall = new PIXI.extras.MovieClip(osu.objects.ballTextures);
        sliderBall.animationSpeed = 1.2;
        sliderBall.anchor.set(0.5);
        sliderBall.width = this.hitObject.size;
        sliderBall.height = this.hitObject.size;
        sliderBall.play();
        this.sliderFollowContainer.addChild(sliderFollowSprite);
        this.sliderFollowContainer.addChild(sliderBall);
        this.sliderFollowContainer.position.x = this.hitObject.x;
        this.sliderFollowContainer.position.y = this.hitObject.y;

        for(i = 0 ; i < this.hitObject.edges.length;i++){
            this.hitSounds.push(osu.audio.HitSound.getHitSounds(this.hitObject.edges[i].sounds, this.hitObject.timing, (i==0)));
        }

        this.displayRepeatArrow();

        this.initialised = true;
    }

    displayRepeatArrow(){
        if(this.repeatCount > 0) {
            if (this.repeatCount % 2 == 0) {
                this.arrowSliderEnd.visible = true;
                this.arrowSliderStart.visible = false;
            } else {
                this.arrowSliderEnd.visible = false;
                if (this.repeatCount != 1) {
                    this.arrowSliderStart.visible = true;
                }
            }
        }
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
        var playSound = false;
        if(time >= this.hitObject.startTime && this.hitSounds.length == this.hitObject.edges.length){
            playSound = true;
        }
        if(this.nextRepeatTime == 0){
            if(time >= this.hitObject.endTime){
                playSound = true;
            }
        }else{
            if(time >= this.nextRepeatTime + this.hitObject.startTime){
                playSound = true;
            }
        }


        if(playSound && this.hitSounds.length > 0){
            var sounds = this.hitSounds.shift();
            for(var i = 0 ; i < sounds.length ; i++){
                osu.audio.sound.play_sound(sounds[i], this.hitObject.timing.volume/100);
            }
        }



    }

    draw(cur_time){
        this.hit(cur_time);
        var drawCircle = this.startCircle.draw(cur_time);
        //object is no longer rendered but still might have some logic (eg being missed, is hidden etc)
        if(this.destroyed && !drawCircle){
            if(cur_time > this.hitObject.endTime + 500){
                if(!this.followDestroyed) {
                    //if we alt tab or get a big lag spike some reason the object is not removed so this is a workaround
                    this.sliderFollowContainer.visible = false;
                    this.hitObject.game.hit_object_container.removeChild(this.sliderFollowContainer);
                }
                return false;
            }
        }
        //TODO: should this be at the slider endtime, or use start time?
        if(this.drawn && this.hitObject.game.is_hidden && cur_time > this.hitObject.startTime - this.hidden_time){
            this.destroy();
            this.destroyed = true;
        }

        if(!this.beenHit && this.scoreBreak && this.scoreBreak > cur_time){
            this.hitObject.ScorePoint.displayMiss();
            this.beenHit = true;
        }
        if(!this.beenHit && !this.scoreBreak && cur_time > this.hitObject.endTime){
            switch(this.hitObject.hitType){
                case 'HIT_MISS':
                    this.hitObject.ScorePoint.displayMiss();
                    this.beenHit = true;
                    break;
                case 'HIT_50':
                    this.hitObject.ScorePoint.display50();
                    this.beenHit = true;
                    break;
                case 'HIT_100':
                    this.hitObject.ScorePoint.display100();
                    this.beenHit = true;
                    break;
                case 'HIT_300':
                    this.hitObject.ScorePoint.display300();
                    this.beenHit = true;
                    break;
            }

        }

        if(cur_time >= this.hitObject.startTime){
            if(!this.drawnFollow){
                this.hitObject.game.hit_object_container.addChild(this.sliderFollowContainer);
            }
            if(this.repeatCount > 0){
                //TODO: i feel like this is wrong and im overcomplicating it but im tired and this works
                //WTF SLEEPY ME
                var elapsed_time = (cur_time-this.nextRepeatTime) - this.hitObject.startTime;

                this.displayRepeatArrow();

                var t = (elapsed_time / this.timePerRepeat);
                if(this.sliderDirectionBackwards){
                    t = 1-t;
                }
                if(t >= 1 || t < 0){
                    this.repeatCount -=1;
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
                //if we alt tab or get a big lag spike some reason the object is not removed so this is a workaround
                this.sliderFollowContainer.visible = false;
                this.followDestroyed = true;
            }


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


