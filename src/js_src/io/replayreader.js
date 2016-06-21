/**
 * replayreader.js
 * Created by Ugrend on 2/06/2016.
 */


/**
 * Converts a hexdump of a replay file into a JS object
 * @param replay_data {String value of a hexdump of replay file}
 * @returns {{type: *, version: *, bmMd5Hash: *, playerName: *, rMd5Hash: *, h300: *, h100: *, h50: *, hGekis: *, hKatus: *, hMisses: *, tScore: *, tCombo: *, fullClear: *, mods: *, lifeBar: *, timeTicks: *, replayByteLength: *}}
 * @constructor
 */
var ReplayParser = function(replay_data, callback){
    event_handler.emit(event_handler.EVENTS.REPLAY_LOADING);
    //https://osu.ppy.sh/wiki/Osr_%28file_format%29
    var RP = {
        replay_data: replay_data,
        replay_bytes: null,
        byte_index: 0,

        /*
            Converts binarystring  to byte array
         */
        convert: function(){
            for (var bytes = [], i = 0; i < this.replay_data.length; ++i) {
                bytes.push(this.replay_data.charCodeAt(i) & 0xff)
            }
            this.replay_bytes = bytes;
        },
        //data types
        getByte: function(){
            return this.replay_bytes[this.byte_index++];
        },
        getShort: function(){
            return this.replay_bytes[this.byte_index++]
                | (this.replay_bytes[this.byte_index++] << 8);
        },
        getInteger: function(){
            return this.replay_bytes[this.byte_index++]
                | (this.replay_bytes[this.byte_index++] << 8)
                | (this.replay_bytes[this.byte_index++] << 16)
                | (this.replay_bytes[this.byte_index++] << 24);
        },
        getLong: function(){
            return this.getInteger() + this.getInteger() * 0x100000000;
        },
        getULEB128: function(){
            var t = 0;
            var s = 0;
            while (true) {
                var byte = this.getByte();
                t |= ((byte & 0x7F) << s);
                if ((byte & 0x80) === 0) break;
                s += 7;
            }
            return t;
        },
        getString: function(){

                /*
                From: https://osu.ppy.sh/wiki/Osr_%28file_format%29
                Has three parts; a single byte which will be either
                0x00,indicating that the next two parts are not present, or
                0x0b (decimal 11), indicating that the next two parts are present.
                If it is 0x0b, there will then be a ULEB128,
                representing the byte length of the following string, and then the string itself, encoded in UTF-8. See wikipedia:UTF-8*/
                var startByte = this.getByte();
                if (startByte == 0x0B){
                    var len = this.getULEB128();
                    var s = "";
                    for (var i = 0; i < len; i++) {
                        s += String.fromCharCode(this.getByte());
                    }
                    return s;
                }
                return "";
        }

    };
    RP.convert();
    var replay = {
        type: RP.getByte(),
        version: RP.getInteger(),
        bmMd5Hash: RP.getString(),
        playerName: RP.getString(),
        rMd5Hash: RP.getString(),
        h300: RP.getShort(),
        h100: RP.getShort(),
        h50: RP.getShort(),
        hGekis: RP.getShort(),
        hKatus: RP.getShort(),
        hMisses: RP.getShort(),
        tScore: RP.getInteger(),
        tCombo: RP.getShort(),
        fullClear: RP.getByte(),
        mods: osu.mods.getMods(RP.getInteger()),
        lifeBar: RP.getString(),
        time_played: RP.getLong(),
        replayByteLength: RP.getInteger()
    };
    var epoch = (replay.time_played - 621355968000000000) / 10000 ;
    var date_time = new Date(epoch);
    replay.time_played = date_time.toLocaleString();


    replay.grade = osu.score.getGrade(replay.h300, replay.h100, replay.h50,replay.hMisses).name;
    replay.accuracy = osu.score.getAccuracy(replay.h300, replay.h100, replay.h50,replay.hMisses);

    replay.been_rendered = false;

    LZMA.decompress(
        RP.replay_bytes.slice(RP.byte_index),
        function(data) {
            var replayData = data.split(",");
            for(var i = 0 ; i< replayData.length ; i++){
                var splitData = replayData[i].split("|");
                for(var x = 0; x< splitData.length ; x++){
                    splitData[x] = parseFloat(splitData[x]);
                }
                replayData[i] = splitData;
            }
            replay.replayData = replayData;

            database.insert_data(database.TABLES.REPLAYS, replay.rMd5Hash, replay, function () {
                event_handler.emit(event_handler.EVENTS.REPLAY_LOADED);
                callback(replay);
            }, function () {
                event_handler.emit(event_handler.EVENTS.REPLAY_LOADED);
                callback(replay);
            });
        },
        function(){}
    );

};
