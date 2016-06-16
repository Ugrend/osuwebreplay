/**
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
        RENDER:10
    }),

    __events: {},
    on: function (eventName, fn, parent_object) {
        this.__events[eventName] = this.__events[eventName] || [];
        this.__events[eventName].push({fn: fn, parent: parent_object});
    },
    off: function (eventName, fn) {
        if (this.__events[eventName]) {
            for (var i = 0; i < this.__events[eventName].length; i++) {
                if (this.__events[eventName][i].fn === fn) {
                    this.__events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    },
    emit: function (eventName, data) {
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
