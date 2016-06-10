/**
 * Created by Ugrend on 6/2/2016.
 */
if(typeof window.FileReader === "undefined"){
    dragDropLabel.innerHTML = "Shit won't work on this browser :("
}
else {
    dragDropZone.ondragover = function () {
        return false;
    };
    dragDropZone.ondragend = function () {
        return false;
    };
    dragDropZone.ondrop = function (e) {
        e.preventDefault();

        var file = e.dataTransfer.files[0];
        var reader = new FileReader();
        reader.onloadend = function (event) {

            if(event.target.readyState === 2){
                        var replay_data = event.target.result;
                        replay = ReplayParser(replay_data);
                        loadBeatMap();
            }else{
                dragDropLabel.innerHTML = "Well ummm, yeh i dont know what to do but something went wrong";
                resetLabel();
            }

        };

            if(file.name.split(".").pop() == "osr") {
                reader.readAsBinaryString(file);
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
                dragDropLabel.innerHTML = "i dont know what that is";
                resetLabel();
            }

        return false;
    };
}