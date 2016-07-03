/**
 * slider.js
 * Created by Ugrend on 11/06/2016.
 */
osu = osu || {};
osu.objects = osu.objects || {};
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
            var slider_points = this.slider_data[0].split("|");
            var slider_type = slider_points[0];
            if(slider_type == osu.objects.sliders.TYPES.LINEAR){
                var draw_to_point = slider_points[1].split(':');
                final_x = this.game.calculate_x(draw_to_point[0]);

                final_y = draw_to_point[1];
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


