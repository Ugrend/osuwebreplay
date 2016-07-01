/**
 * sound_effects.js
 * Created by Ugrend on 16/06/2016.
 */
var osu = osu || {};
osu.audio = osu.audio || {};
osu.audio.sound = {

    section_success:   {
        __audio: new Audio(src=osu.skins.audio.sectionpass),
        play: function () {
            this.__audio.volume = osu.settings.SETTINGS.master_volume * osu.settings.SETTINGS.sound_effects_volume;
            this.__audio.play();
        }

    }


};