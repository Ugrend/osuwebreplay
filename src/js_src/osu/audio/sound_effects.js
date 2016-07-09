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