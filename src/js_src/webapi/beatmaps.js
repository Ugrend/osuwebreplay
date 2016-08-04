/**
 * webapi/beatmaps.js
 * Created by Ugrend on 4/08/2016.
 */

osu = osu || {};
osu.webapi = osu.webapi || {};
osu.webapi.beatmaps = {

    /*
     upload beatmap object to server
     */
    uploadBeatMap: function (beatmap) {

        var beatmapFile = beatmap.data;
        var assets = beatmap.files;
        var beatmapMD5 = beatmap.md5sum;

        $.ajax({
            url: APIURL + "beatmaps",
            type: 'GET',
            data: {id: beatmapMD5, validate_only: true},
            dataType: 'json',
            success: function (data) {
                //only upload beatmap if server doesnt have it else just update assets
                if (data) {
                    //TODO PUT

                } else {
                    $.ajax({
                        url: APIURL + "beatmaps",
                        type: 'POST',
                        data: {beatmap: beatmapFile, assets: assets},
                        dataType: 'json',
                        success: function (data) {

                        }
                    });
                }

            }
        });

    },

    loadBeatMap: function (id) {
        $.ajax({
            url: APIURL + "beatmaps",
            type: 'GET',
            data: {id: id},
            dataType: 'json',
            success: function (data) {
                var beatmap = {

                };

                //TODO: rewrite parser so im not duplicating code here
                beatmap.parsed = parse_osu_map_data(data.beatmap);
                var difficultyCalc = new osu.beatmaps.DifficultyCalculator(beatmap.parsed);
                beatmap.stars = difficultyCalc.calculate();

            }
        })
    }


};