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
    key_count: 0,
    processed_count: 0,
    displaying_main_screen: false,
    loaded: false,
    beatmap_keys: [],
    beatmaps: [],
    current_selection: false,
    beatmap_selection_template: "",
    replay_selection_template: "",
    beatmap_section: null,
    replay_section: null,


    init: function () {
        this.beatmap_selection_template = document.getElementById("beatmap_select_template").innerHTML;
        this.replay_selection_template = document.getElementById("replay_select_template").innerHTML;
        this.beatmap_section = document.getElementById("song_selection_area");
        this.replay_section = document.getElementById("replay_select_area");

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
        //event_handler.on(event_handler.EVENTS.REPLAY_LOADED, this.on_load_file.bind(this)); // we may not care about a new replay

    },
    show_selection: function () {
        if(this.beatmap_count > 0 && this.replay_count > 0){
            var self = this;
            database.get_all_keys(database.TABLES.BEATMAPS, function (keys) {
                self.key_count = keys.length; //even though this should be same as beatmap count just to be safe we will check again
                for(var i = 0; i < keys.length ; i++){
                    self.beatmap_keys.push(keys[i]);
                    var beatmap = new osu.beatmaps.BeatmapPreview(keys[i], function () {
                        self.processed_count++;
                        self.songs_processed();
                    });
                    self.beatmaps.push(beatmap);
                }
            });
        }
        if(this.beatmap_count == 0 || this.replay_count == 0){
            document.getElementById("loading").className = "hidden";
            document.getElementById("no_beatmaps_replays").className = "";
        }
    },
    songs_processed: function () {
        if(this.key_count == this.processed_count){
            this.show_main_screen();
        }
    },
    show_main_screen: function () {
        document.getElementById("loading").className = "hidden";
        document.getElementById("no_beatmaps_replays").className = "hidden";
        document.getElementById("container").className = "";
        this.loaded = true;
        this.displaying_main_screen = true;
    },



    set_background: function (background_data) {
        document.body.style.background = "url("+background_data+") no-repeat center fixed";
        document.body.style.backgroundSize = "100% 100%";
    },
    remove_background: function () {
        document.body.style.background = "";
    },
    display_new_song: function (md5sum) {
        if(this.displaying_main_screen){


        }
    },

    load_song: function (md5sum) {
        var self = this;
        var beatmap = new osu.beatmaps.BeatmapPreview(md5sum, function () {
            self.display_new_song(md5sum);
        });
        this.beatmaps.push(beatmap);
        this.beatmap_keys.push(md5sum);
    },

    on_load_file: function (data) {
        if(!this.loaded){
            this.init();
        }
        else {
            for(var i = 0; i < data.md5sums.length; i++){
                if(this.beatmap_keys.indexOf(data.md5sums[i]) == -1){
                    this.load_song(data.md5sums[i])
                }
            };

        }
    }

};
