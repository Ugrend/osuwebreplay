/**
 * skinreader.js
 * Created by Ugrend on 6/06/2016.
 */
var SkinReader = function(skin_zip, callback) {

    event_handler.emit(event_handler.EVENTS.SKIN_LOADING, skin_zip.name);

    var skins = {
        name: "",
        author: "",
        version: "",
        colours: [],
        assets: [],
        md5sum: "",
    };

    zip.createReader(new zip.BlobReader(skin_zip), function (reader) {
        var zip_length = 0;
        var process_count = 0;
        var processing_complete = function () {
            process_count++;
            if (process_count >= zip_length){

                database.insert_data(database.TABLES.SKINS,skins.md5sum,skins,callback,callback);
            }
        };

       var RGBToHex = function(r,g,b){
            var bin = r << 16 | g << 8 | b;
            return (function(h){
                return new Array(7-h.length).join("0")+h
            })(bin.toString(16).toUpperCase())
        };


        reader.getEntries(function (entries) {
            if (entries.length) {
                zip_length = entries.length;
                for (var i = 0; i < entries.length; i++) {
                    var extension = entries[i].filename.split(".").pop();
                    if (extension == "ini") {
                        entries[i].getData(new zip.TextWriter(), function (text) {
                            skins.md5sum = md5(text);

                            var lines = text.replace("\r", "").split("\n");
                            for (var j = 0; j < lines.length; j++) {
                                var line = lines[j];
                                if (line === "") {
                                    continue;
                                }
                                if (line.indexOf("Name:") == 0) {
                                    var setting = line.split(":");
                                    if (setting.length > 1) skins.name = setting[1].trim();
                                }
                                if (line.indexOf("Author:") == 0) {
                                    var setting = line.split(":");
                                    if (setting.length > 1) skins.author = setting[1].trim();
                                }
                                if (line.indexOf("Version:") == 0) {
                                    var setting = line.split(":");
                                    if (setting.length > 1) skins.version = setting[1].trim();
                                }
                                if (line.indexOf("Combo") == 0) {
                                    var setting = line.split(":");
                                    if (setting.length > 1) {
                                        var rgb = setting[1].trim().split(",");
                                        if (rgb.length === 3) {
                                            skins.colours.push(parseInt("0x" + RGBToHex(rgb[0], rgb[1], rgb[2])));
                                        }
                                    }
                                }
                            }
                            processing_complete();
                        });

                    } else if (extension == "png" || extension == "wav" || extension == "mp3") {

                        var filename = entries[i].filename.split("/");
                        if(filename.length > 1 )filename = filename[1]; else filename = filename[0];
                        if (extension == "png") {
                            (function (filename) {
                                if(DEBUG)console.log(filename);
                                entries[i].getData(new zip.Data64URIWriter('image/png'), function (data) {
                                    var md5sum = md5(data);
                                    skins.assets.push({
                                        filename: filename,
                                        md5sum: md5sum
                                    });
                                    database.insert_data(database.TABLES.ASSETS, md5sum, data, processing_complete, processing_complete)
                                });
                            })(filename);

                        } else if(extension == "wav") {

                            (function (filename) {
                                if(DEBUG)console.log(filename);
                                entries[i].getData(new zip.Data64URIWriter('audio/wav'), function (data) {
                                    var md5sum = md5(data);
                                    skins.assets.push({
                                        filename: filename,
                                        md5sum: md5sum
                                    });
                                    database.insert_data(database.TABLES.ASSETS, md5sum, data, processing_complete, processing_complete)
                                });
                            })(filename);
                        }else{
                            (function (filename) {
                                if(DEBUG)console.log(filename);
                                entries[i].getData(new zip.Data64URIWriter('audio/mpeg'), function (data) {
                                    var md5sum = md5(data);
                                    skins.assets.push({
                                        filename: filename,
                                        md5sum: md5sum
                                    });
                                    database.insert_data(database.TABLES.ASSETS, md5sum, data, processing_complete, processing_complete)
                                });
                            })(filename);

                        }
                    } else {
                        processing_complete();
                    }
                }
            }
        });
    });
};