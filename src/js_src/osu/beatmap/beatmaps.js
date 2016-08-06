/**
 * beatmaps.js
 * Created by Ugrend on 4/06/2016.
 */
// https://osu.ppy.sh/wiki/Osu_%28file_format%29


var osu = osu || {};
osu.beatmaps = osu.beatmaps || {};


osu.beatmaps.BeatmapPreview = class BeatmapPreview {
    constructor(md5sum, callback) {
        callback = callback || function () {};
        this.loaded = false;
        this.artist = "";
        this.artistunicode = "";
        this.beatmapid = "";
        this.beatmapsetid = "";
        this.creator = "";
        this.md5sum = md5sum;
        this.source = "";
        this.tags = "";
        this.thumbnail_data = "";
        this.title = "";
        this.titleunicode = "";
        this.version = "";
        this.song = "";
        this.preview_song_time = 0;
        this.background = "";

        //difficulty
        this.approachRate = "";
        this.circleSize = "";
        this.overallDifficulty = "";
        this.HPDrain = "";
        this.stars = "";
        this.bpm = 0;
        this.objects = 0;
        this.circles = 0;
        this.sliders = 0;
        this.spinners = 0;
        this.song_length = "";

        var self = this;
        database.get_data(database.TABLES.BEATMAPS,md5sum, function (r) {
            var beatmap = r.data;
            self.artist = beatmap.artist || "";
            //if unicode is same as normal just ignore it so we dont print twice
            self.artistunicode = (beatmap.artistunicode == beatmap.artist ? false : beatmap.artistunicode);
            self.artistunicode = beatmap.artistunicode || null;
            self.beatmapid = beatmap.beatmapid || "";
            self.beatmapsetid = beatmap.beatmapsetid || "";
            self.creator = beatmap.creator || "";
            self.source = beatmap.source || "";
            self.tags = beatmap.tags || "";
            self.title = beatmap.title || "";
            self.titleunicode = (beatmap.titleunicode == beatmap.title ? false : beatmap.titleunicode);
            self.version = beatmap.version || "";
            self.song = beatmap.song || "";
            self.preview_song_time = parseInt(beatmap.parsed.general.PreviewTime) || 0;
            self.background = beatmap.background || "";
            self.approachRate = beatmap.parsed.difficulty.ApproachRate || 0;
            self.circleSize = beatmap.parsed.difficulty.CircleSize || 0;
            self.overallDifficulty = beatmap.parsed.difficulty.OverallDifficulty || 0;
            self.HPDrain = beatmap.parsed.difficulty.HPDrainRate || 0;
            self.minBPM = beatmap.parsed.minBPM;
            self.maxBPM = (beatmap.parsed.maxBPM == -1 ? false : beatmap.parsed.maxBPM);
            self.circles = beatmap.parsed.circles || 0;
            self.sliders = beatmap.parsed.sliders || 0;
            self.spinners = beatmap.parsed.spinners || 0;
            self.objects = self.circles + self.sliders + self.spinners;
            self.stars = parseFloat(beatmap.stars);
            self.display_stars = [];
            var stars = self.stars;
            for(var i = 0; i <= Math.ceil(self.stars); i++){
                if(i > 9) break; //only display 10stars max


                if(stars > 1){
                    self.display_stars.push(
                        {
                            h: 52,
                            w: 50,
                            star_img: osu.skins.star
                        }
                    )
                }else{
                    if(stars >= 0){
                        self.display_stars.push(
                            {
                                h: 52 * stars,
                                w: 50 * stars,
                                star_img: osu.skins.star
                            })
                    }

                }
                stars -= 1;

            }

            var milliseconds = beatmap.parsed.time_length;
            var seconds = parseInt((milliseconds / 1000) % 60 );
            var minutes = parseInt(((milliseconds / (1000*60)) % 60));
            var hours   = parseInt(((milliseconds / (1000*60*60)) % 24));

            var pad = function (s) {
                return ('00'+s).substring(s.length);
            };

            self.song_length = (hours > 0 ? hours.toString() + ":" : "") + pad(minutes.toString()) + ":"  + pad(seconds.toString());

            database.get_data(database.TABLES.ASSETS,beatmap.thumbnail, function (result) {
                self.thumbnail_data = result.data;
                self.loaded = true;
                callback(this);
            });
        })

    }


    play_song() {
        var preview_time = this.preview_song_time;
        database.get_data(database.TABLES.ASSETS, this.song, function (r) {
            osu.audio.music.preview_time = preview_time / 1000;
            osu.audio.music.preview_screen = true;
            osu.audio.music.init(r.data,r.md5sum);
            osu.audio.music.start();
        });
    }

    load_background(){

        database.get_data(database.TABLES.ASSETS, this.background, function (r) {
            osu.ui.interface.mainscreen.set_background(r.data);
        });
    }


};

osu.beatmaps.BeatmapLoader = {
        beatmap_found: false,
        map_name: "",
        required_files: [],
        background: "",
        map_data: "",
        assets: [],
        song: "",
        __beatmap: "",
        __files_needed: [],
        md5sum: "",

        load: function (md5sum, onsuccess, onerror) {
            //clear out old data
            this.beatmap_found = false;
            this.map_name = false;
            this.required_files = [];
            this.assets = [];
            this.song = "";
            this.song_md5sum = "";
            this.__beatmap = "";
            this.__files_needed = [];
            this.background = "";

            this.md5sum = md5sum;
            this.onsuccess = onsuccess;
            this.onerror = onerror;
            // check if last loaded beatmap has our data first (incase indexeddb is unavailable/etc)
            if (beatmap) {
                for (var i = 0; i < beatmap.maps.length; i++) {
                    if (beatmap.maps[i].md5sum == md5sum) {
                        beatmap.locked = true; //lock the data to prevent droping another beatmap
                        this.map_data = beatmap.maps[i].parsed;
                        this.required_files = beatmap.maps[i].files;
                        this.assets = beatmap.assets;
                        this.beatmap_found = true;
                        break;
                    }
                }
                if (this.beatmap_found) {
                    this.__beatmap_loaded();
                }
                else {
                    this.__look_in_db();
                }
            } else {
                this.__look_in_db();
            }
        },

        __look_in_db: function () {
            database.get_data(database.TABLES.BEATMAPS, this.md5sum, this.__load_bm_from_db.bind(this), function (e) {
                event_handler.emit(event_handler.EVENTS.DB_ERROR, e.event.error);
            });
        },
        __load_bm_from_db: function (result) {

            if (result && result.data) {
                this.__beatmap = result.data;
                this.map_data = this.__beatmap.parsed;
                this.required_files = this.__beatmap.files;
                this.__files_needed = this.__beatmap.files.slice(0);
                var file_to_get = this.__files_needed.pop().md5sum;
                database.get_data(database.TABLES.ASSETS, file_to_get, this.__load_assets_from_db.bind(this), function (e) {
                    event_handler.emit(event_handler.EVENTS.DB_ERROR, e.event.error);
                });
            } else {
                event_handler.emit(event_handler.EVENTS.BEATMAP_NOTFOUND, result.md5sum);
            }
        },
        __load_assets_from_db: function (result) {
            if (result && result.data) {
                this.assets.push(result);
            } else {
                event_handler.emit(event_handler.EVENTS.ASSET_NOT_FOUND, result.md5sum)
            }
            if (this.__files_needed.length) {
                var file_to_get = this.__files_needed.pop().md5sum;
                database.get_data(database.TABLES.ASSETS, file_to_get, this.__load_assets_from_db.bind(this), function (e) {
                    event_handler.emit(event_handler.EVENTS.DB_ERROR, e.event.error);
                });
            } else {
                this.beatmap_found = true;
                this.__beatmap_loaded();
            }

        }
        ,

        __beatmap_loaded: function () {
            if (this.beatmap_found) {
                this.__process_beatmap();
                this.onsuccess(this);
            } else {
                event_handler.emit(event_handler.EVENTS.BEATMAP_NOTFOUND, this.md5sum);
                this.onerror("beatmap not found: " + this.md5sum);

            }
        },

        __process_beatmap: function () {
            this.song_md5sum =this.__lookup_file_md5(this.map_data.general.AudioFilename)
            this.song = this.__get_asset_from_md5(this.song_md5sum);
            var self = this;
            if(!this.song){
                osu.webapi.audio.findAudio(this);
            }

            this.background = this.__get_asset_from_md5(this.__lookup_file_md5(this.map_data.events[0][2].replace(/"/g, '')));
            this.map_name = this.map_data.metadata.Artist + " - " + this.map_data.metadata.Title + " [" + this.map_data.metadata.Version + "]";
            this.author = this.map_data.metadata.Creator;
        },
        __lookup_file_md5: function (filename) {
            for (var i = 0; i < this.required_files.length; i++) {
                if (this.required_files[i].filename == filename) {
                    return this.required_files[i].md5sum;
                }
            }
        },
        __get_asset_from_md5: function (md5) {
            for (var i = 0; i < this.assets.length; i++) {
                if (this.assets[i].md5sum == md5) {
                    return this.assets[i].data;
                }
            }
        }
};
