/**
 * Created by Ugrend on 5/06/2016.
 */


/*

Main Game Window

 x ranges from 0 to 512 (inclusive) and y ranges from 0 to 384 (inclusive).


4:3 aspect ratio
 */


var osu = osu || {};
osu.ui = osu.ui || {};
osu.ui.interface = osu.ui.interface || {};
osu.ui.interface.osugame = {


    master_container: new PIXI.Container(),
    replay_data: [],


    getRenderWidth: function(){
        return osu.ui.renderer.renderWidth;
    },

    getRenderHeight: function(){
        return osu.ui.renderer.renderHeight;
    },

    create_background: function(){
        var background = PIXI.Texture.fromImage(this.background);
        var background_sprite = new PIXI.Sprite(background);
        background_sprite.width = this.getRenderWidth();
        background_sprite.height = this.getRenderHeight();

        var background_dimmer = new PIXI.Graphics();
        background_dimmer.beginFill(0x0, 0.5);
        background_dimmer.drawRect(0, 0, this.getRenderWidth(), this.getRenderHeight());
        this.master_container.addChild(background_sprite);
        this.master_container.addChild(background_dimmer);


    },

    create_cursor: function () {
        this.cursor = new PIXI.Container();
        var cursor_texture = PIXI.Texture.fromImage(osu.skins.cursor);
        var cursor_middle_texture = PIXI.Texture.fromImage(osu.skins.cursormiddle);
        var cursor_sprite = new PIXI.Sprite(cursor_texture);
        var cursor_middle_sprite = new PIXI.Sprite(cursor_middle_texture);

        cursor_sprite.anchor.set(0.5);
        cursor_middle_sprite.anchor.set(0.5);

        this.cursor.addChild(cursor_sprite);
        this.cursor.addChild(cursor_middle_sprite);
        this.cursor.x = this.getRenderWidth() / 2;
        this.cursor.y = this.getRenderHeight() / 2;
        this.master_container.addChild(this.cursor);
    },



    create_master_container: function () {
      this.create_cursor();
    },
    renderScreen: function(){
        osu.ui.renderer.fixed_aspect = true;
        osu.ui.renderer.start();
        this.create_master_container();
        osu.ui.renderer.clearStage();
        osu.ui.renderer.masterStage = this.master_container;
    },

    calculate_x: function(x){
        if(x == 0){
            return x;
        }
        return  (this.getRenderWidth()/512) * x;
    },
    calculate_y: function(y){
        if(y == 0){
            return y;
        }
        return  (this.getRenderHeight()/384) * y;
    },


    movecursor: function () {
        if(this.replay_data.length == 1){
            this.cursor.x = this.getRenderWidth() / 2;
            this.cursor.y = this.getRenderHeight() / 2;
        }
        var next_movment = this.replay_data.shift();
        if(next_movment.length == 4){

            if(next_movment[3] != "0" && next_movment[3] != "5" && next_movment[3] != "10" && next_movment[3] != "15"){
                console.log(next_movment);
            }
            var x =  this.calculate_x(parseFloat(next_movment[1]));
            var y = this.calculate_y(parseFloat(next_movment[2]));
            if(parseInt(next_movment[0]) < 0){
                console.log("im not sure what to do with negatives");
                this.cursor.x = x;
                this.cursor.y = y;
                console.log(osu.keypress.getKeys(next_movment[3]));
                this.movecursor();
            }
            else{
                var self = this;
                setTimeout(function(){
                    self.cursor.x = x;
                    self.cursor.y = y;
                    console.log(osu.keypress.getKeys(next_movment[3]));
                    self.movecursor();
                },parseInt(next_movment[0]));
            }
        }


    }


};