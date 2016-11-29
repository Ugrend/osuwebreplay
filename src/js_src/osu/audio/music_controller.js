/**
 * music_controller.js
 * Created by Ugrend on 9/06/2016.
 */
var osu = osu || {};
osu.audio = osu.audio || {};
osu.audio.music =  {

    preview_screen: false,
    preview_time: 0,
    __audio: null,
    md5sum: "",
    playing: false,
    events_bound: false,
    using_howl: true,

    init: function (src, md5sum) {

        /*You might read this and ask, why have both html5 Audio and howler js

            Basically had some weird problems with Chrome and datauri audio where switching sources/moving positions
            would sometimes corrupt the audio playing.
            To fix this i thought i would try using a audio library to see if it solved this problem
            However this introduced a new problem, howlerjs didn't seem to work with CORS when the remote source did not allow remote domains,
            Since the problem didn't affect url sources i decided to use both, howlerjs for datauri and standard Audio for everything else.

         */

        if(!this.events_bound){
            event_handler.on(event_handler.EVENTS.SETTINGS_CHANGED, this.set_volume.bind(this));
            this.events_bound = true;
        }
        //only start again
        if(src && md5sum != this.md5sum){
            this.md5sum = md5sum;
            //howl has issues with same origin policy so only use it with datauris
            this.using_howl = src.startsWith('data:audio');

            //clear out original audio object
            if(this.__audio instanceof Howl){
                this.__audio.unload();
            }
            if(this.__audio instanceof Audio){
                this.__audio.pause();
                this.__audio.currentSrc = "";
            }
            if(this.using_howl){
                this.__audio = new Howl({
                    src:[src],
                    onend:this.repeat.bind(this)
                });
            }else{
                if(this.__audio instanceof Audio){
                    this.__audio.currentSrc = src;
                }else{
                    this.__audio = new Audio(src);
                    this.__audio.onended = this.repeat.bind(this);
                }

            }

            this.set_volume();
            this.playing = false;
        }
        this.set_playback_speed(1);//reset playback speed if was playing DT/HT


    },
    set_volume: function () {
        if(this.__audio) {
            if(this.using_howl){
                this.__audio.volume(osu.settings.SETTINGS.master_volume * osu.settings.SETTINGS.music_volume);
            }else{
                this.__audio.volume = osu.settings.SETTINGS.master_volume * osu.settings.SETTINGS.music_volume;
            }

        }
    },

    stop: function () {
        if(this.__audio){
            if(this.using_howl){
                this.__audio.stop();
            }else{
                this.__audio.pause();
                this.__audio.currentTime = 0;
            }

        }
    },

    start: function(){
        if(!this.__audio) return;
        if(this.preview_screen){
            if(!this.playing){
                if(this.using_howl){
                    this.__audio.seek(this.preview_time);
                }else{
                    this.__audio.currentTime = this.preview_time;
                }

                this.__audio.play();
                this.playing = true;
            }

        }
        else{
            if(this.using_howl){
                this.__audio.seek(0);
            }else{
                this.__audio.currentTime = 0;
            }
            this.__audio.play();
        }

    },
    set_position: function (t) {
        if(!this.__audio) return;
        if(this.using_howl){
            this.__audio.seek(t);
        }else{
            this.__audio.currentTime = t;
        }

    },

    play: function(){
        if(!this.__audio) return;
        this.__audio.play()
    },
    pause: function () {
        if(!this.__audio) return;
        this.__audio.pause();
    },
    set_playback_speed: function (rate) {
        if(!this.__audio) return;
        if(this.using_howl){
            this.__audio.rate(rate);
        }else{
            this.__audio.playbackRate = rate;
        }



    },

    loaded: function () {
        if(!this.using_howl && this.__audio){
            return osu.audio.music.__audio.readyState == 4 || osu.audio.music.__audio.src != "" && !osu.audio.music.__audio.error
        }
        return true;
    },
    repeat: function () {
        if(!this.__audio) return;
        if(this.preview_screen){
            this.playing = false;
            this.start();
        }

    }












};

