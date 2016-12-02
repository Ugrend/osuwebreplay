/**
 * webapi/replays.js
 * Created by Ugrend on 4/08/2016.
 */

osu = osu || {};
osu.webapi = osu.webapi || {};
osu.webapi.replays = {
    
    uploadReplay: function (file,base64md5) {
        var formData = new FormData();
        formData.append('replay', file);
        // We don't want to upload the replay if its already there, so we will check first before uploading.
        $.ajax({
            url : APIURL + "replays",
            type: 'GET',
            data: {'replay_id': base64md5,'validate_only':true},
            dataType: 'json',
            success: function (data) {
                if(!data){
                    $.ajax({
                        url : APIURL + "replays",
                        type : 'POST',
                        data : formData,
                        processData: false,  // tell jQuery not to process the data
                        contentType: false,  // tell jQuery not to set contentType
                        success : function(data) {

                        }
                    });
                }
            }
        })


    },

    loadReplay: function(id){


        $.ajax({
            url : APIURL + "replays",
            type : 'GET',
            data : {'replay_id': id},
            dataType: 'json',
            success : function(data) {
                if(data.status == "success"){
                    ReplayParser(base64ToUint8Array(data.data), function (replay_data) {
                        replay = replay_data; //TODO: not be essentially global
                        loadBeatMap();
                    });
                }else{
                    new PNotify({
                        title: 'Replay not found',
                        text: data.msg,
                        type: 'error'
                    });

                }

            }
        });
    }
    
    
};