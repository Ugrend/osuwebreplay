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
    $beatmap_section_html: null,
    $replay_section_html: null,
    cached_dom: false,
    events_bound: false,
    replays: [],
    beatmapSearch: null,
    replaySearch: null,
    $currentSelectionHtml: "",


    init: function () {
        this.cacheDom();
        this.bind_events();

        this.$master_volume_slider.val(osu.settings.SETTINGS.master_volume * 100);
        this.$music_volume_slider.val(osu.settings.SETTINGS.music_volume * 100);
        this.$sound_volume_slider.val(osu.settings.SETTINGS.sound_effects_volume * 100);
        this.$background_dim_slider.val(osu.settings.SETTINGS.background_dim * 100);

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
    cacheDom: function () {
        if(!this.cached_dom){
            this.beatmap_selection_template = document.getElementById("beatmap_select_template").innerHTML;
            this.replay_selection_template = document.getElementById("replay_select_template").innerHTML;
            this.$beatmap_section_html = $("#song_selection_area");
            this.$replay_section_html = $("#replay_select_area");
            this.mapped_by = document.getElementById("mapped_by");
            this.map_length_and_objects = document.getElementById("map_length_and_objects");
            this.map_object_type_counts = document.getElementById("map_object_type_counts");
            this.map_difficulty = document.getElementById("map_difficulty");
            this.map_name = document.getElementById("map_name");

            this.$beatmap_search_field = $("#filter_maps_search");
            this.$replay_search_field = $("#filter_players_search");

            this.$master_volume_slider = $("#master_volume");
            this.$music_volume_slider = $("#music_volume");
            this.$sound_volume_slider = $("#sound_volume");
            this.$background_dim_slider = $("#background_dim");

            this.cached_dom = true;
        }

    },

    bind_events: function () {
        //init script can be called multiple times if no maps/replays exist
        if(!this.events_bound){
            var self = this;
            this.$beatmap_search_field.on('input', function (e) {
                var searchParam = e.currentTarget.value;
                if(self.beatmapSearch && searchParam != ""){
                    self.$beatmap_section_html.find(".beatmap_preview:not([class*='hidden'])").addClass("hidden");
                    self.beatmapSearch.search(searchParam, function (result) {
                       for(var i = 0; i < result.length ; i++){
                           self.$beatmap_section_html.find("#"+result[i].md5sum).removeClass("hidden");
                       }
                    });
                }else{
                    self.$beatmap_section_html.find(".beatmap_preview").removeClass("hidden");
                    self.$currentSelectionHtml[0].scrollIntoViewIfNeeded();
                }


            });

            this.$replay_search_field.on('input', function (e) {
                var searchParam = e.currentTarget.value;
                if(self.replaySearch && searchParam != ""){
                    self.$replay_section_html.find(".replay_preview:not([class*='hidden'])").addClass("hidden");
                    self.replaySearch.search(searchParam, function (result) {
                        for(var i = 0; i < result.length ; i++){
                            self.$replay_section_html.find("#"+result[i].rMd5Hash).removeClass("hidden");
                        }
                    });
                }else{
                    self.$replay_section_html.find(".replay_preview").removeClass("hidden");
                }
            });

            this.$master_volume_slider.on("input", function (e) {
               osu.settings.SETTINGS.master_volume = e.currentTarget.value / 100;
            });
            this.$music_volume_slider.on("input", function (e) {
                osu.settings.SETTINGS.music_volume = e.currentTarget.value / 100;
            });
            this.$sound_volume_slider.on("input", function (e) {
                osu.settings.SETTINGS.sound_effects_volume = e.currentTarget.value / 100;
            });
            this.$background_dim_slider.on("input", function (e) {
                osu.settings.SETTINGS.background_dim = e.currentTarget.value / 100;
            });


            //On beatmap select click highlight the clicked item, and unhighlight any other items
            this.$beatmap_section_html.on("click",".beatmap_preview", function (event) {
                var clickedObject = $(this);
                var md5sum = clickedObject.attr("id");
                self.highlight_beatmap(clickedObject);
                self.select_beatmap(md5sum, false);
            });

            //on replay click open replay
            $(this.$replay_section_html).on("click",".replay_preview", function (event) {
                var id = $(this).attr('id');
                for(var i = 0; i < self.replays.length ; i ++){
                    if(self.replays[i].rMd5Hash == id){
                        replay = self.replays[i];
                        break;
                    }
                }
                loadBeatMap();
            });

            //Escape out of replay back to main screen
            document.onkeyup = function (e) {
                e = e || window.event;
                //27 is Escape
                if(e.keyCode == 27){
                    if(self.loaded && !self.displaying_main_screen){
                        //if a replay is playing we can stop it
                        event_handler.emit(event_handler.EVENTS.STOP_REPLAY);
                        self.show_main_screen();
                    }
                }

            }
        }

        this.events_bound = true;


    },
    highlight_beatmap($beatmapHtml){
        this.$currentSelectionHtml =$beatmapHtml;
        this.$beatmap_section_html.find(".song_preview_row").removeClass('song_preview_unselected').removeClass('song_preview_mouseover').removeClass('song_preview_selected').addClass('song_preview_unselected');
        //resize everything back to unselected size
        this.$beatmap_section_html.find(".beatmap_preview").removeClass("col-xs-9").removeClass("col-xs-8").removeClass("col-xs-7")
            .removeClass('col-xs-offset-5').removeClass('col-xs-offset-4').removeClass('col-xs-offset-3')
            .addClass('col-xs-offset-5').addClass('col-xs-7');
        $beatmapHtml.removeClass("col-xs-9").removeClass("col-xs-8").removeClass("col-xs-7")
            .removeClass('col-xs-offset-5').removeClass('col-xs-offset-4').removeClass('col-xs-offset-3')
            .addClass('col-xs-offset-3').addClass('col-xs-9');
        $beatmapHtml.find('.song_preview_row').removeClass('song_preview_unselected').addClass('song_preview_selected');
        $beatmapHtml[0].scrollIntoViewIfNeeded();

    },


    select_beatmap(md5sum,highlight_map){
        this.$replay_section_html.html(""); //clear current replay select




        var beatmap = null;
        for(var i = 0; i < this.beatmaps.length ; i++){
            if(this.beatmaps[i].md5sum == md5sum){
                beatmap = this.beatmaps[i];
                break;
            }
        }

        this.map_name.innerHTML = Mustache.render("{{source}} "+
            "({{#artistunicode}}{{artistunicode}}{{/artistunicode}}{{^artistunicode}}{{artist}}{{/artistunicode}}) - "+
            "{{#titleunicode}}{{titleunicode}}{{/titleunicode}}{{^titleunicode}}{{title}}{{/titleunicode}}  [{{version}}]",beatmap);
        this.mapped_by.innerHTML = "Mapped by " + beatmap.creator;
        this.map_length_and_objects.innerHTML =
            "Length: " + beatmap.song_length +
            " BPM: " +  (beatmap.maxBPM ? beatmap.maxBPM + " - " : "") + beatmap.minBPM  +
            " Objects: " + beatmap.objects;
        this.map_object_type_counts.innerHTML =
            "Circles: " +  beatmap.circles  +
            " Sliders: "+  beatmap.sliders  +
            " Spinners " + beatmap.spinners ;
        this.map_difficulty.innerHTML =
            "CS: " + beatmap.circleSize +
            " AR: " + beatmap.approachRate +
            " OD: " + beatmap.overallDifficulty +
            " HP: " + beatmap.HPDrain +
            " Stars: " + beatmap.stars;
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
            for(i = 0; i < self.replays.length; i++){
                self.replays[i].grade_img = osu.skins[osu.score.GRADES[self.replays[i].grade].small_icn];
            }

            self.replaySearch = new Bloodhound({
                datumTokenizer: function (datum) {
                    return Bloodhound.tokenizers.whitespace(datum.playerName);
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: self.replays
            });
            self.render_replay(self.replays);


        });
        this.current_selection = beatmap;
        if(highlight_map){
                this.highlight_beatmap($("#"+md5sum));
        }
    },
    render_replay(replays){
        var content = Mustache.render(this.replay_selection_template, {replays:replays});
        this.$replay_section_html.append(content);
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
            this.beatmapSearch = new Bloodhound({
                datumTokenizer: function (datum) {
                    var matchon = datum.title + " " + datum.artist + " " + datum.tags;
                    return Bloodhound.tokenizers.whitespace(matchon);
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: this.beatmaps
            });
            this.show_main_screen();
        }
    },
    show_main_screen: function () {
        document.getElementById("loading").className = "hidden";
        document.getElementById("no_beatmaps_replays").className = "hidden";
        document.getElementById("container").className = "";
        document.getElementById("render_zone").className = "hidden";
        this.loaded = true;
        this.displaying_main_screen = true;
        if(!this.current_selection){
            //select random beatmap
            this.select_beatmap(this.beatmaps[Math.floor(Math.random()*this.beatmaps.length)].md5sum, true);
        }else{
            this.current_selection.load_background();
        }
        this.$beatmap_search_field.focus();
    },
    hide_main_screen: function () {
        document.getElementById("container").className = "hidden";
        this.displaying_main_screen = false;
        this.remove_background();
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
        this.$beatmap_section_html.append(content);
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
