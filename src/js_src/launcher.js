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
                    var queryDict = {};
                    location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]});
                    console.log(queryDict);
                    if(queryDict.r){
                        osu.webapi.replays.loadReplay(queryDict.r);
                    }
                }
            };


        };
        osu.settings.init();
    });
}
