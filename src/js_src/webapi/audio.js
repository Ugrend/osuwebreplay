/**
 *
 *
 * Created by Ugrend on 6/08/2016.
 */

osu = osu || {};
osu.webapi = osu.webapi || {};
osu.webapi.audio = {
    findAudio: function (beatmap, callback, checkedLocal, checkLocalStatus) {

        var songFound = false;
        if(!osu.settings.SETTINGS.asset_server && !osu.settings.SETTINGS.song_url){
            callback(beatmap);
        }

        if(!checkedLocal && osu.settings.SETTINGS.asset_server){
            var a = new Audio();
            var song = osu.settings.SETTINGS.asset_server +"/" + beatmap.song_md5sum;
            a.src = song;
            a.onloadedmetadata = function () {
                osu.webapi.audio.findAudio(beatmap, callback, true, true);
            };
            a.onerror = function () {
                osu.webapi.audio.findAudio(beatmap, callback, true,false);
            } ;
            return;
        }

        if(checkedLocal){
            if(checkLocalStatus){
                songFound = true;
                beatmap.song = osu.settings.SETTINGS.asset_server +"/" + beatmap.song_md5sum;
                callback(beatmap);
            }
        }


        if(osu.settings.SETTINGS.song_url && (!(osu.settings.SETTINGS.asset_server && checkedLocal && songFound))){
                $.ajax({
                    url: APIURL + "beatmaps",
                    type: 'GET',
                    data: {id: beatmap.md5sum, validate_only: true},
                    dataType: 'json',
                    success: function (data) {
                        if (data) {
                            var beatmap_id = data.data.beatmap_id;
                            beatmap.song = osu.settings.SETTINGS.song_url+ "/" +beatmap_id;
                            callback(beatmap);
                        }
                    }
                });
        }

        if(!osu.settings.SETTINGS.song_url && !songFound){
            callback(beatmap);
        }

    }



};

