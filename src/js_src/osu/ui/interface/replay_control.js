/**
 *
 * replay_control.js
 * Created by Ugrend on 18/11/2016.
 *
 * For pausing/playing/positioning of replay
 */

var osu = osu || {};
osu.ui = osu.ui || {};
osu.ui.interface = osu.ui.interface || {};
osu.ui.interface.replaycontroller = {


    __$controlBar: $("#replay_control_zone"),
    __$togglePlayButton: $("#toggle_play_replay"),
    __$progressBar: $("#replay_progress"),
    __$volume: $("#replay_master_volume"),
    __$configButton: $("#open_config_button"),
    __$replayCurTime: $("#replay_current_time"),
    __$replayDuration: $("#replay_duration"),
    __eventsBound: false,
    __ignoreUpdates: false,
    _currentDuration: 0,
    _currentPosition: 0,

    showBar: function () {
            this.__$controlBar.slideDown();
    },
    hideBar: function () {
        this.__$controlBar.slideUp();
    },

    convertMs: function (t) {
;
        var seconds = parseInt((t/1000)%60);
        var minutes = parseInt((t/(1000*60))%60);
        var hours = parseInt((t/(1000*60*60))%24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        return (hours > 0) ? hours + ":" + minutes + ":" + seconds  : minutes + ":" + seconds;

    },

    set_duration: function(t){
        this.__$replayDuration.text(this.convertMs(t));
        this.__$progressBar.prop({max: t});
    },

    set_position: function (t) {
        if(!this.__ignoreUpdates){
            this.__$progressBar.val(t);
        }

        this.__$replayCurTime.text(this.convertMs(t));
    },

    __setVolume: function () {
        this.__$volume.val(osu.settings.SETTINGS.master_volume * 100);
    },

    showPauseIcon: function () {
        this.__$togglePlayButton.prop({src: 'data/player-pause-icon.png'})
    },
    showPlayIcon: function () {
        this.__$togglePlayButton.prop({src: 'data/player-play-icon.png'})
    },

    disable_progressbar: function () {
        this.__$progressBar.prop('disabled', true)

    },
    enable_progressbar: function () {
        this.__$progressBar.prop('disabled', false)
    },


    bindEvents: function () {

        if(!this.__eventsBound){
            var self = this;
            this.__setVolume();
            this.__$togglePlayButton.on('click', function () {
               if(osu.ui.interface.scorescreen.replayStarted){
                   osu.ui.interface.osugame.toggle_pause();
               }else{
                   osu.ui.interface.scorescreen.start_replay();
               }


            });
            event_handler.on(event_handler.EVENTS.SETTINGS_CHANGED, this.__setVolume.bind(this));
            this.__$volume.on('input', function () {
                osu.settings.SETTINGS.master_volume = self.__$volume.val() /100;
            });
            this.__$progressBar.on('input', function () {
               osu.ui.interface.osugame.go_to(self.__$progressBar.val());
            });

            this.__$configButton.on('click', function () {
                osu.ui.interface.osugame.toggle_settings();
            });

            this.__eventsBound = true;
        }


    }

};

