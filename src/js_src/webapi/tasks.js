/**
 * webapi/tasks
 * Created by Ugrend on 13/12/2016.
 */

osu = osu || {};
osu.webapi = osu.webapi || {};
osu.webapi.tasks = {

    _joinAssetsToMap: function(map,assets){
        //dont add if already there
        for(var i = 0; i < assets.length; i++){
            for(var j =0; j< map.files.length ; j++){
                if(assets[i]['filename'] == map.files[j]['filename']){
                    assets.splice(i,1);
                }
            }
        }
        for(i =0 ; i< assets.length; i++ ){
            map.files.push(assets[i]);
        }

        if(!map.song){
            var filename = map.parsed.general.AudioFilename;
            for(i = 0; i< map.files.length ; i++){
                if(filename == map.files[i]['filename']){
                    map.song = map.files[i]['md5sum']
                }
            }
        }

    },

    checkForMapAssets: function (map_hash, task_id, attempt) {
        if(!attempt){
            attempt = 0;
        }
        attempt++;

        if(task_id){
            $.ajax({
                url: APIURL + "tasks",
                type: 'GET',
                data: {task_id: task_id},
                dataType: 'json',
                success: function (data) {
                    if(data.data.state == "SUCCESS"){
                        database.get_data(database.TABLES.BEATMAPS,map_hash, function (d) {
                            var map = d.data;
                            var assets = data.data.result;
                            osu.webapi.tasks._joinAssetsToMap(map, assets);
                            database.update_data(database.TABLES.BEATMAPS,map_hash,map)
                        });



                    }else if(data.data.state == "PENDING"){
                        //only try this 10times as if somehow we get wrong task id the task will always be in pending
                        if(attempt < 10){
                            //try again later
                            setTimeout(function () {
                                osu.webapi.tasks.checkForMapAssets(map_hash,task_id,attempt)
                            },60000)
                        }
                    }
                }
            });


        }else{
            //TODO: we are just checking for assets for map

            $.ajax({
                type: 'GET',
                data: {'bmhash': map_hash, 'assets_only': true},
                dataType: 'json',
                success: function (data) {
                    if(data.status == 'success'){
                        if(data.data.assets && data.data.assets.length){
                            database.get_data(database.TABLES.BEATMAPS,map_hash, function (d) {
                                var map = d.data;
                                var assets = data.data.assets;
                                osu.webapi.tasks._joinAssetsToMap(map, assets);
                                database.update_data(database.TABLES.BEATMAPS,map_hash,map)
                            });


                        }
                    }
                }
            })
        }
    }

};