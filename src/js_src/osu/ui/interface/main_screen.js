/**
 * main_screen.js
 * Created by Ugrend on 20/06/2016.
 */
var osu = osu || {};
osu.ui = osu.ui || {};
osu.ui.interface = osu.ui.interface || {};
osu.ui.interface.mainscreen = {

    beatmap_count: 0,
    replay_count: 0,


    init: function () {
        var self = this;
        database.get_count(database.TABLES.BEATMAPS, function (count) {
            self.beatmap_count = count;
            self.show_selection();
        });
        database.get_count(database.TABLES.REPLAYS, function (count) {
            self.replay_count = count;
            self.show_selection();
        })

    },
    show_selection: function () {
        if(this.beatmap_count > 0 && this.replay_count > 0){

        }
    }

};
