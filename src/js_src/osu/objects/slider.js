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

    }
    init(){
        this.startCircle = new osu.objects.Circle(this.hitObject);
        this.startCircle.init();

        var sliderGraphics = new PIXI.Graphics();
        var points = this.hitObject.points;
        sliderGraphics.beginFill(this.hitObject.colour);
        sliderGraphics.lineStyle(5,0xFFFFFF);
        //startpoint
        sliderGraphics.drawCircle(this.hitObject.x, this.hitObject.y, (this.hitObject.size -5 )/2);

        //endpoint (technically this is wrong but i no like math)
        var final_x = points[points.length-1].x;
        var final_y = points[points.length-1].y

        sliderGraphics.drawCircle(final_x, final_y, (this.hitObject.size -5 )/2);

        //ghetto sliders o baby
        if(this.hitObject.sliderType == osu.objects.sliders.TYPES.LINEAR){
            //Creates border on slider
            sliderGraphics.lineStyle(this.hitObject.size,0xFFFFFF);
            sliderGraphics.moveTo(this.hitObject.x, this.hitObject.y);
            sliderGraphics.lineTo(final_x, final_y);
            //Creates fill on slider
            sliderGraphics.lineStyle(this.hitObject.size-10, this.hitObject.colour);
            sliderGraphics.moveTo(this.hitObject.x, this.hitObject.y);
            sliderGraphics.lineTo(final_x, final_y);
        }

        //convert to texture so it doesnt look ugly :D
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
            this.container.addChildAt(this.sliderGraphicsContainer,0);
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
        this.container.removeChild(this.graphics_container);

    }



};
osu.objects.sliders = {
    Slider: class Slider{
        constructor(game,container,is_hidden, x, y, approach_rate, hit_time,diameter, colour, combo, slider_data, next_object) {
            this.type = "slider";
            this.stack = 0;
            this.diameter = diameter;
            this.container = container;
            this.hit_time = hit_time;
            this.x = x;
            this.y = y;
            this.container = container;
            this.drawn = false;
            this.game = game;
            this.slider_data = slider_data;
            this.destroyed = false;
            this.next_object = next_object;
            this.approach_rate = approach_rate;
            this.is_hidden = is_hidden;
            this.colour = colour;
            this.combo = combo;
            this.destroyed_line = false;
            if(!this.next_object) this.destroyed_line = true;
            this.lined_drawn = false;
            this.hidden_time = this.approach_rate / 3.3;
        }

        init(){
            this.startCircle = new Circle(this.game,this.container, this.is_hidden,this.x,this.y,this.approach_rate,this.hit_time,this.diameter,this.colour,this.combo);
            this.startCircle.init();
            this.x = this.game.calculate_x(this.x);
            if(this.game.is_hardrock) this.y = 384 - this.y;
            this.y = this.game.calculate_y(this.y);
            var final_x = this.x;
            var final_y = this.y;

            this.sliderGraphics = new PIXI.Graphics();
            this.sliderGraphics.beginFill(this.colour);
            this.sliderGraphics.lineStyle(5,0xFFFFFF);
            var slider_points = this.slider_data.points
            var slider_type = this.slider_data.sliderType;
            if(slider_type == osu.objects.sliders.TYPES.LINEAR){
                final_x = this.game.calculate_x(slider_points[0].x);
                final_y = slider_points[0].y;
                if(this.game.is_hardrock) final_y = 384 - final_y;
                final_y = this.game.calculate_y(final_y);
                this.sliderGraphics.drawCircle(this.x,this.y, (this.diameter-5)/2);
                this.sliderGraphics.drawCircle(final_x,final_y, (this.diameter-5)/2);

                this.sliderGraphics.lineStyle(this.diameter,0xFFFFFF);

                this.sliderGraphics.moveTo(this.x, this.y);
                this.sliderGraphics.bezierCurveTo(final_x,final_y,final_x,final_y,final_x,final_y);
                this.sliderGraphics.lineStyle(this.diameter-10, this.colour);
                this.sliderGraphics.moveTo(this.x, this.y);
                this.sliderGraphics.bezierCurveTo(final_x,final_y,final_x,final_y,final_x,final_y);

            }
            var t = this.sliderGraphics.generateTexture();
            var sprite = new PIXI.Sprite(t);
            sprite.position.x = this.sliderGraphics.getBounds().x;
            sprite.position.y = this.sliderGraphics.getBounds().y;
            sprite.alpha = 0.6;


            this.graphics_container = new PIXI.Container();
            this.graphics_container.addChild(sprite);


            //TODO: get angle calculate distance only draw if cetain distance etc etc
            if(this.next_object){
                this.followPointContainer = new PIXI.Container();
                var line = new PIXI.Graphics();
                line.moveTo(final_x,final_y);
                line.lineStyle(4,0xFFFFFF,0.5);
                //TODO: fix for offsets
                line.lineTo(this.next_object.x, this.next_object.y);
                this.followPointContainer.addChild(line);
            }
        }

        draw(cur_time){

            var draw_cicle = this.startCircle.draw(cur_time);
            if(this.destroyed && !draw_cicle && this.destroyed_line){
                return false;
            }
            if(this.drawn && this.game.is_hidden && cur_time > this.hit_time - this.hidden_time){
                this.destroy();
                this.destroyed = true;
            }

            if(cur_time > this.hit_time -110){
                if(this.next_object){
                    if(!this.lined_drawn) {
                        this.container.addChildAt(this.followPointContainer, 0);
                        this.lined_drawn = true;
                    }
                }
            }

            if(!this.destroyed_line && cur_time > this.next_object.t){
                this.container.removeChild(this.followPointContainer);
                this.destroyed_line = true;
            }

            if(!draw_cicle){
                //animate slider ?
            }
            if(!this.drawn){
                this.container.addChildAt(this.graphics_container,0);
                this.drawn = true;
            }
            if(!this.destroyed && cur_time > this.hit_time + 300){

                this.destroy();
            }
            return true;

        }
        destroy(){
            this.destroyed = true;
            this.container.removeChild(this.graphics_container);

        }


    },

    TYPES: Object.freeze({
        BEZIER: "B",
        LINEAR: "L",
    })



};


