/**
 * Created by Ugrend on 2/06/2016.
 */


var mainArea = document.getElementById('main_zone');
var dragDropZone = document.getElementById('dragdrop');
var dragDropLabel = document.getElementById('drag_label');
var replay = "";
/**
 * Created by Ugrend on 6/2/2016.
 */
function resetLabel(){
    setTimeout(function () {
        dragDropLabel.innerHTML = "Drag osr file here!";
    }, 3000)
}

function hideDropZone(){
    dragDropZone.style.display = 'none';

}
/**
 * Created by Ugrend on 6/2/2016.
 */

/*
Just adding this for testing will prob remove

 */

function showReplayData(){
    osu.ui.interface.scorescreen.played_by = replay.playerName;
    osu.ui.interface.scorescreen.date_played = replay.time_played;
    osu.ui.interface.scorescreen.total_score = replay.tScore;
    osu.ui.interface.scorescreen.t300Hits = replay.h300;
    osu.ui.interface.scorescreen.t300gHits = replay.hGekis;
    osu.ui.interface.scorescreen.t100Hits = replay.h100;
    osu.ui.interface.scorescreen.t100kHits = replay.hKatus;
    osu.ui.interface.scorescreen.t50Hits = replay.h50;
    osu.ui.interface.scorescreen.tMissHits = replay.hMisses ;
    osu.ui.interface.scorescreen.maxCombo = replay.tCombo;
    osu.ui.interface.scorescreen.grade = replay.grade;
    osu.ui.interface.scorescreen.accuracy = replay.accuracy;
    hideDropZone();
    osu.ui.interface.scorescreen.renderScoreScreen();
}
/**
 * Created by Ugrend on 4/06/2016.
 */


var osu = osu || {};
osu.ui = osu.ui || {};
osu.ui.renderer = {



    renderWidth: window.innerWidth *.98,
    renderHeight: window.innerHeight *.98,
    renderer: null,
    masterStage: new PIXI.Container(),
    render_zone: document.getElementById("render_zone"),
    fixed_aspect: false,

    /**
     *
     * @param child add to renderer stage
     */
    addChild: function(child){
        this.masterStage.addChild(child);
    },
    removeChild: function(child){
        this.masterStage.removeChild(child);
    },

    clearStage: function(){
        this.masterStage.removeChildren();
    },
    animate: function () {
        this.renderer.render(this.masterStage);
        requestAnimationFrame(this.animate.bind(this));
    },
    resize: function(){
        var x = window.innerWidth *.98;
        var y = window.innerHeight *.98;

        //just to make my life easier fix the render ratio for game play
        if(this.fixed_aspect) {
            var fixed_ratio_y = (3 / 4) * x;
            var fixed_ratio_x = (4 / 3) * y;

            if (fixed_ratio_y > y) {
                //if we increasing y bigger than the screen we need to make x smaller
                x = fixed_ratio_x;
            }
            else {
                y = fixed_ratio_y;
            }
        }
        this.renderWidth =  x;
        this.renderHeight = y;
        if(this.renderer != null) {
            this.renderer.view.style.width = this.renderWidth + 'px';
            this.renderer.view.style.height = this.renderHeight + 'px';
        }
    },
    start: function () {
        this.resize();
        if(this.renderer == null) {
            this.renderer = PIXI.autoDetectRenderer(this.renderWidth, this.renderHeight);
            this.render_zone.appendChild(this.renderer.view);
            this.animate();
            window.onresize = this.resize.bind(this);
        }else{
            console.log("renderer already started resizing instead");
            this.renderer.width =  this.renderWidth;
            this.renderer.height = this.renderHeight;
            this.renderer.view.width = this.renderWidth;
            this.renderer.view.height = this.renderHeight;
        }

    },
    hide: function () {
        this.render_zone.innerHTML = "";
    },
    show: function(){
        this.render_zone.appendChild(this.renderer.view);
    }
};



/**
 * Created by Ugrend on 6/06/2016.
 */


var BeatmapReader = function(beatmap_zip) {
    var beatMap = {};




    return beatMap;


};
/**
 * Created by Ugrend on 6/2/2016.
 */
if(typeof window.FileReader === "undefined"){
    dragDropLabel.innerHTML = "Shit won't work on this browser :("
}
else {
    dragDropZone.ondragover = function () {
        return false;
    };
    dragDropZone.ondragend = function () {
        return false;
    };
    dragDropZone.ondrop = function (e) {
        e.preventDefault();

        var file = e.dataTransfer.files[0],
            reader = new FileReader();
        reader.onloadend = function (event) {

            if(event.target.readyState === 2){
                switch(file.name.split(".").pop()){
                    case "osr":
                        //osu replay
                        var replay_data = event.target.result;
                        replay = ReplayParser(replay_data);
                        showReplayData();
                        break;
                    case "osz":
                        //osu beatmap
                        break;
                    case "osk":
                        //osu skins
                        break;
                    default:
                        console.log("how did you get here");
                }
            }else{
                dragDropLabel.innerHTML = "Well ummm, yeh i dont know what to do but something went wrong";
                resetLabel();
            }

        };

        if(file.name.split(".").pop() !== "osr"
            && file.name.split(".").pop() !== "osz"
            && file.name.split(".").pop() !== "osk"){
            dragDropLabel.innerHTML = "i dont know what that is";
            resetLabel();
        }else{
            reader.readAsBinaryString(file);
        }
        return false;
    };
}
/**
 * Created by Ugrend on 2/06/2016.
 */


/**
 * Converts a hexdump of a replay file into a JS object
 * @param replay_data {String value of a hexdump of replay file}
 * @returns {{type: *, version: *, bmMd5Hash: *, playerName: *, rMd5Hash: *, h300: *, h100: *, h50: *, hGekis: *, hKatus: *, hMisses: *, tScore: *, tCombo: *, fullClear: *, mods: *, lifeBar: *, timeTicks: *, replayByteLength: *}}
 * @constructor
 */
var ReplayParser = function(replay_data){

    //https://osu.ppy.sh/wiki/Osr_%28file_format%29
    var RP = {
        replay_data: replay_data,
        replay_bytes: null,
        byte_index: 0,

        /*
            Converts binarystring  to byte array
         */
        convert: function(){
            for (var bytes = [], i = 0; i < this.replay_data.length; ++i) {
                bytes.push(this.replay_data.charCodeAt(i) & 0xff)
            }
            this.replay_bytes = bytes;
        },
        //data types
        getByte: function(){
            return this.replay_bytes[this.byte_index++];
        },
        getShort: function(){
            return this.replay_bytes[this.byte_index++]
                | (this.replay_bytes[this.byte_index++] << 8);
        },
        getInteger: function(){
            return this.replay_bytes[this.byte_index++]
                | (this.replay_bytes[this.byte_index++] << 8)
                | (this.replay_bytes[this.byte_index++] << 16)
                | (this.replay_bytes[this.byte_index++] << 24);
        },
        getLong: function(){
            return this.getInteger() + this.getInteger() * 0x100000000;
        },
        getULEB128: function(){
            var t = 0;
            var s = 0;
            while (true) {
                var byte = this.getByte();
                t |= ((byte & 0x7F) << s);
                if ((byte & 0x80) === 0) break;
                s += 7;
            }
            return t;
        },
        getString: function(){

                /*
                From: https://osu.ppy.sh/wiki/Osr_%28file_format%29
                Has three parts; a single byte which will be either
                0x00,indicating that the next two parts are not present, or
                0x0b (decimal 11), indicating that the next two parts are present.
                If it is 0x0b, there will then be a ULEB128,
                representing the byte length of the following string, and then the string itself, encoded in UTF-8. See wikipedia:UTF-8*/
                var startByte = this.getByte();
                if (startByte == 0x0B){
                    var len = this.getULEB128();
                    var s = "";
                    for (var i = 0; i < len; i++) {
                        s += String.fromCharCode(this.getByte());
                    }
                    return s;
                }
                return "";
        }

    };
    RP.convert();
    var replay = {
        type: RP.getByte(),
        version: RP.getInteger(),
        bmMd5Hash: RP.getString(),
        playerName: RP.getString(),
        rMd5Hash: RP.getString(),
        h300: RP.getShort(),
        h100: RP.getShort(),
        h50: RP.getShort(),
        hGekis: RP.getShort(),
        hKatus: RP.getShort(),
        hMisses: RP.getShort(),
        tScore: RP.getInteger(),
        tCombo: RP.getShort(),
        fullClear: RP.getByte(),
        mods: RP.getInteger(),
        lifeBar: RP.getString(),
        time_played: RP.getLong(),
        replayByteLength: RP.getInteger()
    };

    LZMA.decompress(
      RP.replay_bytes.slice(RP.byte_index),
        function(data) {
            var replayData = data.split(",");
            for(var i = 0 ; i< replayData.length ; i++){
               replayData[i] = replayData[i].split("|");
            }
            replay.replayData = replayData;
        },
        function(){}
    );




    var epoch = (replay.time_played - 621355968000000000) / 10000 ;
    var date_time = new Date(epoch);
    replay.time_played = date_time.toLocaleString();


    replay.grade = osu.score.getGrade(replay.h300 + replay.hGekis, replay.h100 + replay.hKatus, replay.h50,replay.hMisses).name;
    replay.accuracy = osu.score.getAccuracy(replay.h300 + replay.hGekis, replay.h100 + replay.hKatus, replay.h50,replay.hMisses);

    return replay;
};

/**
 * Created by Ugrend on 6/06/2016.
 */
var SkinReader = function(skin_zip) {
    var skins = {};




    return skins;


};
/**
 * Created by Ugrend on 4/06/2016.
 */

var osu = osu || {};
osu.beatmaps = {
    background: "data/158023 UNDEAD CORPORATION - Everything will freeze/bg.jpg"
};
/**
 * Created by Ugrend on 3/06/2016.
 */

osu = osu || {};

osu.GAMETYPES = {
    NORMAL: 0,
    TAIKO: 1,
    CTB: 2,
    MANIA: 3
};
/**
 * Created by Ugrend on 5/06/2016.
 */

var osu  = osu || {};

/*

 Part	Data Type	Description
 w	Long	Time in milliseconds since the previous action
 x	Float	x-coordinate of the cursor from 0 - 512
 y	Float	y-coordinate of the cursor from 0 - 384
 z	Integer	Bitwise combination of keys/mouse buttons pressed (M1 = 1, M2 = 2, K1 = 5, K2 = 10)


 */
osu.keypress = Object.freeze({

    KEYS: {
        NONE : 0,
        M1: 1,
        M2: 2,
        K1: 5,
        K2: 10,
        C: 16
    },

    //TODO: need to work out how this works, its returning wrong keys i think
    getKeys: function(keys_int){
        var keys = [];
        if (keys_int == 0) {
            keys.push(this.KEYS.NONE);
            return keys;
        }
        for (var k in this.KEYS) {
            var bit = keys_int & this.KEYS[k];
            if (bit == this.KEYS[k] && bit != 0) {
                keys.push(this.KEYS[k]);
            }
        }
        return keys;
    }

});


/**
 * Created by Ugrend on 2/06/2016.
 */
//https://osu.ppy.sh/wiki/Game_Modifiers
//https://github.com/ppy/osu-api/wiki#mods
var osu  = osu || {};


osu.mods = Object.freeze({

    //anything higher than 4096 i don't really care about i don't think except maybe perfect?
    __mods: {

        NONE: {value: 0, multi: 1.0, code: "", name: "No Mod", icon: ""},
        NO_FAIL: {value: 1, multi: 0.5, code: "NF", name: "No Fail", icon: "selection_mod_nofail"},
        EASY: {value: 2, multi: 0.5, code: "EZ", name: "Easy", icon: "selection_mod_easy"},
        NO_VIDEO: {value: 4, multi: 1.0, code: "", name: "No Video", icon: ""},
        HIDDEN: {value: 8, multi: 1.06, code: "HD", name: "Hidden", icon: "selection_mod_hidden"},
        HARD_ROCK: {value: 16, multi: 1.06, code: "HR", name: "Hard Rock", icon: "selection_mod_hardrock"},
        SUDDEN_DEATH: {value: 32, multi: 1.0, code: "SD", name: "Sudden Death", icon: "selection_mod_suddendeath"},
        DOUBLE_TIME: {value: 64, multi: 1.12, code: "DT", name: "Double Time", icon: "selection_mod_doubletime"},
        RELAX: {value: 128, multi: 0, code: "", name: "", icon: ""},
        HALF_TIME: {value: 256, multi: 0.3, code: "HT", name: "Half Time", icon: "selection_mod_halftime"},
        NIGHT_CORE: {value: 512, multi: 1.12, code: "NT", name: "Night Core", icon: "selection_mod_nightcore"},
        FLASH_LIGHT: {value: 1024, multi: 1.12, code: "FL", name: "Flash Light", icon: "selection_mod_flashlight"},
        AUTO_PLAY: {value: 2048, multi: 0, code: "", name: "Auto Play", icon: ""},
        SPUN_OUT: {value: 4096, multi: 0.9, code: "SO", name: "Spun Out", icon: "selection_mod_spunout"},
        RELAX_2: {value: 8192, multi: 0, code: "AP", name: "Auto Pilot", icon:""},
        PERFECT: {value: 16384, multi: 1, code: "PF", name: "Perfect", icon:"selection_mod_perfect"}
    },
    /**
     * gets used mods based on replay mod int value
     * @param mod_bit_int {Number} value of replay mod output
     * @returns {Array} of mods
     */
    getMods: function(mod_bit_int){
        var mods = [];
        if (mod_bit_int == 0) {
            mods.push(this.__mods.NONE);
            return mods;
        }
        for (var k in this.__mods) {
            var bit = mod_bit_int & this.__mods[k].value;
            if (bit == this.__mods[k].value) {
                mods.push(this.__mods[k]);
            }
        }
        return mods;
    },
    /**
     * Gets mod based on value
     * @param mod_int {Number} value of desired mod
     * @returns {object} Mod object or Empty object if nothing found
     */
    getModFromVal: function(mod_int){
        for (var k in this.__mods) {
            if (this.__mods[k].value == mod_int) {
                return this.__mods[k];
            }
        }
        return {}
    }
});


/**
 * Created by ugrend on 2/06/2016.
 */

var osu  = osu || {};
osu.score = {


    /*
     Accuracy = Total points of hits / (Total number of hits * 300)
     Total points of hits 	(Number of 50s * 50 + Number of 100s * 100 + Number of 300s * 300)
     Total number of hits 	(Number of misses + Number of 50's + Number of 100's + Number of 300's)

     For reference: 300 = 6/6, 100 = 2/6, 50 = 1/6, Miss = 0/6.

     */
    GRADES: Object.freeze({
        SS: {name:"SS",small_icn:"ranking_X_small",large_icn:"ranking_X"},
        S:  {name:"S",small_icn:"ranking_S_small",large_icn:"ranking_S"},
        A:  {name:"A",small_icn:"ranking_A_small",large_icn:"ranking_A"},
        B:  {name:"B",small_icn:"ranking_B_small",large_icn:"ranking_B"},
        C:  {name:"C",small_icn:"ranking_C_small",large_icn:"ranking_C"},
        D:  {name:"D",small_icn:"ranking_D_small",large_icn:"ranking_D"},
        SSH:  {name:"SSH",small_icn:"ranking_XH_small",large_icn:"ranking_XH"},
        SH:  {name:"SH",small_icn:"ranking_SH_small",large_icn:"ranking_SH"}
    }),


    /**
     *
     * @param h300  {Number}
     * @param h100  {Number}
     * @param h50   {Number}
     * @param hMisses {Number}
     * @returns
     */
    getGrade: function(h300,h100,h50,hMisses){
        /*
         SS = 100% Accuracy
         S = Over 90% 300s, less than 1% 50s and no misses.
         A = Over 80% 300s and no misses OR over 90% 300s.
         B = Over 70% 300s and no misses OR over 80% 300s.
         C = Over 60% 300s.
         D = Anything else.


         Special grades

         Silver SS (SSH) = Normal grade SS with 'hidden' and/or 'flashlight' mod.
         Silver S (SH) = Normal grade S with 'hidden' and/or 'flashlight' mod.

         */
        var total_hits =  h300 + h100 + h50 + hMisses;
        if(h300 == total_hits){
            return this.GRADES.SS
        }
        if((h300/total_hits)*100 > 90) {
            if (hMisses > 0 || (h50 / total_hits) * 100 > 1) {
                return this.GRADES.A;
            }
            return this.GRADES.S;
        }
        if((h300/total_hits)*100 > 80) {
            if (hMisses > 0) {
                return this.GRADES.B;
            }
            return this.GRADES.A;
        }
        if((h300/total_hits)*100 > 70) {
            if (hMisses > 0) {
                return this.GRADES.C;
            }
            return this.GRADES.B;
        }
        if((h300/total_hits)*100 > 60) {
            return this.GRADES.C;
        }
        return this.GRADES.D;
    },

    getAccuracy: function(h300,h100,h50,hMisses){
        //TODO: This calculation doesn't seem to get same results as game, i must be missing something
        var maxHits = (h300 + h100 + h50 + hMisses)*300;
        var actualHits = (h300*300 + h100*100 + h50*50);
        return parseFloat((actualHits / maxHits * 100).toFixed(2));
    },

    parseAccuracyFromReplay: function (replay) {
        return this.getAccuracy(replay.h300 + replay.hGekis, replay.h100 + replay.hKatus, replay.h50, replay.hMisses)
    }





};
/**
 * Created by Ugrend on 4/06/2016.
 */
var osu = osu || {};
osu.skins = {

    //https://osu.ppy.sh/wiki/Skinning_Standard
    //https://osu.ppy.sh/wiki/Skinning_Interface


    //hitbursts
    hit300: "data/hit300.png",
    hit300g: "data/hit300.png",
    hit300k: "data/hit300.png",
    hit100: "data/hit100.png",
    hit100k: "data/hit100.png",
    hit50: "data/hit50.png",
    hit0: "data/hit0.png",

    //Ranking Grades
    ranking_XH: "data/ranking-XH.png",
    ranking_SH: "data/ranking-SH.png",
    ranking_X: "data/ranking-X.png",
    ranking_S: "data/ranking-S.png",
    ranking_A: "data/ranking-A.png",
    ranking_B: "data/ranking-B.png",
    ranking_C: "data/ranking-C.png",
    ranking_D: "data/ranking-D.png",
    ranking_XH_small: "data/ranking-XH.png",
    ranking_SH_small: "data/ranking-SH.png",
    ranking_X_small: "data/ranking-X.png",
    ranking_S_small: "data/ranking-S.png",
    ranking_A_small: "data/ranking-A.png",
    ranking_B_small: "data/ranking-B.png",
    ranking_C_small: "data/ranking-C.png",
    ranking_D_small: "data/ranking-D.png",


    //Interface
    pause_replay: "data/Pause-replay.png",


    cursor: "data/cursor.png",
    cursortrail: "data/cursortrail.png",
    cursormiddle: "data/cursormiddle.png",
    cursor_smoke: "data/cursor-smoke.png",


    inputoverlay_key: "data/inputoverlay-key.png",

    //Playfield
    section_fail: "data/Section-fail.png",
    section_pass: "data/Section-pass.png",
    play_warningarrow: "data/Play-warningarrow.png",
    play_skip: "data/play-skip.png",

    //Mods

    selection_mod_doubletime: "data/selection-mod-doubletime.png",
    selection_mod_easy: "data/selection-mod-easy.png",
    selection_mod_flashlight: "data/selection-mod-flashlight.png",
    selection_mod_halftime: "data/selection-mod-halftime.png",
    selection_mod_hardrock: "data/selection-mod-hardrock.png",
    selection_mod_hidden: "data/selection-mod-hidden.png",
    selection_mod_nightcore: "data/selection-mod-nightcore.png",
    selection_mod_nofail: "data/selection-mod-nofail.png",
    selection_mod_perfect: "data/selection-mod-perfect.png",
    selection_mod_spunout: "data/selection-mod-spunout.png",
    selection_mod_suddendeath: "data/selection-mod-suddendeath.png"


};
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
        this.create_key_press();
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
            var x =  this.calculate_x(parseFloat(next_movment[1]));
            var y = this.calculate_y(parseFloat(next_movment[2]));
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

            if(parseInt(next_movment[0]) < 0){
                console.log("im not sure what to do with negatives");
                this.cursor.x = x;
                this.cursor.y = y;



                this.movecursor();
            }
            else{
                var self = this;
                setTimeout(function(){
                    self.cursor.x = x;
                    self.cursor.y = y;

                    self.movecursor();
                },parseInt(next_movment[0]));
            }
        }


    }


};
/**
 * Created by Ugrend on 4/06/2016.
 */


var osu = osu || {};
osu.ui = osu.ui || {};
osu.ui.interface = osu.ui.interface || {};
osu.ui.interface.scorescreen = {

    map_name: "",
    background: "",
    made_by: "",
    played_by: "",
    date_played: "",
    total_score: 0,
    t300Hits: 0,
    t300gHits: 0,
    t100Hits: 0,
    t100kHits: 0,
    t50Hits: 0,
    tMissHits: 0,
    maxCombo: 0,
    accuracy: "0.00",
    grade: "",
    mods: [],
    master_container: new PIXI.Container(),

    getRenderWidth: function(){
        return osu.ui.renderer.renderWidth;
    },

    getRenderHeight: function(){
        return osu.ui.renderer.renderHeight;
    },

    map_details_heading_style : {

        font:  Math.round((osu.ui.renderer.renderHeight + osu.ui.renderer.renderWidth)/100).toString() + 'px Lucida Sans Unicode',
        fill: '#FFFFFF'
    },

    map_details_style: {
        font: Math.round((osu.ui.renderer.renderHeight + osu.ui.renderer.renderWidth)/150).toString() +'px Lucida Sans Unicode',
        fill: '#FFFFFF'
    },

    score_font_style: {
        font: 'bold ' + Math.round((osu.ui.renderer.renderHeight + osu.ui.renderer.renderWidth)/32).toString() + 'px  Lucida Sans Unicode',
        fill: '#FFFFFF'
    },




    create_background_container: function(){
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

    create_map_details_container: function(){
        var map_details_area = new PIXI.Graphics();

        map_details_area.beginFill(0x0,0.8);
        map_details_area.drawRect(0, 0, this.getRenderWidth(), this.getRenderHeight() *.13);
        map_details_area.lineStyle(this.getRenderHeight() *.006,0xE6E6E6,1);
        map_details_area.drawRect(0,this.getRenderHeight() *.13,this.getRenderWidth(),1);

        this.map_name_text = new PIXI.Text(this.map_name, this.map_details_heading_style);
        this.map_name_text.x = 5;
        this.map_name_text.y = this.getRenderHeight() *0.01;

        this.map_made_by = new PIXI.Text("Beatmap by " + this.made_by, this.map_details_style);
        this.map_made_by.x = 5;
        this.map_made_by.y = this.map_name_text.y + (this.getRenderHeight() * 0.04);

        this.map_played_by = new PIXI.Text("Played by "+ this.played_by  +" on " + this.date_played + ".", this.map_details_style);
        this.map_played_by.x = 5;
        this.map_played_by.y = this.map_made_by.y + (this.getRenderHeight() * 0.03);

        this.master_container.addChild(map_details_area);
        this.master_container.addChild(this.map_name_text);
        this.master_container.addChild(this.map_made_by);
        this.master_container.addChild(this.map_played_by);
    },

    create_total_score_details_container: function () {
        var scoreBox = new PIXI.Graphics();

        scoreBox.beginFill(0x0,0.7);
        scoreBox.lineStyle(5,0xFFFFFF,1);
        scoreBox.drawRect(this.getRenderWidth() *.015, this.getRenderHeight() *.15, this.getRenderWidth() *.46, this.getRenderHeight() *.1);

        var scoreLabel = new PIXI.Text("Score", this.map_details_heading_style);
        scoreLabel.x = this.getRenderWidth() *.02;
        scoreLabel.y = this.getRenderHeight() *.215;

        this.totalScoreText = new PIXI.Text(this.total_score.toString(),this.score_font_style);
        this.totalScoreText.x = this.getRenderWidth() *.30;
        this.totalScoreText.y = this.getRenderHeight() *.2;
        this.totalScoreText.anchor.set(0.5);

        this.master_container.addChild(scoreBox);
        this.master_container.addChild(scoreLabel);
        this.master_container.addChild(this.totalScoreText);
    },

    create_hit300_details_container: function () {
        var scoreBox300 = new PIXI.Graphics();

        scoreBox300.beginFill(0x0,0.7);
        scoreBox300.lineStyle(5,0xFFFFFF,1);
        scoreBox300.drawRect(this.getRenderWidth() *.015, this.getRenderHeight() *.3, this.getRenderWidth() *.46, this.getRenderHeight() *.1);

        this.total300hitsText = new PIXI.Text(this.t300Hits.toString() + "x", this.score_font_style);
        this.total300hitsText.x = this.getRenderWidth() *.16;
        this.total300hitsText.y = this.getRenderHeight() *.35;
        this.total300hitsText.anchor.set(0.5);

        this.total300ghitsText = new PIXI.Text(this.t300gHits.toString() + "x", this.score_font_style);
        this.total300ghitsText.x = this.getRenderWidth() *.39;
        this.total300ghitsText.y = this.getRenderHeight() *.35;
        this.total300ghitsText.anchor.set(0.5);


        var hit300png = PIXI.Texture.fromImage(osu.skins.hit300);
        var hit300gpng = PIXI.Texture.fromImage(osu.skins.hit300g);
        var hit300Sprite = new PIXI.Sprite(hit300png);
        var hit300gSprite = new PIXI.Sprite(hit300gpng);

        hit300Sprite.position.x = this.getRenderWidth() *.05;
        hit300Sprite.position.y = this.getRenderHeight() *.35;
        hit300Sprite.width = this.getRenderWidth() *.05;
        hit300Sprite.height = this.getRenderHeight() *.09;
        hit300Sprite.anchor.set(0.5);

        hit300gSprite.position.x = this.getRenderWidth() *.29;
        hit300gSprite.position.y = this.getRenderHeight() *.35;
        hit300gSprite.width = this.getRenderWidth() *.05;
        hit300gSprite.height = this.getRenderHeight() *.09;
        hit300gSprite.anchor.set(0.5);

        this.master_container.addChild(scoreBox300);
        this.master_container.addChild(this.total300hitsText);
        this.master_container.addChild(this.total300ghitsText);
        this.master_container.addChild(hit300Sprite);
        this.master_container.addChild(hit300gSprite);
    },

    create_hit100_details_container: function () {
        var scoreBox100 = new PIXI.Graphics();

        scoreBox100.beginFill(0x0,0.7);
        scoreBox100.lineStyle(5,0xFFFFFF,1);
        scoreBox100.drawRect(this.getRenderWidth() *.015, this.getRenderHeight() *.43, this.getRenderWidth() *.46, this.getRenderHeight() *.1);

        this.total100hitsText = new PIXI.Text(this.t100Hits.toString() + "x", this.score_font_style);
        this.total100hitsText.x = this.getRenderWidth() *.16;
        this.total100hitsText.y = this.getRenderHeight() *.48;
        this.total100hitsText.anchor.set(0.5);

        this.total100khitsText = new PIXI.Text(this.t100kHits.toString() + "x", this.score_font_style);
        this.total100khitsText.x = this.getRenderWidth() *.39;
        this.total100khitsText.y = this.getRenderHeight() *.48;
        this.total100khitsText.anchor.set(0.5);


        var hit100png = PIXI.Texture.fromImage(osu.skins.hit100);
        var hit100kpng = PIXI.Texture.fromImage(osu.skins.hit100k);
        var hit100Sprite = new PIXI.Sprite(hit100png);
        var hit100kSprite = new PIXI.Sprite(hit100kpng);

        hit100Sprite.position.x = this.getRenderWidth() *.05;
        hit100Sprite.position.y = this.getRenderHeight() *.48;
        hit100Sprite.width = this.getRenderWidth() *.05;
        hit100Sprite.height = this.getRenderHeight() *.09;
        hit100Sprite.anchor.set(0.5);

        hit100kSprite.position.x = this.getRenderWidth() *.29;
        hit100kSprite.position.y = this.getRenderHeight() *.48;
        hit100kSprite.width = this.getRenderWidth() *.05;
        hit100kSprite.height = this.getRenderHeight() *.09;
        hit100kSprite.anchor.set(0.5);

        this.master_container.addChild(scoreBox100);
        this.master_container.addChild(this.total100hitsText);
        this.master_container.addChild(this.total100khitsText);
        this.master_container.addChild(hit100Sprite);
        this.master_container.addChild(hit100kSprite);
    },

    create_hit50Misses_details_container: function () {
        var container = new PIXI.Container();
        var scoreBox50 = new PIXI.Graphics();

        scoreBox50.beginFill(0x0,0.7);
        scoreBox50.lineStyle(5,0xFFFFFF,1);
        scoreBox50.drawRect(this.getRenderWidth() *.015, this.getRenderHeight() *.56, this.getRenderWidth() *.46, this.getRenderHeight() *.1);

        this.total50hitsText = new PIXI.Text(this.t50Hits.toString() + "x", this.score_font_style);
        this.total50hitsText.x = this.getRenderWidth() *.16;
        this.total50hitsText.y = this.getRenderHeight() *.61;
        this.total50hitsText.anchor.set(0.5);

        this.totalMissesText = new PIXI.Text(this.tMissHits.toString() + "x", this.score_font_style);
        this.totalMissesText.x = this.getRenderWidth() *.39;
        this.totalMissesText.y = this.getRenderHeight() *.61;
        this.totalMissesText.anchor.set(0.5);


        var hit50png = PIXI.Texture.fromImage(osu.skins.hit50);
        var hit0png = PIXI.Texture.fromImage(osu.skins.hit0);
        var hit50Sprite = new PIXI.Sprite(hit50png);
        var hit0Sprite = new PIXI.Sprite(hit0png);


        hit50Sprite.position.x = this.getRenderWidth() *.05;
        hit50Sprite.position.y = this.getRenderHeight() *.61;
        hit50Sprite.width = this.getRenderWidth() *.05;
        hit50Sprite.height = this.getRenderHeight() *.09;
        hit50Sprite.anchor.set(0.5);

        hit0Sprite.position.x = this.getRenderWidth() *.29;
        hit0Sprite.position.y = this.getRenderHeight() *.61;
        hit0Sprite.width = this.getRenderWidth() *.05;
        hit0Sprite.height = this.getRenderHeight() *.09;
        hit0Sprite.anchor.set(0.5);



        this.master_container.addChild(scoreBox50);
        this.master_container.addChild(this.total50hitsText);
        this.master_container.addChild(this.totalMissesText);
        this.master_container.addChild(hit50Sprite);
        this.master_container.addChild(hit0Sprite);


    },

    create_combo_accuracy_details_container: function () {
        var scoreBoxCombo = new PIXI.Graphics();

        var maxComboLabel = new PIXI.Text("Max Combo", this.map_details_heading_style);
        maxComboLabel.x = this.getRenderWidth() *.02;
        maxComboLabel.y = this.getRenderHeight() *.68;

        var accuracyLabel = new PIXI.Text("Accuracy", this.map_details_heading_style);
        accuracyLabel.x = this.getRenderWidth() *.3;
        accuracyLabel.y = this.getRenderHeight() *.68;


        this.maxComboText = new PIXI.Text(this.maxCombo.toString() + "x", this.score_font_style);
        this.maxComboText.x = this.getRenderWidth() *.02;
        this.maxComboText.y = this.getRenderHeight() *.705;

        this.accuracyText = new PIXI.Text(this.accuracy + "%", this.score_font_style);
        this.accuracyText.x = this.getRenderWidth() *.27;
        this.accuracyText.y = this.getRenderHeight() *.705;


        scoreBoxCombo.beginFill(0x0,0.7);
        scoreBoxCombo.lineStyle(5,0xFFFFFF,1);
        scoreBoxCombo.drawRect(this.getRenderWidth() *.015, this.getRenderHeight() *.71, this.getRenderWidth() *.46, this.getRenderHeight() *.1);

        this.master_container.addChild(maxComboLabel);
        this.master_container.addChild(accuracyLabel);
        this.master_container.addChild(scoreBoxCombo);
        this.master_container.addChild(this.maxComboText);
        this.master_container.addChild(this.accuracyText);

    },

    create_grade_details_container: function () {
        var gradepng = PIXI.Texture.fromImage(osu.skins[osu.score.GRADES[this.grade].large_icn]);
        var gradeSprite = new PIXI.Sprite(gradepng);

        gradeSprite.position.x = this.getRenderWidth() *.8;
        gradeSprite.position.y = this.getRenderHeight() *.4;
        gradeSprite.width = this.getRenderWidth() *.3;
        gradeSprite.height = this.getRenderHeight() *.5;
        gradeSprite.anchor.set(0.5);


        var replaypng = PIXI.Texture.fromImage(osu.skins.pause_replay);
        var replay_Sprite = new PIXI.Sprite(replaypng);
        replay_Sprite.position.x = this.getRenderWidth() *.8;
        replay_Sprite.position.y = this.getRenderHeight() *.8;
        replay_Sprite.width = this.getRenderWidth() *.2;
        replay_Sprite.height = this.getRenderHeight() *.2;
        replay_Sprite.anchor.set(0.5);
        replay_Sprite.interactive = true;
        replay_Sprite.on("mouseup", this.start_replay.bind(this));
        this.master_container.addChild(gradeSprite);
        this.master_container.addChild(replay_Sprite);

    },
    start_replay: function(){
        osu.ui.interface.osugame.replay_data = replay.replayData.slice(0);
        osu.ui.interface.osugame.renderScreen();
        osu.ui.interface.osugame.movecursor();
    },


    create_master_container: function () {

        this.create_background_container();
        this.create_map_details_container();
        this.create_total_score_details_container();
        this.create_hit300_details_container();
        this.create_hit100_details_container();
        this.create_hit50Misses_details_container();
        this.create_combo_accuracy_details_container();
        this.create_grade_details_container();

    },

    onRender: function(){

    },

    renderScoreScreen: function(){
        osu.ui.renderer.fixed_aspect = false;
        osu.ui.renderer.start();
        this.create_master_container();
        osu.ui.renderer.clearStage();
        osu.ui.renderer.masterStage = this.master_container;
    }

};