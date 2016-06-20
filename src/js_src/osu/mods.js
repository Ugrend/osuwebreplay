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

