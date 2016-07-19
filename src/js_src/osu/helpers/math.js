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
    },

    /*
        Get angle between two vectors;
     */
    vectorDistance: function (v1,v2) {
        return osu.helpers.math.distance(v1.x,v1.y,v2.x,v2.y);
    },

    angleVector: function (p1,p2) {

        var xDiff = p2.x - p1.x;
        var yDiff = p2.y - p1.y;
        return Math.atan2(yDiff, xDiff);
    }

};


