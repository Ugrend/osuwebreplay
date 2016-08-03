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

            if(event.target.readyState === 2){
                        var replay_data = new Uint8Array(event.target.result);
                        ReplayParser(replay_data, function (replay_data) {
                            replay = replay_data; //TODO: not be essentially global
                            loadBeatMap();
                        });
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

            }else if(file.name.split(".").pop() !== "osk"){
                //skin
            }else{
                event_handler.emit(event_handler.EVENTS.INVALID_FILE);
            }

        return false;
    };
}