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
            osu.ui.interface.mainscreen.init();
        };
        osu.settings.init();
    });
}
