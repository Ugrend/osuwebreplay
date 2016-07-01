/**
 * indexeddb.js
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
        OPTIONS: "options"

    }),

    INDEXES: Object.freeze({
        REPLAYS: {
            BEATMAP_ID: 'beatmap_id',
            PLAYER: 'player'
        }

    }),


    init: function (onsucess) {
        var self = this;
        var createDatabase = indexedDB.open("osu", 1);
        createDatabase.onupgradeneeded = function (e) {
            var thisDB = e.target.result;
            for(var k in database.TABLES){
                if (!thisDB.objectStoreNames.contains(database.TABLES[k])) {
                    var table = thisDB.createObjectStore(database.TABLES[k]);
                    if(database.TABLES[k] == database.TABLES.BEATMAPS){
                        table.createIndex("beatmapsetid", "beatmapsetid", {unique: false});
                        table.createIndex("title", "title", {unique: false});
                        table.createIndex("titleunicode", "titleunicode", {unique: false});
                        table.createIndex("artist", "artist", {unique: false});
                        table.createIndex("artistunicode", "artistunicode", {unique: false});
                        table.createIndex("creator", "creator", {unique: false});
                        table.createIndex("tags", "tags", {unique: false});
                    }
                    if(database.TABLES[k] == database.TABLES.REPLAYS){
                        table.createIndex("beatmap_id", "bmMd5Hash", {unique: false});
                        table.createIndex("player", "playerName", {unique: false});

                    }
                }
            }
        };
        createDatabase.onsuccess = function (e) {
            self.__db = e.target.result;
            self.__started = true;
            this.indexeddb_available = true;
            onsucess();
        };
        createDatabase.onerror = function (e) {
            console.log(e);
        };





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
    get_count: function (table, onsuccess) {
        var countReq = this.__db.transaction([table], "readonly").objectStore(table).count()
        countReq.onsuccess = function () {
            onsuccess(countReq.result);
        }
    },
    delete_data: function (table,key, onsuccess) {
        var request = this.__db.transaction([table], "readwrite").objectStore(table).delete(key);
        request.onsuccess = onsuccess;
    },

    get_all_keys: function (table,callback) {
        var request = this.__db.transaction([table], "readonly").objectStore(table);
        var result = [];
        request.openCursor().onsuccess = function (event) {


            var cursor = event.target.result;
            if(cursor){
                result.push(cursor.key);
                cursor.continue();
            }else{
                callback(result);
            }


        }
    },
    get_data_from_index(table, index, param, onsuccess, onerror){
        var result = [];
        var key = IDBKeyRange.only(param);
        var query = this.__db.transaction([table], "readonly").objectStore(table).index(index).openCursor(key)
            .onsuccess= function (e) {
            var cursor = e.target.result;
            if(cursor){
                result.push(cursor.value);
                cursor.continue();
            }else{
                onsuccess(result);
            }

        };



        query.onsuccess = function (e) {
            onsuccess(e.target.result);
        };
    },
    update_data(table,key,data, onsuccess, onerror){
        onsuccess = onsuccess || function () {};
        onerror = onerror || function () {};
        if (this.__started) {
            var transaction = this.__db.transaction([table], "readwrite").objectStore(table).put(data, key);
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

