/**
 * Created by Ugrend on 6/06/2016.
 */
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    console.log("no index db = no storage ")
}



/*
things to store

    key should be md5sum?


beatmaps
mp3s
skin_assets (wav png etc)
skins (ini)
replays
backgrounds
 */