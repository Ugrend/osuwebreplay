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
    var beatmaps = 0;
    var beatmaps_loaded = 0;

    var beatmap_loaded = function () {
        if(beatmaps_loaded == beatmaps) {
            console.log("beatmap processed")
            callback(beatMap);
        }
    };

    var processing_complete = function () {
        if(extracted == zip_length) {

            beatmaps = beatMap.maps.length;
            for(var i = 0; i < beatMap.maps.length; i++){
                var beatmap = beatMap.maps[i];
                beatmap.files = [];
                for(var x = 0; x < beatMap.backgrounds.length; x++){

                    beatmap.files.push(
                        {
                            md5sum: beatMap.backgrounds[x].md5sum,
                            filename: beatMap.backgrounds[x].filename
                        }
                    )
                }
                for(x = 0; x < beatMap.mp3s.length; x++){
                    beatmap.files.push(
                        {
                            md5sum: beatMap.mp3s[x].md5sum,
                            filename: beatMap.mp3s[x].filename
                        }
                    )
                }
                for(x = 0; x < beatMap.skins.length; x++){
                    beatmap.files.push(
                        {
                            md5sum: beatMap.mp3s[x].md5sum,
                            filename: beatMap.mp3s[x].filename
                        }
                    )
                }

                database.insert_data(database.TABLES.BEATMAPS,beatmap.md5sum ,beatmap, function () {
                    beatmaps_loaded++;
                    beatmap_loaded();
                }, function () {
                    beatmaps_loaded++;
                    beatmap_loaded();
                });

            }




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
                                var md5sum = md5(text);
                                beatMap.maps.push({
                                    filename: filename,
                                    data: text,
                                    md5sum: md5sum
                                });
                                //we add beatmaps to the db last to join to all the assets
                                processing_complete();
                            }, function(current, total) {

                            });
                        };
                        extract_data(i);
                    }

                    else if(entries[i].filename.split(".").pop() == "png"){
                        var extract_data = function(i) {
                            entries[i].getData(new zip.Data64URIWriter('image/png'), function(data) {
                                var filename = entries[i].filename;
                                extracted++;
                                var md5sum = md5(data);
                                beatMap.skins.push({
                                    filename: filename,
                                    data: data,
                                    md5sum: md5sum,
                                });
                                database.insert_data(database.TABLES.ASSETS,md5sum,data,processing_complete,processing_complete);
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
                                var md5sum = md5(data);
                                beatMap.skins.push({
                                    filename: filename,
                                    data: data,
                                    md5sum: md5sum
                                });
                                database.insert_data(database.TABLES.ASSETS,md5sum,data,processing_complete,processing_complete);
                            }, function (current, total) {

                            });
                        };
                        extract_data(i)
                    }

                    else if(entries[i].filename.split(".").pop() == "jpg" || entries[i].filename.split(".").pop() == "jpeg"){
                        var extract_data = function (i) {
                            entries[i].getData(new zip.Data64URIWriter('image/jpeg'), function(data) {
                                var filename = entries[i].filename;
                                extracted++;
                                var md5sum = md5(data);
                                beatMap.backgrounds.push({
                                    filename: filename,
                                    data: data,
                                    md5sum: md5sum
                                });

                                database.insert_data(database.TABLES.ASSETS,md5sum,data,processing_complete,processing_complete);
                            }, function(current, total) {

                            });
                        };
                        extract_data(i)
                    }

                    else if(entries[i].filename.split(".").pop() == "mp3"){
                        var extract_data = function(i) {
                            entries[i].getData(new zip.Data64URIWriter('audio/mpeg'), function (data) {
                                var filename = entries[i].filename;
                                extracted++;
                                var md5sum = md5(data);
                                beatMap.mp3s.push({
                                    filename: filename,
                                    data: data,
                                    md5sum: md5sum
                                });
                                database.insert_data(database.TABLES.ASSETS,md5sum,data,processing_complete,processing_complete);
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
