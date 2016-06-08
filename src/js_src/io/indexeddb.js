/**
 * Created by Ugrend on 6/06/2016.
 */
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;


var database = {

    __db: null,
    __started: false,

    TABLES: Object.freeze({
        BEATMAPS: "beatmaps",
        REPLAYS: "replays",
        SKINS: "skins",
        ASSETS: "assets",

    }),


    init: function () {
        var self = this;
        var openRequest = indexedDB.open("osu", 1);
        openRequest.onupgradeneeded = function (e) {
            var thisDB = e.target.result;
            for(var k in database.TABLES){
                if (!thisDB.objectStoreNames.contains(database.TABLES[k])) {
                    thisDB.createObjectStore(database.TABLES[k]);
                }
            }
        };
        openRequest.onsuccess = function (e) {
            self.__db = e.target.result;
            self.__started = true;
        };
        openRequest.onerror = function (e) {
            console.log(e);
        }

    },

    insert_data: function (table, md5sum, data, onsuccess, onerror) {
        if (this.__started) {
            var transaction = this.__db.transaction([table], "readwrite").objectStore(table).add(data, md5sum);
            transaction.onsuccess = onsuccess;
            transaction.onerror = function(e){
                console.log(e.target.error);
                onerror(e);
            };
        }
        else {
            onerror("db not started");
        }

    },
    get_data: function (table, md5sum, onsuccess, onerror) {
        if (this.__started) {
            var query = this.__db.transaction([table], "readonly").objectStore(table).get(md5sum);
            query.onsuccess = onsuccess;
            query.onerror = onerror;
        } else {
             onerror("db not started");
        }
    }

};

if (!window.indexedDB) {
    console.log("no index db = no storage ")
}
else {
    database.init();
}