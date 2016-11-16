/**
 * osu_game.js
 * Created by Ugrend on 5/06/2016.
 */


/*

 Main Game Window AKA: Spaghetti Monster

 x ranges from 0 to 512 (inclusive) and y ranges from 0 to 384 (inclusive).


 4:3 aspect ratio
 */


var osu = osu || {};
osu.ui = osu.ui || {};
osu.ui.interface = osu.ui.interface || {};
osu.ui.interface.osugame = {


    master_container: new PIXI.Container(),
    offSetDetails: null,
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
    curr_replay_frame: 0,
    mods: [],
    oldest_object_position: 0,
    oldestReplayFrame:0,
    replay_intro_time: -1,
    end_skip_frame: -1,
    skip_frames: [],
    flash_count: 0,
    warning_arrow_times: [],
    break_times: [],
    replay_played_by_text: "",
    hit_objects: [],
    events_bound: false,
    curMapTime:0,
    replayDiff:0,
    delayEnd: 0,
    finished: false,
    keyPresses: [],
    currentKeyPress: 0,
    lasthit_id: 1000,
    paused: false,
    paused_time: 0,


    currentMap: function () {
        return this.beatmap;
    },

    currentReplay: function () {
        return this.replay_data;
    },

    currentHitObjects: function () {
        return this.hit_objects;
    },

    calculateLetterBox: function () {
        var x = osu.ui.renderer.renderWidth;
        var y = osu.ui.renderer.renderHeight;
        var fixed_ratio_y = (3 / 4) * x;
        var fixed_ratio_x = (4 / 3) * y;
        var details = {
            width: x,
            height: y,
            x_offset: 0,
            y_offset: 0
        };

        if (fixed_ratio_y > y) {
            //if we increasing y bigger than the screen we need to make x smaller
            details.width = fixed_ratio_x;
        }
        else {
            details.height = fixed_ratio_y;
        }
        details.x_offset = (x - details.width)/2 || 0;
        details.y_offset = (y - details.height)/2 || 0;
        return details;

    },

    getRenderWidth: function () {
        return osu.ui.renderer.renderWidth;
    },
    getRenderHeight: function () {
        return osu.ui.renderer.renderHeight;
    },
    create_dimmer: function () {


        this.background_dimmer = this.background_dimmer || new PIXI.Container();
        this.background_dimmer.removeChildren();
        var dimmer = new PIXI.Graphics();
        dimmer.beginFill(0x0, osu.settings.SETTINGS.background_dim);
        dimmer.drawRect(0, 0, this.getRenderWidth(), this.getRenderHeight());
        this.background_dimmer.addChild(dimmer);


    },
    create_background: function () {

        this.beatmap.background = this.beatmap.background || ""; //prevent pixi breaking on undefined background
        var background = PIXI.Texture.fromImage(this.beatmap.background);
        var background_sprite = new PIXI.Sprite(background);
        background_sprite.width = this.getRenderWidth();
        background_sprite.height = this.getRenderHeight();
        this.master_container.addChild(background_sprite);

        this.create_dimmer();
        this.master_container.addChild(this.background_dimmer);


    },

    create_pause_screen_container: function () {
        this.pauseScreenContainer = new PIXI.Container();
        this.pauseScreenContainer.visible = false;
        var overlayTexture = osu.skins.resources.pause_overlay.texture;
        this.overlaySprite = new PIXI.Sprite(overlayTexture);
        this.overlaySprite.width = this.getRenderWidth();
        this.overlaySprite.height = this.getRenderHeight();
        this.pauseScreenContainer.addChild(this.overlaySprite);


        var resumeButtonTexture = osu.skins.resources.pause_continue.texture;
        this.resumeButtonSprite = new PIXI.Sprite(resumeButtonTexture);
        this.resumeButtonSprite.position.x = this.getRenderWidth() /2;
        this.resumeButtonSprite.position.y = this.getRenderHeight() *.26;
        this.resumeButtonSprite.anchor.set(0.5);
        this.resumeButtonSprite.interactive = true;
        this.resumeButtonSprite.on("mouseup", this.toggle_pause.bind(this));
        this.resumeButtonSprite.on("touchend", this.toggle_pause.bind(this));
        this.pauseScreenContainer.addChild(this.resumeButtonSprite);


        var backButtonTexture = osu.skins.resources.pause_back.texture;
        this.backButtonSprite = new PIXI.Sprite(backButtonTexture);
        this.backButtonSprite.position.x = this.getRenderWidth() /2;
        this.backButtonSprite.position.y = this.getRenderHeight() *.74;
        this.backButtonSprite.anchor.set(0.5);
        this.backButtonSprite.interactive = true;
        this.backButtonSprite.on("mouseup", this.end_replay.bind(this));
        this.backButtonSprite.on("touchend", this.end_replay.bind(this));

        this.pauseScreenContainer.addChild(this.backButtonSprite);




        this.master_container.addChild(this.pauseScreenContainer);
    },

    tint_untint_key: function (key, do_tint) {
        if (do_tint) {
            key.scale = {x:1.1,y:1.1};
            key.tint = 0xFFFF00;
        }
        else {
            key.scale = {x:1,y:1};
            key.tint = 0xFFFFFF;
        }
    },
    create_key_press: function () {
        this.keypress_area = new PIXI.Container();
        var keypress_texture = osu.skins.resources.inputoverlay_key.texture;
        this.keypress_1 = new PIXI.Sprite(keypress_texture);
        this.keypress_2 = new PIXI.Sprite(keypress_texture);
        this.keypress_3 = new PIXI.Sprite(keypress_texture);
        this.keypress_4 = new PIXI.Sprite(keypress_texture);
        //TODO: Style text
        var style = {font : '14px Arial'}
        this.keypress_1_Text = new PIXI.Text(this.key_1_count > 0 && this.key_1_count.toString() || "K1",style);
        this.keypress_2_Text = new PIXI.Text(this.key_2_count > 0 && this.key_2_count.toString() || "K2",style);
        this.keypress_3_Text = new PIXI.Text(this.key_3_count > 0 && this.key_3_count.toString() || "M1",style);
        this.keypress_4_Text = new PIXI.Text(this.key_4_count > 0 && this.key_4_count.toString() || "M2",style);

        this.keypress_1.tint = 0xFFFF00;


        this.keypress_1.x = this.getRenderWidth() - 40;
        this.keypress_1.y = this.getRenderHeight() / 2 - 55;
        this.keypress_1.anchor.set(0.5);
        this.keypress_1_Text.anchor.set(0.5);
        this.keypress_1_Text.x = this.keypress_1.x;
        this.keypress_1_Text.y = this.keypress_1.y;


        this.keypress_2.x = this.getRenderWidth() - 40;
        this.keypress_2.y = this.getRenderHeight() / 2;
        this.keypress_2.anchor.set(0.5);
        this.keypress_2_Text.anchor.set(0.5);
        this.keypress_2_Text.x = this.keypress_2.x;
        this.keypress_2_Text.y = this.keypress_2.y;

        this.keypress_3.x = this.getRenderWidth() - 40;
        this.keypress_3.y = this.getRenderHeight() / 2 + 55;
        this.keypress_3.anchor.set(0.5);
        this.keypress_3_Text.anchor.set(0.5);
        this.keypress_3_Text.x = this.keypress_3.x;
        this.keypress_3_Text.y = this.keypress_3.y;

        this.keypress_4.x = this.getRenderWidth() - 40;
        this.keypress_4.y = this.getRenderHeight() / 2 + 110;
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


    },
    create_cursor: function () {
        this.cursor = new PIXI.Container();
        var cursor_texture = osu.skins.resources.cursor.texture;
        var cursor_middle_texture = osu.skins.resources.cursormiddle.texture;
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
    create_skip_container: function () {
        this.skip_container = new PIXI.Container();

        var skipFrames = [];
        if(osu.skins.resources.play_skip_0){
            for(var i = 0 ; i< 99; i++){
                if(osu.skins.resources["play_skip_"+i]){
                    skipFrames.push(osu.skins.resources["play_skip_"+i].texture);
                }else{
                    break;
                }
            }
        }else{
            skipFrames.push(osu.skins.resources.play_skip.texture);
        }

        var skipAnimation = new PIXI.extras.MovieClip(skipFrames);
        skipAnimation.anchor.set(0.5);
        skipAnimation.x = this.calculate_x(512);
        skipAnimation.y = this.calculate_y(384);
        skipAnimation.interactive = true;
        skipAnimation.on("mouseup", this.skip_intro.bind(this));
        skipAnimation.animationSpeed = 0.1;
        skipAnimation.play();
        this.skip_container.visible = false;

        this.skip_container.addChild(skipAnimation);
        this.master_container.addChild(this.skip_container);

    },
    create_play_warn_arrows_container: function () {
        this.arrow_container = new PIXI.Container();
        var arrow_texture =  osu.skins.resources.play_warningarrow.texture;
        var skip_arrow_sprite_1 = new PIXI.Sprite(arrow_texture);
        var skip_arrow_sprite_2 = new PIXI.Sprite(arrow_texture);
        var skip_arrow_sprite_3 = new PIXI.Sprite(arrow_texture);
        var skip_arrow_sprite_4 = new PIXI.Sprite(arrow_texture);
        skip_arrow_sprite_1.anchor.set(0.5);
        skip_arrow_sprite_2.anchor.set(0.5);
        skip_arrow_sprite_3.anchor.set(0.5);
        skip_arrow_sprite_4.anchor.set(0.5);
        skip_arrow_sprite_1.x = this.calculate_x(25);
        skip_arrow_sprite_1.y = this.calculate_y(19);
        skip_arrow_sprite_2.scale.x = -1; //flip arrow
        skip_arrow_sprite_2.x = this.calculate_x(487);
        skip_arrow_sprite_2.y = this.calculate_y(19);


        skip_arrow_sprite_3.x = this.calculate_x(25);
        skip_arrow_sprite_3.y = this.calculate_y(365);
        skip_arrow_sprite_4.scale.x = -1; //flip arrow
        skip_arrow_sprite_4.x = this.calculate_x(487);
        skip_arrow_sprite_4.y = this.calculate_y(365);


        this.arrow_container.addChild(skip_arrow_sprite_1);
        this.arrow_container.addChild(skip_arrow_sprite_2);
        this.arrow_container.addChild(skip_arrow_sprite_3);
        this.arrow_container.addChild(skip_arrow_sprite_4);
        this.arrow_container.visible = false;
        this.master_container.addChild(this.arrow_container);

    },
    create_success_container: function () {
        this.success_container = new PIXI.Container();
        var success_texture =  osu.skins.resources.section_pass.texture;
        var success_sprite = new PIXI.Sprite(success_texture);
        success_sprite.anchor.set(0.5);
        success_sprite.x = this.getRenderWidth() / 2;
        success_sprite.y = this.getRenderHeight() / 2;
        this.success_container.visible = false;
        this.success_container.addChild(success_sprite);
        this.master_container.addChild(this.success_container);
    },
    create_fail_container: function () {
        this.fail_container = new PIXI.Container();
        var fail_texture = osu.skins.resources.section_fail.texture;
        var fail_sprite = new PIXI.Sprite(fail_texture);
        fail_sprite.anchor.set(0.5);
        fail_sprite.x = this.getRenderWidth() / 2;
        fail_sprite.y = this.getRenderHeight() / 2;
        this.fail_container.visible = false;
        this.fail_container.addChild(fail_sprite);
        this.master_container.addChild(this.fail_container);
    },
    create_replay_by_text: function () {
        this.replay_text = new PIXI.Text(this.replay_played_by_text, {
            font: "30px Arial",
            fill: "#FFFFFF"
        });
        this.replay_text.y = this.getRenderHeight() / 8;
        this.replay_text.x = this.getRenderWidth() / 2;
        this.master_container.addChild(this.replay_text);
    },
    create_mod_container: function () {
        for (var i = 0; i < this.mods.length; i++) {
            if (this.mods[i].icon != "") {
                var modpng = osu.skins.resources[this.mods[i].icon].texture;
                var modSprite = new PIXI.Sprite(modpng);
                modSprite.position.y = this.getRenderHeight() / 5;
                modSprite.position.x = (this.getRenderWidth() * .95) - (i * 50);
                modSprite.anchor.set(0.5);
                this.master_container.addChild(modSprite);
            }
        }
    },
    create_settings_icon_container: function () {
        this.settingIconContainer = new PIXI.Container();
        var settingsTexture = new PIXI.Texture.fromImage("data/settings.png");
        var settingsSprite = new PIXI.Sprite(settingsTexture);
        settingsSprite.anchor.set(1);
        settingsSprite.x = this.getRenderWidth();
        settingsSprite.y = this.getRenderHeight();
        settingsSprite.alpha = 0.9;
        settingsSprite.interactive = true;
        settingsSprite.on("mouseup", this.toggle_settings.bind(this));
        this.settingIconContainer.addChild(settingsSprite);

        this.master_container.addChild(this.settingIconContainer);
    },
    create_timer_container: function () {
        this.timerX = this.getRenderWidth() - (this.getRenderWidth()*.11);
        this.timerY = this.getRenderHeight() * .1;
        var timerContainer = new PIXI.Container();
        var baseCircle = new PIXI.Graphics();
        baseCircle.lineStyle(4,0xFFFFFF);
        baseCircle.beginFill(0x0,0);
        baseCircle.drawCircle(0, 0,25);
        baseCircle.beginFill(0xFFFFFF,2);
        baseCircle.drawCircle(0,0,1);
        var baseCircleTexture = baseCircle.generateTexture();
        var baseCircleSprite = new PIXI.Sprite(baseCircleTexture);
        baseCircleSprite.position.x = this.timerX;
        baseCircleSprite.position.y = this.timerY;
        baseCircleSprite.anchor.set(0.5);

        this.timerMask = new PIXI.Graphics();
        this.timerPie = new PIXI.Graphics();
        this.timerPie.mask = this.timerMask;
        this.timerPie.beginFill(0xB4B4B2,0.8);
        this.timerPie.drawCircle(this.timerX, this.timerY,25);
        this.timerPie.endFill();

        timerContainer.addChild(this.timerPie);
        timerContainer.addChild(baseCircleSprite);
        this.master_container.addChild(timerContainer);

    },

    update_timer_percentage(percentage, colour){
        //http://jsfiddle.net/asoyaqud/17/
        var createPoint = function(x,y) { return {x:x,y:y}; };
        var rotateXY = function(x,y,angle) {
            var rad = Math.PI * angle/180;
            var cosVal = Math.cos(rad);
            var sinVal = Math.sin(rad);
            return createPoint(cosVal*x - sinVal*y,
                sinVal*x + cosVal*y);
        };
        var computeMaskPolygon = function(x,y,radius,angle) {
            while(angle<0)
                angle += 360;
            angle%=360;

            var delta = rotateXY(0, -2*radius, angle);
            var pts = [createPoint(x,y-2*radius),
                createPoint(x,y),
                createPoint(x+delta.x, y+delta.y)];

            if(angle > 270)
                pts.push(createPoint(x-2*radius,y));
            if(angle > 180)
                pts.push(createPoint(x,y+2*radius));
            if(angle > 90)
                pts.push(createPoint(x+2*radius,y));

            return pts;
        };
        this.timerPie.clear();
        this.timerPie.beginFill(colour,0.8);
        this.timerPie.drawCircle(this.timerX, this.timerY,25);
        this.timerPie.endFill();

        this.timerMask.clear();
        var angle = percentage*360;
        if(angle >= 360) angle = 359.9;

        var pts = computeMaskPolygon(this.timerX, this.timerY, 25, angle);
        this.timerMask.beginFill(0xFFFFFF);
        this.timerMask.moveTo(pts[0].x, pts[0].y);
        for(var i=1;i<pts.length;++i) {
            this.timerMask.lineTo(pts[i].x, pts[i].y);
        }
        this.timerMask.lineTo(pts[0].x, pts[0].y);
        this.timerMask.endFill();
    },

    createSmokeContainer: function () {
        this.smokeContainer = new PIXI.Container();
        this.master_container.addChild(this.smokeContainer);
    },

    createScoreContainer: function () {

        var style = { font: 'bold 80px Arial', fill: '#FFFFFF', align: 'center', stroke: '#000000', strokeThickness: 6 };
        this.scoreText = new PIXI.Text("0",style);
        this.scoreText.anchor.set(1,0);
        this.scoreText.y = 0 ;
        this.scoreText.x = this.getRenderWidth()  ;
        this.comboText = new PIXI.Text("0X",style);
        this.comboText.anchor.set(0,1);
        this.comboText.y = this.getRenderHeight() *.95;

        var style = { font: 'bold 50px Arial', fill: '#FFFFFF', align: 'center', stroke: '#000000', strokeThickness: 6 };
        this.accuracyText = new PIXI.Text("0.00%",style);
        this.accuracyText.anchor.set(1,0.5);
        this.accuracyText.y = this.getRenderHeight() * .1 ;
        this.accuracyText.x = this.getRenderWidth()  ;

        var scoreContainer = new PIXI.Container();
        scoreContainer.addChild(this.scoreText);
        scoreContainer.addChild(this.comboText);
        scoreContainer.addChild(this.accuracyText);
        this.master_container.addChild(scoreContainer);
    },

    create_master_container: function () {

        this.master_container.removeChildren();
        this.hit_object_container = new PIXI.Container();

        this.create_background();
        this.create_key_press();
        this.create_mod_container();
        this.create_replay_by_text();
        this.create_timer_container();
        this.createSmokeContainer();
        this.createScoreContainer();
        this.master_container.addChild(this.hit_object_container);
        this.create_skip_container();
        this.create_success_container();
        this.create_fail_container();
        this.create_play_warn_arrows_container();
        this.create_cursor();
        this.create_pause_screen_container();
        this.create_settings_icon_container();

    },
    flash_warning_arrows: function () {
        if (this.flash_count < 15) {
            var self = this;
            setTimeout(function () {
                self.arrow_container.visible = !self.arrow_container.visible;
                self.flash_count++;
                self.flash_warning_arrows()
            }, 150);

        } else {
            this.arrow_container.visible = false;
            this.flash_count = 0;
        }

    },
    show_success: function () {
        this.success_container.visible = true;
        osu.audio.sound.play_sound(osu.audio.sound.SECTIONPASS);
        var self = this;
        setTimeout(function () {
            self.success_container.visible = false;
        }, 4000);
    },
    show_failure: function () {
        this.fail_container.visible = true;
        var self = this;
        setTimeout(function () {
            self.fail_container.visible = false;
        }, 4000);
    },
    end_replay: function () {
        this.finished = true;
        this.has_started = false;
        osu.ui.interface.mainscreen.show_main_screen();
    },
    bind_events: function () {
        if (!this.events_bound) {
            event_handler.on(event_handler.EVENTS.SETTINGS_CHANGED, this.create_dimmer.bind(this));
            event_handler.on(event_handler.EVENTS.STOP_REPLAY, this.toggle_pause.bind(this));
            this.events_bound = true;
        }

    },
    /*osu coords are 512/384 but we dont want 0,512/etc to appear almost off screen
     So instead will devide by a bigger but same aspect ratio and increase the original x/y by the difference/2
     */
    calculate_x: function (x) {
        x = parseInt(x);
        var result = ((this.offSetDetails.width / 640) * (x + 64)) +this.offSetDetails.x_offset ;
        return result;
    },
    calculate_y: function (y) {
        y = parseInt(y);
        return ((this.offSetDetails.height / 480) * (y + 48)) +this.offSetDetails.y_offset;
    },
    calculate_original_x: function (x) {
        x = parseInt(x);
        return (x + 64) / (this.offSetDetails.width / 640) ;

    },
    calculate_original_y: function (y) {
        y = parseInt(y);
        return   (y + 48) / (this.getRenderHeight() / 480);
    },

    toggle_settings(){
        this.$footer.find('#skin_settings').css('display','none');
        this.$footer.find('#skin_select_field').css('display','none');
        this.$footer.css('background', 'rgba(0,0,0,0.6');
        this.$footer.slideToggle();

    },
    hide_settings(){
        if(this.$footer.css('display') == "none"){
            this.$footer.slideToggle();
        }
    },

    initGame: function () {
        //reset pause so we dont incorrectly think we are paused
        this.paused = false;
        this.paused_time = 0;
        event_handler.off(event_handler.EVENTS.RENDER, "replay_text"); //unsubscrbe incase another replay closed early
        this.keyPresses = [];
        this.currentKeyPress = 0;
        this.key_1_count = 0;
        this.key_2_count = 0;
        this.key_3_count = 0;
        this.key_4_count = 0;
        this.$footer = osu.ui.interface.mainscreen.$footer || $("#footer");
        this.$footer.attr('style','');
        this.$footer.css('display', 'none');

        osu.ui.renderer.start();
        this.offSetDetails = this.calculateLetterBox();
        this.create_master_container();
        osu.ui.renderer.clearStage();
        osu.ui.renderer.addChild(this.master_container);
        this.bind_events();
        this.curMapTime = 0;
        this.has_started = false;
        this.countdown_started = false;
        this.curr_replay_frame = 0;
        this.expected_replay_movment_time = null;
        this.hit_objects = [];
        this.oldest_object_position = 0;
        this.warning_arrow_times = [];
        this.is_hidden = false;
        this.is_hardrock = false;
        this.is_easy = false;
        this.oldestReplayFrame = 0;
        this.is_halftime = false;
        this.is_doubletime = false;
        this.replayDiff = 0;
        this.break_times = [];
        this.warning_arrow_times =[];
        this.delayEnd = 0;
        this.finished = false;
        var modMulti = 1;
        for (var i = 0; i < this.mods.length; i++) {
            var mod = this.mods[i].code;
            modMulti *= this.mods[i].multi;
            if (mod == "HD") this.is_hidden = true;
            if (mod == "HR") this.is_hardrock = true;
            if (mod == "EZ") this.is_easy = true;
            if (mod == "DT" || mod == "NT") this.is_doubletime = true;
            if (mod == "HT") this.is_halftime = true;

        }

        for (i = 0; i < this.beatmap.map_data.events.length; i++) {
            //2 looks to be breaks
            if (this.beatmap.map_data.events[i][0] == "2") {
                var startTime = parseInt(this.beatmap.map_data.events[i][1]);
                var endTime = parseInt(this.beatmap.map_data.events[i][2]) - 2300
                if (this.is_doubletime) {
                    startTime *= osu.helpers.constants.DOUBLE_TIME_MULTI;
                    endTime *= osu.helpers.constants.DOUBLE_TIME_MULTI;
                }

                this.break_times.push(startTime);
                this.warning_arrow_times.push(endTime);
            }
        }
        var comboNum = 0;
        var comboColour = 0;
        var approachRate = parseInt(this.beatmap.map_data.difficulty.ApproachRate);
        var overallDifficulty = this.beatmap.map_data.difficulty.OverallDifficulty;
        var difficultyCircleSize = parseInt(this.beatmap.map_data.difficulty.CircleSize);
        var hpDrain = parseInt(this.beatmap.map_data.difficulty.HPDrainRate);
        this.sliderMultiplier = parseFloat(this.beatmap.map_data.difficulty.SliderMultiplier || 1);
        this.sliderTickRate = parseFloat(this.beatmap.map_data.difficulty.SliderTickRate || 1);
        this.performance = new osu.game.Perforamnce(overallDifficulty+difficultyCircleSize+hpDrain,modMulti,hpDrain);


        if (this.is_hardrock) {
            approachRate *=  1.4;
            overallDifficulty *= 1.4;
        }
        if (this.is_easy){
            approachRate *=0.5;
            overallDifficulty *= 0.5;
        }
        approachRate = Math.min(approachRate,10);
        overallDifficulty = Math.min(overallDifficulty,10);





        if (this.is_hardrock && difficultyCircleSize < 7) difficultyCircleSize += 1;
        if (this.is_easy && difficultyCircleSize > 1) difficultyCircleSize -= 1; //TODO: work out if that's correct
        //TODO: try work this out, osu is registering hits but this size i get misses, so my circles must be slightly smaller or some other calculation (this calc is from opsu)
        var unScaledDiameter = (108.848 - (difficultyCircleSize * 8.9646)) ;
        var circleSize = (this.offSetDetails.width / 640) * unScaledDiameter;

        this.approachTime = 0;
        if (approachRate < 5) {
            this.approachTime = (1800 - (approachRate * 120))
        } else {
            this.approachTime = (1200 - ((approachRate - 5) * 150));
        }
        if (this.is_doubletime) this.approachTime = this.approachTime - (this.approachTime * .33);

        for (i = 0; i < this.beatmap.map_data.hit_objects.length; i++){

            var hitObject = new osu.objects.HitObject(this.beatmap.map_data.hit_objects[i], circleSize, this.approachTime, this);
            if (comboNum == 0 || hitObject.newCombo) {
                comboNum = 1;
                if (comboColour == osu.skins.COMBO_COLOURS.length - 1) {
                    comboColour = 0;
                }
                else {
                    comboColour++;
                }
            } else {
                comboNum++;
            }
            hitObject.colour = osu.skins.COMBO_COLOURS[comboColour];
            hitObject.combo = comboNum;
            //https://osu.ppy.sh/wiki/Song_Setup#Overall_Difficulty
            hitObject.hitOffset = {
                HIT_300: 79.5 - (overallDifficulty * 6),
                HIT_100: 139.5 - (overallDifficulty * 8),
                HIT_50: 199.5 - (overallDifficulty * 10),
                HIT_MISS: 500 - (overallDifficulty * 10)
            };

            this.hit_objects.push(hitObject);
        }

        osu.objects.HitObjectParser.create_stacks(this.hit_objects, parseFloat(this.beatmap.map_data.general.StackLeniency) || 0.7, unScaledDiameter, this.is_hardrock);
        this.keyPresses = osu.calculateReplay(this.hit_objects,this.replay_data, unScaledDiameter);
        osu.objects.HitObjectParser.initialiseHitObjects(this.hit_objects);
        osu.objects.HitObjectParser.calculate_follow_points(this.hit_objects, this);

        this.audioLeadIn = parseInt(this.beatmap.map_data.general.AudioLeadIn);
        if (this.is_doubletime) this.audioLeadIn = this.audioLeadIn * osu.helpers.constants.DOUBLE_TIME_MULTI;


        //calculate x,y prior as processing slowly casues it to get out of sync
        //might have to calculate replay times as time passed, as it is starting to get out of sync

        if (!replay.been_rendered) {
            for (var i = 0; i < this.replay_data.length; i++) {
                this.replay_data[i].x = this.calculate_x(this.replay_data[i].x);
                this.replay_data[i].y = this.calculate_y(this.replay_data[i].y);
                if (this.is_doubletime) {
                    //seems replay data also needs to be speed up
                    //TODO: Check if i need to worry about the negative values
                    this.replay_data[i].t *= osu.helpers.constants.DOUBLE_TIME_MULTI;
                }

            }
            replay.been_rendered = true;
        }

        this.skip_frames = [];



        var skipFrame = this.replay_data[1];

        this.skipTime = -1;

        if(skipFrame.t > 0){
            //im not sure how this works anymore but this fixed a problem so yeh
            if (this.replay_data[2].t > 0) {
                this.replayDiff = this.replay_data[2].t * -1;
            }
            this.skipTime = skipFrame.t;
            this.warning_arrow_times.push(this.skipTime);
        }
        else{
            if (this.replay_data[2].t < 0) {
                this.replayDiff = this.replay_data[2].t * -1;
                if (this.audioLeadIn == 0) {
                    this.audioLeadIn =  this.replayDiff;
                    if (this.is_doubletime) this.audioLeadIn *= osu.helpers.constants.DOUBLE_TIME_MULTI;
                }

            }

        }

        this.delayEnd = this.beatmap.map_data.time_length + 2500;
        if(this.is_doubletime) this.delayEnd *= osu.helpers.constants.DOUBLE_TIME_MULTI;

        event_handler.on(event_handler.EVENTS.RENDER, this.move_replay_text.bind(this), "replay_text")

    },

    move_replay_text: function () {
        if(!this.paused){
            if (this.replay_text.x < (-this.replay_text.width + 5)) {
                this.replay_text.x = this.getRenderWidth();
            }
            this.replay_text.x -= 2;
        }

    },

    renderKeyPress: function () {
        for(var i = this.currentKeyPress; i < this.keyPresses.length; i++){
            var keyPress = this.keyPresses[i];
            if(keyPress.t <= this.curMapTime){
                var tint_1 = keyPress.K1;
                var tint_2 = keyPress.K2;
                var tint_3 = keyPress.M1;
                var tint_4 = keyPress.M2;
                this.tint_untint_key(this.keypress_1,tint_1);
                this.tint_untint_key(this.keypress_2,tint_2);
                this.tint_untint_key(this.keypress_3,tint_3);
                this.tint_untint_key(this.keypress_4,tint_4);
                this.currentKeyPress = i;
                if(keyPress.REPLAYHIT && this.lasthit_id != keyPress.ID){
                    if(keyPress.K1){
                        this.key_1_count++;
                    }
                    if(keyPress.K2){
                        this.key_2_count++;
                    }
                    if(keyPress.M1){
                        this.key_3_count++;
                    }
                    if(keyPress.M2){
                        this.key_4_count++;
                    }
                    this.keypress_1_Text.text = (this.key_1_count > 0 && this.key_1_count.toString() || "K1");
                    this.keypress_2_Text.text = (this.key_2_count > 0 && this.key_2_count.toString() || "K2");
                    this.keypress_3_Text.text = (this.key_3_count > 0 && this.key_3_count.toString() || "M1");
                    this.keypress_4_Text.text = (this.key_4_count > 0 && this.key_4_count.toString() || "M2");
                    this.lasthit_id = keyPress.ID;
                }

                if(keyPress.SMOKE){
                    var pos = this.getCursorPos();
                    //set pos in frame so we can check distance next frame;
                    keyPress.x = pos.x;
                    keyPress.y = pos.y;
                    //draw smoke to current pos so that its not patchy
                    if(i>0){
                        var lastKey = this.keyPresses[i-1];
                        if(lastKey.SMOKE){

                            var xDiff = keyPress.x - lastKey.x;
                            var yDiff = keyPress.y - lastKey.y;
                            
                            var distance = osu.helpers.math.distance(keyPress.x, keyPress.y, lastKey.x, lastKey.y);
                            var numPoints = Math.round(distance / 20);
                            var steps = 1/(numPoints+1);
                            var nextStep = steps;
                            for(var j = 0 ; j < numPoints; j++){
                                var posX = keyPress.x + (xDiff * nextStep);
                                var posY = keyPress.y + (yDiff * nextStep);
                                var smoke = osu.objects.Smoke(posX,posY);
                                this.smokeContainer.addChild(smoke);
                                nextStep += steps;
                            }
                        }
                    }
                    var smoke = osu.objects.Smoke(pos.x,pos.y);
                    //smoke will be set to invisible after 2.5seconds im not sure if its worth the effort to remove from container
                    this.smokeContainer.addChild(smoke);
                }
            }else{
                break;
            }

        }

    },


    render_object: function () {



        var time = this.curMapTime;


        for (var x = 0; x < this.warning_arrow_times.length; x++) {
            if (time > this.warning_arrow_times[x]) {
                this.warning_arrow_times.splice(x, 1);
                this.flash_warning_arrows();
                break;
            }
        }
        for (var x = 0; x < this.break_times.length; x++) {
            if (time > this.break_times[x] + 2000) {
                this.break_times.splice(x, 1);
                //TODO: check performance to toggle correct break screen
                this.show_success();
                break;
            }
        }

        for (var i = this.oldest_object_position; i < this.hit_objects.length; i++) {
            if (this.hit_objects[i].startTime - this.approachTime > time) {
                break;
            }
            //draw will return false if the object has been destroyed
            //if it has been destroyed we will set the last object count to that pos so we don't iterate over all the objects later on
            if (!this.hit_objects[i].draw(time)) {
                //only allow this to icrement by 1 in case a object is still drawing like a slider.
                if (this.oldest_object_position + 1 == i) {
                    this.oldest_object_position = i;
                }

            }
        }


        if(this.curMapTime - this.skipTime > 0){
            this.update_timer_percentage(this.curMapTime/this.beatmap.map_data.time_length, osu.helpers.constants.TIMER_SONG_COLOUR);
        }
        
        if(this.oldest_object_position == this.hit_objects.length -1){
           if(this.curMapTime >= this.delayEnd){
               this.finished = true;

               event_handler.off(event_handler.EVENTS.RENDER, "replay_text");
               osu.ui.interface.scorescreen.renderScoreScreen();
           }
        }

        this.comboText.text = this.performance.combo + "X";
        this.accuracyText.text = this.performance.accuracy + "%";
        this.scoreText.text = this.performance.score;

    },

    skip_intro: function () {
        if(this.skipTime && this.curMapTime < this.skipTime){
            osu.audio.sound.play_sound(osu.audio.sound.MENUHIT);
            osu.audio.music.set_position(this.skipTime / 1000);
            this.curMapTime = this.skipTime;
            var elapsed_time = Date.now() - this.date_started;
            this.date_started -= (this.skipTime - elapsed_time);
        }

    },

    getCursorPos: function () {
        return {
            x: this.cursor.x,
            y:this.cursor.y
        }
    },

    render_replay_frame(){
        var curTime = this.curMapTime;
        if(this.skipTime>0) curTime += this.skipTime;
        for(var i = this.oldestReplayFrame; i < this.replay_data.length; i++){
            var t = this.replay_data[i].t - this.replayDiff;

            if(t <= 0){
                var x =this.replay_data[i].x;
                var y = this.replay_data[i].y;
                if(x > 0 && y > 0){
                    this.cursor.x = x;
                    this.cursor.y = y;
                    i++;
                    this.oldestReplayFrame =i;
                    break;
                }
            }
            if(curTime >= t){
                var x =this.replay_data[i].x;
                var y = this.replay_data[i].y;
                if(x > 0 && y > 0){
                    this.cursor.x = x;
                    this.cursor.y = y;
                    i++;
                    this.oldestReplayFrame =i;
                    break;
                }
            }else{
                break;
            }

        }

    },

    toggle_pause: function () {
        if(!this.paused){
            this.paused = true;
            this.pauseScreenContainer.visible = true;
            if(this.has_started){
                this.paused_time = Date.now();
                osu.audio.music.pause();
            }
            return;
        }
        this.pauseScreenContainer.visible = false;
        this.paused = false;
        if(this.has_started){
            osu.audio.music.play();
        }

    },

    game_loop: function () {
        if(!this.paused){
            if(this.paused_time>0){
                //Increase the date started time by the amount of time it has been paused for this should make everything remain insync
                this.date_started += Date.now() - this.paused_time;
                this.paused_time = 0;
            }

            this.render_replay_frame();
            this.renderKeyPress();
            if (!this.has_started && this.audioLeadIn == 0 && !this.finished) {
                if (this.is_doubletime) osu.audio.music.set_playback_speed(1.5);
                osu.audio.music.start();
                this.date_started = Date.now();
                this.has_started = true;
            } else {
                if (!this.countdown_started) {
                    var self = this;
                    this.date_started = Date.now();
                    setTimeout(function () {
                        self.audioLeadIn = 0;
                    }, this.audioLeadIn);
                    this.countdown_started = true;
                }
                var curTime = Date.now() - this.date_started - this.paused_time;
                this.update_timer_percentage(curTime/this.audioLeadIn, osu.helpers.constants.TIMER_INTRO_COLOUR);
            }
            var time = Date.now();
            if (this.has_started) {

                this.curMapTime = time - this.date_started;
                this.paused_time = 0;
                if (this.skipTime ==-1 || this.skipTime > -1 && this.skipTime < this.curMapTime) {
                    this.skip_container.visible = false;
                }else{
                    this.update_timer_percentage(this.curMapTime/this.skipTime, osu.helpers.constants.TIMER_INTRO_COLOUR);
                    this.skip_container.visible = true;
                }
                this.render_object();

            }
        }


        if(!this.finished) setTimeout(this.game_loop.bind(this), 1);

    }


};
