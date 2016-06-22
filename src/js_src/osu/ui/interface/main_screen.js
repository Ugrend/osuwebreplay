/**
 * main_screen.js
 * Created by Ugrend on 20/06/2016.
 */
var osu = osu || {};
osu.ui = osu.ui || {};
osu.ui.interface = osu.ui.interface || {};
osu.ui.interface.mainscreen = {

    beatmap_count: -1,
    replay_count: -1,
    displaying_main_screen: false,

    init: function () {
        var self = this;
        database.get_count(database.TABLES.BEATMAPS, function (count) {
            self.beatmap_count = count;
            self.show_selection();
        });
        database.get_count(database.TABLES.REPLAYS, function (count) {
            self.replay_count = count;
            self.show_selection();
        });
        event_handler.on(event_handler.EVENTS.BEATMAP_LOADED,this.on_load_file.bind(this));
        event_handler.on(event_handler.EVENTS.REPLAY_LOADED, this.on_load_file.bind(this));

    },
    show_selection: function () {
        if(this.beatmap_count > 0 && this.replay_count > 0){
            document.getElementById("loading").className = "hidden";
            document.getElementById("no_beatmaps_replays").className = "hidden";
            document.getElementById("container").className = "";
            this.displaying_main_screen = true;
        }
        if(this.beatmap_count == 0 || this.replay_count == 0){
            document.getElementById("loading").className = "hidden";
            document.getElementById("no_beatmaps_replays").className = "";
        }
    },

    on_load_file: function () {
        if(!this.displaying_main_screen){
            this.init();
        }
    }

};
