/**
 * skins.js
 * Created by Ugrend on 4/06/2016.
 */
var osu = osu || {};
osu.skins = {

    //https://osu.ppy.sh/wiki/Skinning_Standard
    //https://osu.ppy.sh/wiki/Skinning_Interface

    COMBO_COLOURS: [],
    DEFAULT_COLOURS: [0xFFC000,0x00CA00,0x127CFF,0xF21839],
    loaded: false,
    resources: {


    },
    DEFAULT_RESOURCES:[
        //hitbursts
        {name: 'hit300', url: "resources/hit300.png"},
        {name: 'hit300g', url: "resources/hit300g.png"},
        {name: 'hit300k', url: "resources/hit300k.png"},
        {name: 'hit100',  url: "resources/hit100.png"},
        {name: 'hit100k', url: "resources/hit100k.png"},
        {name: 'hit50', url: "resources/hit50.png"},
        {name: 'hit0', url: "resources/hit0.png"},

        //Ranking Grades
        {name: 'ranking_xh',  url:"resources/ranking-XH.png"},
        {name: 'ranking_sh',  url:"resources/ranking-SH.png"},
        {name: 'ranking_x', url:"resources/ranking-X.png"},
        {name: 'ranking_s', url:"resources/ranking-S.png"},
        {name: 'ranking_a', url:"resources/ranking-A.png"},
        {name: 'ranking_b', url:"resources/ranking-B.png"},
        {name: 'ranking_c', url:"resources/ranking-C.png"},
        {name: 'ranking_d', url:"resources/ranking-D.png"},
        {name: 'ranking_xh_small', url:"resources/ranking-XH.png"},
        {name: 'ranking_sh_small', url:"resources/ranking-SH.png"},
        {name: 'ranking_x_small', url:"resources/ranking-X.png"},
        {name: 'ranking_s_small', url:"resources/ranking-S.png"},
        {name: 'ranking_a_small', url:"resources/ranking-A.png"},
        {name: 'ranking_b_small', url:"resources/ranking-B.png"},
        {name: 'ranking_c_small', url:"resources/ranking-C.png"},
        {name: 'ranking_d_small', url:"resources/ranking-D.png"},


        //Interface
        {name: 'pause_replay', url:"resources/pause-replay.png"},
        {name: 'menu_back', url:"resources/menu-back.png"},
        {name: 'cursor', url:"resources/cursor.png"},
        {name: 'cursortrail', url:"resources/cursortrail.png"},
        {name: 'cursormiddle', url:"resources/cursormiddle.png"},
        {name: 'cursor_smoke', url:"resources/cursor-smoke.png"},
        {name: 'inputoverlay_key', url:"resources/inputoverlay-key.png"},
        {name: 'star', url:"resources/star.png"},

        //Playfield
        {name: 'section_fail', url:"resources/section-fail.png"},
        {name: 'section_pass', url:"resources/section-pass.png"},
        {name: 'play_warningarrow', url:"resources/play-warningarrow.png"},
        {name: 'play_skip', url:"resources/play-skip.png"},

        {name: 'hitcircle',  url:"resources/hitcircle.png"},
        {name: 'hitcicleoverlay',  url:"resources/hitcircleoverlay.png"},
        {name: 'approachcircle',  url:"resources/approachcircle.png"},
        {name: 'followpoint',  url:"resources/followpoint.png"},
        {name: 'sliderfollowcircle',  url:"resources/sliderfollowcircle.png"},
        {name: 'reversearrow',  url:"resources/reversearrow.png"},
        {name: 'sliderscorepoint',  url:"resources/sliderscorepoint.png"},
        {name: 'sliderb0', url:"resources/sliderb0.png"},

        {name: 'spinner_approachcircle',url:"resources/spinner-approachcircle.png"},
        {name: 'spinner_background',url:"resources/spinner-background.png"},
        {name: 'spinner_bottom',url:"resources/spinner-bottom.png"},
        {name: 'spinner_circle',url:"resources/spinner-circle.png"},
        {name: 'spinner_clear',url:"resources/spinner-clear.png"},
        {name: 'spinner_glow',url:"resources/spinner-glow.png"},
        {name: 'spinner_metre',url:"resources/spinner-metre.png"},
        {name: 'spinner_middle',url:"resources/spinner-middle.png"},
        {name: 'spinner_middle2',url:"resources/spinner-middle2.png"},
        {name: 'spinner_osu',url:"resources/spinner-osu.png"},
        {name: 'spinner_rpm',url:"resources/spinner-rpm.png"},
        {name: 'spinner_spin',url:"resources/spinner-spin.png"},
        {name: 'spinner_top',url:"resources/spinner-top.png"},
        {name: 'spinner_warning',url:"resources/spinner-warning.png"},



        {name: 'default_0', url:"resources/default-0.png"},
        {name: 'default_1', url:"resources/default-1.png"},
        {name: 'default_2', url:"resources/default-2.png"},
        {name: 'default_3', url:"resources/default-3.png"},
        {name: 'default_4', url:"resources/default-4.png"},
        {name: 'default_5', url:"resources/default-5.png"},
        {name: 'default_6', url:"resources/default-6.png"},
        {name: 'default_7', url:"resources/default-7.png"},
        {name: 'default_8', url:"resources/default-8.png"},
        {name: 'default_9', url:"resources/default-9.png"},
        //Mods

        {name: 'selection_mod_doubletime', url:"resources/selection-mod-doubletime.png"},
        {name: 'selection_mod_easy', url:"resources/selection-mod-easy.png"},
        {name: 'selection_mod_flashlight', url:"resources/selection-mod-flashlight.png"},
        {name: 'selection_mod_halftime', url:"resources/selection-mod-halftime.png"},
        {name: 'selection_mod_hardrock', url:"resources/selection-mod-hardrock.png"},
        {name: 'selection_mod_hidden', url:"resources/selection-mod-hidden.png"},
        {name: 'selection_mod_nightcore', url:"resources/selection-mod-nightcore.png"},
        {name: 'selection_mod_nofail', url:"resources/selection-mod-nofail.png"},
        {name: 'selection_mod_perfect', url:"resources/selection-mod-perfect.png"},
        {name: 'selection_mod_spunout', url:"resources/selection-mod-spunout.png"},
        {name: 'selection_mod_suddendeath', url:"resources/selection-mod-suddendeath.png"},

        {name: 'pause_overlay', url:"resources/pause-overlay.png"},
        {name: 'pause_continue', url:"resources/pause-continue.png"},
        {name: 'pause_back', url:"resources/pause-back.png"},

    ],

    skins: [],

    init: function () {
        var self = this;
        database.getAll('skins',function (result) {
            for(var i=0; i < result.length; i++ ){
                self.skins.push({
                    md5sum: result[i].md5sum,
                    name: result[i].name
                });
            }
            var current_skin = {};
            self.COMBO_COLOURS = [];


            //clone default then override with custom values
            for(i = 0; i < self.DEFAULT_RESOURCES.length; i++){
                current_skin[self.DEFAULT_RESOURCES[i].name] = self.DEFAULT_RESOURCES[i].url;
            }
            if(osu.settings.SETTINGS.selected_skin != "0"){
                database.get_data(database.TABLES.SKINS, osu.settings.SETTINGS.selected_skin,function (data) {
                    if(data.data.colours) {
                        for (i = 0; i < data.data.colours.length; i++) {
                            self.COMBO_COLOURS.push(data.data.colours[i]);
                        }
                    }
                    self._loadAssetsFromIDB(current_skin,data.data.assets,self.loadSkin.bind(self));
                });
            }
            else{
                for(i = 0; i<self.DEFAULT_COLOURS.length;i++){
                    self.COMBO_COLOURS.push(self.DEFAULT_COLOURS[i]);
                }
                self.loadSkin(current_skin);
            }

        });
    },
    _loadAssetsFromIDB: function (current_skin,assets,cb) {

        var _length = assets.length;
        var _loaded = 0;
        for(var i = 0; i < _length; i++){
            var fileExt = assets[i].filename.split('.').pop();
            if(fileExt.toLowerCase() == "png"){
                var name = assets[i].filename.split('.')[0].toLowerCase().replace(/-|@/g,"_");
                (function (name) {
                    database.get_data(database.TABLES.ASSETS,assets[i].md5sum, function (result) {
                        _loaded++;
                        current_skin[name] = result.data;
                        if(_loaded >= _length){
                            cb(current_skin);
                        }
                    }, function () {
                        _loaded++;
                        if(_loaded >= _length){
                            cb(current_skin);
                        }
                    })
                })(name);
            }else{
                _loaded++;
                if(_loaded >= _length){
                    cb(current_skin);
                }
            }
        }
        if(_loaded >= _length){
            cb(current_skin);
        }

    },
    loadSkin: function (skin) {
        var self = this;
        var skinArray = [];
        for(var k in skin){
            if(skin.hasOwnProperty(k)){
                skinArray.push({
                    name: k,
                    url: skin[k]
                });
            }

        }

        PIXI.loader.add(skinArray).on("progress",self.loadProgressHandler.bind(self)).load(self._loaded.bind(self));
    },

    loadProgressHandler: function (loader, resources) {
       if(resources.name == "ranking-sh"){
           console.log(resources);
       }
    },

    onloaded: function () {

    },

    _loaded: function (loader, resources) {
        this.resources = resources;
        event_handler.emit(event_handler.EVENTS.RESOURCES_LOADED);
        this.loaded = true;
        osu.skins.onloaded();
    },
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