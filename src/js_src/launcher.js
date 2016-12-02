/**
 * launcher.js
 * Created by Ugrend on 22/06/2016.
 */

if (!window.indexedDB) {
    console.log("no index db = no storage ")
}
else {
    database.init(function () {
        osu.settings.onloaded = function () {
            osu.skins.init();

            osu.skins.onloaded = function () {
                osu.ui.interface.mainscreen.init();

                if (window.location.href.match(/\?./)) {
                    var queryDict = getParams();
                    if(queryDict.r){
                        osu.webapi.replays.loadReplay(queryDict.r);
                    }
                }
                else{
                    //allow loading replay data from # so can load in replay frame from a iframe
                    if(location.hash.replace(/#/,"") != ""){

                        var replayB64 = decodeURI(location.hash.replace(/#/,""));
                        location.hash = "";
                        ReplayParser(base64ToUint8Array(replayB64), function (replay_data) {
                            replay = replay_data; //TODO: not be essentially global
                            loadBeatMap();
                        });
                    }
                }
            };


        };
        osu.settings.init();
    });
}
