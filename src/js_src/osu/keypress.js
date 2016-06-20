/**
 * keypress.js
 * Created by Ugrend on 5/06/2016.
 */

var osu  = osu || {};

/*

 Part	Data Type	Description
 w	Long	Time in milliseconds since the previous action
 x	Float	x-coordinate of the cursor from 0 - 512
 y	Float	y-coordinate of the cursor from 0 - 384
 z	Integer	Bitwise combination of keys/mouse buttons pressed (M1 = 1, M2 = 2, K1 = 5, K2 = 10)


 */
osu.keypress = Object.freeze({

    KEYS: {
        NONE : 0,
        M1: 1,
        M2: 2,
        K1: 5,
        K2: 10,
        C: 16
    },

    //TODO: need to work out how this works, its returning wrong keys i think
    getKeys: function(keys_int){
        var keys = [];
        if (keys_int == 0) {
            keys.push(this.KEYS.NONE);
            return keys;
        }
        for (var k in this.KEYS) {
            var bit = keys_int & this.KEYS[k];
            if (bit == this.KEYS[k] && bit != 0) {
                keys.push(this.KEYS[k]);
            }
        }
        return keys;
    }

});

