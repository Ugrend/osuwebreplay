/**
 * Created by Ugrend on 6/06/2016.
 */



var BeatmapReader = function(beatmap_zip_file) {
    var beatMap = {
        maps: [],
        backgrounds: [],
        mp3s:[],
        skins:[]
    };



    zip.createReader(new zip.BlobReader(beatmap_zip_file), function(reader) {

        // get all entries from the zip
        reader.getEntries(function(entries) {
            if (entries.length) {
                for(var i = 0; i < entries.length; i++){
                    var filename = entries[i].filename;
                    if(entries[i].filename.split(".").pop() == "osu"){
                        entries[i].getData(new zip.TextWriter(), function(text) {
                            //TODO: get md5sum
                            beatMap.maps.push(text);
                            reader.close(function() {
                                console.log("done");
                            });
                        }, function(current, total) {

                        });
                    }

                   // console.log(entries[i].filename);
                }


            }

        });
    }, function(error) {
        console.log(error);
    });



    return beatMap;
};
/*

 if(filename.split(".").pop() == "png"){
 //TODO: its possible that the background is a png and is not a skin therefore does not belong here,
 //It should later parse the beatmaps and move the png out of this and to the backgrounds array
 entries[i].getData(new zip.Data64URIWriter('image/png'), function(data) {
 beatMap.skins.push({
 filename: filename,
 data: data,
 md5sum: "TODO",
 });
 reader.close(function() {

 });
 }, function(current, total) {

 });
 }
 if(filename.split(".").pop() == "wav"){
 entries[i].getData(new zip.Data64URIWriter('audio/wav'), function(data) {
 beatMap.skins.push({
 filename: filename,
 data: data,
 md5sum: "TODO"
 });
 reader.close(function() {

 });
 }, function(current, total) {

 });
 }

 if(filename.split(".").pop() == "jpg" || filename.split(".").pop() == "jpeg"){
 entries[i].getData(new zip.Data64URIWriter('image/jpeg'), function(data) {
 beatMap.backgrounds.push({
 filename: filename,
 data: data,
 md5sum: "TODO",
 });
 reader.close(function() {

 });
 }, function(current, total) {

 });
 }

 */