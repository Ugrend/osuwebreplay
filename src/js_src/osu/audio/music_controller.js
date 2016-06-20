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

    init: function (src) {
        this.__audio.pause();
        this.__audio.src = src;
        this.__audio.onended = this.repeat.bind(this);
        this.__audio.volume = 0.2;
    },

    stop: function () {
        this.__audio.pause();
        this.__audio.currentTime = 0;
    },

    start: function(){
        if(this.preview_screen){
            this.__audio.currentTime = this.preview_time;
            this.__audio.play();
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

    repeat: function () {
        if(this.preview_screen){
            this.start();
        }

    }












};

