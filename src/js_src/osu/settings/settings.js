/**
 * settings.js
 * Created by Ugrend on 9/06/2016.
 */


osu = osu || {};
osu.settings = {

    DEFAULTS: Object.freeze({
        background_dim: 0.3,
        master_volume: 1.0,
        music_volume: 0.5,
        sound_effects: 1,
        use_beatmap_skins: false,
        use_beatmap_hitsounds: false,
        song_url: false,
        asset_server: false,
        selected_skin: "0",

    }),
    SETTINGS:{


        _background_dim: 0.3,
        _master_volume: 1.0,
        _music_volume: 0.5,
        _sound_effects_volume: 1,
        _use_beatmap_skins: false,
        _use_beatmap_hitsounds: false,
        _song_url: false,
        _asset_server: false,
        _selected_skin: "0",

        get background_dim(){return this._background_dim},
        set background_dim(v) { this._background_dim = v; event_handler.emit(event_handler.EVENTS.SETTINGS_CHANGED);},
        get master_volume(){return this._master_volume;},
        set master_volume(v) { this._master_volume = v; event_handler.emit(event_handler.EVENTS.SETTINGS_CHANGED);},
        get music_volume(){return this._music_volume},
        set music_volume(v) { this._music_volume = v; event_handler.emit(event_handler.EVENTS.SETTINGS_CHANGED);},
        get sound_effects_volume(){return this._sound_effects_volume},
        set sound_effects_volume(v) { this._sound_effects_volume = v; event_handler.emit(event_handler.EVENTS.SETTINGS_CHANGED);},
        get use_beatmap_skins(){return this._use_beatmap_skins},
        set use_beatmap_skins(v) { this._use_beatmap_skins = v; event_handler.emit(event_handler.EVENTS.SETTINGS_CHANGED);},
        get use_beatmap_hitsounds(){return this._use_beatmap_hitsounds},
        set use_beatmap_hitsounds(v) { this._use_beatmap_hitsounds = v; event_handler.emit(event_handler.EVENTS.SETTINGS_CHANGED);},
        get song_url(){return this._song_url},
        set song_url(v) { this._song_url = v; event_handler.emit(event_handler.EVENTS.SETTINGS_CHANGED);},
        get asset_server(){return this._asset_server},
        set asset_server(v) { this._asset_server = v; event_handler.emit(event_handler.EVENTS.SETTINGS_CHANGED);},
        get selected_skin(){return this._selected_skin},
        set selected_skin(v) { this._selected_skin = v; event_handler.emit(event_handler.EVENTS.SETTINGS_CHANGED);},
    },


    init: function () {
        var self = this;
        event_handler.on(event_handler.EVENTS.SETTINGS_CHANGED, this.save_settings.bind(this));

        database.get_data(database.TABLES.OPTIONS,"options", function (e) {
            if(e.data){
                for(var k in e.data){
                    if(e.data.hasOwnProperty(k)){
                        if(k.indexOf("_") == 0){
                            self.SETTINGS[k] = e.data[k];
                        }
                    }
                }
            }
            self.onloaded();
            event_handler.emit(event_handler.EVENTS.SETTINGS_CHANGED);
        });
    },
    save_settings: function () {
        database.update_data(database.TABLES.OPTIONS,"options",this.SETTINGS);
    },

    onloaded: function () {

    }





};
