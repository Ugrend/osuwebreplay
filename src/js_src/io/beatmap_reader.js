/**
 * beatmap_reader.js
 * Created by Ugrend on 6/06/2016.
 */



var BeatmapReader = function (beatmap_zip_file, callback) {
    var beatMap = {
        maps: [],
        assets: []
    };
    var md5sums = [];
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
            name: "",
            general: {},
            metadata: {},
            difficulty: {},
            events: [],
            timing_points: [],
            colours: {},
            hit_objects: [],
            minBPM: -1,
            maxBPM: -1,
            circles: 0,
            sliders: 0,
            spinners: 0,
            time_length: 0,
        };
        var lines = data.replace("\r", "").split("\n");
        beatmap_config.version = lines[0];
        var current_setting = null;
        var parentBPMS = 500;
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

                    var timingPoint = {
                        offset: +parts[0],
                        millisecondsPerBeat: +parts[1],
                        meter: +parts[2],
                        sampleType: +parts[3],
                        sampleSet: +parts[4],
                        volume: +parts[5],
                        inherited: +parts[6],
                        kaiMode: +parts[7]
                    };

                    if(timingPoint.inherited == 1){
                        parentBPMS = timingPoint.millisecondsPerBeat;
                        if(parentBPMS < beatmap_config.minBPM || beatmap_config.minBPM === -1){
                            if(beatmap_config.minBPM > beatmap_config.maxBPM){
                                beatmap_config.maxBPM = beatmap_config.minBPM;
                            }
                            beatmap_config.minBPM = parentBPMS;
                        }
                    }
                    else{
                        //if inherited and postive we should ignore and multiply by 1
                        //You cant do this in the editor so shouldnt happen, but this is how the game seems to handle it.
                        if(timingPoint.millisecondsPerBeat >= 0){
                            timingPoint.millisecondsPerBeat = parentBPMS;
                        }
                        else{
                            var multiplier = Math.abs(100/timingPoint.millisecondsPerBeat);
                            timingPoint.millisecondsPerBeat = parentBPMS / multiplier;
                        }
                    }
                    beatmap_config.minBPM = Math.round(60000 / beatmap_config.minBPM);
                    if(beatmap_config.maxBPM !=-1) beatmap_config.maxBPM = Math.round(60000 / beatmap_config.maxBPM);

                    beatmap_config.timing_points.push(timingPoint);
                    break;
                case "[colours]":
                    var settings = line.split(":");
                    if (settings.length == 2) {
                        beatmap_config.colours[settings[0]] = settings[1].split(",");
                    }
                    break;
                case "[hitobjects]":
                    var hit_object = osu.objects.HitObjectParser.parse_line(line, beatmap_config.timing_points, beatmap_config.difficulty.SliderMultiplier || 1);
                    switch(hit_object.type) {
                        case osu.objects.HitObjectParser.TYPES.CIRCLE:
                            beatmap_config.circles++;
                            break;
                        case osu.objects.HitObjectParser.TYPES.SLIDER:
                            beatmap_config.sliders++;
                            break;
                        case osu.objects.HitObjectParser.TYPES.SPINNER:
                            beatmap_config.spinners++;
                    }
                    beatmap_config.hit_objects.push(hit_object);
                    break;

            }


        }
        var lastHitObject = beatmap_config.hit_objects[beatmap_config.hit_objects.length-1];
        beatmap_config.time_length = lastHitObject.endTime || lastHitObject.startTime;
        return beatmap_config;
    };


    var beatmap_loaded = function () {
        if (beatmaps_loaded == beatmaps) {


            event_handler.emit(event_handler.EVENTS.BEATMAP_LOADED, {md5sums: md5sums, filename: beatmap_zip_file.name});
            callback(beatMap);
        }
    };

    var create_thumbnail = function (img_data) {
        var MAX_WIDTH = 232;
        var MAX_HEIGHT = 130;
        var canvas = document.createElement("canvas");
        var img = document.createElement("img");
        img.src = img_data;
        var width = img.width;
        var height = img.height;
        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        return canvas.toDataURL("image/jpeg");
    };

    var processing_complete = function () {
        if (extracted == zip_length) {

            beatmaps = beatMap.maps.length;
            for (var i = 0; i < beatMap.maps.length; i++) {
                var beatmap = beatMap.maps[i];

                beatmap.parsed = parse_osu_map_data(beatmap.data);
                for (var k in beatmap.parsed.metadata) {
                    beatmap[k.toLocaleLowerCase()] = beatmap.parsed.metadata[k];
                }
                beatmap.files = [];
                var background_file_name = beatmap.parsed.events[0][2].replace(/"/g, '');
                var thumbnail = "";
                for (var x = 0; x < beatMap.assets.length; x++) {
                    beatmap.files.push(
                        {
                            md5sum: beatMap.assets[x].md5sum,
                            filename: beatMap.assets[x].filename
                        }
                    );
                    if (beatMap.assets[x].filename == background_file_name) {
                        beatmap.background = beatMap.assets[x].md5sum;
                        thumbnail = create_thumbnail(beatMap.assets[x].data);
                    }
                    if(beatMap.assets[x].filename == beatmap.parsed.general.AudioFilename){
                        beatmap.song = beatMap.assets[x].md5sum;
                    }

                }
                var thumbnail_md5sum = md5(thumbnail);
                beatmap.thumbnail = thumbnail_md5sum;
                beatmap.stars = osu.beatmaps.DifficultyCalculator.calculate_stars(beatmap);
                md5sums.push(beatmap.md5sum);
                database.insert_data(database.TABLES.ASSETS, thumbnail_md5sum, thumbnail, function () {}, function () {});//TODO actually callback properly
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
