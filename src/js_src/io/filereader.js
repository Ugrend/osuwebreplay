/**
 * filereader.js
 * Created by Ugrend on 6/2/2016.
 */


if(typeof window.FileReader === "undefined"){
    dragDropLabel.innerHTML = "Shit won't work on this browser :("
}
else {
    document.body.ondragover = function () {
        return false;
    };
    document.body.ondragend = function () {
        return false;
    };
    document.body.ondrop = function (e) {
        e.preventDefault();

        var file = e.dataTransfer.files[0];
        var reader = new FileReader();
        reader.onloadend = function (event) {

            console.log(event);

            if(event.target.readyState === 2){

                if(event.target.result.constructor.name == "ArrayBuffer" ){
                    var replay_data = new Uint8Array(event.target.result);
                    //This explodes on chrome
                    //var b64encoded = btoa(String.fromCharCode.apply(null, replay_data));
                    var b64encoded = btoa(Uint8ToString(replay_data));

                    osu.webapi.replays.uploadReplay(file,md5(b64encoded));
                    ReplayParser(replay_data, function (replay_data) {
                        replay = replay_data; //TODO: not be essentially global
                        loadBeatMap();
                    });
                }
                else{
                    //We want it to be mpeg not mp3 (firefox is mpeg chrome is mp3)
                    event.target.result = event.target.result.replace('audio/mp3','audio/mpeg');
                    var md5sum = md5(event.target.result);
                    database.insert_data(database.TABLES.ASSETS, md5sum, event.target.result, function () {}, function () {});
                }

            }else{
                event_handler.emit(event_handler.EVENTS.UNKNOWN_FILE_ERROR);
            }

        };

            if(file.name.split(".").pop() == "osr") {



                reader.readAsArrayBuffer(file);
            }else if(file.name.split(".").pop() == "osz"){
                //beatmap
                if(beatmap &&  beatmap.locked){
                    event_handler.emit(event_handler.EVENTS.BEATMAP_LOADING_FAILED, "beatmap is locked")
                }else{
                    BeatmapReader(file, function (bm) {
                            beatmap = bm;
                    });
                }

            }else if(file.name.split(".").pop() == "osk"){
                //skin
                SkinReader(file,function (skin) {
                    event_handler.emit(event_handler.EVENTS.SKIN_LOADED, skin);
                });
            }else{

                //asset
                reader.readAsDataURL(file);
            }

        return false;
    };
}