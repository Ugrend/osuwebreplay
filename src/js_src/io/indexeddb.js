/**
 * Created by Ugrend on 6/06/2016.
 */
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;


var database = {

    __db: null,
    __started: false,
    indexeddb_available: false,

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
        };

        this.indexeddb_available = true;

    },

    insert_data: function (table, md5sum, data, onsuccess, onerror) {
        if (this.__started) {
            var transaction = this.__db.transaction([table], "readwrite").objectStore(table).add(data, md5sum);
            transaction.onsuccess =   onsuccess;
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
            query.onsuccess = function (e) {
              onsuccess({md5sum: md5sum, data:e.target.result});
            };
            query.onerror = onerror;
        } else {
             onerror("db not started");
        }
    },

    delete_database: function () {
      if(DEBUG) {
          indexedDB.deleteDatabase('osu');
      }else{
          console.log("no");
      }
    },
    clear_table: function(table_name){
        if(DEBUG){
            var transaction = this.__db.transaction([table_name], "readwrite");
            var objectStore = transaction.objectStore(table_name);
            var objectStoreRequest = objectStore.clear();

            objectStoreRequest.onsuccess = function(event) {
                console.log(table_name + " cleared!");

            }
        }else{
            console.log("no");
        }

    }



};

if (!window.indexedDB) {
    console.log("no index db = no storage ")
}
else {
    database.init();
}