/**
 * Created by Ugrend on 6/06/2016.
 */
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

var db;
if (!window.indexedDB) {
    console.log("no index db = no storage ")
}
else{

    var openRequest = indexedDB.open("osu",1);
    openRequest.onupgradeneeded = function(e) {
        var thisDB = e.target.result;

        if(!thisDB.objectStoreNames.contains("beatmaps")) {
            thisDB.createObjectStore("beatmaps");
        }
        if(!thisDB.objectStoreNames.contains("replays")) {
            thisDB.createObjectStore("replays");
        }
        if(!thisDB.objectStoreNames.contains("skins")) {
            thisDB.createObjectStore("skins");
        }
        if(!thisDB.objectStoreNames.contains("assets")) {
            thisDB.createObjectStore("assets");
        }
    };
    openRequest.onsuccess = function(e) {
        db = e.target.result;
    };
    openRequest.onerror = function(e) {
        console.log(e);
    }
}


function insert_data(table, md5sum, data, onsuccess, onerror) {
    var transaction = db.transaction([table], "readwrite").objectStore(table).add(data,md5sum);
    transaction.onsuccess = onsuccess;
    transaction.onerror = onerror;
}

function get_data(table, md5sum, onsuccess, onerror) {
    var query = db.transaction([table], "readonly").objectStore(table).get(md5sum);
    query.onsuccess = onsuccess;
    query.onerror = onerror;
}

