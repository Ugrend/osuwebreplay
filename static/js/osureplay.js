/**
 * main.js
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
 * skins.js
 * Created by Ugrend on 4/06/2016.
 */
var osu = osu || {};
//TODO: create PIXI textures
osu.skins = {

    //https://osu.ppy.sh/wiki/Skinning_Standard
    //https://osu.ppy.sh/wiki/Skinning_Interface

    COMBO_COLOURS: [0xFFC000,0x00CA00,0x127CFF,0xF21839],

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
    pause_replay: "data/pause-replay.png",
    menu_back: "data/menu-back.png",

    cursor: "data/cursor.png",
    cursortrail: "data/cursortrail.png",
    cursormiddle: "data/cursormiddle.png",
    cursor_smoke: "data/cursor-smoke.png",


    inputoverlay_key: "data/inputoverlay-key.png",
    star: "data/star.png",

    //Playfield
    section_fail: "data/section-fail.png",
    section_pass: "data/section-pass.png",
    play_warningarrow: "data/play-warningarrow.png",
    play_skip: "data/play-skip.png",

    hitcircle: "data/hitcircle.png",
    hitcicleoverlay: "data/hitcircleoverlay.png",
    approachcircle: "data/approachcircle.png",
    followpoint: "data/followpoint.png",
    sliderfollowcircle: "data/sliderfollowcircle.png",
    reversearrow: "data/reversearrow.png",


    sliderb: [
    "data/sliderb0.png",
    "data/sliderb1.png",
    "data/sliderb2.png",
    "data/sliderb3.png",
    "data/sliderb4.png",
    "data/sliderb5.png",
    "data/sliderb6.png",
    "data/sliderb7.png",
    "data/sliderb8.png",
    "data/sliderb9.png"
    ],

    spinner_approachcircle: "data/spinner-approachcircle.png",
    spinner_background: "data/spinner-background.png",
    spinner_bottom: "data/spinner-bottom.png",
    spinner_circle: "data/spinner-circle.png",
    spinner_clear: "data/spinner-clear.png",
    spinner_glow: "data/spinner-glow.png",
    spinner_metre: "data/spinner-metre.png",
    spinner_middle: "data/spinner-middle.png",
    spinner_middle2: "data/spinner-middle2.png",
    spinner_osu: "data/spinner-osu.png",
    spinner_rpm: "data/spinner-rpm.png",
    spinner_spin: "data/spinner-spin.png",
    spinner_top: "data/spinner-top.png",
    spinner_warning: "data/spinner-warning.png",



    default_0: "data/default-0.png",
    default_1: "data/default-1.png",
    default_2: "data/default-2.png",
    default_3: "data/default-3.png",
    default_4: "data/default-4.png",
    default_5: "data/default-5.png",
    default_6: "data/default-6.png",
    default_7: "data/default-7.png",
    default_8: "data/default-8.png",
    default_9: "data/default-9.png",
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
    selection_mod_suddendeath: "data/selection-mod-suddendeath.png",





    //AUDIO

    audio: {
        applause: 'data/applause.wav',
        combobreak: 'data/combobreak.wav',
        count1s: 'data/count1s.wav',
        count2s: 'data/count2s.wav',
        count3s: 'data/count3s.wav',
        drum_hitclap: 'data/drum-hitclap.wav',
        drum_hitfinish: 'data/drum-hitfinish.wav',
        drum_hitfinish2: 'data/drum-hitfinish2.wav',
        drum_hitnormal: 'data/drum-hitnormal.wav',
        drum_hitnormal19: 'data/drum-hitnormal19.wav',
        drum_hitnormal2: 'data/drum-hitnormal2.wav',
        drum_hitwhistle: 'data/drum-hitwhistle.wav',
        drum_sliderslide: 'data/drum-sliderslide.wav',
        drum_slidertick: 'data/drum-slidertick.wav',
        drum_sliderwhistle: 'data/drum-sliderwhistle.wav',
        failsound: 'data/failsound.wav',
        gos: 'data/gos.wav',
        menuback: 'data/menuback.wav',
        menuclick: 'data/menuclick.wav',
        menuhit: 'data/menuhit.wav',
        normal_hitclap: 'data/normal-hitclap.wav',
        normal_hitfinish: 'data/normal-hitfinish.wav',
        normal_hitnormal: 'data/normal-hitnormal.wav',
        normal_hitwhistle: 'data/normal-hitwhistle.wav',
        normal_sliderslide: 'data/normal-sliderslide.wav',
        normal_slidertick: 'data/normal-slidertick.wav',
        normal_sliderwhistle: 'data/normal-sliderwhistle.wav',
        readys: 'data/readys.wav',
        sectionfail: 'data/sectionfail.wav',
        sectionpass: 'data/sectionpass.wav',
        shutter: 'data/shutter.wav',
        soft_hitclap: 'data/soft-hitclap.wav',
        soft_hitclap19: 'data/soft-hitclap19.wav',
        soft_hitfinish: 'data/soft-hitfinish.wav',
        soft_hitnormal: 'data/soft-hitnormal.wav',
        soft_hitwhistle: 'data/soft-hitwhistle.wav',
        soft_sliderslide: 'data/soft-sliderslide.wav',
        soft_sliderslide2: 'data/soft-sliderslide2.wav',
        soft_slidertick: 'data/soft-slidertick.wav',
        soft_sliderwhistle: 'data/soft-sliderwhistle.wav',
        spinnerbonus: 'data/spinnerbonus.wav',
        spinner_osu: 'data/spinner-osu.wav',
        spinnerspin: 'data/spinnerspin.wav',


    }


};
/**
 * replay_details.js
 * Created by Ugrend on 6/2/2016.
 */

/*
Just adding this for testing will prob remove

 */

function loadBeatMap(){
    osu.beatmaps.BeatmapLoader.load(replay.bmMd5Hash, showReplayData);
}


function showReplayData(beatmap){
    osu.ui.interface.mainscreen.hide_main_screen();
    osu.ui.interface.scorescreen.mods = replay.mods;
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
    setTimeout(function () {
        document.getElementById("render_zone").className = "";
        osu.ui.interface.scorescreen.renderScoreScreen();
    }, 500);
}
/**
 * render.js
 * Created by Ugrend on 4/06/2016.
 */


var osu = osu || {};
osu.ui = osu.ui || {};
osu.ui.renderer = {



    renderWidth: window.innerWidth,
    renderHeight: window.innerHeight,
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
        event_handler.emit(event_handler.EVENTS.RENDER);
        this.renderer.render(this.masterStage);
        requestAnimationFrame(this.animate.bind(this));
    },
    resize: function(){
        var x = window.innerWidth;
        var y = window.innerHeight;

        //just to make my life easier fix the render ratio for game play
        if(this.fixed_aspect && false) {
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
 * eventhandler.js
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
        ASSET_NOT_FOUND:9,
        RENDER:10,
        UNKNOWN_FILE_ERROR:11,
        INVALID_FILE: 12,
        BEATMAP_SELECTED: 13,
        STOP_REPLAY: 14,
        SETTINGS_CHANGED: 15,
    }),

    __events: {},
    on: function (eventName, fn, alias, parent_object) {
        this.__events[eventName] = this.__events[eventName] || [];
        this.__events[eventName].push({fn: fn, alias: alias, parent: parent_object});
    },
    off: function (eventName, alias,fn) {
        if (this.__events[eventName]) {
            for (var i = 0; i < this.__events[eventName].length; i++) {
                if (this.__events[eventName][i].fn === fn) {
                    this.__events[eventName].splice(i, 1);
                    break;
                }
                if(this.__events[eventName][i].alias == alias){
                    this.__events[eventName].splice(i,1);
                    break;
                }
            }
        }
    },
    emit: function (eventName, data) {
        if(DEBUG && eventName != event_handler.EVENTS.RENDER){
            console.log("EVENT: " + eventName);
            console.log(data);
        }
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



event_handler.on(event_handler.EVENTS.BEATMAP_LOADING, function (data) {
    var loading =   new PNotify({
        title: 'Loading beatmap',
        text: "Loading \n" + data,
        type: 'info',
        hide: 'false'
    });
    var alias = Date.now().toString();
    event_handler.on(event_handler.EVENTS.BEATMAP_LOADED, function (data_loaded) {
        var options = {
            type: "success",
            title: "Beatmap Loaded",
            text: data_loaded.filename + "\n has been successfully processed",
            hide: "true"
        };
        loading.update(options);
        //one time only event
        event_handler.off(event_handler.EVENTS.BEATMAP_LOADED, alias);
    }, alias);
});



event_handler.on(event_handler.EVENTS.BEATMAP_LOADING_FAILED, function (data) {
    PNotify.removeAll();
    new PNotify({
        title: 'Beatmap Loading Failed',
        text: "Failed to load beatmap: " + data,
        type: 'error'
    });
});

event_handler.on(event_handler.EVENTS.BEATMAP_LOADING_FAILED, function (data) {
    new PNotify({
        title: 'Beatmap Loading Failed',
        text: "Failed to load beatmap: " + data,
        type: 'error'
    });
});

event_handler.on(event_handler.EVENTS.BEATMAP_NOTFOUND, function (data) {
    new PNotify({
        title: 'Beatmap not found',
        text: "Beatmap not found for replay, \n beatmap md5sum:\n" + data,
        type: 'error'
    });
});
/**
 * beatmap_reader.js
 * Created by Ugrend on 6/06/2016.
 */



var BeatmapReader = function (beatmap_zip_file, callback) {
    var beatMap = {
        maps: [],
        assets: []
    };
    var md5sums = [];
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
            name: "",
            general: {},
            metadata: {},
            difficulty: {},
            events: [],
            timing_points: [],
            colours: {},
            hit_objects: [],
            minBPM: -1,
            maxBPM: -1,
            circles: 0,
            sliders: 0,
            spinners: 0,
            time_length: 0,
        };
        var lines = data.replace("\r", "").split("\n");
        beatmap_config.version = lines[0];
        var current_setting = null;
        var parentBPMS = 500;
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
                        beatmap_config.difficulty[settings[0]] = parseFloat(settings[1]);
                    }
                    break;
                case "[events]":
                    beatmap_config.events.push(line.split(","));
                    break;
                case "[timingpoints]":
                    var parts = line.split(",");

                    var timingPoint = {
                        offset: +parts[0],
                        millisecondsPerBeat: +parts[1],
                        meter: +parts[2],
                        sampleType: +parts[3],
                        sampleSet: +parts[4],
                        volume: +parts[5],
                        inherited: +parts[6],
                        kaiMode: +parts[7]
                    };

                    if(timingPoint.inherited == 1){
                        parentBPMS = timingPoint.millisecondsPerBeat;
                        if(parentBPMS < beatmap_config.minBPM || beatmap_config.minBPM === -1){
                            if(beatmap_config.minBPM > beatmap_config.maxBPM){
                                beatmap_config.maxBPM = beatmap_config.minBPM;
                            }
                            beatmap_config.minBPM = parentBPMS;
                        }
                    }
                    else{
                        //if inherited and postive we should ignore and multiply by 1
                        //You cant do this in the editor so shouldnt happen, but this is how the game seems to handle it.
                        if(timingPoint.millisecondsPerBeat >= 0){
                            timingPoint.millisecondsPerBeat = parentBPMS;
                        }
                        else{
                            var multiplier = Math.abs(100/timingPoint.millisecondsPerBeat);
                            timingPoint.millisecondsPerBeat = parentBPMS / multiplier;
                        }
                    }
                    beatmap_config.minBPM = Math.round(60000 / beatmap_config.minBPM);
                    if(beatmap_config.maxBPM !=-1) beatmap_config.maxBPM = Math.round(60000 / beatmap_config.maxBPM);

                    beatmap_config.timing_points.push(timingPoint);
                    break;
                case "[colours]":
                    var settings = line.split(":");
                    if (settings.length == 2) {
                        beatmap_config.colours[settings[0]] = settings[1].split(",");
                    }
                    break;
                case "[hitobjects]":
                    var hit_object = osu.objects.HitObjectParser.parse_line(line, beatmap_config.timing_points, beatmap_config.difficulty.SliderMultiplier || 1);
                    switch(hit_object.type) {
                        case osu.objects.HitObjectParser.TYPES.CIRCLE:
                            beatmap_config.circles++;
                            break;
                        case osu.objects.HitObjectParser.TYPES.SLIDER:
                            beatmap_config.sliders++;
                            break;
                        case osu.objects.HitObjectParser.TYPES.SPINNER:
                            beatmap_config.spinners++;
                    }
                    beatmap_config.hit_objects.push(hit_object);
                    break;

            }


        }
        var lastHitObject = beatmap_config.hit_objects[beatmap_config.hit_objects.length-1];
        beatmap_config.time_length = lastHitObject.endTime || lastHitObject.startTime;
        return beatmap_config;
    };


    var beatmap_loaded = function () {
        if (beatmaps_loaded == beatmaps) {


            event_handler.emit(event_handler.EVENTS.BEATMAP_LOADED, {md5sums: md5sums, filename: beatmap_zip_file.name});
            callback(beatMap);
        }
    };

    var create_thumbnail = function (img_data) {
        var MAX_WIDTH = 232;
        var MAX_HEIGHT = 130;
        var canvas = document.createElement("canvas");
        var img = document.createElement("img");
        img.src = img_data;
        var width = img.width;
        var height = img.height;
        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        return canvas.toDataURL("image/jpeg");
    };

    var processing_complete = function () {
        if (extracted == zip_length) {

            beatmaps = beatMap.maps.length;
            for (var i = 0; i < beatMap.maps.length; i++) {
                var beatmap = beatMap.maps[i];

                beatmap.parsed = parse_osu_map_data(beatmap.data);
                for (var k in beatmap.parsed.metadata) {
                    beatmap[k.toLocaleLowerCase()] = beatmap.parsed.metadata[k];
                }
                beatmap.files = [];
                var background_file_name = beatmap.parsed.events[0][2].replace(/"/g, '');
                var thumbnail = "";
                for (var x = 0; x < beatMap.assets.length; x++) {
                    beatmap.files.push(
                        {
                            md5sum: beatMap.assets[x].md5sum,
                            filename: beatMap.assets[x].filename
                        }
                    );
                    if (beatMap.assets[x].filename == background_file_name) {
                        beatmap.background = beatMap.assets[x].md5sum;
                        thumbnail = create_thumbnail(beatMap.assets[x].data);
                    }
                    if(beatMap.assets[x].filename == beatmap.parsed.general.AudioFilename){
                        beatmap.song = beatMap.assets[x].md5sum;
                    }

                }
                var thumbnail_md5sum = md5(thumbnail);
                beatmap.thumbnail = thumbnail_md5sum;
                var difficultyCalc = new osu.beatmaps.DifficultyCalculator(beatmap.parsed);
                beatmap.stars = difficultyCalc.calculate();;
                md5sums.push(beatmap.md5sum);
                database.insert_data(database.TABLES.ASSETS, thumbnail_md5sum, thumbnail, function () {}, function () {});//TODO actually callback properly
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
 * filereader.js
 * Created by Ugrend on 6/2/2016.
 */
if(typeof window.FileReader === "undefined"){
    dragDropLabel.innerHTML = "Shit won't work on this browser :("
}
else {
    document.body.ondragover = function () {
        return false;
    };
    document.body.ondragend = function () {
        return false;
    };
    document.body.ondrop = function (e) {
        e.preventDefault();

        var file = e.dataTransfer.files[0];
        var reader = new FileReader();
        reader.onloadend = function (event) {

            if(event.target.readyState === 2){
                        var replay_data = event.target.result;
                        ReplayParser(replay_data, function (replay_data) {
                            replay = replay_data; //TODO: not be essentially global
                            loadBeatMap();
                        });
            }else{
                event_handler.emit(event_handler.EVENTS.UNKNOWN_FILE_ERROR);
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
                event_handler.emit(event_handler.EVENTS.INVALID_FILE);
            }

        return false;
    };
}
/**
 * indexeddb.js
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
        OPTIONS: "options"

    }),

    INDEXES: Object.freeze({
        REPLAYS: {
            BEATMAP_ID: 'beatmap_id',
            PLAYER: 'player'
        }

    }),


    init: function (onsucess) {
        var self = this;
        var createDatabase = indexedDB.open("osu", 1);
        createDatabase.onupgradeneeded = function (e) {
            var thisDB = e.target.result;
            for(var k in database.TABLES){
                if (!thisDB.objectStoreNames.contains(database.TABLES[k])) {
                    var table = thisDB.createObjectStore(database.TABLES[k]);
                    if(database.TABLES[k] == database.TABLES.BEATMAPS){
                        table.createIndex("beatmapsetid", "beatmapsetid", {unique: false});
                        table.createIndex("title", "title", {unique: false});
                        table.createIndex("titleunicode", "titleunicode", {unique: false});
                        table.createIndex("artist", "artist", {unique: false});
                        table.createIndex("artistunicode", "artistunicode", {unique: false});
                        table.createIndex("creator", "creator", {unique: false});
                        table.createIndex("tags", "tags", {unique: false});
                    }
                    if(database.TABLES[k] == database.TABLES.REPLAYS){
                        table.createIndex("beatmap_id", "bmMd5Hash", {unique: false});
                        table.createIndex("player", "playerName", {unique: false});

                    }
                }
            }
        };
        createDatabase.onsuccess = function (e) {
            self.__db = e.target.result;
            self.__started = true;
            this.indexeddb_available = true;
            onsucess();
        };
        createDatabase.onerror = function (e) {
            console.log(e);
        };





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
    get_count: function (table, onsuccess) {
        var countReq = this.__db.transaction([table], "readonly").objectStore(table).count()
        countReq.onsuccess = function () {
            onsuccess(countReq.result);
        }
    },
    delete_data: function (table,key, onsuccess) {
        var request = this.__db.transaction([table], "readwrite").objectStore(table).delete(key);
        request.onsuccess = onsuccess;
    },

    get_all_keys: function (table,callback) {
        var request = this.__db.transaction([table], "readonly").objectStore(table);
        var result = [];
        request.openCursor().onsuccess = function (event) {


            var cursor = event.target.result;
            if(cursor){
                result.push(cursor.key);
                cursor.continue();
            }else{
                callback(result);
            }


        }
    },
    get_data_from_index(table, index, param, onsuccess, onerror){
        var result = [];
        var key = IDBKeyRange.only(param);
        var query = this.__db.transaction([table], "readonly").objectStore(table).index(index).openCursor(key)
            .onsuccess= function (e) {
            var cursor = e.target.result;
            if(cursor){
                result.push(cursor.value);
                cursor.continue();
            }else{
                onsuccess(result);
            }

        };



        query.onsuccess = function (e) {
            onsuccess(e.target.result);
        };
    },
    update_data(table,key,data, onsuccess, onerror){
        onsuccess = onsuccess || function () {};
        onerror = onerror || function () {};
        if (this.__started) {
            var transaction = this.__db.transaction([table], "readwrite").objectStore(table).put(data, key);
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


/**
 * replayreader.js
 * Created by Ugrend on 2/06/2016.
 */


/**
 * Converts a hexdump of a replay file into a JS object
 * @param replay_data {String value of a hexdump of replay file}
 * @returns {{type: *, version: *, bmMd5Hash: *, playerName: *, rMd5Hash: *, h300: *, h100: *, h50: *, hGekis: *, hKatus: *, hMisses: *, tScore: *, tCombo: *, fullClear: *, mods: *, lifeBar: *, timeTicks: *, replayByteLength: *}}
 * @constructor
 */
var ReplayParser = function(replay_data, callback){
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
        mods: osu.mods.getMods(RP.getInteger()),
        lifeBar: RP.getString(),
        time_played: RP.getLong(),
        replayByteLength: RP.getInteger()
    };

    //this converts from .net ticks to epoch time
    var epoch = (replay.time_played - 621355968000000000) / 10000 ;
    var date_time = new Date(epoch);
    replay.time_played = date_time.toLocaleString();


    replay.grade = osu.score.getGrade(replay.h300, replay.h100, replay.h50,replay.hMisses, replay.mods).name;
    replay.accuracy = osu.score.getAccuracy(replay.h300, replay.h100, replay.h50,replay.hMisses);

    replay.been_rendered = false;

    LZMA.decompress(
        RP.replay_bytes.slice(RP.byte_index),
        function(data) {
            var replayData = data.split(",");
            var lastTimeFrame = 0;
            for(var i = 0 ; i< replayData.length ; i++){
                var splitData = replayData[i].split("|");
                for(var x = 0; x< splitData.length ; x++){
                    splitData[x] = parseFloat(splitData[x]);
                }

                if(splitData.length !=4) continue;
                var time = +splitData[0];
                if(time > 0){
                    time+= lastTimeFrame;
                    lastTimeFrame = time;
                }

                var replayFrame = {
                    t: time,
                    x:splitData[1],
                    y: splitData[2],
                    keys: osu.keypress.get_keys(splitData[3])

                };


                replayData[i] = replayFrame;
            }


            replay.replayData = replayData;

            database.insert_data(database.TABLES.REPLAYS, replay.rMd5Hash, replay, function () {
                event_handler.emit(event_handler.EVENTS.REPLAY_LOADED);
                callback(replay);
            }, function () {
                event_handler.emit(event_handler.EVENTS.REPLAY_LOADED);
                callback(replay);
            });
        },
        function(){}
    );

};

/**
 * skinreader.js
 * Created by Ugrend on 6/06/2016.
 */
var SkinReader = function(skin_zip) {
    var skins = {};




    return skins;


};
/**
 *hitsounds.js
 * Created by Ugrend on 9/07/2016.
 */
var osu = osu || {};
osu.audio = osu.audio || {};
osu.audio.HitSound = {
    HIT_SOUNDS: {
        SOUND_NORMAL: "HITNORMAL",
        SOUND_WHISTLE: "HITWHISTLE",
        SOUND_FINISH: "HITFINISH",
        SOUND_CLAP: "HITCLAP",
    },
    HIT_ADDITIONS: {
        NORMAL: "NORMAL_",
        SOFT: "SOFT_",
        DRUM: "DRUM_"
    },

    getHitSounds: function (hitSoundArray, timing,noNormals) {
        noNormals = noNormals || false;
        var soundArray = [];
        var hitAdditons = this.HIT_ADDITIONS.NORMAL;
        switch(timing.sampleType){
            case osu.objects.HitObjectParser.HIT_ADDITIONS.DRUM:
                hitAdditons = this.HIT_ADDITIONS.DRUM;
                break;
            case osu.objects.HitObjectParser.HIT_ADDITIONS.SOFT:
                hitAdditons = this.HIT_ADDITIONS.SOFT;
        }
        if(!noNormals){
            soundArray.push(osu.audio.sound[this.HIT_ADDITIONS.NORMAL+this.HIT_SOUNDS.SOUND_NORMAL]);
        }

        for(var i = 0 ; i < hitSoundArray.length; i ++){
            switch(hitSoundArray[i]){
                case osu.objects.HitObjectParser.HIT_SOUNDS.SOUND_NORMAL:
                    break;
                case osu.objects.HitObjectParser.HIT_SOUNDS.SOUND_WHISTLE:
                    soundArray.push(osu.audio.sound[hitAdditons+this.HIT_SOUNDS.SOUND_WHISTLE]);
                    break;
                case osu.objects.HitObjectParser.HIT_SOUNDS.SOUND_FINISH:
                    soundArray.push(osu.audio.sound[hitAdditons+this.HIT_SOUNDS.SOUND_FINISH]);
                    break;
                case osu.objects.HitObjectParser.HIT_SOUNDS.SOUND_CLAP:
                    soundArray.push(osu.audio.sound[hitAdditons+this.HIT_SOUNDS.SOUND_CLAP]);
                    break;
            }

        }
        return soundArray;
    }


};
/**
 * music_controller.js
 * Created by Ugrend on 9/06/2016.
 */
var osu = osu || {};
osu.audio = osu.audio || {};
osu.audio.music =  {

    preview_screen: false,
    preview_time: 0,
    __audio: new Audio(),
    md5sum: "",
    playing: false,
    events_bound: false,

    init: function (src, md5sum) {

        if(!this.events_bound){
            event_handler.on(event_handler.EVENTS.SETTINGS_CHANGED, this.set_volume.bind(this));
            this.events_bound = true;
        }
        //only start again
        if(md5sum != this.md5sum){
            this.md5sum = md5sum;
            this.__audio.pause();
            this.__audio.src = src;
            this.set_volume();
            this.playing = false;
        }
        this.set_playback_speed(1);//reset playback speed if was playing DT/HT
        this.__audio.onended = this.repeat.bind(this);

    },
    set_volume: function () {
        this.__audio.volume = osu.settings.SETTINGS.master_volume * osu.settings.SETTINGS.music_volume;
    },

    stop: function () {
        this.__audio.pause();
        this.__audio.currentTime = 0;
    },

    start: function(){
        if(this.preview_screen){
            if(!this.playing){
                this.__audio.currentTime = this.preview_time;
                this.__audio.play();
                this.playing = true;
            }

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
    set_playback_speed: function (rate) {
        this.__audio.playbackRate = rate;

    },

    repeat: function () {
        if(this.preview_screen){
            this.playing = false;
            this.start();
        }

    }












};


/**
 * sound_effects.js
 * Created by Ugrend on 16/06/2016.
 */
var osu = osu || {};
osu.audio = osu.audio || {};
osu.audio.sound = {
    APPLAUSE: '',
    COMBOBREAK: '',
    COUNT1S: '',
    COUNT2S: '',
    COUNT3S: '',
    DRUM_HITCLAP: '',
    DRUM_HITFINISH: '',
    DRUM_HITNORMAL: '',
    DRUM_HITWHISTLE: '',
    DRUM_SLIDERSLIDE: '',
    DRUM_SLIDERTICK: '',
    DRUM_SLIDERWHISTLE: '',
    FAILSOUND: '',
    GOS: '',
    MENUBACK: '',
    MENUCLICK: '',
    MENUHIT: '',
    NORMAL_HITCLAP: '',
    NORMAL_HITFINISH: '',
    NORMAL_HITNORMAL: '',
    NORMAL_HITWHISTLE: '',
    NORMAL_SLIDERSLIDE: '',
    NORMAL_SLIDERTICK: '',
    NORMAL_SLIDERWHISTLE: '',
    READYS: '',
    SECTIONFAIL: '',
    SECTIONPASS: '',
    SHUTTER: '',
    SOFT_HITCLAP: '',
    SOFT_HITFINISH: '',
    SOFT_HITNORMAL: '',
    SOFT_HITWHISTLE: '',
    SOFT_SLIDERSLIDE: '',
    SOFT_SLIDERTICK: '',
    SOFT_SLIDERWHISTLE: '',
    SPINNERBONUS: '',
    SPINNER_OSU: '',
    SPINNERSPIN: '',

    initialised: false,

    play_sound(effect,volume){
        if(!this.initialised || effect == '') return;
        volume = volume || 1;
        effect.volume = (osu.settings.SETTINGS.master_volume * osu.settings.SETTINGS.sound_effects_volume) * volume;
        effect.currentTime = 0;
        effect.play();
    },

    init(){
        this.APPLAUSE = new Audio(src=osu.skins.audio.applause);
        this.COMBOBREAK = new Audio(src=osu.skins.audio.combobreak);
        this.COUNT1S = new Audio(src=osu.skins.audio.count1s);
        this.COUNT2S = new Audio(src=osu.skins.audio.count2s);
        this.COUNT3S = new Audio(src=osu.skins.audio.count3s);
        this.DRUM_HITCLAP = new Audio(src=osu.skins.audio.drum_hitclap);
        this.DRUM_HITFINISH = new Audio(src=osu.skins.audio.drum_hitfinish);
        this.DRUM_HITNORMAL = new Audio(src=osu.skins.audio.drum_hitnormal);
        this.DRUM_HITWHISTLE = new Audio(src=osu.skins.audio.drum_hitwhistle);
        this.DRUM_SLIDERSLIDE = new Audio(src=osu.skins.audio.drum_sliderslide);
        this.DRUM_SLIDERTICK = new Audio(src=osu.skins.audio.drum_slidertick);
        this.DRUM_SLIDERWHISTLE = new Audio(src=osu.skins.audio.drum_sliderwhistle);
        this.FAILSOUND = new Audio(src=osu.skins.audio.failsound);
        this.GOS = new Audio(src=osu.skins.audio.gos);
        this.MENUBACK = new Audio(src=osu.skins.audio.menuback);
        this.MENUCLICK = new Audio(src=osu.skins.audio.menuclick);
        this.MENUHIT = new Audio(src=osu.skins.audio.menuhit);
        this.NORMAL_HITCLAP = new Audio(src=osu.skins.audio.normal_hitclap);
        this.NORMAL_HITFINISH = new Audio(src=osu.skins.audio.normal_hitfinish);
        this.NORMAL_HITNORMAL = new Audio(src=osu.skins.audio.normal_hitnormal);
        this.NORMAL_HITWHISTLE = new Audio(src=osu.skins.audio.normal_hitwhistle);
        this.NORMAL_SLIDERSLIDE = new Audio(src=osu.skins.audio.normal_sliderslide);
        this.NORMAL_SLIDERTICK = new Audio(src=osu.skins.audio.normal_slidertick);
        this.NORMAL_SLIDERWHISTLE = new Audio(src=osu.skins.audio.normal_sliderwhistle);
        this.READYS = new Audio(src=osu.skins.audio.readys);
        this.SECTIONFAIL = new Audio(src=osu.skins.audio.sectionfail);
        this.SECTIONPASS = new Audio(src=osu.skins.audio.sectionpass);
        this.SHUTTER = new Audio(src=osu.skins.audio.shutter);
        this.SOFT_HITCLAP = new Audio(src=osu.skins.audio.soft_hitclap);
        this.SOFT_HITFINISH = new Audio(src=osu.skins.audio.soft_hitfinish);
        this.SOFT_HITNORMAL = new Audio(src=osu.skins.audio.soft_hitnormal);
        this.SOFT_HITWHISTLE = new Audio(src=osu.skins.audio.soft_hitwhistle);
        this.SOFT_SLIDERSLIDE = new Audio(src=osu.skins.audio.soft_sliderslide);
        this.SOFT_SLIDERTICK = new Audio(src=osu.skins.audio.soft_slidertick);
        this.SOFT_SLIDERWHISTLE = new Audio(src=osu.skins.audio.soft_sliderwhistle);
        this.SPINNERBONUS = new Audio(src=osu.skins.audio.spinnerbonus);
        this.SPINNER_OSU = new Audio(src=osu.skins.audio.spinner_osu);
        this.SPINNERSPIN = new Audio(src=osu.skins.audio.spinnerspin);
        this.initialised = true;
    }

};
/**
 * beatmaps.js
 * Created by Ugrend on 4/06/2016.
 */
// https://osu.ppy.sh/wiki/Osu_%28file_format%29


var osu = osu || {};
osu.beatmaps = osu.beatmaps || {};


osu.beatmaps.BeatmapPreview = class BeatmapPreview {
    constructor(md5sum, callback) {
        callback = callback || function () {};
        this.loaded = false;
        this.artist = "";
        this.artistunicode = "";
        this.beatmapid = "";
        this.beatmapsetid = "";
        this.creator = "";
        this.md5sum = md5sum;
        this.source = "";
        this.tags = "";
        this.thumbnail_data = "";
        this.title = "";
        this.titleunicode = "";
        this.version = "";
        this.song = "";
        this.preview_song_time = 0;
        this.background = "";

        //difficulty
        this.approachRate = "";
        this.circleSize = "";
        this.overallDifficulty = "";
        this.HPDrain = "";
        this.stars = "";
        this.bpm = 0;
        this.objects = 0;
        this.circles = 0;
        this.sliders = 0;
        this.spinners = 0;
        this.song_length = "";

        var self = this;
        database.get_data(database.TABLES.BEATMAPS,md5sum, function (r) {
            var beatmap = r.data;
            self.artist = beatmap.artist || "";
            //if unicode is same as normal just ignore it so we dont print twice
            self.artistunicode = (beatmap.artistunicode == beatmap.artist ? false : beatmap.artistunicode);
            self.artistunicode = beatmap.artistunicode || null;
            self.beatmapid = beatmap.beatmapid || "";
            self.beatmapsetid = beatmap.beatmapsetid || "";
            self.creator = beatmap.creator || "";
            self.source = beatmap.source || "";
            self.tags = beatmap.tags || "";
            self.title = beatmap.title || "";
            self.titleunicode = (beatmap.titleunicode == beatmap.title ? false : beatmap.titleunicode);
            self.version = beatmap.version || "";
            self.song = beatmap.song || "";
            self.preview_song_time = parseInt(beatmap.parsed.general.PreviewTime) || 0;
            self.background = beatmap.background || "";
            self.approachRate = beatmap.parsed.difficulty.ApproachRate || 0;
            self.circleSize = beatmap.parsed.difficulty.CircleSize || 0;
            self.overallDifficulty = beatmap.parsed.difficulty.OverallDifficulty || 0;
            self.HPDrain = beatmap.parsed.difficulty.HPDrainRate || 0;
            self.minBPM = beatmap.parsed.minBPM;
            self.maxBPM = (beatmap.parsed.maxBPM == -1 ? false : beatmap.parsed.maxBPM);
            self.circles = beatmap.parsed.circles || 0;
            self.sliders = beatmap.parsed.sliders || 0;
            self.spinners = beatmap.parsed.spinners || 0;
            self.objects = self.circles + self.sliders + self.spinners;
            self.stars = parseFloat(beatmap.stars);
            self.display_stars = [];
            var stars = self.stars;
            for(var i = 0; i <= Math.ceil(self.stars); i++){
                if(i > 9) break; //only display 10stars max


                if(stars > 1){
                    self.display_stars.push(
                        {
                            h: 52,
                            w: 50,
                            star_img: osu.skins.star
                        }
                    )
                }else{
                    if(stars >= 0){
                        self.display_stars.push(
                            {
                                h: 52 * stars,
                                w: 50 * stars,
                                star_img: osu.skins.star
                            })
                    }

                }
                stars -= 1;

            }

            var milliseconds = beatmap.parsed.time_length;
            var seconds = parseInt((milliseconds / 1000) % 60 );
            var minutes = parseInt(((milliseconds / (1000*60)) % 60));
            var hours   = parseInt(((milliseconds / (1000*60*60)) % 24));

            var pad = function (s) {
                return ('00'+s).substring(s.length);
            };

            self.song_length = (hours > 0 ? hours.toString() + ":" : "") + pad(minutes.toString()) + ":"  + pad(seconds.toString());

            database.get_data(database.TABLES.ASSETS,beatmap.thumbnail, function (result) {
                self.thumbnail_data = result.data;
                self.loaded = true;
                callback(this);
            });
        })

    }


    play_song() {
        var preview_time = this.preview_song_time;
        database.get_data(database.TABLES.ASSETS, this.song, function (r) {
            osu.audio.music.preview_time = preview_time / 1000;
            osu.audio.music.preview_screen = true;
            osu.audio.music.init(r.data,r.md5sum);
            osu.audio.music.start();
        });
    }

    load_background(){

        database.get_data(database.TABLES.ASSETS, this.background, function (r) {
            osu.ui.interface.mainscreen.set_background(r.data);
        });
    }


};

osu.beatmaps.BeatmapLoader = {
        beatmap_found: false,
        map_name: "",
        required_files: [],
        background: "",
        map_data: "",
        assets: [],
        song: "",
        __beatmap: "",
        __files_needed: [],
        md5sum: "",

        load: function (md5sum, onsuccess, onerror) {
            //clear out old data
            this.beatmap_found = false;
            this.map_name = false;
            this.required_files = [];
            this.assets = [];
            this.song = "";
            this.song_md5sum = "";
            this.__beatmap = "";
            this.__files_needed = [];
            this.background = "";

            this.md5sum = md5sum;
            this.onsuccess = onsuccess;
            this.onerror = onerror;
            // check if last loaded beatmap has our data first (incase indexeddb is unavailable/etc)
            if (beatmap) {
                for (var i = 0; i < beatmap.maps.length; i++) {
                    if (beatmap.maps[i].md5sum == md5sum) {
                        beatmap.locked = true; //lock the data to prevent droping another beatmap
                        this.map_data = beatmap.maps[i].parsed;
                        this.required_files = beatmap.maps[i].files;
                        this.assets = beatmap.assets;
                        this.beatmap_found = true;
                        break;
                    }
                }
                if (this.beatmap_found) {
                    this.__beatmap_loaded();
                }
                else {
                    this.__look_in_db();
                }
            } else {
                this.__look_in_db();
            }
        },

        __look_in_db: function () {
            database.get_data(database.TABLES.BEATMAPS, this.md5sum, this.__load_bm_from_db.bind(this), function (e) {
                event_handler.emit(event_handler.EVENTS.DB_ERROR, e.event.error);
            });
        },
        __load_bm_from_db: function (result) {

            if (result && result.data) {
                this.__beatmap = result.data;
                this.map_data = this.__beatmap.parsed;
                this.required_files = this.__beatmap.files;
                this.__files_needed = this.__beatmap.files.slice(0);
                var file_to_get = this.__files_needed.pop().md5sum;
                database.get_data(database.TABLES.ASSETS, file_to_get, this.__load_assets_from_db.bind(this), function (e) {
                    event_handler.emit(event_handler.EVENTS.DB_ERROR, e.event.error);
                });
            } else {
                event_handler.emit(event_handler.EVENTS.BEATMAP_NOTFOUND, result.md5sum);
            }
        },
        __load_assets_from_db: function (result) {
            if (result && result.data) {
                this.assets.push(result);
            } else {
                event_handler.emit(event_handler.EVENTS.ASSET_NOT_FOUND, result.md5sum)
            }
            if (this.__files_needed.length) {
                var file_to_get = this.__files_needed.pop().md5sum;
                database.get_data(database.TABLES.ASSETS, file_to_get, this.__load_assets_from_db.bind(this), function (e) {
                    event_handler.emit(event_handler.EVENTS.DB_ERROR, e.event.error);
                });
            } else {
                this.beatmap_found = true;
                this.__beatmap_loaded();
            }

        }
        ,

        __beatmap_loaded: function () {
            if (this.beatmap_found) {
                this.__process_beatmap();
                this.onsuccess(this);
            } else {
                event_handler.emit(event_handler.EVENTS.BEATMAP_NOTFOUND, this.md5sum);
                this.onerror("beatmap not found: " + this.md5sum);

            }
        },

        __process_beatmap: function () {
            this.song_md5sum =this.__lookup_file_md5(this.map_data.general.AudioFilename)
            this.song = this.__get_asset_from_md5(this.song_md5sum);
            this.background = this.__get_asset_from_md5(this.__lookup_file_md5(this.map_data.events[0][2].replace(/"/g, '')));
            this.map_name = this.map_data.metadata.Artist + " - " + this.map_data.metadata.Title + " [" + this.map_data.metadata.Version + "]";
            this.author = this.map_data.metadata.Creator;
        },
        __lookup_file_md5: function (filename) {
            for (var i = 0; i < this.required_files.length; i++) {
                if (this.required_files[i].filename == filename) {
                    return this.required_files[i].md5sum;
                }
            }
        },
        __get_asset_from_md5: function (md5) {
            for (var i = 0; i < this.assets.length; i++) {
                if (this.assets[i].md5sum == md5) {
                    return this.assets[i].data;
                }
            }
        }
};

/**
 * difficuly_calculator.js
 * Created by Ugrend on 23/06/2016.
 *
 * Code ported from opsu See
 * https://github.com/itdelatrisu/opsu/blob/master/src/itdelatrisu/opsu/beatmap/BeatmapDifficultyCalculator.java
 */

var osu = osu || {};
osu.beatmaps = osu.beatmaps || {};

osu.beatmaps.DifficultyCalculator = class DifficultyCalculator{

    static get DifficultyType() {
        return Object.freeze({
            SPEED: 0,
            AIM: 1

        });

    }

    constructor(parsedBeatmapData){
        this.TpHitObject = class TpHitObject{



            constructor(hitObject){
                this.TpSlider = class TpSlider {
                    constructor(hitObject){
                        this.startTime = hitObject.startTime;
                        this.sliderTime = (hitObject.endTime - this.startTime)/hitObject.repeatCount;
                        this.curve = new osu.objects.Curve(hitObject);
                    }

                    getPosAtTime(time){
                        var t = (time - this.startTime) / this.sliderTime;
                        var floor = Math.floor(t);
                        t = (floor % 2 == 0) ? t - floor : floor + 1 - t;
                        return this.curve.get_point(t);
                    }


                };


                this.DECAY_BASE = [ 0.3, 0.15 ];
                this.ALMOST_DIAMETER = 90;
                this.STREAM_SPACING_TRESHOLD = 110;
                this.SINGLE_SPACING_TRESHOLD = 125;
                this.SPACING_WEIGHT_SCALING = [1400, 26.25];
                this.LAZY_SLIDER_STEP_LENGTH = 1;
                this.lazySliderLengthFirst = 0;
                this.lazySliderLengthSubsequent = 0;
                this.normalizedEndPosition;
                this.normalizedStartPosition;
                this.strains = [ 1, 1 ];


                this.hitObject = hitObject;
                var scalingFactor = (52/hitObject.size);
                this.normalizedStartPosition = {
                    x: hitObject.x * scalingFactor,
                    y: hitObject.y * scalingFactor
                };
                if(hitObject.is_slider){
                    var slider = new this.TpSlider(hitObject);
                    var sliderFollowCircleRadius = hitObject.size * 3;
                    var segmentLength = slider.sliderTime;
                    var segmentEndTime = segmentLength + hitObject.startTime;
                    var cursorPos = {
                        x: hitObject.x,
                        y: hitObject.y
                    };
                    for (var time = hitObject.startTime + this.LAZY_SLIDER_STEP_LENGTH; time < segmentEndTime; time += this.LAZY_SLIDER_STEP_LENGTH) {
                        var sliderPos = slider.getPosAtTime(time);
                        var difference = {x: sliderPos.x, y: sliderPos.y};
                        difference.x -= cursorPos.x;
                        difference.y -= cursorPos.y;
                        var distance = Math.sqrt(difference.x * difference.x + difference.y * difference.y);
                        if (distance > sliderFollowCircleRadius) {
                            difference.x /= distance;
                            difference.y /= distance;
                            distance -= sliderFollowCircleRadius;
                            cursorPos.x +=difference.x * distance;
                            cursorPos.y +=difference.y * distance;
                            this.lazySliderLengthFirst += distance;
                        }
                    }
                    this.lazySliderLengthFirst *= scalingFactor;
                    if (hitObject.repeatCount % 2 == 1) {
                        this.normalizedEndPosition = {
                            x: cursorPos.x * scalingFactor,
                            y: cursorPos.y * scalingFactor
                        }
                    }
                    if(hitObject.repeatCount > 1){
                        segmentEndTime += segmentLength;
                        for (var time = segmentEndTime - segmentLength + this.LAZY_SLIDER_STEP_LENGTH; time < segmentEndTime; time += this.LAZY_SLIDER_STEP_LENGTH) {
                            var sliderPos = slider.getPosAtTime(time);
                            var difference = {x: sliderPos.x, y: sliderPos.y};
                            difference.x -= cursorPos.x;
                            difference.y -= cursorPos.y;
                            var distance = Math.sqrt(difference.x * difference.x + difference.y * difference.y);
                            if (distance > sliderFollowCircleRadius) {
                                difference.x /= distance;
                                difference.y /= distance;
                                distance -= sliderFollowCircleRadius;
                                cursorPos.x +=difference.x * distance;
                                cursorPos.y +=difference.y * distance;
                                this.lazySliderLengthFirst += distance;
                            }
                        }
                        this.lazySliderLengthSubsequent *= scalingFactor;
                        if (hitObject.repeatCount % 2 == 0){
                            this.normalizedEndPosition = {
                                x: cursorPos.x * scalingFactor,
                                y: cursorPos.y * scalingFactor
                            }
                        }

                    }

                }
                else{
                    this.normalizedEndPosition ={
                        x: this.normalizedStartPosition.x,
                        y: this.normalizedStartPosition.y
                    };
                }

            }
            getStrain(type){
                return this.strains[type];
            }

            calculateStrains(previousHitObject){
                this.calculateSpecificStrain(previousHitObject, osu.beatmaps.DifficultyCalculator.DifficultyType.SPEED);
                this.calculateSpecificStrain(previousHitObject, osu.beatmaps.DifficultyCalculator.DifficultyType.AIM);
            }

            spacingWeight(distance, type) {
            switch (type) {
            case osu.beatmaps.DifficultyCalculator.DifficultyType.SPEED:
                var weight;
                if (distance > this.SINGLE_SPACING_TRESHOLD)
                    weight = 2.5;
                else if (distance > this.STREAM_SPACING_TRESHOLD)
                    weight = 1.6 + 0.9 * (distance - this.STREAM_SPACING_TRESHOLD) / (this.SINGLE_SPACING_TRESHOLD - this.STREAM_SPACING_TRESHOLD);
                else if (distance > this.ALMOST_DIAMETER)
                    weight = 1.2 + 0.4 * (distance - this.ALMOST_DIAMETER) / (this.STREAM_SPACING_TRESHOLD - this.ALMOST_DIAMETER);
                else if (distance > this.ALMOST_DIAMETER / 2)
                    weight = 0.95 + 0.25 * (distance - (this.ALMOST_DIAMETER / 2)) / (this.ALMOST_DIAMETER / 2);
                else
                    weight = 0.95;
                return weight;
            case osu.beatmaps.DifficultyCalculator.DifficultyType.AIM:
                return Math.pow(distance, 0.99);
            default:
                // Should never happen.
                return 0;
            }
        }

            calculateSpecificStrain(previousHitObject,type) {
                var addition = 0;
                var timeElapsed = this.hitObject.startTime - previousHitObject.hitObject.startTime;
                var decay = Math.pow(this.DECAY_BASE[type], timeElapsed / 1000);

                if (this.hitObject.is_spinner) {
                    // Do nothing for spinners
                } else if (this.hitObject.is_slider) {
                    switch (type) {
                        case osu.beatmaps.DifficultyCalculator.DifficultyType.SPEED:
                            addition = this.spacingWeight(previousHitObject.lazySliderLengthFirst +
                                    previousHitObject.lazySliderLengthSubsequent * (Math.max(previousHitObject.hitObject.repeatCount||0, 1) - 1) +
                                    this.distanceTo(previousHitObject), type) * this.SPACING_WEIGHT_SCALING[type];
                            break;

                        case osu.beatmaps.DifficultyCalculator.DifficultyType.AIM:
                            var spaceWeight1 = this.spacingWeight(previousHitObject.lazySliderLengthFirst, type);
                            var spaceWeight2 = this.spacingWeight(previousHitObject.lazySliderLengthSubsequent, type);

                            addition = (spaceWeight1 + spaceWeight2 * (Math.max(previousHitObject.hitObject.repeatCount||0, 1) - 1) +
                                this.spacingWeight(this.distanceTo(previousHitObject), type)) * this.SPACING_WEIGHT_SCALING[type];
                            break;
                    }
                } else if (this.hitObject.is_circle) {
                    addition = this.spacingWeight(this.distanceTo(previousHitObject), type) * this.SPACING_WEIGHT_SCALING[type];
                }

                addition /= Math.max(timeElapsed, 50);

                this.strains[type] = previousHitObject.strains[type] * decay + addition;

            }

            distanceTo(prevHitObject){
                var x= this.normalizedStartPosition.x - prevHitObject.normalizedEndPosition.x;
                var y= this.normalizedStartPosition.y - prevHitObject.normalizedEndPosition.y;

                return Math.sqrt(x * x + y * y)
            }

        };

        this.beatmap = parsedBeatmapData;

        this.STAR_SCALING_FACTOR = 0.0675;
        this.EXTREME_SCALING_FACTOR = 0.5;
        this.STRAIN_STEP = 400;
        this.DECAY_WEIGHT = 0.9;
        this.tpHitObjects = [];
        this.starRating = -1;
        this.difficulties = [-1,-1];
        this.stars = [-1,-1];
    }

    calculate(){
        var circleSize = (osu.helpers.constants.OSU_GAME_WIDTH / 16) * (1 -.7 * (this.beatmap.difficulty.CircleSize - 5)/5);

        for(var i = 0; i< this.beatmap.hit_objects.length; i++){
            var hitObject = new osu.objects.HitObject(this.beatmap.hit_objects[i], circleSize, this.beatmap.difficulty.ApproachRate);
            this.tpHitObjects.push(new this.TpHitObject(hitObject))
        }
        if (!this.calculateStrainValues()) {
            console.log("Could not compute strain values. Aborting difficulty calculation.");
            return 0;
        }
        this.difficulties[osu.beatmaps.DifficultyCalculator.DifficultyType.SPEED] = this.calculateDifficulty(osu.beatmaps.DifficultyCalculator.DifficultyType.SPEED);
        this.difficulties[osu.beatmaps.DifficultyCalculator.DifficultyType.AIM] = this.calculateDifficulty(osu.beatmaps.DifficultyCalculator.DifficultyType.AIM);

        this.stars[osu.beatmaps.DifficultyCalculator.DifficultyType.SPEED] = Math.sqrt(this.difficulties[osu.beatmaps.DifficultyCalculator.DifficultyType.SPEED]) * this.STAR_SCALING_FACTOR;
        this.stars[osu.beatmaps.DifficultyCalculator.DifficultyType.AIM] = Math.sqrt(this.difficulties[osu.beatmaps.DifficultyCalculator.DifficultyType.AIM  ]) * this.STAR_SCALING_FACTOR;
        this.starRating = this.stars[osu.beatmaps.DifficultyCalculator.DifficultyType.SPEED] + this.stars[osu.beatmaps.DifficultyCalculator.DifficultyType.AIM] +
            Math.abs(this.stars[osu.beatmaps.DifficultyCalculator.DifficultyType.SPEED] - this.stars[osu.beatmaps.DifficultyCalculator.DifficultyType.AIM]) * this.EXTREME_SCALING_FACTOR;

        return this.starRating.toFixed(2);
    }

    calculateStrainValues() {
        if (this.tpHitObjects.length == 0) {
            console.log("Can not compute difficulty of empty beatmap.");
            return false;
        }

        var currentHitObject = this.tpHitObjects[0];
        var  nextHitObject;
        var index = 0;

        while (++index < this.tpHitObjects.length) {
            nextHitObject = this.tpHitObjects[index];
            nextHitObject.calculateStrains(currentHitObject);
            currentHitObject = nextHitObject;
        }

        return true;
    }

    calculateDifficulty(type) {
		var highestStrains = [];
		var intervalEndTime = this.STRAIN_STEP;
		var maximumStrain = 0;

		var previousHitObject = null;
		for (var i = 0; i < this.tpHitObjects.length; i++) {
			var hitObject = this.tpHitObjects[i];

			while (hitObject.hitObject.startTime > intervalEndTime) {
				highestStrains.push(maximumStrain);

				if (previousHitObject == null)
					maximumStrain = 0;
				else {
					var decay = Math.pow(previousHitObject.DECAY_BASE[type], (intervalEndTime - previousHitObject.hitObject.startTime) / 1000);
					maximumStrain = previousHitObject.getStrain(type) * decay;
				}


				intervalEndTime += this.STRAIN_STEP;
			}

			// Obtain maximum strain
			if (hitObject.getStrain(type) > maximumStrain)
				maximumStrain = hitObject.getStrain(type);

			previousHitObject = hitObject;
		}

		var difficulty = 0;
		var weight = 1;
        var sortNum = function (a,b) {
            return b-a;
        }
        highestStrains.sort(sortNum);

        for(var i = 0 ; i < highestStrains.length; i++){
            var strain = highestStrains[i];
            difficulty += weight * strain;
            weight *= this.DECAY_WEIGHT;
        }

		return difficulty;
	}



};
/**
 * gametypes.js
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
 * constants.js
 * Created by Ugrend on 6/07/2016.
 */

osu = osu || {};
osu.helpers = osu.helpers || {};
osu.helpers.constants = Object.freeze({
    OSU_GAME_HEIGHT: 384,
    OSU_GAME_WIDTH: 512,
    DOUBLE_TIME_MULTI: .667,
    SLIDER_STEP_DISTANCE: 5,
    TIMER_SONG_COLOUR: 0xB4B4B2,
    TIMER_INTRO_COLOUR: 0x82FA58
});
/**
 *
 *
 * Created by Ugrend on 3/07/2016.
 */

osu = osu || {};
osu.helpers = osu.helpers || {};
osu.helpers.math = {

    distance: function (x1,y1,x2,y2) {
        var v1 = Math.abs(x1 - x2);
        var v2 = Math.abs(y1 - y2);
        return Math.sqrt((v1 * v1) + (v2 * v2));
    },

    /*
        Get angle between two vectors;
     */
    angleVector: function (p1,p2) {

        var xDiff = p2.x - p1.x;
        var yDiff = p2.y - p1.y;
        return Math.atan2(yDiff, xDiff);
    }

};



/**
 * keypress.js
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
    get_keys: function(keys_int){
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
 * mods.js
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
 * circle.js
 * Created by Ugrend on 11/06/2016.
 */

    //TODO: THIS WILL MOVE ONCE SKIN SECTION IS DONE
var hit_circle_texture = PIXI.Texture.fromImage(osu.skins.hitcircle);
var hit_circle_overlay = PIXI.Texture.fromImage(osu.skins.hitcicleoverlay);
var approach_circle_texture = PIXI.Texture.fromImage(osu.skins.approachcircle);

var hit_numbers = {
    num_0: PIXI.Texture.fromImage(osu.skins.default_1),
    num_1: PIXI.Texture.fromImage(osu.skins.default_1),
    num_2: PIXI.Texture.fromImage(osu.skins.default_2),
    num_3: PIXI.Texture.fromImage(osu.skins.default_3),
    num_4: PIXI.Texture.fromImage(osu.skins.default_4),
    num_5: PIXI.Texture.fromImage(osu.skins.default_5),
    num_6: PIXI.Texture.fromImage(osu.skins.default_6),
    num_7: PIXI.Texture.fromImage(osu.skins.default_7),
    num_8: PIXI.Texture.fromImage(osu.skins.default_8),
    num_9: PIXI.Texture.fromImage(osu.skins.default_9)
};


osu = osu || {};
osu.objects = osu.objects || {};
osu.objects.Circle = class Circle{
    constructor(hitObject){
        this.hitObject = hitObject;
        this.last_draw_time = 0;
        this.drawn = false;
        this.destroyed = false;
        this.hidden_time = this.hitObject.approachRate / 3.3;
        this.beenHit = false;
        this.isScoreAble = true; //just prevents the point animation from appearing
    }
    init(){
        this.circleContainer = new PIXI.Container();
        this.endCircleSprite =  new PIXI.Sprite(hit_circle_texture);
        this.endCircleSprite.tint = this.hitObject.colour;
        this.endCircleSprite.anchor.set(0.5);
        this.endCircleSprite.height = this.hitObject.size;
        this.endCircleSprite.width = this.hitObject.size;

        if(!this.hitObject.game.is_hidden) {
            this.approchCircleSprite = new PIXI.Sprite(approach_circle_texture);
            this.approchCircleSprite.tint = this.hitObject.colour;
            this.approchCircleSprite.anchor.set(0.5);
            this.approchCircleSprite.width = this.hitObject.size * 2.5;
            this.approchCircleSprite.height = this.hitObject.size * 2.5;
            this.circleContainer.addChild(this.approchCircleSprite);
        }


        this.circleOverlaySprite =  new PIXI.Sprite(hit_circle_overlay);
        this.circleOverlaySprite.height = this.hitObject.size;
        this.circleOverlaySprite.width = this.hitObject.size;
        this.circleOverlaySprite.anchor.set(0.5);
        this.circleContainer.addChild(this.endCircleSprite);
        this.circleContainer.addChild(this.circleOverlaySprite);

        var comboString = this.hitObject.combo.toString();
        this.comboNumSprites = [];
        for(var i = 0; i< comboString.length ; i++){
            this.comboNumSprites.push(new PIXI.Sprite(hit_numbers["num_"+comboString.charAt(i)]));
        }

        if(this.comboNumSprites.length > 1){
            this.comboSprite1 = this.comboNumSprites[0];
            this.comboSprite2 = this.comboNumSprites[1];
            this.comboSprite1.x -= this.hitObject.size/10;
            this.comboSprite2.x += this.hitObject.size/10;
            this.comboSprite1.anchor.set(0.5);
            this.comboSprite2.anchor.set(0.5);
            this.circleContainer.addChild(this.comboSprite1);
            this.circleContainer.addChild(this.comboSprite2);
        }else{
            this.comboSprite1 = this.comboNumSprites[0];
            this.comboSprite1.anchor.set(0.5);
            this.circleContainer.addChild(this.comboSprite1);
        }
        this.circleContainer.x = this.hitObject.x;
        this.circleContainer.y =  this.hitObject.y;

        this.hitSounds = osu.audio.HitSound.getHitSounds(this.hitObject.hitSounds,this.hitObject.timing)
    }

    updatePositions(){
        this.circleContainer.x =  this.hitObject.x;
        this.circleContainer.y =  this.hitObject.y;
    }


    draw(cur_time){
        if(cur_time >= (this.hitObject.startTime -15)){
            this.hit(cur_time);
        }
        if(this.destroyed){
            if(!this.beenHit){
                //never been hit
                if(this.isScoreAble) this.hitObject.ScorePoint.displayMiss();
                this.beenHit = true;
            }
            //object is no longer rendered but point sprite will be destroyed once this object is finished
            if(cur_time < this.hitObject.startTime + 1000){
                return true;
            }
            return false;
        }
        if(this.drawn && this.hitObject.game.is_hidden && cur_time > this.hitObject.startTime - this.hidden_time){
            this.destroy();
            this.destroyed = true;
        }

        if(!this.destroyed && cur_time > this.hitObject.startTime + 110 ){
            this.destroy();
            this.destroyed = true;
        }

        if(!this.destroyed && cur_time < this.hitObject.startTime + this.hitObject.approachRate){
            if(!this.hitObject.game.is_hidden){
                //dont need to calculate this so often
                if(Date.now() - this.last_draw_time > 35) {
                    var time_diff = this.hitObject.startTime - cur_time;
                    var scale = 1 + (time_diff / this.hitObject.approachRate) * 2.5;
                    if (scale < 1) scale = 1;
                    this.approchCircleSprite.width = this.hitObject.size * scale;
                    this.approchCircleSprite.height = this.hitObject.size * scale;
                    this.last_draw_time = Date.now();
                }
            }
            if(!this.drawn){
                this.hitObject.game.hit_object_container.addChildAt(this.circleContainer,0);
                this.drawn = true;
            }
        }
        return true;
    }

    playHitSound(){
        for(var i = 0 ; i < this.hitSounds.length ; i++){
            osu.audio.sound.play_sound(this.hitSounds[i], this.hitObject.timing.volume/100);
        }
    }

    hit(time, pos){

        if(this.beenHit) {
            return;
        }
        var difference = this.hitObject.startTime - time;
        if(difference > this.hitObject.hitOffset.HIT_MISS){
            return;
        }
        if(difference < this.hitObject.hitOffset.HIT_MISS && difference > this.hitObject.hitOffset.HIT_50){
            //miss
            if(this.isScoreAble) this.hitObject.ScorePoint.displayMiss();
            this.beenHit = true;
        }
        if(difference < this.hitObject.hitOffset.HIT_50 && difference > this.hitObject.hitOffset.HIT_100){
            //hit50
            if(this.isScoreAble) this.hitObject.ScorePoint.display50();
            this.playHitSound();
            this.beenHit = true;
        }
        if(difference < this.hitObject.hitOffset.HIT_100 && difference > this.hitObject.hitOffset.HIT_300){
            //hit100
            if(this.isScoreAble) this.hitObject.ScorePoint.display100();
            this.playHitSound();
            this.beenHit = true;
        }
        if(difference < this.hitObject.hitOffset.HIT_300 && time <= this.hitObject.startTime){
            //hit300
            if(this.isScoreAble) this.hitObject.ScorePoint.display300();
            this.playHitSound();
            this.beenHit = true;
        }

        if(time >= this.hitObject.startTime){
            if(!this.beenHit){
                if(this.isScoreAble) this.hitObject.ScorePoint.displayMiss();
                this.beenHit = true;
            }

        }
        if(this.beenHit){
          //  this.destroy();
        }
    }

    destroy(){
        this.hitObject.game.hit_object_container.removeChild(this.circleContainer);
    }

};

/**
 * curves.js
 * Created by Ugrend on 11/07/2016.
 */

osu = osu || {};
osu.objects = osu.objects || {};
osu.objects.curves = osu.objects.curves || {};
osu.objects.curves.TYPES = Object.freeze({
    BEZIER: "B",
    LINEAR: "L",
    PASSTHROUGH: "P",
    CATMULL: "C"
});

osu.objects.Curve = class Curve {

    constructor(hitObject){
        this.startPoint ={x: hitObject.x, y: hitObject.y };
        this.controllPoints = hitObject.points;
        this.type = hitObject.sliderType;
        this.points = [];
        switch(this.type){
            case osu.objects.curves.TYPES.LINEAR:
                this.__generate_linear();
                break;
            case osu.objects.curves.TYPES.BEZIER:
                this.__generate_beizer();
                break;
            case osu.objects.curves.TYPES.PASSTHROUGH:
                this.__generate_passthrough();
                break;
            default:
                this.__generate_beizer();
                console.log("Unknown slider type")
        }

        for(var i = 0; i < this.points.length-1;i++){
            var currentPoint = this.points[i];
            var nextPoint = this.points[i+1];
            var xDiff = nextPoint.x - currentPoint.x;
            var yDiff = nextPoint.y - currentPoint.y;
            var angle = Math.atan2(yDiff, xDiff);
            this.points[i].angle = angle;
            if(i+1 == this.points.length-1){
                this.points[i+1].angle = angle;
            }
        }


    }

    /*
     * Gets point at given percentage/time;
     */
    get_point(t) {
        //TODO: could do passthrough/circle curves more accurately
        var point = Math.round((this.points.length-1) * t);
        if(point >= this.points.length){
            return this.points[this.points.length-1]
        }
        return this.points[point];
    }


    __generate_linear(){
        //generate linear with bezier, add the startpoints as a controll point which will cause a straight line
        this.controllPoints.unshift(this.startPoint);
        this.__generate_beizer();
    }
    /*
     * Generates a bezier curve slider (also used for linear sliders)
     *
     * How the Bezier sliders seem to work is that it will split them into seperate curves
     * This split is indicated by a duplicate value
     */
    __generate_beizer(){
        var beziers = [];
        var cP = [];
        var lastP = false;
        for(var i = -1; i < this.controllPoints.length; i++){
            var tPos;
            if(i==-1) {
                //The starter point is not in the initial point array so we start manually from it
                tPos = this.startPoint;
            }else{
                tPos = this.controllPoints[i];
            }
            //this checks if the last point is same as the next point
            //if it is the same it indicates the end of controll points for the bezier
            //If there are less than two in the controllpoints we just drop it completly
            if(lastP && tPos.x == lastP.x && tPos.y == lastP.y){
                if(cP.length >1){
                    beziers.push(new Bezier(cP))
                }
                cP.splice(0);
            }
            cP.push(tPos);
            lastP = tPos;
        }
        if(cP.length >1){
            beziers.push(new Bezier(cP));
        }

        for(i = 0; i< beziers.length; i++){
            var distance = 0;
            var compute_value = 0;
            var startingPoint = beziers[i].compute(0);
            var p = [startingPoint];
            while(distance < osu.helpers.constants.SLIDER_STEP_DISTANCE){
                compute_value += 0.00001;
                var point = beziers[i].compute(compute_value);
                distance = osu.helpers.math.distance(startingPoint.x, startingPoint.y, point.x,point.y);

            }
            var t = compute_value;
            while(t <= 1){
                p.push(beziers[i].compute(t));
                t += compute_value;
            }
            if(t>1){
                p.push(beziers[i].compute(1));
            }
            this.points = this.points.concat(p);
        }


    }

    __generate_passthrough(){

        var getPoint = function (angle,radius) {
            var x = (Math.cos(angle) * radius);
            var y = (Math.sin(angle) * radius);
            return {x:x,y:y}
        };
        var lerp = function(ang1,ang2,t){
            return ang1 * (1 - t) + ang2 * t;
        };
        var isMidBetween = function (a,b,c) {
            return (b > a && b < c) || (b < a && b > c);
        };

        var  circumcircle = function(p1, p2, p3) {
            var x,y,r;
            var A = p2.x - p1.x,
                B = p2.y - p1.y,
                C = p3.x - p1.x,
                D = p3.y - p1.y,
                E = A * (p1.x + p2.x) + B * (p1.y + p2.y),
                F = C * (p1.x + p3.x) + D * (p1.y + p3.y),
                G = 2 * (A * (p3.y - p2.y) - B * (p3.x - p2.x)),
                minx, miny, dx, dy;
            if(Math.abs(G) < 0.000001) {
                minx = Math.min(p1.x, p2.x, p3.x);
                miny = Math.min(p1.y, p2.y, p3.y);
                dx   = (Math.max(p1.x, p2.x, p3.x) - minx) * 0.5;
                dy   = (Math.max(p1.y, p2.y, p3.y) - miny) * 0.5;
                x = minx + dx;
                y = miny + dy;
                r = Math.sqrt(dx * dx + dy * dy);
            }
            else {
                x = (D*E - B*F) / G;
                y = (A*F - C*E) / G;
                dx = x - p1.x;
                dy = y - p1.y;
                r = Math.sqrt(dx * dx + dy * dy);
            }
            return {x: x, y:y, r: r};
        };



        var centerCircle = circumcircle(this.startPoint,
            this.controllPoints[0],this.controllPoints[1]);

        var xDiff = this.startPoint.x - centerCircle.x;
        var yDiff = this.startPoint.y - centerCircle.y;
        var startAngle = Math.atan2(yDiff, xDiff);
        xDiff = this.controllPoints[0].x - centerCircle.x;
        yDiff = this.controllPoints[0].y - centerCircle.y;
        var middleAngle = Math.atan2(yDiff, xDiff);
        xDiff = this.controllPoints[1].x - centerCircle.x;
        yDiff = this.controllPoints[1].y - centerCircle.y;
        var endAngle = Math.atan2(yDiff, xDiff);


        //code from opsu https://github.com/itdelatrisu/opsu
        //https://github.com/itdelatrisu/opsu/blob/master/src/itdelatrisu/opsu/objects/curves/CircumscribedCircle.java#L90
        var TWO_PI  =  Math.PI * 2;
        if (!isMidBetween(startAngle, middleAngle, endAngle)) {
            if (Math.abs(startAngle + TWO_PI - endAngle) < TWO_PI && isMidBetween(startAngle + (TWO_PI), middleAngle, endAngle))
                startAngle += TWO_PI;
            else if (Math.abs(startAngle - (endAngle + TWO_PI)) < TWO_PI && isMidBetween(startAngle, middleAngle, endAngle + (TWO_PI)))
                endAngle += TWO_PI;
            else if (Math.abs(startAngle - TWO_PI - endAngle) < TWO_PI && isMidBetween(startAngle - (TWO_PI), middleAngle, endAngle))
                startAngle -= TWO_PI;
            else if (Math.abs(startAngle - (endAngle - TWO_PI)) < TWO_PI && isMidBetween(startAngle, middleAngle, endAngle - (TWO_PI)))
                endAngle -= TWO_PI;
            else
                console.log('Cannot find angles between midAng '+ startAngle + " " + middleAngle +" " + endAngle);
        }



        var t = 0;
        while(t<=1){
            var angle = lerp(startAngle,endAngle,t);
            var point = getPoint(angle,centerCircle.r)
            point.x += centerCircle.x;
            point.y += centerCircle.y;
            this.points.push(point);
            t+=0.01;
        }
    }








};
/**
 * followpoint.js
 * Created by Ugrend on 6/07/2016.
 */
osu = osu || {};
osu.objects = osu.objects || {};
osu.objects.FollowPoint = class FollowPoint{
    constructor(hitObject1, hitObject2){
        this.hitObject1 = hitObject1;
        this.hitObject2 = hitObject2;
        this.drawn = false;
        this.destroyed = false;
    }

    init(){
        this.x1 = this.hitObject1.endX || this.hitObject1.x;
        this.y1 = this.hitObject1.endY  || this.hitObject1.y;
        this.x2 = this.hitObject2.x;
        this.y2 = this.hitObject2.y;

        this.drawTime = this.hitObject1.endTime  || this.hitObject1.startTime;
        this.drawTime -= this.hitObject1.approachRate/2;
        var xDiff = this.x2 - this.x1;
        var yDiff = this.y2 - this.y1;
        var angle = Math.atan2(yDiff, xDiff);
        var distance = osu.helpers.math.distance(this.x1, this.y1, this.x2, this.y2);
        var numPoints = Math.round(distance / (this.hitObject1.size/1.5));
        var steps = 1/(numPoints+1);
        var nextStep = steps;
        this.followPointContainer = new PIXI.Container();
        var arrowTexture =  PIXI.Texture.fromImage(osu.skins.followpoint);
        for(var i = 0 ; i < numPoints; i++){
            var arrowSprite = new PIXI.Sprite(arrowTexture);

            arrowSprite.rotation = angle;
            arrowSprite.position.x = this.x1 + (xDiff * nextStep);
            arrowSprite.position.y = this.y1 + (yDiff * nextStep);
            this.followPointContainer.addChild(arrowSprite);
            nextStep += steps;
        }
    }

    draw(cur_time){
        if(this.destroyed){
            return false;
        }

        if(!this.drawn && cur_time >= this.drawTime){
            this.hitObject1.game.hit_object_container.addChildAt(this.followPointContainer,0);
            this.drawn = true;
            return true;
        }
        if(!this.destroyed && cur_time > this.hitObject2.startTime){
            this.destroy();
            this.destroyed = true;
        }


        return true;
    }
    destroy(){
        this.hitObject1.game.hit_object_container.removeChild(this.followPointContainer);
    }

};


/**
 *
 *
 * Created by Ugrend on 18/07/2016.
 */
osu = osu || {};
osu.objects = osu.objects || {};

osu.objects.HitObjectParser = {
    TYPES: {
        CIRCLE: 1,
        SLIDER: 2,
        NEW_COMBO: 4,
        SPINNER: 8,
    },

    HIT_SOUNDS: {
        SOUND_NORMAL: 0,
        SOUND_WHISTLE: 2,
        SOUND_FINISH: 4,
        SOUND_CLAP: 8,
    },
    HIT_ADDITIONS: {
        NORMAL: 1,
        SOFT: 2,
        DRUM: 3,
    },


    parse_type: function (hitObjectInt) {
        var newCombo = false;
        if ((hitObjectInt & this.TYPES.NEW_COMBO)) {
            newCombo = true;
        }
        if ((hitObjectInt & osu.objects.HitObjectParser.TYPES.CIRCLE)) {
            return {type: this.TYPES.CIRCLE, new_combo: newCombo}
        }
        if ((hitObjectInt & osu.objects.HitObjectParser.TYPES.SLIDER)) {
            return {type: this.TYPES.SLIDER, new_combo: newCombo}
        }
        if ((hitObjectInt & osu.objects.HitObjectParser.TYPES.SPINNER)) {
            return {type: this.TYPES.SPINNER, new_combo: newCombo}
        }
    },
    parse_line: function (line, timing, sliderMulti) {

        var get_timing_point = function (offset) {
            for(var i = timing.length -1 ; i >=0 ; i--){
                if(timing[i].offset <= offset)  return timing[i];
            }
            return timing[0];
        };

        var parse_additions = function (strAdditions) {
            if(!strAdditions) return {};
            var additions = {};
            var adds = strAdditions.split(":");
            if(adds.length > 0){
                additions.sample = +adds[0];
            }
            if(adds.length > 1){
                additions.additionalSample = +adds[1];
            }
            if(adds.length > 2){
                additions.customSampleIndex = +adds[2];
            }
            if(adds.length > 3){
                additions.hitSoundVolume = +adds[3];
            }
            if(adds.length > 4){
                additions.hitsound = +adds[4];
            }

            return additions;
        };

        var hitObject = {};

        var hitArray = line.split(',');

        var type = this.parse_type(+hitArray[3]);

        hitObject.x = +hitArray[0];
        hitObject.y = +hitArray[1];
        hitObject.startTime = +hitArray[2];
        hitObject.type = type.type;
        hitObject.newCombo = type.new_combo;
        hitObject.hitSounds = [];
        hitObject.timing = get_timing_point(hitObject.startTime);
        hitObject.is_slider = false;
        hitObject.is_circle = false;
        hitObject.is_spinner = false;

        var soundByte = +hitArray[4];
        if ((soundByte & this.HIT_SOUNDS.SOUND_WHISTLE) == this.HIT_SOUNDS.SOUND_WHISTLE)
            hitObject.hitSounds.push(this.HIT_SOUNDS.SOUND_WHISTLE);
        if ((soundByte & this.HIT_SOUNDS.SOUND_FINISH) == this.HIT_SOUNDS.SOUND_FINISH)
            hitObject.hitSounds.push(this.HIT_SOUNDS.SOUND_FINISH);
        if ((soundByte & this.HIT_SOUNDS.SOUND_CLAP) == this.HIT_SOUNDS.SOUND_CLAP)
            hitObject.hitSounds.push(this.HIT_SOUNDS.SOUND_CLAP);
        if (hitObject.hitSounds.length === 0)
            hitObject.hitSounds.push(this.HIT_SOUNDS.SOUND_NORMAL);


        if (hitObject.type == this.TYPES.CIRCLE) {
            hitObject.is_circle = true;
            hitObject.additions = parse_additions(hitArray[5]);
        }
        if (hitObject.type == this.TYPES.SPINNER) {
            hitObject.is_spinner = true;
            hitObject.endTime = +hitArray[5];
            hitObject.additions = +hitArray[6];
        }
        if (hitObject.type == this.TYPES.SLIDER) {
            hitObject.is_slider = true;
            var sliderData = hitArray[5].split("|");
            hitObject.sliderType = sliderData[0];
            hitObject.repeatCount = +hitArray[6];
            hitObject.pixelLength = +hitArray[7];
            hitObject.additions = parse_additions(hitArray[10]);
            hitObject.edges =[];
            var sounds    = [];
            var additions = [];
            if (hitArray[8])  sounds = hitArray[8].split('|');
            if (hitArray[9])  additions = hitArray[9].split('|');
            for (var x = 0; x < hitObject.repeatCount+1 ; x++) {
                var edge = {
                    sounds: [],
                    additions: parse_additions(additions[x])
                };

                if (sounds[x]) {
                    soundByte = sounds[x];
                    //TODO: function this
                    if ((soundByte & this.HIT_SOUNDS.SOUND_WHISTLE) == this.HIT_SOUNDS.SOUND_WHISTLE)
                        edge.sounds.push(this.HIT_SOUNDS.SOUND_WHISTLE);
                    if ((soundByte & this.HIT_SOUNDS.SOUND_FINISH) == this.HIT_SOUNDS.SOUND_FINISH)
                        edge.sounds.push(this.HIT_SOUNDS.SOUND_FINISH);
                    if ((soundByte & this.HIT_SOUNDS.SOUND_CLAP) == this.HIT_SOUNDS.SOUND_CLAP)
                        edge.sounds.push(this.HIT_SOUNDS.SOUND_CLAP);
                    if (hitObject.hitSounds.length === 0)
                        edge.sounds.push(this.HIT_SOUNDS.SOUND_NORMAL);
                } else {
                    edge.sounds.push(this.HIT_SOUNDS.SOUND_NORMAL);
                }

                hitObject.edges.push(edge);
            }

            hitObject.points = [];
            for(var i = 1; i < sliderData.length; i++){
                var points = sliderData[i].split(":");
                hitObject.points.push({x:+points[0], y:+points[1]});
            }


            var beats = (hitObject.pixelLength * hitObject.repeatCount) /(100*sliderMulti)
            hitObject.duration = Math.ceil(beats * hitObject.timing.millisecondsPerBeat);
            hitObject.endTime = hitObject.startTime + hitObject.duration;

        }


        return hitObject;
    },


    //https://gist.github.com/peppy/1167470
    create_stacks: function (hitobjects, stackLeniency, circleSize, hardrock) {
        for (var i = hitobjects.length - 1; i > 0; i--) {
            var hitObjectI = hitobjects[i];
            if (hitObjectI.stack != 0 || hitObjectI.type == osu.objects.HitObjectParser.TYPES.SPINNER) continue;

            if (hitObjectI.type == osu.objects.HitObjectParser.TYPES.CIRCLE) {
                for (var n = i - 1; n >= 0; n--) {
                    var hitObjectN = hitobjects[n];
                    if (hitObjectN.type == osu.objects.HitObjectParser.TYPES.SPINNER) continue;

                    var timeI = hitObjectI.startTime - (1000 * stackLeniency); //convert to miliseconds
                    var timeN = hitObjectN.startTime;
                    if (timeI > timeN) break;

                    var distance = osu.helpers.math.distance(hitObjectI.x, hitObjectI.y, hitObjectN.x, hitObjectN.y);
                    if (distance < 3) {
                        hitObjectN.stack = hitObjectI.stack + 1;
                        hitObjectI = hitObjectN;
                    }
                }
            }
        }

        for (i = 0; i < hitobjects.length; i++) {
            var hitObject = hitobjects[i];
            var stack = hitObject.stack;
            var offset = (stack * (circleSize * 0.05));
            var x = hitObject.x - offset;
            var y = hitObject.y - offset;
            if (hardrock)
                y = y + offset;

            hitObject.x = x;
            hitObject.y = y;
            hitObject.init();
        }



    },

    calculate_follow_points: function (hitobjects, game) {

        for(var i = 0; i < hitobjects.length -1; i++){
            var hitObject1 = hitobjects[i];
            var hitObject2 = hitobjects[i+1];
            if (hitObject1.type == osu.objects.HitObjectParser.TYPES.SPINNER) continue;
            if (hitObject2.type == osu.objects.HitObjectParser.TYPES.SPINNER) continue;
            if(hitObject2.newCombo) continue;

            var startX = game.calculate_original_x(hitObject1.endX || hitObject1.x);
            var startY = game.calculate_original_y(hitObject1.endY || hitObject1.y);
            var endX = game.calculate_original_x(hitObject2.x);
            var endY = game.calculate_original_y(hitObject2.y);
            var distance = osu.helpers.math.distance(startX,startY,endX,endY);
            if(distance > 50){
                hitObject1.followPoint = new osu.objects.FollowPoint(hitObject1, hitObject2);
                hitObject1.followPoint.init();
            }
        }

    }

};
/**
 * hitobjects.js
 * Created by Ugrend on 17/06/2016.
 */

osu = osu || {};
osu.objects = osu.objects || {};

osu.objects.HitObject = class HitObject{
    constructor(hitObjectData, size, approachRate, game){
        this._x = 0;
        this._y = 0;
        this.game = game || false;
        this.combo = 1;
        this.colour = 0xFFFFFF;
        this.stack = 0;
        this.size = size;
        this.approachRate = approachRate;
        this.followPoint = false;
        this.drawn = false;
        //these are defaults that should be overridden by the game
        this.hitOffset = {
            HIT_300: 79.5,
            HIT_100: 139.5,
            HIT_50: 199.5,
            HIT_MISS: 500
        };

        $.extend(this, hitObjectData);
        if(this.game && this.game.is_hardrock) this._y = 384 - this._y;
        switch (this.type){
            case osu.objects.HitObjectParser.TYPES.CIRCLE:
                this.object = new osu.objects.Circle(this);
                break;
            case osu.objects.HitObjectParser.TYPES.SLIDER:
                this.object = new osu.objects.Slider(this);
                break;
            case osu.objects.HitObjectParser.TYPES.SPINNER:
                this.object = new osu.objects.Spinner(this);
        }
        this.initialised = false;
    }
    set x(v){
        this._x = v;
        if(this.initialised) this.object.updatePositions();
    };
    get x() { return this._x}
    set y(v){
        this._y = v;
        if(this.initialised) this.object.updatePositions();
    };
    get y() { return this._y}

    init(){
        if(!this.game){
            throw "Cannot Intialise object without game object!";
        }
        this.x = this.game.calculate_x(this.x);
        this.y = this.game.calculate_y(this.y);
        this.drawn = false;




        if(this.game.is_doubletime){
            this.startTime *= osu.helpers.constants.DOUBLE_TIME_MULTI;
            if(this.endTime) this.endTime *= osu.helpers.constants.DOUBLE_TIME_MULTI;
        }
        this.object.init();
        //endX/Y will get intiatied by a slider else just use hitObject x
        this.ScorePoint = new osu.objects.ScorePoint(this.endX||this.x,this.endY||this.y);


        this.initialised = true;
    }

    draw(cur_time){
        if(!this.drawn){
            this.game.hit_object_container.addChild(this.ScorePoint.getContainer());
            this.drawn = true;
        }

        var followResult = false;
        if(this.followPoint){
            followResult = this.followPoint.draw(cur_time);
        }
        var drawResult = this.object.draw(cur_time);
        if(!drawResult){
            this.game.hit_object_container.removeChild(this.ScorePoint.getContainer());
        }

        return drawResult ||  followResult;
    }

    hit(cur_time, pos){
        return this.object.hit(cur_time, pos);
    }


};
/**
 *
 *
 * Created by Ugrend on 18/07/2016.
 */

//TODO: THIS WILL MOVE ONCE SKIN SECTION IS DONE
//TODO: support animation
var hit300Texture = PIXI.Texture.fromImage(osu.skins.hit300);
var hit100Texture = PIXI.Texture.fromImage(osu.skins.hit100);
var hit50Texture = PIXI.Texture.fromImage(osu.skins.hit50);
var hitMissTexure = PIXI.Texture.fromImage(osu.skins.hit0);

osu = osu || {};
osu.objects = osu.objects || {};
osu.objects.ScorePoint = class ScorePoint {

    constructor(x,y,size){
        this.hit300Sprite = new PIXI.Sprite(hit300Texture);
        this.hit100Sprite = new PIXI.Sprite(hit100Texture);
        this.hit50Sprite = new PIXI.Sprite(hit50Texture);
        this.hitMissSprite = new PIXI.Sprite(hitMissTexure);

        this.hit300Sprite.visible = false;
        this.hit100Sprite.visible = false;
        this.hit50Sprite.visible = false;
        this.hitMissSprite.visible = false;

        this.hitContainer = new PIXI.Container();
        this.hitContainer.addChild(this.hit300Sprite);
        this.hitContainer.addChild(this.hit100Sprite);
        this.hitContainer.addChild(this.hit50Sprite);
        this.hitContainer.addChild(this.hitMissSprite);

        this.hitContainer.position.x = x;
        this.hitContainer.position.y = y;
    }

    getContainer(){
        return this.hitContainer;
    }

    display300(){
        this.hit300Sprite.visible = true;
    }
    display100(){
        this.hit100Sprite.visible = true;
    }
    display50(){
        this.hit100Sprite.visible = true;
    }
    displayMiss(){
        this.hitMissSprite.visible = true;
    }
};
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
var reverseArrowTexture = PIXI.Texture.fromImage(osu.skins.reversearrow);

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
        this.hitSounds = [];
        this.repeatCount = this.hitObject.repeatCount;
    }
    init(){
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
            if(this.hitObject.game.is_hardrock) points[i].y = osu.helpers.constants.OSU_GAME_HEIGHT - points[i].y;
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


        //Add end circle TODO: check if theres a override skin
        this.endCircleSprite =  new PIXI.Sprite(hit_circle_overlay);
        this.endCircleSprite.anchor.set(0.5);
        this.endCircleSprite.height = this.hitObject.size;
        this.endCircleSprite.width = this.hitObject.size;
        this.endCircleSprite.position.x = final_x;
        this.endCircleSprite.position.y = final_y;

        this.sliderGraphicsContainer.addChild(this.endCircleSprite);

        this.startCircleSprite =  new PIXI.Sprite(hit_circle_overlay);
        this.startCircleSprite.anchor.set(0.5);
        this.startCircleSprite.height = this.hitObject.size;
        this.startCircleSprite.width = this.hitObject.size;
        this.startCircleSprite.position.x = this.hitObject.x;
        this.startCircleSprite.position.y = this.hitObject.y;
        this.sliderGraphicsContainer.addChild(this.startCircleSprite);

        this.arrowSliderEnd = new PIXI.Sprite(reverseArrowTexture);
        this.arrowSliderEnd.height = (this.hitObject.size *2)/5;
        this.arrowSliderEnd.width = (this.hitObject.size *2)/5;
        this.arrowSliderEnd.anchor.set(0.5);
        this.arrowSliderEnd.position.x = final_x;
        this.arrowSliderEnd.position.y = final_y;
        var angle = osu.helpers.math.angleVector(this.curves.points[this.curves.points.length -1],
            this.curves.points[this.curves.points.length-2]);
        this.arrowSliderEnd.rotation = angle;
        this.arrowSliderEnd.visible = false;

        this.arrowSliderStart = new PIXI.Sprite(reverseArrowTexture);
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

        for(i = 0 ; i < this.hitObject.edges.length;i++){
            this.hitSounds.push(osu.audio.HitSound.getHitSounds(this.hitObject.edges[i].sounds, this.hitObject.timing, (i==0)));
        }
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

                if(this.hitObject.repeatCount % 2 == 0){
                    this.arrowSliderEnd.visible = true;
                    this.arrowSliderStart.visible = false;
                }else{
                    this.arrowSliderEnd.visible = false;
                    if(this.hitObject.repeatCount != 1){
                        this.arrowSliderStart.visible = true;
                    }
                }

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



/**
 * spinner.js
 * Created by Ugrend on 11/06/2016.
 */

//TODO: this will be part of skins once coded

var spinner_approachcircleTexture = PIXI.Texture.fromImage(osu.skins.spinner_approachcircle);
var spinner_backgroundTexture = PIXI.Texture.fromImage(osu.skins.spinner_background);
var spinner_bottomTexture = PIXI.Texture.fromImage(osu.skins.spinner_bottom);
var spinner_circleTexture = PIXI.Texture.fromImage(osu.skins.spinner_circle);
var spinner_clearTexture = PIXI.Texture.fromImage(osu.skins.spinner_clear);
var spinner_glowTexture = PIXI.Texture.fromImage(osu.skins.spinner_glow);
var spinner_metreTexture = PIXI.Texture.fromImage(osu.skins.spinner_metre);
var spinner_middleTexture = PIXI.Texture.fromImage(osu.skins.spinner_middle);
var spinner_middle2Texture = PIXI.Texture.fromImage(osu.skins.spinner_middle2);
var spinner_osuTexture = PIXI.Texture.fromImage(osu.skins.spinner_osu);
var spinner_rpmTexture = PIXI.Texture.fromImage(osu.skins.spinner_rpm);
var spinner_spinTexture = PIXI.Texture.fromImage(osu.skins.spinner_spin);
var spinner_topTexture = PIXI.Texture.fromImage(osu.skins.spinner_top);
var spinner_warningTexture = PIXI.Texture.fromImage(osu.skins.spinner_warning);

osu = osu || {};
osu.objects = osu.objects || {};
osu.objects.Spinner = class Spinner{
    constructor(hitObject){
        this.hitObject = hitObject;
        this.drawn = false;
        this.destroyed = false;
    }
    init(){
        this.drawn = false;
        this.destroyed = false;
        this.x = this.hitObject.game.getRenderWidth()/2;
        this.y = this.hitObject.game.getRenderHeight()/2;
        this.spinnerContainer = new PIXI.Container();
        var backgroundSprite = new PIXI.Sprite(spinner_backgroundTexture);
        backgroundSprite.width = this.hitObject.game.getRenderWidth();
        backgroundSprite.height =this.hitObject.game.getRenderHeight();
        this.spinnerCirle = new PIXI.Sprite(spinner_circleTexture);
        this.spinnerCirle.position.x = this.x;
        this.spinnerCirle.position.y = this.y;
        this.spinnerCirle.anchor.set(0.5);
        this.spinnerContainer.addChild(backgroundSprite);
        this.spinnerContainer.addChild(this.spinnerCirle);
    }
    draw(cur_time){
        if(!this.drawn){
            if(cur_time > this.hitObject.startTime){
                this.hitObject.game.hit_object_container.addChild(this.spinnerContainer);
                this.drawn = true;
            }
        }
        if(!this.destroyed){
            this.spinnerCirle.rotation -= 0.1;
            if(cur_time > this.hitObject.endTime){
                this.destroy();
                this.destroyed = true;
            }
        }

        if(this.destroyed){
            return false;
        }

        return true;
    }
    destroy(){
        this.hitObject.game.hit_object_container.removeChild(this.spinnerContainer);
    }

};

/**
 * score.js
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
    getGrade: function(h300,h100,h50,hMisses,mods){
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
        var is_silver = false;
        for(var i =0; i < mods.length ; i++){
            if(mods[i].code == "FL" || mods[i].code == "HD"){
                is_silver = true;
            }
        }


        var total_hits =  h300 + h100 + h50 + hMisses;
        if(h300 == total_hits){
            if(is_silver) return this.GRADES.SSH;else return this.GRADES.SS
        }
        if((h300/total_hits)*100 > 90) {
            if (hMisses > 0 || (h50 / total_hits) * 100 > 1) {
                return this.GRADES.A;
            }
             if(is_silver) return this.GRADES.SH; else return this.GRADES.S;
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
 * settings.js
 * Created by Ugrend on 9/06/2016.
 */


osu = osu || {};
osu.settings = {

    DEFAULTS: Object.freeze({
        background_dim: 0.3,
        master_volume: 1.0,
        music_volume: 0.6,
        sound_effects: 0.8,
        use_beatmap_skins: false,
        use_beatmap_hitsounds: false,

    }),
    SETTINGS:{


        _background_dim: 0.3,
        _master_volume: 1.0,
        _music_volume: 0.6,
        _sound_effects_volume: 0.8,
        _use_beatmap_skins: false,
        _use_beatmap_hitsounds: false,


        get background_dim(){return this._background_dim},
        set background_dim(v) { this._background_dim = v; event_handler.emit(event_handler.EVENTS.SETTINGS_CHANGED);},
        get master_volume(){return this._master_volume;},
        set master_volume(v) { this._master_volume = v; event_handler.emit(event_handler.EVENTS.SETTINGS_CHANGED);},
        get music_volume(){return this._music_volume},
        set music_volume(v) { this._music_volume = v; event_handler.emit(event_handler.EVENTS.SETTINGS_CHANGED);},
        get sound_effects_volume(){return this._sound_effects_volume},
        set sound_effects_volume(v) { this._sound_effects_volume = v; event_handler.emit(event_handler.EVENTS.SETTINGS_CHANGED);},
        get use_beatmap_skins(){return this._use_beatmap_skins},
        set use_beatmap_skins(v) { this._use_beatmap_skins = v; event_handler.emit(event_handler.EVENTS.SETTINGS_CHANGED);},
        get use_beatmap_hitsounds(){return this._use_beatmap_hitsounds},
        set use_beatmap_hitsounds(v) { this._use_beatmap_hitsounds = v; event_handler.emit(event_handler.EVENTS.SETTINGS_CHANGED);},

    },


    init: function () {
        var self = this;
        event_handler.on(event_handler.EVENTS.SETTINGS_CHANGED, this.save_settings.bind(this));

        database.get_data(database.TABLES.OPTIONS,"options", function (e) {
            if(e.data){
                for(var k in e.data){
                    if(e.data.hasOwnProperty(k)){
                        if(k.indexOf("_") == 0){
                            self.SETTINGS[k] = e.data[k];
                        }
                    }
                }
            }
            self.onloaded();
            event_handler.emit(event_handler.EVENTS.SETTINGS_CHANGED);
        });
    },
    save_settings: function () {
        database.update_data(database.TABLES.OPTIONS,"options",this.SETTINGS);
    },

    onloaded: function () {

    }





};

/**
 * main_screen.js
 * Created by Ugrend on 20/06/2016.
 */
var osu = osu || {};
osu.ui = osu.ui || {};
osu.ui.interface = osu.ui.interface || {};
osu.ui.interface.mainscreen = {

    beatmap_count: -1,
    replay_count: -1,
    key_count: 0,
    processed_count: 0,
    displaying_main_screen: false,
    loaded: false,
    beatmap_keys: [],
    beatmaps: [],
    current_selection: false,
    beatmap_selection_template: "",
    replay_selection_template: "",
    $beatmap_section_html: null,
    $replay_section_html: null,
    cached_dom: false,
    events_bound: false,
    replays: [],
    beatmapSearch: null,
    replaySearch: null,
    $currentSelectionHtml: "",


    init: function () {
        this.cacheDom();
        this.bind_events();

        this.$master_volume_slider.val(osu.settings.SETTINGS.master_volume * 100);
        this.$music_volume_slider.val(osu.settings.SETTINGS.music_volume * 100);
        this.$sound_volume_slider.val(osu.settings.SETTINGS.sound_effects_volume * 100);
        this.$background_dim_slider.val(osu.settings.SETTINGS.background_dim * 100);

        var self = this;
        database.get_count(database.TABLES.BEATMAPS, function (count) {
            self.beatmap_count = count;
            self.show_selection();
        });
        database.get_count(database.TABLES.REPLAYS, function (count) {
            self.replay_count = count;
            self.show_selection();
        });
        event_handler.on(event_handler.EVENTS.BEATMAP_LOADED,this.on_load_file.bind(this));
        //event_handler.on(event_handler.EVENTS.REPLAY_LOADED, this.on_load_file.bind(this)); // we may not care about a new replay

    },
    cacheDom: function () {
        if(!this.cached_dom){
            this.beatmap_selection_template = document.getElementById("beatmap_select_template").innerHTML;
            this.replay_selection_template = document.getElementById("replay_select_template").innerHTML;
            this.$beatmap_section_html = $("#song_selection_area");
            this.$replay_section_html = $("#replay_select_area");
            this.mapped_by = document.getElementById("mapped_by");
            this.map_length_and_objects = document.getElementById("map_length_and_objects");
            this.map_object_type_counts = document.getElementById("map_object_type_counts");
            this.map_difficulty = document.getElementById("map_difficulty");
            this.map_name = document.getElementById("map_name");
            this.$footer = $("#footer");
            this.$beatmap_search_field = $("#filter_maps_search");
            this.$replay_search_field = $("#filter_players_search");
            this.$title_and_search = $("#title_and_search");
            this.$details_replay_search = $("#details_replay_search");


            this.$master_volume_slider = $("#master_volume");
            this.$music_volume_slider = $("#music_volume");
            this.$sound_volume_slider = $("#sound_volume");
            this.$background_dim_slider = $("#background_dim");

            this.cached_dom = true;
        }

    },

    bind_events: function () {
        //init script can be called multiple times if no maps/replays exist
        if(!this.events_bound){
            osu.audio.sound.init();
            var self = this;
            this.$beatmap_search_field.on('input', function (e) {
                var searchParam = e.currentTarget.value;
                if(self.beatmapSearch && searchParam != ""){
                    self.$beatmap_section_html.find(".beatmap_preview:not([class*='hidden'])").addClass("hidden");
                    self.beatmapSearch.search(searchParam, function (result) {
                       for(var i = 0; i < result.length ; i++){
                           self.$beatmap_section_html.find("#"+result[i].md5sum).removeClass("hidden");
                       }
                    });
                }else{
                    self.$beatmap_section_html.find(".beatmap_preview").removeClass("hidden");
                    self.$currentSelectionHtml[0].scrollIntoViewIfNeeded();
                }


            });

            this.$replay_search_field.on('input', function (e) {
                var searchParam = e.currentTarget.value;
                if(self.replaySearch && searchParam != ""){
                    self.$replay_section_html.find(".replay_preview:not([class*='hidden'])").addClass("hidden");
                    self.replaySearch.search(searchParam, function (result) {
                        for(var i = 0; i < result.length ; i++){
                            self.$replay_section_html.find("#"+result[i].rMd5Hash).removeClass("hidden");
                        }
                    });
                }else{
                    self.$replay_section_html.find(".replay_preview").removeClass("hidden");
                }
            });

            this.$master_volume_slider.on("input", function (e) {
               osu.settings.SETTINGS.master_volume = e.currentTarget.value / 100;
                osu.audio.sound.play_sound(osu.audio.sound.MENUCLICK);
            });
            this.$music_volume_slider.on("input", function (e) {
                osu.settings.SETTINGS.music_volume = e.currentTarget.value / 100;
                osu.audio.sound.play_sound(osu.audio.sound.MENUCLICK);
            });
            this.$sound_volume_slider.on("input", function (e) {
                osu.settings.SETTINGS.sound_effects_volume = e.currentTarget.value / 100;
                osu.audio.sound.play_sound(osu.audio.sound.MENUCLICK);
            });
            this.$background_dim_slider.on("input", function (e) {
                osu.settings.SETTINGS.background_dim = e.currentTarget.value / 100;
                osu.audio.sound.play_sound(osu.audio.sound.MENUCLICK);
            });


            //On beatmap select click highlight the clicked item, and unhighlight any other items
            this.$beatmap_section_html.on("click",".beatmap_preview", function (event) {
                osu.audio.sound.play_sound(osu.audio.sound.MENUCLICK);
                var clickedObject = $(this);
                var md5sum = clickedObject.attr("id");
                self.highlight_beatmap(clickedObject);
                self.select_beatmap(md5sum, false);
            });

            //on replay click open replay
            $(this.$replay_section_html).on("click",".replay_preview", function (event) {
                osu.audio.sound.play_sound(osu.audio.sound.MENUHIT);
                var id = $(this).attr('id');
                for(var i = 0; i < self.replays.length ; i ++){
                    if(self.replays[i].rMd5Hash == id){
                        replay = self.replays[i];
                        break;
                    }
                }
                loadBeatMap();
            });

            //Escape out of replay back to main screen
            document.onkeyup = function (e) {
                e = e || window.event;
                //27 is Escape
                if(e.keyCode == 27){
                    if(self.loaded && !self.displaying_main_screen){
                        //if a replay is playing we can stop it
                        event_handler.emit(event_handler.EVENTS.STOP_REPLAY);
                        self.show_main_screen();
                    }
                }

            }
        }

        this.events_bound = true;


    },
    highlight_beatmap($beatmapHtml){
        this.$currentSelectionHtml =$beatmapHtml;
        this.$beatmap_section_html.find(".song_preview_row").removeClass('song_preview_unselected').removeClass('song_preview_mouseover').removeClass('song_preview_selected').addClass('song_preview_unselected');
        //resize everything back to unselected size
        this.$beatmap_section_html.find(".beatmap_preview").removeClass("col-xs-9").removeClass("col-xs-8").removeClass("col-xs-7")
            .removeClass('col-xs-offset-5').removeClass('col-xs-offset-4').removeClass('col-xs-offset-3')
            .addClass('col-xs-offset-5').addClass('col-xs-7');
        $beatmapHtml.removeClass("col-xs-9").removeClass("col-xs-8").removeClass("col-xs-7")
            .removeClass('col-xs-offset-5').removeClass('col-xs-offset-4').removeClass('col-xs-offset-3')
            .addClass('col-xs-offset-3').addClass('col-xs-9');
        $beatmapHtml.find('.song_preview_row').removeClass('song_preview_unselected').addClass('song_preview_selected');
        $beatmapHtml[0].scrollIntoViewIfNeeded();

    },


    select_beatmap(md5sum,highlight_map){
        this.$replay_section_html.html(""); //clear current replay select




        var beatmap = null;
        for(var i = 0; i < this.beatmaps.length ; i++){
            if(this.beatmaps[i].md5sum == md5sum){
                beatmap = this.beatmaps[i];
                break;
            }
        }

        this.map_name.innerHTML = Mustache.render("{{source}} "+
            "({{#artistunicode}}{{artistunicode}}{{/artistunicode}}{{^artistunicode}}{{artist}}{{/artistunicode}}) - "+
            "{{#titleunicode}}{{titleunicode}}{{/titleunicode}}{{^titleunicode}}{{title}}{{/titleunicode}}  [{{version}}]",beatmap);
        this.mapped_by.innerHTML = "Mapped by " + beatmap.creator;
        this.map_length_and_objects.innerHTML =
            "Length: " + beatmap.song_length +
            " BPM: " +  (beatmap.maxBPM ? beatmap.maxBPM + " - " : "") + beatmap.minBPM  +
            " Objects: " + beatmap.objects;
        this.map_object_type_counts.innerHTML =
            "Circles: " +  beatmap.circles  +
            " Sliders: "+  beatmap.sliders  +
            " Spinners " + beatmap.spinners ;
        this.map_difficulty.innerHTML =
            "CS: " + beatmap.circleSize +
            " AR: " + beatmap.approachRate +
            " OD: " + beatmap.overallDifficulty +
            " HP: " + beatmap.HPDrain +
            " Stars: " + beatmap.stars;
        beatmap.play_song();
        beatmap.load_background();
        var self = this;
        database.get_data_from_index(database.TABLES.REPLAYS,database.INDEXES.REPLAYS.BEATMAP_ID,beatmap.md5sum, function (replays) {
            self.replays = replays;
            replays.sort(function (a,b) {
                if (a.tScore > b.tScore)
                    return -1;
                if (a.tScore < b.tScore)
                    return 1;
                //if same score (rare but would happen on easier maps) sort by date played
                var aDate = new Date(a.time_played);
                var bDate = new Date(b.time_played);
                if(aDate > bDate){
                    return -1;
                }
                if(aDate < bDate){
                    return 1;
                }
                return 0;
            });
            for(i = 0; i < self.replays.length; i++){
                self.replays[i].grade_img = osu.skins[osu.score.GRADES[self.replays[i].grade].small_icn];
            }

            self.replaySearch = new Bloodhound({
                datumTokenizer: function (datum) {
                    return Bloodhound.tokenizers.whitespace(datum.playerName);
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: self.replays
            });
            self.render_replay(self.replays);


        });
        this.current_selection = beatmap;
        if(highlight_map){
                this.highlight_beatmap($("#"+md5sum));
        }
    },
    render_replay(replays){
        var content = Mustache.render(this.replay_selection_template, {replays:replays});
        this.$replay_section_html.append(content);
    },


    show_selection: function () {
        if(this.beatmap_count > 0 && this.replay_count > 0){
            var self = this;
            database.get_all_keys(database.TABLES.BEATMAPS, function (keys) {
                self.key_count = keys.length; //even though this should be same as beatmap count just to be safe we will check again
                for(var i = 0; i < keys.length ; i++){
                    self.beatmap_keys.push(keys[i]);
                    var beatmap = new osu.beatmaps.BeatmapPreview(keys[i], function () {
                        self.processed_count++;
                        self.songs_processed();
                    });
                    self.beatmaps.push(beatmap);
                }
            });
        }
        if(this.beatmap_count == 0 || this.replay_count == 0){
            document.getElementById("loading").className = "hidden";
            document.getElementById("no_beatmaps_replays").className = "";
        }
    },
    songs_processed: function () {
        if(this.key_count == this.processed_count){
            this.beatmaps.sort(function (a,b) {
                if (a.title < b.title)
                    return -1;
                if (a.title > b.title)
                    return 1;
                //if same beatmap order by star difficulty
                if(a.stars < b.stars){
                    return -1;
                }
                if(a.stars > b.stars){
                    return 1;
                }
                return 0;
            });
            for(var i =0; i < this.beatmaps.length; i++){
                this.render_song(this.beatmaps[i]);
            }
            this.beatmapSearch = new Bloodhound({
                datumTokenizer: function (datum) {
                    var matchon = datum.title + " " + datum.artist + " " + datum.tags;
                    return Bloodhound.tokenizers.whitespace(matchon);
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: this.beatmaps
            });
            this.show_main_screen();
        }
    },
    show_main_screen: function () {
        document.getElementById("loading").className = "hidden";
        document.getElementById("no_beatmaps_replays").className = "hidden";
        document.getElementById("container").className = "";
        document.getElementById("main_menu").className = "";
        document.getElementById("render_zone").className = "hidden";


        if(this.$footer.css('display') =='none'){
            this.$footer.toggle("slide", {direction: "down"});
        }

        if(this.$replay_section_html.css('display') == "none"){
            this.$replay_section_html.toggle("slide", {direction: "left"});
        }
        if(this.$title_and_search.css('display') == "none"){
            this.$title_and_search.toggle("slide", {direction: "up"});
        }
        if(this.$details_replay_search.css('display') == "none"){
            this.$details_replay_search.toggle("slide", {direction: "up"});
        }
        if(this.$beatmap_section_html.css('display') == "none"){
            this.$beatmap_section_html.toggle("slide", {direction: "right"}); //right looks broken
        }



        this.$footer.find('#skin_settings').attr('style','');
        this.$footer.find('#skin_select_field').attr('style','');
        this.loaded = true;
        this.displaying_main_screen = true;
        if(!this.current_selection){
            //select random beatmap
            this.select_beatmap(this.beatmaps[Math.floor(Math.random()*this.beatmaps.length)].md5sum, true);
        }else{
            this.current_selection.load_background();
        }
        this.$beatmap_search_field.focus();
    },
    hide_main_screen: function () {
        console.log(this.$footer.css('display'));
        if(this.$footer.css('display') !='none'){
            this.$footer.toggle("slide", {direction: "down"});
        }
        if(this.$beatmap_section_html.css('display') != "none"){
            this.$beatmap_section_html.toggle("slide", {direction: "right"});
        }
        if(this.$replay_section_html.css('display') != "none"){
            this.$replay_section_html.toggle("slide", {direction: "left"});
        }
        if(this.$title_and_search.css('display') != "none"){
            this.$title_and_search.toggle("slide", {direction: "up"});
        }
        if(this.$details_replay_search.css('display') != "none"){
            this.$details_replay_search.toggle("slide", {direction: "up"});
        }
        this.displaying_main_screen = false;
    },

    set_background: function (background_data) {
        document.body.style.background = "url("+background_data+") no-repeat center fixed";
        document.body.style.backgroundSize = "100% 100%";
    },
    remove_background: function () {
        document.body.style.background = "";
    },
    display_new_song: function (md5sum) {

        if(this.displaying_main_screen){
            //make main selection

        }
    },

    load_song: function (md5sum) {
        var self = this;
        var curr_length = this.beatmaps.length;
        var beatmap = new osu.beatmaps.BeatmapPreview(md5sum, function () {
            self.render_song(self.beatmaps[curr_length+1]); //some reason we havent finished loading on this callback ??
            self.display_new_song(md5sum);
        });
        this.beatmaps.push(beatmap);
        this.beatmap_keys.push(md5sum);
    },

    render_song: function (beatmap) {
        var content = Mustache.render(this.beatmap_selection_template, {beatmaps:beatmap});
        this.$beatmap_section_html.append(content);
    },

    on_load_file: function (data) {
        if(!this.loaded){
            this.init();
        }
        else {
            for(var i = 0; i < data.md5sums.length; i++){
                if(this.beatmap_keys.indexOf(data.md5sums[i]) == -1){
                    this.load_song(data.md5sums[i])
                }
            };

        }
    }

};

/**
 * osu_game.js
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

    calculateLetterBox: function () {
        var x = osu.ui.renderer.renderWidth;
        var y = osu.ui.renderer.renderHeight;
        var fixed_ratio_y = (3 / 4) * x;
        var fixed_ratio_x = (4 / 3) * y;
        var details = {
            width: x,
            height: y,
            x_offset: 0,
            y_offset: 0,
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
    tint_untint_key: function (key, do_tint) {
        if (do_tint) {
            key.tint = 0xFFFF00;
        }
        else {
            key.tint = 0xFFFFFF;
        }
    },
    create_key_press: function () {
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
        this.keypress_1.y = this.getRenderHeight() / 2 - 50;
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
        this.keypress_3.y = this.getRenderHeight() / 2 + 50;
        this.keypress_3.anchor.set(0.5);
        this.keypress_3_Text.anchor.set(0.5);
        this.keypress_3_Text.x = this.keypress_3.x;
        this.keypress_3_Text.y = this.keypress_3.y;

        this.keypress_4.x = this.getRenderWidth() - 40;
        this.keypress_4.y = this.getRenderHeight() / 2 + 100;
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
    create_skip_container: function () {
        this.skip_container = new PIXI.Container();
        var skip_texture = new PIXI.Texture.fromImage(osu.skins.play_skip);
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
        this.success_container = new PIXI.Container();
        var success_texture = new PIXI.Texture.fromImage(osu.skins.section_pass);
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
        var fail_texture = new PIXI.Texture.fromImage(osu.skins.section_fail);
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
                console.log(this.mods[i]);
                var modpng = PIXI.Texture.fromImage(osu.skins[this.mods[i].icon]);
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

    create_master_container: function () {

        this.master_container.removeChildren();
        this.hit_object_container = new PIXI.Container();

        this.create_background();
        this.create_key_press();
        this.create_mod_container();
        this.create_replay_by_text();
        this.create_timer_container();
        this.master_container.addChild(this.hit_object_container);
        this.create_skip_container();
        this.create_success_container();
        this.create_fail_container();
        this.create_play_warn_arrows_container();
        this.create_cursor();
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
    },
    bind_events: function () {
        if (!this.events_bound) {
            event_handler.on(event_handler.EVENTS.SETTINGS_CHANGED, this.create_dimmer.bind(this));
            event_handler.on(event_handler.EVENTS.STOP_REPLAY, this.end_replay.bind(this));
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
        event_handler.off(event_handler.EVENTS.RENDER, "replay_text"); //unsubscrbe incase another replay closed early
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
        for (var i = 0; i < this.mods.length; i++) {
            var mod = this.mods[i].code;
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
        console.log(overallDifficulty);
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




        var difficultyCircleSize = parseInt(this.beatmap.map_data.difficulty.CircleSize);
        if (this.is_hardrock && difficultyCircleSize < 7) difficultyCircleSize += 1;
        if (this.is_easy && difficultyCircleSize > 1) difficultyCircleSize -= 1; //TODO: work out if that's correct
        var unScaledDiameter = (108.848 - (difficultyCircleSize * 8.9646));
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

        this.delayEnd = this.beatmap.map_data.time_length + 5000;
        if(this.is_doubletime) this.delayEnd *= osu.helpers.constants.DOUBLE_TIME_MULTI;

        event_handler.on(event_handler.EVENTS.RENDER, this.move_replay_text.bind(this), "replay_text")

    },

    move_replay_text: function () {
        if (this.replay_text.x < (-this.replay_text.width + 5)) {
            this.replay_text.x = this.getRenderWidth();
        }
        this.replay_text.x -= 2;
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

    game_loop: function () {
        if (!this.has_started && this.audioLeadIn == 0) {
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
            var curTime = Date.now() - this.date_started;
            this.update_timer_percentage(curTime/this.audioLeadIn, osu.helpers.constants.TIMER_INTRO_COLOUR);
        }
        var time = Date.now();
        if (this.has_started) {
            this.curMapTime = time - this.date_started;
            if (this.skipTime ==-1 || this.skipTime > -1 && this.skipTime < this.curMapTime) {
                this.skip_container.visible = false;
            }else{
                this.update_timer_percentage(this.curMapTime/this.skipTime, osu.helpers.constants.TIMER_INTRO_COLOUR);
                this.skip_container.visible = true;
            }
            this.render_object();

        }
        this.render_replay_frame();
        if(!this.finished) setTimeout(this.game_loop.bind(this), 1);

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
 * scorescreen.js
 * Created by Ugrend on 4/06/2016.
 */


var osu = osu || {};
osu.ui = osu.ui || {};
osu.ui.interface = osu.ui.interface || {};
osu.ui.interface.scorescreen = {
    replayStarted: false,
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

        this.beatmap.background = this.beatmap.background || ""; //prevent pixi breaking on undefined background
        var background = PIXI.Texture.fromImage(this.beatmap.background);
        var background_sprite = new PIXI.Sprite(background);
        background_sprite.width = this.getRenderWidth();
        background_sprite.height = this.getRenderHeight();
        this.master_container.addChild(background_sprite);



        var background_dimmer = new PIXI.Graphics();
        background_dimmer.beginFill(0x0, 0.5);
        background_dimmer.drawRect(0, 0, this.getRenderWidth(), this.getRenderHeight());

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


        var backpng = PIXI.Texture.fromImage(osu.skins.menu_back);
        var back_Sprite = new PIXI.Sprite(backpng);
        back_Sprite.position.x = this.getRenderWidth() *.1;
        back_Sprite.position.y = this.getRenderHeight() *.9;
        back_Sprite.interactive = true;
        back_Sprite.width = this.getRenderWidth() *.2;
        back_Sprite.height = this.getRenderHeight() *.2;
        back_Sprite.anchor.set(0.5);
        back_Sprite.on("mouseup", this.exit.bind(this));

        this.master_container.addChild(gradeSprite);
        for(var i = 0; i < this.mods.length ; i++ ){
            if(this.mods[i].icon != ""){
                var modpng = PIXI.Texture.fromImage(osu.skins[this.mods[i].icon]);
                var modSprite = new PIXI.Sprite(modpng);
                modSprite.position.y = this.getRenderHeight() *.7;
                modSprite.position.x = (this.getRenderWidth() *.9) - (i*50);
                modSprite.anchor.set(0.5);
                this.master_container.addChild(modSprite);
            }
        }

        this.master_container.addChild(replay_Sprite);
        this.master_container.addChild(back_Sprite);

    },
    exit: function () {
        osu.audio.sound.play_sound(osu.audio.sound.MENUBACK);
        osu.ui.interface.mainscreen.show_main_screen();
    },

    start_replay: function(){
        if(this.replayStarted) return; // prevent multi clicks
        this.replayStarted = true;
        osu.audio.sound.play_sound(osu.audio.sound.MENUHIT);
        var self = this;
        setTimeout(function () {
            //ghetto fix to play menu sound

            osu.audio.music.preview_screen = false;
            osu.ui.interface.osugame.replay_data = replay.replayData;
            osu.ui.interface.osugame.beatmap = self.beatmap;
            osu.ui.interface.osugame.mods = self.mods;
            osu.ui.interface.osugame.replay_played_by_text = "REPLAY MODE - Watching " + replay.playerName + " play " + self.beatmap.map_name;
            osu.ui.interface.osugame.initGame();
            osu.audio.music.stop();
            osu.ui.interface.osugame.game_loop();
        },2000);

    },


    create_master_container: function () {
        this.master_container.removeChildren();
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
        this.$footer = osu.ui.interface.mainscreen.$footer || $("#footer");
        this.$footer.attr('style','');
        this.$footer.css('display', 'none');
        this.replayStarted = false;
        osu.ui.renderer.fixed_aspect = false;
        osu.ui.renderer.start();
        this.create_master_container();
        osu.ui.renderer.clearStage();
        osu.ui.renderer.addChild(this.master_container);

        osu.audio.music.init(this.beatmap.song, this.beatmap.song_md5sum);
        osu.audio.music.preview_screen = true;
        osu.audio.music.preview_time = this.beatmap.map_data.general.PreviewTime / 1000;
        osu.audio.music.start();


    }

};
/**
 * launcher.js
 * Created by Ugrend on 22/06/2016.
 */

if (!window.indexedDB) {
    console.log("no index db = no storage ")
}
else {
    database.init(function () {
        osu.settings.onloaded = function () {
            osu.ui.interface.mainscreen.init();
        };
        osu.settings.init();
    });
}
