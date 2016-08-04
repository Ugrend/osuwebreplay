/**
 * webapi/replays.js
 * Created by Ugrend on 4/08/2016.
 */

osu = osu || {};
osu.webapi = osu.webapi || {};
osu.webapi.replays = {
    
    uploadReplay: function (file) {
        var formData = new FormData();
        formData.append('replay', file);
        $.ajax({
            url : APIURL + "replays",
            type : 'POST',
            data : formData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success : function(data) {

            }
        });
    },

    loadReplay: function(id){
        var _base64ToUint8Array = function(base64) {
            var binary_string =  window.atob(base64);
            var len = binary_string.length;
            var bytes = new Uint8Array( len );
            for (var i = 0; i < len; i++)        {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes
        };

        $.ajax({
            url : APIURL + "replays",
            type : 'GET',
            data : {'replay_id': id},
            dataType: 'json',
            success : function(data) {
                if(data.status == "success"){
                    ReplayParser(_base64ToUint8Array(data.data), function (replay_data) {
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