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
        K1: 4,
        K2: 8,
        SMOKE: 16
    },

    //TODO: make this code less yuck
    get_keys: function(keys_int){
        var keys = [];
        if (keys_int == 0) {
            keys.push(this.KEYS.NONE);
            return keys;
        }
        //seems k1/m1 etc are 'both' hit when k1/k2 are pressed so we need to ingore m1/m2 in that event
        for (var k in this.KEYS) {
            var bit = keys_int & this.KEYS[k];
            if (bit == this.KEYS[k] && bit != 0) {
                keys.push(this.KEYS[k]);
            }
        }


        //remove M1/M2 if K1/K2 are present
        if(keys.indexOf(this.KEYS.M1) > -1 && keys.indexOf(this.KEYS.K1) > -1){
                keys.splice(keys.indexOf(this.KEYS.M1),1);
        }
        if(keys.indexOf(this.KEYS.M2) > -1 && keys.indexOf(this.KEYS.K2) > -1){
            keys.splice(keys.indexOf(this.KEYS.M2),1);
        }


        return keys;
    }

});

