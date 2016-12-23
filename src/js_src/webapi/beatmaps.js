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
            data: {bmhash: beatmapMD5, validate_only: true},
            dataType: 'json',
            success: function (data) {
                //only upload beatmap if server doesnt have it else just update assets
                if (data) {
                    //TODO PUT

                } else {
                    $.ajax({
                        url: APIURL + "beatmaps",
                        type: 'POST',
                        data: {beatmap: beatmapFile, assets: JSON.stringify(assets)},
                        dataType: 'json',
                        success: function (data) {

                        }
                    });
                }

            }
        });

    },

    loadBeatMap: function (id, callback) {
        $.ajax({
            url: APIURL + "beatmaps",
            type: 'GET',
            data: {bmhash: id},
            dataType: 'json',
            success: function (data) {

                if(data.status == "error"){
                    callback(false);
                    return;
                }
                var beatmap = {};

                //TODO: rewrite parser so im not duplicating code here
                beatmap.parsed = parse_osu_map_data(data.data.beatmap);
                var difficultyCalc = new osu.beatmaps.DifficultyCalculator(beatmap.parsed);
                beatmap.stars = difficultyCalc.calculate();
                for (var k in beatmap.parsed.metadata) {
                    beatmap[k.toLocaleLowerCase()] = beatmap.parsed.metadata[k];
                }
                var background_file_name = beatmap.parsed.events[0][2].replace(/"/g, '');
                beatmap.files = data.data.assets;
                for (var i = 0; i < beatmap.files.length; i++) {
                    if(beatmap.files[i].filename == background_file_name){
                        beatmap.background = beatmap.files[i].md5sum;
                    }
                    if(beatmap.files[i].filename == beatmap.parsed.general.AudioFilename){
                        beatmap.song = beatmap.files[i].md5sum;
                    }
                }
                beatmap.thumbnail = "NOT_CALCULATED";
                beatmap.md5sum = id;
                database.insert_data(database.TABLES.BEATMAPS, beatmap.md5sum, beatmap, function () {
                    //when calling for a map the server does not have, the server will first find the osu file over other files for the client
                    //It will give us a task id which we can watch to see if we have got the assets
                    //Once the task is done we can then update the map with the correct assets

                    if(!data.data.assets.length && data.data.task_id){
                        osu.webapi.tasks.checkForMapAssets(beatmap.md5sum,  data.data.task_id)
                    }


                    callback(true);
                }, function () {
                    callback(true);
                });
            }
        })
    }


};