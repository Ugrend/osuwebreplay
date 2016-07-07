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

    slope: function(x1,y1,x2,y2){
        if(x1 == x2){
            return null;
        }
        return (y2 - y1) / (x2 - x1);
    },

    intercept: function(x, y, slope){
        if(slope === null){
            return x;
        }
        return y - slope * x;
    },

    getLiniearPoints(x1, y1, x2, y2, minDistance){
        minDistance = minDistance || null;
        var m = this.slope(x1,y1,x2,y2);
        var b = this.intercept(x1, y1, m);

        var lastPoint = null;
        var coordinates = [];
        for (var x = x1; x <= x2; x++) {
            var y = m * x + b;
            var point = {x:x,y:y};
            if(minDistance){
                if(lastPoint){
                    if(this.distance(lastPoint.x,lastPoint.y,point.x,point.y) < minDistance){
                        continue;
                    }

                }

            }
            lastPoint = point;
            coordinates.push(point);
        }
        return coordinates;
    },
    angleDeg: function (x1,x2,y1,y2) {
        return   Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    }

};


