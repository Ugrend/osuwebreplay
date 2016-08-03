/**
 * main.js
 * Created by Ugrend on 2/06/2016.
 */

var DEBUG = true;
var APIURL = "/api/";
if(DEBUG) {
    APIURL = "http://localhost:8080/api/";
}

var mainArea = document.getElementById('main_zone');
var dragDropZone = document.getElementById('dragdrop');
var dragDropLabel = document.getElementById('drag_label');
var replay = "";
var beatmap =null;
zip.workerScriptsPath = "static/libs/js/";

//Fix? for IE (do i even care about IE?)
if (!Uint8Array.prototype.slice && 'subarray' in Uint8Array.prototype)
    Uint8Array.prototype.slice = Uint8Array.prototype.subarray;
