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
    key_1_count: 0,
    key_2_count: 0,
    key_3_count: 0,
    key_4_count: 0,
    key_1_pressed: false,
    key_2_pressed: false,
    key_3_pressed: false,
    key_4_pressed: false,
    beatmap: {},
    expected_replay_movment_time: null,
    gone_over: 0,
    has_started: false,
    audioLeadIn: 0,
    countdown_started: false,
    curr_replay_frame:0,
    mods: [],
    last_object_pos: 0,


    getRenderWidth: function(){
        return osu.ui.renderer.renderWidth;
    },

    getRenderHeight: function(){
        return osu.ui.renderer.renderHeight;
    },

    create_background: function(){
        var background = PIXI.Texture.fromImage(this.beatmap.background);
        var background_sprite = new PIXI.Sprite(background);
        background_sprite.width = this.getRenderWidth();
        background_sprite.height = this.getRenderHeight();

        this.background_dimmer = new PIXI.Graphics();
        this.background_dimmer.beginFill(0x0, 0.5);
        this.background_dimmer.drawRect(0, 0, this.getRenderWidth(), this.getRenderHeight());
        this.master_container.addChild(background_sprite);
        this.master_container.addChild(this.background_dimmer);


    },

    tint_untint_key: function(key, do_tint){
        if(do_tint) {
            key.tint = 0xFFFF00;
        }
        else{
            key.tint = 0xFFFFFF;
        }
    },


    create_key_press: function(){
        this.keypress_area = new PIXI.Container();
        var keypress_texture = PIXI.Texture.fromImage(osu.skins.inputoverlay_key);
        this.keypress_1 = new PIXI.Sprite(keypress_texture);
        this.keypress_2 = new PIXI.Sprite(keypress_texture);
        this.keypress_3 = new PIXI.Sprite(keypress_texture);
        this.keypress_4 = new PIXI.Sprite(keypress_texture);
        //TODO: Style text
        this.keypress_1_Text = new PIXI.Text(this.key_1_count > 0 && this.key_1_count.toString() || "K1");
        this.keypress_2_Text = new PIXI.Text(this.key_2_count > 0 && this.key_2_count.toString() || "K2");
        this.keypress_3_Text = new PIXI.Text(this.key_3_count > 0 && this.key_3_count.toString() || "M1");
        this.keypress_4_Text = new PIXI.Text(this.key_4_count > 0 && this.key_4_count.toString() || "M2");

        this.keypress_1.tint = 0xFFFF00;


        this.keypress_1.x = this.getRenderWidth() - 40;
        this.keypress_1.y = this.getRenderHeight() /2 - 50;
        this.keypress_1.anchor.set(0.5);
        this.keypress_1_Text.anchor.set(0.5);
        this.keypress_1_Text.x = this.keypress_1.x;
        this.keypress_1_Text.y = this.keypress_1.y;


        this.keypress_2.x = this.getRenderWidth() - 40;
        this.keypress_2.y = this.getRenderHeight() /2;
        this.keypress_2.anchor.set(0.5);
        this.keypress_2_Text.anchor.set(0.5);
        this.keypress_2_Text.x = this.keypress_2.x;
        this.keypress_2_Text.y = this.keypress_2.y;

        this.keypress_3.x = this.getRenderWidth() - 40;
        this.keypress_3.y = this.getRenderHeight() /2 + 50;
        this.keypress_3.anchor.set(0.5);
        this.keypress_3_Text.anchor.set(0.5);
        this.keypress_3_Text.x = this.keypress_3.x;
        this.keypress_3_Text.y = this.keypress_3.y;

        this.keypress_4.x = this.getRenderWidth() - 40;
        this.keypress_4.y = this.getRenderHeight() /2 + 100;
        this.keypress_4.anchor.set(0.5);
        this.keypress_4_Text.anchor.set(0.5);
        this.keypress_4_Text.x = this.keypress_4.x;
        this.keypress_4_Text.y = this.keypress_4.y;




        this.keypress_area.addChild(this.keypress_1);
        this.keypress_area.addChild(this.keypress_2);
        this.keypress_area.addChild(this.keypress_3);
        this.keypress_area.addChild(this.keypress_4);
        this.keypress_area.addChild(this.keypress_1_Text);
        this.keypress_area.addChild(this.keypress_2_Text);
        this.keypress_area.addChild(this.keypress_3_Text);
        this.keypress_area.addChild(this.keypress_4_Text);

        this.master_container.addChild(this.keypress_area);
        this.hit_objects = [];



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
        this.hit_object_container = new PIXI.Container();

        this.create_background();
        this.create_key_press();
        this.master_container.addChild(this.hit_object_container);
        this.create_cursor();

    },

    initGame: function(){
        osu.ui.renderer.fixed_aspect = true;
        osu.ui.renderer.start();
        this.create_master_container();
        osu.ui.renderer.clearStage();
        osu.ui.renderer.masterStage = this.master_container;
        this.has_started = false;
        this.countdown_started = false;
        this.curr_replay_frame = 0;
        this.expected_replay_movment_time = null;
        this.hit_objects = [];
        this.last_object_pos =0;

        var is_hidden  = false;
        for(i=0;i < this.mods.length; i++){
            if(this.mods[i].code = "HD"){
                is_hidden = true;
                break;
            }

        }


        for(i=0;i<this.beatmap.map_data.hit_objects.length; i++){

            if(this.beatmap.map_data.hit_objects[i][3] == 1){
                var x = this.calculate_x(this.beatmap.map_data.hit_objects[i][0]);
                var y = this.calculate_y(this.beatmap.map_data.hit_objects[i][1]);
                //TODO combo/colours/diameter/etc
                var approachRate = parseInt(this.beatmap.map_data.difficulty.ApproachRate);
                var circleSize = this.calculate_x(108.848 - (parseInt(this.beatmap.map_data.difficulty.CircleSize) * 8.9646));
                this.approachTime = 0;
                if( approachRate < 5){
                    this.approachTime = (1800 - (approachRate * 120))
                }else{
                    this.approachTime =  (1200 - ((approachRate - 5) * 150));
                }


                var t = this.beatmap.map_data.hit_objects[i][2]; //time to hit cricle
                this.hit_objects.push({
                    t: t,
                    object: new Circle(this.hit_object_container,is_hidden,x,y,this.approachTime,t,circleSize,0xFF0040,0)
                })

            }
        }
        this.audioLeadIn = parseInt(this.beatmap.map_data.general.AudioLeadIn);


        //calculate x,y prior as processing slowly casues it to get out of sync
        //might have to calculate replay times as time passed, as it is starting to get out of sync

        if(!replay.been_rendered){
            for(var i = 0 ; i < this.replay_data.length; i++){
                if(this.replay_data[i].length == 4){
                    this.replay_data[i][1] = this.calculate_x(this.replay_data[i][1]);
                    this.replay_data[i][2] = this.calculate_y(this.replay_data[i][2]);
                }
            }
            replay.been_rendered = true;
        }



    },

    calculate_x: function(x){
        if(x == 0){
            return x;
        }
        return  (this.getRenderWidth()/640) * x;
    },
    calculate_y: function(y){
        if(y == 0){
            return y;
        }
        return  (this.getRenderHeight()/480) * y;
    },
    render_object: function(){

        var time = Date.now() - this.date_started;
        for(var i = this.last_object_pos; i< this.hit_objects.length ; i++){
            if(this.hit_objects[i].t - this.approachTime  > time){
                break;
            }
            //draw will return false if the object has been destroyed
            //if it has been destroyed we will set the last object count to that pos so we don't iterate over all the objects later on
            if(!this.hit_objects[i].object.draw(time)){
                this.last_object_pos = i;
            }
        }
    },


    game_loop: function () {
        //TODO: check if i need to do something with replays also
        if(!this.has_started && this.audioLeadIn == 0) {
            osu.audio.music.start();
            this.date_started = Date.now();
            this.has_started = true;
        }else{

            if(!this.countdown_started){
                var self = this;
                setTimeout(function(){
                    self.audioLeadIn = 0;
                }, this.audioLeadIn);
                this.countdown_started = true;
            }

        }
        var difference = 0;
        var time = Date.now();
        if(this.has_started){
            this.render_object();
        }


        if(this.expected_replay_movment_time){

            if(time < this.expected_replay_movment_time){
                // isnt time yet
                setTimeout(this.game_loop.bind(this),0);
                return;
            }
            // if we have gone over remove the difference from next action to keep in sync
            difference = time - this.expected_replay_movment_time;
        }

        if(this.replay_data.length == this.curr_replay_frame){
            this.time_finished = Date.now();
            this.cursor.x = this.getRenderWidth() / 2;
            this.cursor.y = this.getRenderHeight() / 2;

            osu.ui.interface.scorescreen.renderScoreScreen();
            return;
        }
        var next_movment = this.replay_data[this.curr_replay_frame];
        this.curr_replay_frame++;
        if(next_movment.length == 4){

            var x = next_movment[1];
            var y = next_movment[2];

            if(next_movment[0] < 0 || next_movment[2] < 0){
                //negatives seem to do something with skips? 1 of the replays adds 8seconds then takes it away then adds it again later.
                //the y coord seems to be negative, if i skip that it keeps the replay in sync with the song so ill do that for now
                //console.log("im not sure what to do with negatives");
                this.cursor.x = x;
                this.cursor.y = y;
                this.expected_replay_movment_time = null;
                this.game_loop();
            }
            else{
                var next_tick = next_movment[0] - difference;
                this.expected_replay_movment_time = Date.now() + next_tick;
                this.cursor.x = x;
                this.cursor.y = y;
                this.game_loop();
            }
        }
        else{
            this.expected_replay_movment_time = null;
            this.game_loop();
        }

    }


};
/**
 var keys_pressed = osu.keypress.getKeys(parseInt(next_movment[3]));
 var tint_1 = false;
 var tint_2 = false;
 var tint_3 = false;
 var tint_4 = false;
 //TODO: fix this
 for (var k in osu.keypress.KEYS) {
                var key_int = osu.keypress.KEYS[k];
                if(keys_pressed.indexOf(key_int) != -1){
                    if(key_int == osu.keypress.KEYS.NONE){
                        tint_1 = false;
                        tint_2 = false;
                        tint_3 = false;
                        tint_4 = false;
                    }
                    if(key_int == osu.keypress.KEYS.K1){
                        tint_1 = true;
                    }
                    if(key_int == osu.keypress.KEYS.K2){
                        tint_2 = true;
                    }
                    if(key_int == osu.keypress.KEYS.M1){
                        tint_3 = true;
                    }
                    if(key_int == osu.keypress.KEYS.M2){
                        tint_4 = true;
                    }
                }

            }


 this.tint_untint_key(this.keypress_1,tint_1);
 this.tint_untint_key(this.keypress_2,tint_2);
 this.tint_untint_key(this.keypress_3,tint_3);
 this.tint_untint_key(this.keypress_4,tint_4);






**/