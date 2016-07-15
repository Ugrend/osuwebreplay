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