/**
 * Created by Ugrend on 2/06/2016.
 */

var DEBUG = true;
var mainArea = document.getElementById('main_zone');
var dragDropZone = document.getElementById('dragdrop');
var dragDropLabel = document.getElementById('drag_label');
var replay = "";
var beatmap =null;
zip.workerScriptsPath = "static/libs/js/";
/**
 * Created by Ugrend on 4/06/2016.
 */
var osu = osu || {};
//TODO: create PIXI textures
osu.skins = {

    //https://osu.ppy.sh/wiki/Skinning_Standard
    //https://osu.ppy.sh/wiki/Skinning_Interface


    //hitbursts
    hit300: "data/hit300.png",
    hit300g: "data/hit300g.png",
    hit300k: "data/hit300k.png",
    hit100: "data/hit100.png",
    hit100k: "data/hit100k.png",
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
    play_skiped: "data/play-skip.png",


    cursor: "data/cursor.png",
    cursortrail: "data/cursortrail.png",
    cursormiddle: "data/cursormiddle.png",
    cursor_smoke: "data/cursor-smoke.png",


    inputoverlay_key: "data/inputoverlay-key.png",

    //Playfield
    section_fail: "data/Section-fail.png",
    section_pass: "data/Section-pass.png",
    play_warningarrow: "data/play-warningarrow.png",
    play_skip: "data/play-skip.png",

    hitcircle: "data/hitcircle.png",
    hitcicleoverlay: "data/hitcircleoverlay.png",
    approachcircle: "data/approachcircle.png",


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

function loadBeatMap(){
    osu.beatmaps.load(replay.bmMd5Hash, showReplayData, function () {
    });
}


function showReplayData(beatmap){
    osu.ui.interface.scorescreen.beatmap = beatmap;
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
 * Created by Ugrend on 10/06/2016.
 */
var event_handler = {

    EVENTS: Object.freeze({
        BEATMAP_LOADING: 1,
        BEATMAP_LOADED: 2,
        BEATMAP_LOADING_FAILED: 3,
        REPLAY_LOADING: 4,
        REPLAY_LOADED: 5,
        REPLAY_LOAD_FAILED:6,
        BEATMAP_NOTFOUND: 7,
        DB_ERROR: 8,
        ASSET_NOT_FOUND:9
    }),

    __events: {},
    on: function (eventName, fn, parent_object) {
        this.__events[eventName] = this.__events[eventName] || [];
        this.__events[eventName].push({fn: fn, parent: parent_object});
    },
    off: function (eventName, fn) {
        if (this.__events[eventName]) {
            for (var i = 0; i < this.__events[eventName].length; i++) {
                if (this.__events[eventName][i].fn === fn) {
                    this.__events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    },
    emit: function (eventName, data) {
        if (this.__events[eventName]) {
            this.__events[eventName].forEach(function (obj) {
                if (obj.parent) {
                    obj.parent[obj.fn](data);
                } else {
                    obj.fn(data);
                }

            });
        }
    }
};

/**
 * Created by Ugrend on 6/06/2016.
 */



var BeatmapReader = function (beatmap_zip_file, callback) {
    var beatMap = {
        maps: [],
        assets: []
    };
    event_handler.emit(event_handler.EVENTS.BEATMAP_LOADING, beatmap_zip_file.name);
    var zip_length = 0;
    var extracted = 0;
    var beatmaps = 0;
    var beatmaps_loaded = 0;

    /**
     * Converts osu data/beatmap config file into a JS object
     * @param data
     * @returns {{version: string, general: {}, metadata: {}, difficulty: {}, events: Array, timing_points: Array, colours: {}, hit_objects: Array}}
     */
    var parse_osu_map_data = function (data) {
        var beatmap_config = {
            version: "",
            name:"",
            general: {},
            metadata: {},
            difficulty: {},
            events: [],
            timing_points: [],
            colours: {},
            hit_objects: []
        };
        var lines = data.replace("\r", "").split("\n");
        beatmap_config.version = lines[0];
        var current_setting = null;
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            if (line === "") {
                continue;
            }
            if (line.indexOf("//") == 0) {
                continue;
            }
            if (line.indexOf("[") == 0) {
                current_setting = line.toLowerCase();
                continue;
            }
            switch (current_setting) {
                case "[general]":
                    var settings = line.split(":");
                    if (settings.length == 2) {
                        beatmap_config.general[settings[0]] = settings[1].trim();
                    }
                    break;
                case "[editor]":
                    break;
                case "[metadata]":
                    var settings = line.split(":");
                    if (settings.length > 1) {
                        // Im not sure if title/creator/etc can have : in them but just to be safe ill assume it can
                        beatmap_config.metadata[settings[0]] = settings.splice(1).join(":").trim()
                    }
                    break;
                case "[difficulty]":
                    var settings = line.split(":");
                    if (settings.length == 2) {
                        beatmap_config.difficulty[settings[0]] = settings[1];
                    }
                    break;
                case "[events]":
                    beatmap_config.events.push(line.split(","));
                    break;
                case "[timingpoints]":
                    beatmap_config.timing_points.push(line.split(","));
                    break;
                case "[colours]":
                    var settings = line.split(":");
                    if (settings.length == 2) {
                        beatmap_config.colours[settings[0]] = settings[1].split(",");
                    }
                    break;
                case "[hitobjects]":
                    //TODO: this will only convert circles need to do sliders and spinz
                    //TODO: this might fuck other game modes need to look into
                    //This will prepend a int to the start of the array so i can check easier for the type of hitobject later instead of checking the length all the time
                    var hit_object = line.split(",");
                    switch(hit_object[3]){
                        case "1":
                        case "4":
                        case "9":
                            //circle /spinner
                            if(hit_object.length > 7){
                                console.log("mayber slider " + line);
                            }
                            for(var x = 0; x < hit_object.length; x++){
                                //convert from string to int/float
                                hit_object[x] = parseFloat(hit_object[x]);
                            }
                            break;
                        case "2":
                            //slider
                            break;
                        case "5":
                        case "6":
                        case "12":
                        case "21":
                            //not sure but is for taiko
                            //12 appears in normal beatmaps
                            break;
                        default:
                            console.log("WARNING: unknown hit object line:" + i + " -- " +  line);
                    }
                    beatmap_config.hit_objects.push(hit_object);
                    break;

            }


        }

        return beatmap_config;
    };


    var beatmap_loaded = function () {
        if (beatmaps_loaded == beatmaps) {
            event_handler.emit(event_handler.EVENTS.BEATMAP_LOADED, beatmap_zip_file.name);
            callback(beatMap);
        }
    };

    var processing_complete = function () {
        if (extracted == zip_length) {

            beatmaps = beatMap.maps.length;
            for (var i = 0; i < beatMap.maps.length; i++) {
                var beatmap = beatMap.maps[i];
                beatmap.files = [];
                for (var x = 0; x < beatMap.assets.length; x++) {
                    beatmap.files.push(
                        {
                            md5sum: beatMap.assets[x].md5sum,
                            filename: beatMap.assets[x].filename
                        }
                    )
                }
                beatmap.parsed = parse_osu_map_data(beatmap.data);
                database.insert_data(database.TABLES.BEATMAPS, beatmap.md5sum, beatmap, function () {
                    beatmaps_loaded++;
                    beatmap_loaded();
                }, function () {
                    beatmaps_loaded++;
                    beatmap_loaded();
                });

            }


        }
    };

    zip.createReader(new zip.BlobReader(beatmap_zip_file), function (reader) {

        // get all entries from the zip
        reader.getEntries(function (entries) {
            if (entries.length) {
                zip_length = entries.length;
                for (var i = 0; i < entries.length; i++) {

                    if (entries[i].filename.split(".").pop() == "osu") {
                        var extract_data = function (i) {
                            entries[i].getData(new zip.TextWriter(), function (text) {
                                var filename = entries[i].filename;
                                extracted++;
                                var md5sum = md5(text);
                                beatMap.maps.push({
                                    filename: filename,
                                    data: text,
                                    md5sum: md5sum
                                });
                                //we add beatmaps to the db last to join to all the assets
                                processing_complete();
                            }, function (current, total) {

                            });
                        };
                        extract_data(i);
                    }

                    else if (entries[i].filename.split(".").pop() == "png") {
                        var extract_data = function (i) {
                            entries[i].getData(new zip.Data64URIWriter('image/png'), function (data) {
                                var filename = entries[i].filename;
                                extracted++;
                                var md5sum = md5(data);
                                beatMap.assets.push({
                                    filename: filename,
                                    data: data,
                                    md5sum: md5sum,
                                });
                                database.insert_data(database.TABLES.ASSETS, md5sum, data, processing_complete, processing_complete);
                            }, function (current, total) {

                            });
                        };
                        extract_data(i);
                    }
                    else if (entries[i].filename.split(".").pop() == "wav") {
                        var extract_data = function (i) {
                            entries[i].getData(new zip.Data64URIWriter('audio/wav'), function (data) {
                                var filename = entries[i].filename;
                                extracted++;
                                var md5sum = md5(data);
                                beatMap.assets.push({
                                    filename: filename,
                                    data: data,
                                    md5sum: md5sum
                                });
                                database.insert_data(database.TABLES.ASSETS, md5sum, data, processing_complete, processing_complete);
                            }, function (current, total) {

                            });
                        };
                        extract_data(i)
                    }

                    else if (entries[i].filename.split(".").pop() == "jpg" || entries[i].filename.split(".").pop() == "jpeg") {
                        var extract_data = function (i) {
                            entries[i].getData(new zip.Data64URIWriter('image/jpeg'), function (data) {
                                var filename = entries[i].filename;
                                extracted++;
                                var md5sum = md5(data);
                                beatMap.assets.push({
                                    filename: filename,
                                    data: data,
                                    md5sum: md5sum
                                });

                                database.insert_data(database.TABLES.ASSETS, md5sum, data, processing_complete, processing_complete);
                            }, function (current, total) {

                            });
                        };
                        extract_data(i)
                    }

                    else if (entries[i].filename.split(".").pop() == "mp3") {
                        var extract_data = function (i) {
                            entries[i].getData(new zip.Data64URIWriter('audio/mpeg'), function (data) {
                                var filename = entries[i].filename;
                                extracted++;
                                var md5sum = md5(data);
                                beatMap.assets.push({
                                    filename: filename,
                                    data: data,
                                    md5sum: md5sum
                                });
                                database.insert_data(database.TABLES.ASSETS, md5sum, data, processing_complete, processing_complete);
                            }, function (current, total) {

                            });
                        };
                        extract_data(i)
                    }
                    else {
                        extracted++;
                        processing_complete();
                    }

                }


            }

        });
    }, function (error) {
        console.log(error);
    });

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

        var file = e.dataTransfer.files[0];
        var reader = new FileReader();
        reader.onloadend = function (event) {

            if(event.target.readyState === 2){
                        var replay_data = event.target.result;
                        replay = ReplayParser(replay_data);
                        loadBeatMap();
            }else{
                dragDropLabel.innerHTML = "Well ummm, yeh i dont know what to do but something went wrong";
                resetLabel();
            }

        };

            if(file.name.split(".").pop() == "osr") {
                reader.readAsBinaryString(file);
            }else if(file.name.split(".").pop() == "osz"){
                //beatmap
                if(beatmap &&  beatmap.locked){
                    event_handler.emit(event_handler.EVENTS.BEATMAP_LOADING_FAILED, "beatmap is locked")
                }else{
                    BeatmapReader(file, function (bm) {
                            beatmap = bm;
                    });
                }

            }else if(file.name.split(".").pop() !== "osk"){
                //skin
            }else{
                dragDropLabel.innerHTML = "i dont know what that is";
                resetLabel();
            }

        return false;
    };
}
/**
 * Created by Ugrend on 6/06/2016.
 */
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;


var database = {

    __db: null,
    __started: false,
    indexeddb_available: false,

    TABLES: Object.freeze({
        BEATMAPS: "beatmaps",
        REPLAYS: "replays",
        SKINS: "skins",
        ASSETS: "assets",

    }),


    init: function () {
        var self = this;
        var openRequest = indexedDB.open("osu", 1);
        openRequest.onupgradeneeded = function (e) {
            var thisDB = e.target.result;
            for(var k in database.TABLES){
                if (!thisDB.objectStoreNames.contains(database.TABLES[k])) {
                    thisDB.createObjectStore(database.TABLES[k]);
                }
            }
        };
        openRequest.onsuccess = function (e) {
            self.__db = e.target.result;
            self.__started = true;
        };
        openRequest.onerror = function (e) {
            console.log(e);
        };

        this.indexeddb_available = true;

    },

    insert_data: function (table, md5sum, data, onsuccess, onerror) {
        if (this.__started) {
            var transaction = this.__db.transaction([table], "readwrite").objectStore(table).add(data, md5sum);
            transaction.onsuccess =   onsuccess;
            transaction.onerror = function(e){
                console.log(e.target.error);
                onerror(e);
            };
        }
        else {
            onerror("db not started");
        }

    },
    get_data: function (table, md5sum, onsuccess, onerror) {
        if (this.__started) {
            var query = this.__db.transaction([table], "readonly").objectStore(table).get(md5sum);
            query.onsuccess = function (e) {
              onsuccess({md5sum: md5sum, data:e.target.result});
            };
            query.onerror = onerror;
        } else {
             onerror("db not started");
        }
    },

    delete_database: function () {
      if(DEBUG) {
          indexedDB.deleteDatabase('osu');
      }else{
          console.log("no");
      }
    },
    clear_table: function(table_name){
        if(DEBUG){
            var transaction = this.__db.transaction([table_name], "readwrite");
            var objectStore = transaction.objectStore(table_name);
            var objectStoreRequest = objectStore.clear();

            objectStoreRequest.onsuccess = function(event) {
                console.log(table_name + " cleared!");

            }
        }else{
            console.log("no");
        }

    }



};

if (!window.indexedDB) {
    console.log("no index db = no storage ")
}
else {
    database.init();
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
    event_handler.emit(event_handler.EVENTS.REPLAY_LOADING);
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
               var splitData = replayData[i].split("|");
                for(var x = 0; x< splitData.length ; x++){
                    splitData[x] = parseFloat(splitData[x]);
                }
                replayData[i] = splitData;
            }
            replay.replayData = replayData;
        },
        function(){}
    );




    var epoch = (replay.time_played - 621355968000000000) / 10000 ;
    var date_time = new Date(epoch);
    replay.time_played = date_time.toLocaleString();


    replay.grade = osu.score.getGrade(replay.h300, replay.h100, replay.h50,replay.hMisses).name;
    replay.accuracy = osu.score.getAccuracy(replay.h300, replay.h100, replay.h50,replay.hMisses);
    event_handler.emit(event_handler.EVENTS.REPLAY_LOADED);
    replay.been_rendered = false;
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
 * Created by Ugrend on 9/06/2016.
 */
var osu = osu || {};
osu.audio = osu.audio || {};
osu.audio.music =  {

    preview_screen: false,
    preview_time: 0,
    __audio: new Audio(),

    init: function (src) {
        this.__audio.pause();
        this.__audio.src = src;
        this.__audio.onended = this.repeat.bind(this);
        this.__audio.volume = 0.2;
    },

    stop: function () {
        this.__audio.pause();
        this.__audio.currentTime = 0;
    },

    start: function(){
        if(this.preview_screen){
            this.__audio.currentTime = this.preview_time;
            this.__audio.play();
        }
        else{
            this.__audio.currentTime = 0;
            this.__audio.play();
        }

    },
    set_position: function (t) {
        this.__audio.currentTime = t;
    },

    play: function(){
        this.__audio.play()
    },

    repeat: function () {
        if(this.preview_screen){
            this.start();
        }

    }












};


/**
 * Created by Ugrend on 4/06/2016.
 */
// https://osu.ppy.sh/wiki/Osu_%28file_format%29


var osu = osu || {};
osu.beatmaps = {
    beatmap_found: false,
    map_name: "",
    required_files: [],
    background: "",
    map_data: "",
    assets: [],
    song: "",
    __beatmap: "",
    __files_needed: [],

    load: function (md5sum, onsuccess, onerror) {
        this.onsuccess = onsuccess;
        this.onerror = onerror;
        // check if last loaded beatmap has our data first (incase indexeddb is unavailable/etc)
        if(beatmap){
            for(var i=0; i < beatmap.maps.length; i++){
                if(beatmap.maps[i].md5sum == md5sum){
                    beatmap.locked = true; //lock the data to prevent droping another beatmap
                    this.map_data = beatmap.maps[i].parsed;
                    this.required_files = beatmap.maps[i].files;
                    this.assets = beatmap.assets;
                    this.beatmap_found = true;
                    break;
                }
            }
            this.__beatmap_loaded();
        }else{
            database.get_data(database.TABLES.BEATMAPS,md5sum,this.__load_bm_from_db.bind(this), function (e) {
                event_handler.emit(event_handler.EVENTS.DB_ERROR, e.event.error);
            } );
        }
    },
    __load_bm_from_db: function (result) {
        if(result && result.data){
            this.__beatmap = result.data;
            this.map_data = this.__beatmap.parsed;
            this.required_files = this.__beatmap.files;
            this.__files_needed = this.__beatmap.files.slice(0);
            var file_to_get =  this.__files_needed.pop().md5sum;
            database.get_data(database.TABLES.ASSETS, file_to_get, this.__load_assets_from_db.bind(this), function (e) {
                event_handler.emit(event_handler.EVENTS.DB_ERROR, e.event.error);
            } );
        }
    },
    __load_assets_from_db: function (result) {
        if(result && result.data){
            this.assets.push(result);
        }else{
            event_handler.emit(event_handler.EVENTS.ASSET_NOT_FOUND, result.md5sum)
        }
        if(this.__files_needed.length){
            var file_to_get =  this.__files_needed.pop().md5sum;
            database.get_data(database.TABLES.ASSETS, file_to_get, this.__load_assets_from_db.bind(this), function (e) {
                event_handler.emit(event_handler.EVENTS.DB_ERROR, e.event.error);
            } );
        }else{
            this.beatmap_found = true;
            this.__beatmap_loaded();
        }

    }
    ,

    __beatmap_loaded: function () {
        if(this.beatmap_found){
            this.__process_beatmap();
            this.onsuccess(this);
        }else{
            event_handler.emit(event_handler.EVENTS.BEATMAP_NOTFOUND, md5sum);
            this.onerror("beatmap not found: " + md5sum);

        }
    },

    __process_beatmap: function(){
        this.song = this.__get_asset_from_md5(this.__lookup_file_md5(this.map_data.general.AudioFilename));
        this.background = this.__get_asset_from_md5(this.__lookup_file_md5(this.map_data.events[0][2].replace(/"/g,'')));
        this.map_name = this.map_data.metadata.Artist + " - " + this.map_data.metadata.Title + " [" + this.map_data.metadata.Version + "]";
        this.author = this.map_data.metadata.Creator;
    },
    __lookup_file_md5: function(filename){
        for(var i=0;i < this.required_files.length; i++){
            if(this.required_files[i].filename == filename){
                return this.required_files[i].md5sum;
            }
        }
    },
    __get_asset_from_md5: function(md5){
        for(var i=0;i < this.assets.length; i++){
            if(this.assets[i].md5sum == md5){
                return this.assets[i].data;
            }
        }
    },








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
        var maxHits = h300 + h100 + h50 + hMisses;
        var percent = (h300 * 300 + h100* 100 + h50 * 50) / (maxHits * 300) * 100;
        return parseFloat(percent).toFixed(2);
    },

    parseAccuracyFromReplay: function (replay) {
        return this.getAccuracy(replay.h300 + replay.hGekis, replay.h100 + replay.hKatus, replay.h50, replay.hMisses)
    }





};
/**
 * Created by Ugrend on 9/06/2016.
 */

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
    replay_intro_time: -1,
    end_skip_frame: -1,
    skip_frames: [],
    flash_count:0,
    warning_arrow_times: [],


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
    create_skip_container: function () {
        this.skip_container = new PIXI.Container();
        var skip_texture =  new PIXI.Texture.fromImage(osu.skins.play_skip);
        var skip_sprite = new PIXI.Sprite(skip_texture);
        skip_sprite.anchor.set(0.5);
        skip_sprite.x = this.calculate_x(512);
        skip_sprite.y = this.calculate_y(384);
        skip_sprite.interactive = true;
        skip_sprite.on("mouseup", this.skip_intro.bind(this));
        this.skip_container.visible = false;

        this.skip_container.addChild(skip_sprite);
        this.master_container.addChild(this.skip_container);

    },

    create_play_warn_arrows_container: function () {
        this.arrow_container = new PIXI.Container();
        var arrow_texture = new PIXI.Texture.fromImage(osu.skins.play_warningarrow);
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

    },
    create_fail_container: function () {

    },



    create_master_container: function () {
        this.hit_object_container = new PIXI.Container();

        this.create_background();
        this.create_key_press();
        this.master_container.addChild(this.hit_object_container);
        this.create_skip_container();
        this.create_play_warn_arrows_container();
        this.create_cursor();

    },

    flash_warning_arrows: function () {
        if(this.flash_count < 15){
            var self  = this;
            setTimeout(function () {
                self.arrow_container.visible = !self.arrow_container.visible;
                self.flash_count++;
                self.flash_warning_arrows()
            },150);

        }else{
           this.arrow_container.visible = false;
            this.flash_count = 0;
        }

    },

    show_success: function () {

    },
    show_failure: function () {

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
        this.warning_arrow_times = [];
        var is_hidden  = false;
        for(var i=0;i < this.mods.length; i++){
            if(this.mods[i].code = "HD"){
                is_hidden = true;
                break;
            }

        }

        for(i=0; i<this.beatmap.map_data.events.length;i++){

        }

        for(i=0;i<this.beatmap.map_data.hit_objects.length; i++){

            if(this.beatmap.map_data.hit_objects[i][3] == 1){
                var x = this.calculate_x(this.beatmap.map_data.hit_objects[i][0]);
                var y = this.calculate_y(this.beatmap.map_data.hit_objects[i][1]);
                //TODO combo/colours/diameter/etc
                var approachRate = parseInt(this.beatmap.map_data.difficulty.ApproachRate);
                var circleSize = (this.getRenderWidth()/640) * (108.848 - (parseInt(this.beatmap.map_data.difficulty.CircleSize) * 8.9646));
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

        this.skip_frames =[];

        //calculate skip values
        var skip_time = -1;
        var skip_frame = -1;
        this.end_skip_frame = -1;
        var time_count = 0;
        for (var i = 0; i < this.replay_data.length; i++) {
            if(this.replay_data[i][2] < 0 && this.replay_data[i][0] > 0){
                skip_time = this.replay_data[i][0];
                skip_frame = i;
                break;
            }
            if(i > 5){
                //no need to go too far into the future
                break;
            }
        }
        if(skip_time > -1){
            this.warning_arrow_times.push(skip_time);
            for (var i = skip_frame+1; i < this.replay_data.length; i++) {
                if(this.replay_data[i][0] >= 0){
                    if(time_count < skip_time){
                        time_count += this.replay_data[i][0]
                    }else{
                        this.end_skip_frame = i;
                        break;
                    }
                }
            }
            var time_difference = time_count - skip_time;
            if(time_difference > 0){
                var i = this.end_skip_frame;
                while(time_difference > 0){
                    var remainder = time_difference % this.replay_data[i][0];
                    if(remainder > 0 && remainder != time_difference){
                        this.skip_frames.push({
                            frame: i,
                            minus: remainder
                        });
                        time_difference -= remainder;
                        i++
                    }else{
                        this.skip_frames.push({
                            frame: i,
                            minus: remainder
                        });
                        time_difference = 0;

                    }

                }

            }
        }


    },

    /*osu coords are 512/384 but we dont want 0,512/etc to appear almost off screen
    So instead will devide by a bigger but same aspect ratio and increase the original x/y by the difference/2
     */
    calculate_x: function(x){
        return  (this.getRenderWidth()/640) * (x + 64);
    },
    calculate_y: function(y){
        return  (this.getRenderHeight()/480) * (y + 48);
    },

    render_object: function(){

        var time = Date.now() - this.date_started;
        for(var x = 0; x < this.warning_arrow_times.length ; x++){
            if(time > this.warning_arrow_times[x]){
                this.warning_arrow_times.splice(x,1);
                this.flash_warning_arrows();
                break;
            }
        }
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

    skip_intro: function () {
        if(this.replay_intro_time != -1){
            for(var i = 0; i< this.skip_frames.length ; i++){
                var frame = this.skip_frames[i].frame;
                var minus = this.skip_frames[i].minus;
                this.replay_data[frame][0] -= minus
            }
            osu.audio.music.set_position(this.replay_intro_time/1000);
            this.curr_replay_frame = this.end_skip_frame;
            this.expected_replay_movment_time = null;// clear current movement frame
            //set the time we started back in time so objects will spawn
            var elapsed_time = Date.now() - this.date_started;

            this.date_started -= (this.replay_intro_time - elapsed_time);

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
            if(this.replay_intro_time > -1 && this.date_started + this.replay_intro_time < Date.now()){
                this.replay_intro_time = -1;
                this.skip_container.visible = false;
            }



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
                /*

                 It seems if Y coord is negative it indicates how much time to skip ahead
                 I have had a map replay where it will go

                 8383T , -500Y

                 which does seem to be the skip value

                  on the next frame
                  -8383 , 310Y
                  Which would also to be with the skip but i cant see how it would be used
                  The replay would then continue as normal

                  To skip I would need to calculate the time spent in the skip duration and skip that far ahead in the replay


                */
                if(next_movment[2] < 0 && next_movment[0] > 0){
                    this.replay_intro_time = next_movment[0];
                    this.skip_container.visible = true;
                }
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
/**
 * Created by Ugrend on 4/06/2016.
 */


var osu = osu || {};
osu.ui = osu.ui || {};
osu.ui.interface = osu.ui.interface || {};
osu.ui.interface.scorescreen = {
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
    beatmap: {},
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
        var background = PIXI.Texture.fromImage(this.beatmap.background);
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

        this.map_name_text = new PIXI.Text(this.beatmap.map_name, this.map_details_heading_style);
        this.map_name_text.x = 5;
        this.map_name_text.y = this.getRenderHeight() *0.01;

        this.map_made_by = new PIXI.Text("Beatmap by " + this.beatmap.author, this.map_details_style);
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
        osu.audio.music.stop();
        osu.audio.music.preview_screen = false;
        osu.ui.interface.osugame.replay_data = replay.replayData;
        osu.ui.interface.osugame.beatmap = this.beatmap;
        osu.ui.interface.osugame.initGame();
        osu.ui.interface.osugame.game_loop();
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

        osu.audio.music.init(this.beatmap.song);
        osu.audio.music.preview_screen = true;
        osu.audio.music.preview_time = this.beatmap.map_data.general.PreviewTime / 1000;
        osu.audio.music.start();


    }

};
/**
 * Created by Ugrend on 11/06/2016.
 */

    //TODO: THIS WILL MOVE ONCE SKIN SECTION IS DONE
var hit_circle_texture = PIXI.Texture.fromImage(osu.skins.hitcircle);
var hit_circle_overlay = PIXI.Texture.fromImage(osu.skins.hitcicleoverlay);
var approach_circle_texture = PIXI.Texture.fromImage(osu.skins.approachcircle);

class Circle{
    constructor(container,is_hidden, x, y, approach_rate, hit_time,diameter, colour, combo) {
        this.container = container;
        this.x = x;
        this.y = y;
        this.is_hidden = is_hidden;
        this.diameter = diameter;
        this.colour = colour;
        this.circleContainer = new PIXI.Container();
        this.circleSprite =  new PIXI.Sprite(hit_circle_texture);
        this.circleSprite.tint = this.colour;
        this.circleSprite.anchor.set(0.5);
        this.circleSprite.height = diameter;
        this.circleSprite.width = diameter;
        this.approach_rate = approach_rate;
        this.hit_time = hit_time;
        if(!is_hidden) {
            this.approchCircleSprite = new PIXI.Sprite(approach_circle_texture);
            this.approchCircleSprite.tint = colour;
            this.approchCircleSprite.anchor.set(0.5);
            this.approchCircleSprite.width = this.diameter * 3;
            this.approchCircleSprite.height = this.diameter * 3;
            this.circleContainer.addChild(this.approchCircleSprite);
        }


        this.circleOverlaySprite =  new PIXI.Sprite(hit_circle_overlay);
        this.circleOverlaySprite.height = diameter;
        this.circleOverlaySprite.width = diameter;
        this.circleOverlaySprite.anchor.set(0.5);
        this.circleContainer.addChild(this.circleSprite);
        this.circleContainer.addChild(this.circleOverlaySprite);



        this.last_draw_time = 0;


        this.circleContainer.x = x;
        this.circleContainer.y = y;
        this.drawn = false;
        this.destroyed = false;
    }


    draw(cur_time){

        if(this.destroyed){
            return false;
        }

        if(!this.destroyed && cur_time > this.hit_time + 110 ){
            this.destroy();
            this.destroyed = true;
        }


        if(!this.destroyed && cur_time < this.hit_time + this.approach_rate){
            if(!this.is_hidden){
                //dont need to calculate this so often
                if(Date.now() - this.last_draw_time > 35) {
                    var time_diff = this.hit_time - cur_time;
                    var scale = 1 + (time_diff / this.approach_rate) * 3;
                    if (scale < 1) scale = 1;
                    this.approchCircleSprite.width = this.diameter * scale;
                    this.approchCircleSprite.height = this.diameter * scale;
                    this.last_draw_time = Date.now();
                }
            }
            if(!this.drawn){
                this.container.addChildAt(this.circleContainer,0);
                this.drawn = true;
            }
        }
        return true;
    }

    hit(time){

    }

    destroy(){
        this.container.removeChild(this.circleContainer);

    }

}


/**
 * Created by Ugrend on 11/06/2016.
 */

/**
 * Created by Ugrend on 11/06/2016.
 */
