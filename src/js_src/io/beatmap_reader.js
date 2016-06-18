/**
 * Created by Ugrend on 6/06/2016.
 */



var BeatmapReader = function (beatmap_zip_file, callback) {
    var beatMap = {
        maps: [],
        assets: []
    };
    event_handler.emit(event_handler.EVENTS.BEATMAP_LOADING, beatmap_zip_file.name);
    var zip_length = 0;
    var extracted = 0;
    var beatmaps = 0;
    var beatmaps_loaded = 0;

    /**
     * Converts osu data/beatmap config file into a JS object
     * @param data
     * @returns {{version: string, general: {}, metadata: {}, difficulty: {}, events: Array, timing_points: Array, colours: {}, hit_objects: Array}}
     */
    var parse_osu_map_data = function (data) {
        var beatmap_config = {
            version: "",
            name:"",
            general: {},
            metadata: {},
            difficulty: {},
            events: [],
            timing_points: [],
            colours: {},
            hit_objects: []
        };
        var lines = data.replace("\r", "").split("\n");
        beatmap_config.version = lines[0];
        var current_setting = null;
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            if (line === "") {
                continue;
            }
            if (line.indexOf("//") == 0) {
                continue;
            }
            if (line.indexOf("[") == 0) {
                current_setting = line.toLowerCase();
                continue;
            }
            switch (current_setting) {
                case "[general]":
                    var settings = line.split(":");
                    if (settings.length == 2) {
                        beatmap_config.general[settings[0]] = settings[1].trim();
                    }
                    break;
                case "[editor]":
                    break;
                case "[metadata]":
                    var settings = line.split(":");
                    if (settings.length > 1) {
                        // Im not sure if title/creator/etc can have : in them but just to be safe ill assume it can
                        beatmap_config.metadata[settings[0]] = settings.splice(1).join(":").trim()
                    }
                    break;
                case "[difficulty]":
                    var settings = line.split(":");
                    if (settings.length == 2) {
                        beatmap_config.difficulty[settings[0]] = settings[1];
                    }
                    break;
                case "[events]":
                    beatmap_config.events.push(line.split(","));
                    break;
                case "[timingpoints]":
                    var parts = line.split(",");
                    beatmap_config.timing_points.push({
                        offset: +parts[0],
                        millisecondsPerBeat: +parts[1],
                        meter: +parts[2],
                        sampleType: +parts[3],
                        sampleSet: +parts[4],
                        volume: +parts[5],
                        inherited: +parts[6],
                        kaiMode: +parts[7]
                    });
                    break;
                case "[colours]":
                    var settings = line.split(":");
                    if (settings.length == 2) {
                        beatmap_config.colours[settings[0]] = settings[1].split(",");
                    }
                    break;
                case "[hitobjects]":
                    var hit_object = line.split(",");
                    beatmap_config.hit_objects.push(hit_object);
                    break;

            }


        }

        return beatmap_config;
    };


    var beatmap_loaded = function () {
        if (beatmaps_loaded == beatmaps) {
            event_handler.emit(event_handler.EVENTS.BEATMAP_LOADED, beatmap_zip_file.name);
            callback(beatMap);
        }
    };

    var processing_complete = function () {
        if (extracted == zip_length) {

            beatmaps = beatMap.maps.length;
            for (var i = 0; i < beatMap.maps.length; i++) {
                var beatmap = beatMap.maps[i];
                beatmap.files = [];
                for (var x = 0; x < beatMap.assets.length; x++) {
                    beatmap.files.push(
                        {
                            md5sum: beatMap.assets[x].md5sum,
                            filename: beatMap.assets[x].filename
                        }
                    )
                }
                beatmap.parsed = parse_osu_map_data(beatmap.data);
                database.insert_data(database.TABLES.BEATMAPS, beatmap.md5sum, beatmap, function () {
                    beatmaps_loaded++;
                    beatmap_loaded();
                }, function () {
                    beatmaps_loaded++;
                    beatmap_loaded();
                });

            }


        }
    };

    zip.createReader(new zip.BlobReader(beatmap_zip_file), function (reader) {

        // get all entries from the zip
        reader.getEntries(function (entries) {
            if (entries.length) {
                zip_length = entries.length;
                for (var i = 0; i < entries.length; i++) {

                    if (entries[i].filename.split(".").pop() == "osu") {
                        var extract_data = function (i) {
                            entries[i].getData(new zip.TextWriter(), function (text) {
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
                            }, function (current, total) {

                            });
                        };
                        extract_data(i);
                    }

                    else if (entries[i].filename.split(".").pop() == "png") {
                        var extract_data = function (i) {
                            entries[i].getData(new zip.Data64URIWriter('image/png'), function (data) {
                                var filename = entries[i].filename;
                                extracted++;
                                var md5sum = md5(data);
                                beatMap.assets.push({
                                    filename: filename,
                                    data: data,
                                    md5sum: md5sum,
                                });
                                database.insert_data(database.TABLES.ASSETS, md5sum, data, processing_complete, processing_complete);
                            }, function (current, total) {

                            });
                        };
                        extract_data(i);
                    }
                    else if (entries[i].filename.split(".").pop() == "wav") {
                        var extract_data = function (i) {
                            entries[i].getData(new zip.Data64URIWriter('audio/wav'), function (data) {
                                var filename = entries[i].filename;
                                extracted++;
                                var md5sum = md5(data);
                                beatMap.assets.push({
                                    filename: filename,
                                    data: data,
                                    md5sum: md5sum
                                });
                                database.insert_data(database.TABLES.ASSETS, md5sum, data, processing_complete, processing_complete);
                            }, function (current, total) {

                            });
                        };
                        extract_data(i)
                    }

                    else if (entries[i].filename.split(".").pop() == "jpg" || entries[i].filename.split(".").pop() == "jpeg") {
                        var extract_data = function (i) {
                            entries[i].getData(new zip.Data64URIWriter('image/jpeg'), function (data) {
                                var filename = entries[i].filename;
                                extracted++;
                                var md5sum = md5(data);
                                beatMap.assets.push({
                                    filename: filename,
                                    data: data,
                                    md5sum: md5sum
                                });

                                database.insert_data(database.TABLES.ASSETS, md5sum, data, processing_complete, processing_complete);
                            }, function (current, total) {

                            });
                        };
                        extract_data(i)
                    }

                    else if (entries[i].filename.split(".").pop() == "mp3") {
                        var extract_data = function (i) {
                            entries[i].getData(new zip.Data64URIWriter('audio/mpeg'), function (data) {
                                var filename = entries[i].filename;
                                extracted++;
                                var md5sum = md5(data);
                                beatMap.assets.push({
                                    filename: filename,
                                    data: data,
                                    md5sum: md5sum
                                });
                                database.insert_data(database.TABLES.ASSETS, md5sum, data, processing_complete, processing_complete);
                            }, function (current, total) {

                            });
                        };
                        extract_data(i)
                    }
                    else {
                        extracted++;
                        processing_complete();
                    }

                }


            }

        });
    }, function (error) {
        console.log(error);
    });

};
