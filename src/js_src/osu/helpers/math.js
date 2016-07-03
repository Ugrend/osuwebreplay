/**
 *
 *
 * Created by Ugrend on 3/07/2016.
 */

osu = osu || {};
osu.helpers = osu.helpers || {};
osu.helpers.math = {

    distance: function (x1,y1,x2,y2) {
        var v1 = Math.abs(x1 - x2);
        var v2 = Math.abs(y1 - y2);
        return Math.sqrt((v1 * v1) + (v2 * v2));
    }








};


