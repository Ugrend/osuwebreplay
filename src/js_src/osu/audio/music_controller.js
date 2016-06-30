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

    init: function (src, md5sum) {
        //only start again
        if(md5sum != this.md5sum){
            this.md5sum = md5sum;
            this.__audio.pause();
            this.__audio.src = src;
            this.__audio.volume = 0.2;
            this.playing = false;
        }
        this.set_playback_speed(1);//reset playback speed if was playing DT/HT
        this.__audio.onended = this.repeat.bind(this);

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

