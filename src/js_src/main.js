/**
 * main.js
 * Created by Ugrend on 2/06/2016.
 */

var DEBUG = true;
var APIURL = "/api/";
if(DEBUG) {
    APIURL = "http://ugrend.com:8080/api/";
}

//From http://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string
//fixes RangeError: Maximum call stack size exceeded on chrome
function Uint8ToString(u8a){
    var CHUNK_SZ = 0x8000;
    var c = [];
    for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
        c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
    }
    return c.join("");
}

var getParams = function () {
    var queryDict = {};
    location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]});
    return queryDict;
};


var mainArea = document.getElementById('main_zone');
var dragDropZone = document.getElementById('dragdrop');
var dragDropLabel = document.getElementById('drag_label');
var replay = "";
var beatmap =null;
zip.workerScriptsPath = "static/libs/js/";

//IE FIXES BELOW (I don't know why I care about IE though)
if (!Uint8Array.prototype.slice && 'subarray' in Uint8Array.prototype)
    Uint8Array.prototype.slice = Uint8Array.prototype.subarray;
//https://gist.github.com/hsablonniere/2581101
if (!Element.prototype.scrollIntoViewIfNeeded) {
    Element.prototype.scrollIntoViewIfNeeded = function (centerIfNeeded) {
        centerIfNeeded = arguments.length === 0 ? true : !!centerIfNeeded;

        var parent = this.parentNode,
            parentComputedStyle = window.getComputedStyle(parent, null),
            parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width')),
            parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width')),
            overTop = this.offsetTop - parent.offsetTop < parent.scrollTop,
            overBottom = (this.offsetTop - parent.offsetTop + this.clientHeight - parentBorderTopWidth) > (parent.scrollTop + parent.clientHeight),
            overLeft = this.offsetLeft - parent.offsetLeft < parent.scrollLeft,
            overRight = (this.offsetLeft - parent.offsetLeft + this.clientWidth - parentBorderLeftWidth) > (parent.scrollLeft + parent.clientWidth),
            alignWithTop = overTop && !overBottom;

        if ((overTop || overBottom) && centerIfNeeded) {
            parent.scrollTop = this.offsetTop - parent.offsetTop - parent.clientHeight / 2 - parentBorderTopWidth + this.clientHeight / 2;
        }

        if ((overLeft || overRight) && centerIfNeeded) {
            parent.scrollLeft = this.offsetLeft - parent.offsetLeft - parent.clientWidth / 2 - parentBorderLeftWidth + this.clientWidth / 2;
        }

        if ((overTop || overBottom || overLeft || overRight) && !centerIfNeeded) {
            this.scrollIntoView(alignWithTop);
        }
    };
}