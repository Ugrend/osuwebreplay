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
        {name: 'hit300', url: "data/hit300.png"},
        {name: 'hit300g', url: "data/hit300g.png"},
        {name: 'hit300k', url: "data/hit300k.png"},
        {name: 'hit100',  url: "data/hit100.png"},
        {name: 'hit100k', url: "data/hit100k.png"},
        {name: 'hit50', url: "data/hit50.png"},
        {name: 'hit0', url: "data/hit0.png"},

        //Ranking Grades
        {name: 'ranking_xh',  url:"data/ranking-XH.png"},
        {name: 'ranking_sh',  url:"data/ranking-SH.png"},
        {name: 'ranking_x', url:"data/ranking-X.png"},
        {name: 'ranking_s', url:"data/ranking-S.png"},
        {name: 'ranking_a', url:"data/ranking-A.png"},
        {name: 'ranking_b', url:"data/ranking-B.png"},
        {name: 'ranking_c', url:"data/ranking-C.png"},
        {name: 'ranking_d', url:"data/ranking-D.png"},
        {name: 'ranking_xh_small', url:"data/ranking-XH.png"},
        {name: 'ranking_sh_small', url:"data/ranking-SH.png"},
        {name: 'ranking_x_small', url:"data/ranking-X.png"},
        {name: 'ranking_s_small', url:"data/ranking-S.png"},
        {name: 'ranking_a_small', url:"data/ranking-A.png"},
        {name: 'ranking_b_small', url:"data/ranking-B.png"},
        {name: 'ranking_c_small', url:"data/ranking-C.png"},
        {name: 'ranking_d_small', url:"data/ranking-D.png"},


        //Interface
        {name: 'pause_replay', url:"data/pause-replay.png"},
        {name: 'menu_back', url:"data/menu-back.png"},
        {name: 'cursor', url:"data/cursor.png"},
        {name: 'cursortrail', url:"data/cursortrail.png"},
        {name: 'cursormiddle', url:"data/cursormiddle.png"},
        {name: 'cursor_smoke', url:"data/cursor-smoke.png"},
        {name: 'inputoverlay_key', url:"data/inputoverlay-key.png"},
        {name: 'star', url:"data/star.png"},

        //Playfield
        {name: 'section_fail', url:"data/section-fail.png"},
        {name: 'section_pass', url:"data/section-pass.png"},
        {name: 'play_warningarrow', url:"data/play-warningarrow.png"},
        {name: 'play_skip', url:"data/play-skip.png"},

        {name: 'hitcircle',  url:"data/hitcircle.png"},
        {name: 'hitcicleoverlay',  url:"data/hitcircleoverlay.png"},
        {name: 'approachcircle',  url:"data/approachcircle.png"},
        {name: 'followpoint',  url:"data/followpoint.png"},
        {name: 'sliderfollowcircle',  url:"data/sliderfollowcircle.png"},
        {name: 'reversearrow',  url:"data/reversearrow.png"},
        {name: 'sliderscorepoint',  url:"data/sliderscorepoint.png"},

        {name: 'spinner_approachcircle',url:"data/spinner-approachcircle.png"},
        {name: 'spinner_background',url:"data/spinner-background.png"},
        {name: 'spinner_bottom',url:"data/spinner-bottom.png"},
        {name: 'spinner_circle',url:"data/spinner-circle.png"},
        {name: 'spinner_clear',url:"data/spinner-clear.png"},
        {name: 'spinner_glow',url:"data/spinner-glow.png"},
        {name: 'spinner_metre',url:"data/spinner-metre.png"},
        {name: 'spinner_middle',url:"data/spinner-middle.png"},
        {name: 'spinner_middle2',url:"data/spinner-middle2.png"},
        {name: 'spinner_osu',url:"data/spinner-osu.png"},
        {name: 'spinner_rpm',url:"data/spinner-rpm.png"},
        {name: 'spinner_spin',url:"data/spinner-spin.png"},
        {name: 'spinner_top',url:"data/spinner-top.png"},
        {name: 'spinner_warning',url:"data/spinner-warning.png"},



        {name: 'default_0', url:"data/default-0.png"},
        {name: 'default_1', url:"data/default-1.png"},
        {name: 'default_2', url:"data/default-2.png"},
        {name: 'default_3', url:"data/default-3.png"},
        {name: 'default_4', url:"data/default-4.png"},
        {name: 'default_5', url:"data/default-5.png"},
        {name: 'default_6', url:"data/default-6.png"},
        {name: 'default_7', url:"data/default-7.png"},
        {name: 'default_8', url:"data/default-8.png"},
        {name: 'default_9', url:"data/default-9.png"},
        //Mods

        {name: 'selection_mod_doubletime', url:"data/selection-mod-doubletime.png"},
        {name: 'selection_mod_easy', url:"data/selection-mod-easy.png"},
        {name: 'selection_mod_flashlight', url:"data/selection-mod-flashlight.png"},
        {name: 'selection_mod_halftime', url:"data/selection-mod-halftime.png"},
        {name: 'selection_mod_hardrock', url:"data/selection-mod-hardrock.png"},
        {name: 'selection_mod_hidden', url:"data/selection-mod-hidden.png"},
        {name: 'selection_mod_nightcore', url:"data/selection-mod-nightcore.png"},
        {name: 'selection_mod_nofail', url:"data/selection-mod-nofail.png"},
        {name: 'selection_mod_perfect', url:"data/selection-mod-perfect.png"},
        {name: 'selection_mod_spunout', url:"data/selection-mod-spunout.png"},
        {name: 'selection_mod_suddendeath', url:"data/selection-mod-suddendeath.png"},
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
                var name = assets[i].filename.split('.')[0].toLowerCase().replace(/-/g,"_");
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