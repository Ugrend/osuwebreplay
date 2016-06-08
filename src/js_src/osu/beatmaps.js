/**
 * Created by Ugrend on 4/06/2016.
 */
// https://osu.ppy.sh/wiki/Osu_%28file_format%29


var osu = osu || {};
osu.beatmaps = {
    background: "",
    __load_from_memory: false,
    map_data: "",
    beatmap_config: {
        version: "",
        general: {},
        metadata: {},
        difficulty: {},
        events: [],
        timing_points: [],
        colours: {},
        hit_objects: [],
    },

    load: function (md5sum, onsuccess, onerror) {
        // check if last loaded beatmap has our data first (incase indexeddb is unavailable/etc)
        if(beatmap){
            for(var i=0; i < beatmap.maps.length; i++){
                if(beatmap.maps[i].md5sum == md5sum){
                    this.map_data = beatmap.maps[i];
                    beatmap.locked = true; //lock the data to prevent droping another beatmap
                    this.__load_from_memory = true;
                    break;
                }
            }
        }else{




        }
    }





};