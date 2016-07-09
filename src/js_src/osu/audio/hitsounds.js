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

    getHitSounds: function (hitSoundArray, additions) {
        var soundArray = [];
        soundArray.push(osu.audio.sound[this.HIT_ADDITIONS.NORMAL+this.HIT_SOUNDS.SOUND_NORMAL]);
        for(var i = 0 ; i < hitSoundArray.length; i ++){
            switch(hitSoundArray[i]){
                case osu.objects.HitObjectParser.HIT_SOUNDS.SOUND_NORMAL:
                    break;
                case osu.objects.HitObjectParser.HIT_SOUNDS.SOUND_WHISTLE:
                    soundArray.push(osu.audio.sound[this.HIT_ADDITIONS.NORMAL+this.HIT_SOUNDS.SOUND_WHISTLE]);
                    break;
                case osu.objects.HitObjectParser.HIT_SOUNDS.SOUND_FINISH:
                    soundArray.push(osu.audio.sound[this.HIT_ADDITIONS.NORMAL+this.HIT_SOUNDS.SOUND_FINISH]);
                    break;
                case osu.objects.HitObjectParser.HIT_SOUNDS.SOUND_CLAP:
                    soundArray.push(osu.audio.sound[this.HIT_ADDITIONS.NORMAL+this.HIT_SOUNDS.SOUND_CLAP]);
                    break;
            }

        }
        return soundArray;
    }


};