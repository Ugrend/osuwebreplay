/**
 * webapi/tasks
 * Created by Ugrend on 13/12/2016.
 */

osu = osu || {};
osu.webapi = osu.webapi || {};
osu.webapi.tasks = {

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
                        //TODO: update assets
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

        }
    }

};