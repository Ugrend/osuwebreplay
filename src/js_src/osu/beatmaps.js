/**
 * Created by Ugrend on 4/06/2016.
 */
// https://osu.ppy.sh/wiki/Osu_%28file_format%29


var osu = osu || {};
osu.beatmaps = {
    beatmap_found: false,
    map_name: "",
    required_files: [],
    background: "",
    map_data: "",
    assets: [],
    song: "",
    __beatmap: "",
    __files_needed: [],

    load: function (md5sum, onsuccess, onerror) {
        this.onsuccess = onsuccess;
        this.onerror = onerror;
        // check if last loaded beatmap has our data first (incase indexeddb is unavailable/etc)
        if(beatmap){
            for(var i=0; i < beatmap.maps.length; i++){
                if(beatmap.maps[i].md5sum == md5sum){
                    beatmap.locked = true; //lock the data to prevent droping another beatmap
                    this.map_data = beatmap.maps[i].parsed;
                    this.required_files = beatmap.maps[i].files;
                    this.assets = beatmap.assets;
                    this.beatmap_found = true;
                    break;
                }
            }
            this.__beatmap_loaded();
        }else{
            database.get_data(database.TABLES.BEATMAPS,md5sum,this.__load_bm_from_db.bind(this), function (e) {
                event_handler.emit(event_handler.EVENTS.DB_ERROR, e.event.error);
            } );
        }
    },
    __load_bm_from_db: function (result) {
        if(result && result.data){
            this.__beatmap = result.data;
            this.map_data = this.__beatmap.parsed;
            this.required_files = this.__beatmap.files;
            this.__files_needed = this.__beatmap.files.slice(0);
            var file_to_get =  this.__files_needed.pop().md5sum;
            database.get_data(database.TABLES.ASSETS, file_to_get, this.__load_assets_from_db.bind(this), function (e) {
                event_handler.emit(event_handler.EVENTS.DB_ERROR, e.event.error);
            } );
        }
    },
    __load_assets_from_db: function (result) {
        if(result && result.data){
            this.assets.push(result);
        }else{
            event_handler.emit(event_handler.EVENTS.ASSET_NOT_FOUND, result.md5sum)
        }
        if(this.__files_needed.length){
            var file_to_get =  this.__files_needed.pop().md5sum;
            database.get_data(database.TABLES.ASSETS, file_to_get, this.__load_assets_from_db.bind(this), function (e) {
                event_handler.emit(event_handler.EVENTS.DB_ERROR, e.event.error);
            } );
        }else{
            this.beatmap_found = true;
            this.__beatmap_loaded();
        }

    }
    ,

    __beatmap_loaded: function () {
        if(this.beatmap_found){
            this.__process_beatmap();
            this.onsuccess(this);
        }else{
            event_handler.emit(event_handler.EVENTS.BEATMAP_NOTFOUND, md5sum);
            this.onerror("beatmap not found: " + md5sum);

        }
    },

    __process_beatmap: function(){
        this.song = this.__get_asset_from_md5(this.__lookup_file_md5(this.map_data.general.AudioFilename));
        this.background = this.__get_asset_from_md5(this.__lookup_file_md5(this.map_data.events[0][2].replace(/"/g,'')));
        this.map_name = this.map_data.metadata.Artist + " - " + this.map_data.metadata.Title + " [" + this.map_data.metadata.Version + "]";
        this.author = this.map_data.metadata.Creator;
    },
    __lookup_file_md5: function(filename){
        for(var i=0;i < this.required_files.length; i++){
            if(this.required_files[i].filename == filename){
                return this.required_files[i].md5sum;
            }
        }
    },
    __get_asset_from_md5: function(md5){
        for(var i=0;i < this.assets.length; i++){
            if(this.assets[i].md5sum == md5){
                return this.assets[i].data;
            }
        }
    },








};