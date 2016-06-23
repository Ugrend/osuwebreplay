/**
 * eventhandler.js
 * Created by Ugrend on 10/06/2016.
 */
var event_handler = {

    EVENTS: Object.freeze({
        BEATMAP_LOADING: 1,
        BEATMAP_LOADED: 2,
        BEATMAP_LOADING_FAILED: 3,
        REPLAY_LOADING: 4,
        REPLAY_LOADED: 5,
        REPLAY_LOAD_FAILED:6,
        BEATMAP_NOTFOUND: 7,
        DB_ERROR: 8,
        ASSET_NOT_FOUND:9,
        RENDER:10,
        UNKNOWN_FILE_ERROR:11,
        INVALID_FILE: 12,
        BEATMAP_SELECTED: 13
    }),

    __events: {},
    on: function (eventName, fn, alias, parent_object) {
        this.__events[eventName] = this.__events[eventName] || [];
        this.__events[eventName].push({fn: fn, alias: alias, parent: parent_object});
    },
    off: function (eventName, alias,fn) {
        if (this.__events[eventName]) {
            for (var i = 0; i < this.__events[eventName].length; i++) {
                if (this.__events[eventName][i].fn === fn) {
                    this.__events[eventName].splice(i, 1);
                    break;
                }
                if(this.__events[eventName][i].alias == alias){
                    this.__events[eventName].splice(i,1);
                    break;
                }
            }
        }
    },
    emit: function (eventName, data) {
        if(DEBUG && eventName != event_handler.EVENTS.RENDER){
            console.log("EVENT: " + eventName);
            console.log(data);
        }
        if (this.__events[eventName]) {
            this.__events[eventName].forEach(function (obj) {
                if (obj.parent) {
                    obj.parent[obj.fn](data);
                } else {
                    obj.fn(data);
                }

            });
        }
    }
};



event_handler.on(event_handler.EVENTS.BEATMAP_LOADING, function (data) {
    var loading =   new PNotify({
        title: 'Loading beatmap',
        text: "Loading \n" + data,
        type: 'info',
        hide: 'false'
    });
    var alias = Date.now().toString();
    event_handler.on(event_handler.EVENTS.BEATMAP_LOADED, function (data_loaded) {
        var options = {
            type: "success",
            title: "Beatmap Loaded",
            text: data_loaded.filename + "\n has been successfully processed",
            hide: "true"
        };
        loading.update(options);
        //one time only event
        event_handler.off(event_handler.EVENTS.BEATMAP_LOADED, alias);
    }, alias);
});



event_handler.on(event_handler.EVENTS.BEATMAP_LOADING_FAILED, function (data) {
    PNotify.removeAll();
    new PNotify({
        title: 'Beatmap Loading Failed',
        text: "Failed to load beatmap: " + data,
        type: 'error'
    });
});

event_handler.on(event_handler.EVENTS.BEATMAP_LOADING_FAILED, function (data) {
    new PNotify({
        title: 'Beatmap Loading Failed',
        text: "Failed to load beatmap: " + data,
        type: 'error'
    });
});

event_handler.on(event_handler.EVENTS.BEATMAP_NOTFOUND, function (data) {
    new PNotify({
        title: 'Beatmap not found',
        text: "Beatmap not found for replay, \n beatmap md5sum:\n" + data,
        type: 'error'
    });
});