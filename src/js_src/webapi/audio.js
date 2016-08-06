/**
 *
 *
 * Created by Ugrend on 6/08/2016.
 */

osu = osu || {};
osu.webapi = osu.webapi || {};
osu.webapi.audio = {
    findAudio: function (beatmap) {

        if(osu.settings.SETTINGS.song_url){
            $.ajax({
                url: APIURL + "beatmaps",
                type: 'GET',
                data: {id: beatmap.md5sum, validate_only: true},
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (data) {
                        var beatmap_id = data.data.beatmap_id;
                        beatmap.song = osu.settings.SETTINGS.song_url+ "/" +beatmap_id;
                    }
                }
            });
        }

    }



};

