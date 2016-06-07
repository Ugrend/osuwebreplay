/**
 * Created by Ugrend on 6/06/2016.
 */



var BeatmapReader = function(beatmap_zip_file, callback) {
    var beatMap = {
        maps: [],
        backgrounds: [],
        mp3s:[],
        skins:[]
    };

    var zip_length = 0;
    var extracted = 0;

    var processing_complete = function () {
        if(extracted == zip_length) {
            console.log("beatmap processed");
            callback(beatMap);
        }
    };

    zip.createReader(new zip.BlobReader(beatmap_zip_file), function(reader) {

        // get all entries from the zip
        reader.getEntries(function(entries) {
            if (entries.length) {
                zip_length = entries.length;
                for(var i = 0; i < entries.length; i++){

                    if(entries[i].filename.split(".").pop() == "osu"){
                        var extract_data = function (i) {
                            entries[i].getData(new zip.TextWriter(), function(text) {
                                var filename = entries[i].filename;
                                extracted++;
                                beatMap.maps.push({
                                    filename: filename,
                                    data: text,
                                    md5sum: md5(text)
                                });
                                processing_complete();

                            }, function(current, total) {

                            });
                        };
                        extract_data(i);

                    }

                    else if(entries[i].filename.split(".").pop() == "png"){
                        //TODO: its possible that the background is a png and is not a skin therefore does not belong here,
                        //It should later parse the beatmaps and move the png out of this and to the backgrounds array
                        var extract_data = function(i) {
                            entries[i].getData(new zip.Data64URIWriter('image/png'), function(data) {
                                var filename = entries[i].filename;
                                extracted++;
                                beatMap.skins.push({
                                    filename: filename,
                                    data: data,
                                    md5sum: md5(data),
                                });
                                processing_complete();
                            }, function(current, total) {

                            });
                        };
                        extract_data(i);
                    }
                    else if(entries[i].filename.split(".").pop() == "wav"){
                        var extract_data = function(i) {
                            entries[i].getData(new zip.Data64URIWriter('audio/wav'), function (data) {
                                var filename = entries[i].filename;
                                extracted++;
                                beatMap.skins.push({
                                    filename: filename,
                                    data: data,
                                    md5sum: md5(data)
                                });
                                processing_complete();
                            }, function (current, total) {

                            });
                        };
                        extract_data(i)
                    }

                    else if(entries[i].filename.split(".").pop() == "jpg" || entries[i].filename.split(".").pop() == "jpeg"){
                        var extract_data = function (i) {
                            entries[i].getData(new zip.Data64URIWriter('image/jpeg'), function(data) {
                                var filename = entries[i].filename;
                                extracted++
                                beatMap.backgrounds.push({
                                    filename: filename,
                                    data: data,
                                    md5sum: md5(data),
                                });

                                processing_complete();
                            }, function(current, total) {

                            });
                        };
                        extract_data(i)
                    }

                    else if(entries[i].filename.split(".").pop() == "mp3"){
                        var extract_data = function(i) {
                            entries[i].getData(new zip.Data64URIWriter('audio/mpeg'), function (data) {
                                var filename = entries[i].filename;
                                extracted++
                                beatMap.mp3s.push({
                                    filename: filename,
                                    data: data,
                                    md5sum: md5(data)
                                });
                                processing_complete();
                            }, function (current, total) {

                            });
                        };
                        extract_data(i)
                    }
                    else{
                        extracted++;
                        processing_complete();
                    }

                }


            }

        });
    }, function(error) {
        console.log(error);
    });

};
