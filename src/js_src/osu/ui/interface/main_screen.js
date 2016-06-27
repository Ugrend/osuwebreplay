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
    beatmap_section_html: null,
    replay_section_html: null,
    events_bound: false,
    replays: [],


    init: function () {
        this.beatmap_selection_template = document.getElementById("beatmap_select_template").innerHTML;
        this.replay_selection_template = document.getElementById("replay_select_template").innerHTML;
        this.beatmap_section_html = $("#song_selection_area");
        this.replay_section_html = $("#replay_select_area");
        this.bind_events();
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

    bind_events: function () {
        //init script can be called multiple times if no maps/replays exist
        if(!this.events_bound){
            var self = this;
            //yuck
            $(this.beatmap_section_html).on("click",".beatmap_preview", function (event) {
                var parent = $(event.delegateTarget);
                //make everything unselected
                parent.find(".song_preview_row").removeClass('song_preview_unselected').removeClass('song_preview_mouseover').removeClass('song_preview_selected').addClass('song_preview_unselected');
                //resize everything back to unselected size
                parent.find(".beatmap_preview").removeClass("col-xs-9").removeClass("col-xs-8").removeClass("col-xs-7")
                    .removeClass('col-xs-offset-5').removeClass('col-xs-offset-4').removeClass('col-xs-offset-3')
                    .addClass('col-xs-offset-5').addClass('col-xs-7');
                var clickedObject = $(this);
                var md5sum = clickedObject.attr("id");

                //change the clicked object
                clickedObject.removeClass("col-xs-9").removeClass("col-xs-8").removeClass("col-xs-7")
                    .removeClass('col-xs-offset-5').removeClass('col-xs-offset-4').removeClass('col-xs-offset-3')
                    .addClass('col-xs-offset-3').addClass('col-xs-9');
                clickedObject.find('.song_preview_row').removeClass('song_preview_unselected').addClass('song_preview_selected');
                self.select_beatmap(md5sum);
            });

            $(this.replay_section_html).on("click",".replay_preview", function (event) {
                var id = $(this).attr('id');
                for(var i = 0; i < self.replays.length ; i ++){
                    if(self.replays[i].rMd5Hash == id){
                        replay = self.replays[i];
                        break;
                    }
                }
                loadBeatMap();
            })


        }

        this.events_bound = true;


    },

    select_beatmap(md5sum){
        this.replay_section_html.innerHTML = ""; //clear current replays;
        var beatmap = null;
        for(var i = 0; i < this.beatmaps.length ; i++){
            if(this.beatmaps[i].md5sum == md5sum){
                beatmap = this.beatmaps[i];
                break;
            }
        }
        beatmap.play_song();
        beatmap.load_background();
        var self = this;
        database.get_data_from_index(database.TABLES.REPLAYS,database.INDEXES.REPLAYS.BEATMAP_ID,beatmap.md5sum, function (replays) {
            self.replays = replays;
            replays.sort(function (a,b) {
                if (a.tScore > b.tScore)
                    return -1;
                if (a.tScore < b.tScore)
                    return 1;
                //if same score (rare but would happen on easier maps) sort by date played
                var aDate = new Date(a.time_played);
                var bDate = new Date(b.time_played);
                if(aDate > bDate){
                    return -1;
                }
                if(aDate < bDate){
                    return 1;
                }
                return 0;
            });
            self.render_replay(self.replays);

        })

    },
    render_replay(replays){
        var content = Mustache.render(this.replay_selection_template, {replays:replays});
        this.replay_section_html.append(content);
    },
    
    on_beatmap_mouse_enter: function () {

    },
    on_beatmap_click: function () {

    },
    on_beatmap_mouse_leave: function () {

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
            this.beatmaps.sort(function (a,b) {
                if (a.title < b.title)
                    return -1;
                if (a.title > b.title)
                    return 1;
                //if same beatmap order by star difficulty
                if(a.stars < b.stars){
                    return -1;
                }
                if(a.stars > b.stars){
                    return 1;
                }
                return 0;
            });
            for(var i =0; i < this.beatmaps.length; i++){
                this.render_song(this.beatmaps[i]);
            }
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
            //make main selection

        }
    },

    load_song: function (md5sum) {
        var self = this;
        var curr_length = this.beatmaps.length;
        var beatmap = new osu.beatmaps.BeatmapPreview(md5sum, function () {
            self.render_song(self.beatmaps[curr_length+1]); //some reason we havent finished loading on this callback ??
            self.display_new_song(md5sum);
        });
        this.beatmaps.push(beatmap);
        this.beatmap_keys.push(md5sum);
    },

    render_song: function (beatmap) {
        var content = Mustache.render(this.beatmap_selection_template, {beatmaps:beatmap});
        this.beatmap_section_html.append(content);
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
