/**
 * slider.js
 * Created by Ugrend on 11/06/2016.
 */
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

    }
    init(){
        this.startCircle = new osu.objects.Circle(this.hitObject);
        this.startCircle.init();

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
        sliderGraphics.drawCircle(this.hitObject.x, this.hitObject.y, (this.hitObject.size -5 )/2);

        //endpoint (technically this is wrong but i no like math)
        var final_x = points[points.length-1].x;
        var final_y = points[points.length-1].y;
        this.hitObject.endX = final_x;
        this.hitObject.endY =final_y;
        sliderGraphics.drawCircle(final_x, final_y, (this.hitObject.size -5 )/2);
        sliderGraphics.endFill();
        this.curves = new osu.objects.Curve(this.hitObject);
        //ghetto sliders o babbby!
        sliderGraphics.lineStyle(5,0xFFFFFF);
        sliderGraphics.beginFill(0xFFFFFF);
        for(i = 0; i < this.curves.points.length; i++){
            //draw border
            var drawPoint = this.curves.points[i];
            sliderGraphics.drawCircle(drawPoint.x,drawPoint.y, (this.hitObject.size)/2);

        }
        sliderGraphics.lineStyle(5,this.hitObject.colour);
        sliderGraphics.beginFill(this.hitObject.colour);
        for(i = 0 ; i < this.curves.points.length; i++){
            //draw inside
            //TODO: masking might handle the border better so that it is not transparent
            var drawPoint = this.curves.points[i];
            sliderGraphics.drawCircle(drawPoint.x, drawPoint.y, (this.hitObject.size - 10) / 2);
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
            if(cur_time < this.hitObject.endTime + 500){
                return true;
            }
            return false;
        }
        //TODO: should this be at the slider endtime, or use start time?
        if(this.drawn && this.hitObject.game.is_hidden && cur_time > this.hitObject.endTime - this.hidden_time){
            this.destroy();
            this.destroyed = true;
        }

        if(!drawCircle){
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
osu.objects.sliders = {
    TYPES: Object.freeze({
        BEZIER: "B",
        LINEAR: "L",
        PASSTHROUGH: "P",
        CATMULL: "C"
    })



};


