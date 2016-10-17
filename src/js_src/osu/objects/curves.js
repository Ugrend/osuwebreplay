/**
 * curves.js
 * Created by Ugrend on 11/07/2016.
 */

osu = osu || {};
osu.objects = osu.objects || {};
osu.objects.curves = osu.objects.curves || {};
osu.objects.curves.TYPES = Object.freeze({
    BEZIER: "B",
    LINEAR: "L",
    PASSTHROUGH: "P",
    CATMULL: "C"
});

osu.objects.Curve = class Curve {

    constructor(hitObject){
        this.startPoint ={x: hitObject.x, y: hitObject.y };
        this.controllPoints = hitObject.points;
        this.type = hitObject.sliderType;
        this.points = [];
        switch(this.type){
            case osu.objects.curves.TYPES.LINEAR:
                this.__generate_linear();
                break;
            case osu.objects.curves.TYPES.BEZIER:
                this.__generate_beizer();
                break;
            case osu.objects.curves.TYPES.PASSTHROUGH:
                this.__generate_passthrough();
                break;
            default:
                this.__generate_beizer();
                console.log("Unknown slider type")
        }

        for(var i = 0; i < this.points.length-1;i++){
            var currentPoint = this.points[i];
            var nextPoint = this.points[i+1];
            var xDiff = nextPoint.x - currentPoint.x;
            var yDiff = nextPoint.y - currentPoint.y;
            var angle = Math.atan2(yDiff, xDiff);
            this.points[i].angle = angle;
            if(i+1 == this.points.length-1){
                this.points[i+1].angle = angle;
            }
        }


    }

    /*
     * Gets point at given percentage/time;
     */
    get_point(t) {
        //TODO: could do passthrough/circle curves more accurately
        var point = Math.round((this.points.length-1) * t);
        if(point >= this.points.length){
            return this.points[this.points.length-1]
        }
        return this.points[point];
    }


    __generate_linear(){
        //generate linear with bezier, add the startpoints as a controll point which will cause a straight line
        this.controllPoints.unshift(this.startPoint);
        this.__generate_beizer();
    }
    /*
     * Generates a bezier curve slider (also used for linear sliders)
     *
     * How the Bezier sliders seem to work is that it will split them into seperate curves
     * This split is indicated by a duplicate value
     */
    __generate_beizer(){
        var beziers = [];
        var cP = [];
        var lastP = false;
        for(var i = -1; i < this.controllPoints.length; i++){
            var tPos;
            if(i==-1) {
                //The starter point is not in the initial point array so we start manually from it
                tPos = this.startPoint;
            }else{
                tPos = this.controllPoints[i];
            }
            //this checks if the last point is same as the next point
            //if it is the same it indicates the end of controll points for the bezier
            //If there are less than two in the controllpoints we just drop it completly
            if(lastP && tPos.x == lastP.x && tPos.y == lastP.y){
                if(cP.length >1){
                    beziers.push(new Bezier(cP))
                }
                cP.splice(0);
            }
            cP.push(tPos);
            lastP = tPos;
        }
        if(cP.length >1){
            beziers.push(new Bezier(cP));
        }

        for(i = 0; i< beziers.length; i++){
            var distance = 0;
            var compute_value = 0;
            var startingPoint = beziers[i].compute(0);
            var p = [startingPoint];
            while(distance < osu.helpers.constants.SLIDER_STEP_DISTANCE){
                compute_value += 0.00001;
                var point = beziers[i].compute(compute_value);
                distance = osu.helpers.math.distance(startingPoint.x, startingPoint.y, point.x,point.y);

            }
            var t = compute_value;
            while(t <= 1){
                p.push(beziers[i].compute(t));
                t += compute_value;
            }
            if(t>1){
                p.push(beziers[i].compute(1));
            }
            this.points = this.points.concat(p);
        }


    }

    __generate_passthrough(){

        var getPoint = function (angle,radius) {
            var x = (Math.cos(angle) * radius);
            var y = (Math.sin(angle) * radius);
            return {x:x,y:y}
        };
        var lerp = function(ang1,ang2,t){
            return ang1 * (1 - t) + ang2 * t;
        };
        var isMidBetween = function (a,b,c) {
            return (b > a && b < c) || (b < a && b > c);
        };

        var  circumcircle = function(p1, p2, p3) {
            var x,y,r;
            var A = p2.x - p1.x,
                B = p2.y - p1.y,
                C = p3.x - p1.x,
                D = p3.y - p1.y,
                E = A * (p1.x + p2.x) + B * (p1.y + p2.y),
                F = C * (p1.x + p3.x) + D * (p1.y + p3.y),
                G = 2 * (A * (p3.y - p2.y) - B * (p3.x - p2.x)),
                minx, miny, dx, dy;
            if(Math.abs(G) < 0.000001) {
                minx = Math.min(p1.x, p2.x, p3.x);
                miny = Math.min(p1.y, p2.y, p3.y);
                dx   = (Math.max(p1.x, p2.x, p3.x) - minx) * 0.5;
                dy   = (Math.max(p1.y, p2.y, p3.y) - miny) * 0.5;
                x = minx + dx;
                y = miny + dy;
                r = Math.sqrt(dx * dx + dy * dy);
            }
            else {
                x = (D*E - B*F) / G;
                y = (A*F - C*E) / G;
                dx = x - p1.x;
                dy = y - p1.y;
                r = Math.sqrt(dx * dx + dy * dy);
            }
            return {x: x, y:y, r: r};
        };



        var centerCircle = circumcircle(this.startPoint,
            this.controllPoints[0],this.controllPoints[1]);

        var xDiff = this.startPoint.x - centerCircle.x;
        var yDiff = this.startPoint.y - centerCircle.y;
        var startAngle = Math.atan2(yDiff, xDiff);
        xDiff = this.controllPoints[0].x - centerCircle.x;
        yDiff = this.controllPoints[0].y - centerCircle.y;
        var middleAngle = Math.atan2(yDiff, xDiff);
        xDiff = this.controllPoints[1].x - centerCircle.x;
        yDiff = this.controllPoints[1].y - centerCircle.y;
        var endAngle = Math.atan2(yDiff, xDiff);


        //code from opsu https://github.com/itdelatrisu/opsu
        //https://github.com/itdelatrisu/opsu/blob/master/src/itdelatrisu/opsu/objects/curves/CircumscribedCircle.java#L90
        var TWO_PI  =  Math.PI * 2;
        if (!isMidBetween(startAngle, middleAngle, endAngle)) {
            if (Math.abs(startAngle + TWO_PI - endAngle) < TWO_PI && isMidBetween(startAngle + (TWO_PI), middleAngle, endAngle))
                startAngle += TWO_PI;
            else if (Math.abs(startAngle - (endAngle + TWO_PI)) < TWO_PI && isMidBetween(startAngle, middleAngle, endAngle + (TWO_PI)))
                endAngle += TWO_PI;
            else if (Math.abs(startAngle - TWO_PI - endAngle) < TWO_PI && isMidBetween(startAngle - (TWO_PI), middleAngle, endAngle))
                startAngle -= TWO_PI;
            else if (Math.abs(startAngle - (endAngle - TWO_PI)) < TWO_PI && isMidBetween(startAngle, middleAngle, endAngle - (TWO_PI)))
                endAngle -= TWO_PI;
            else
                console.log('Cannot find angles between midAng '+ startAngle + " " + middleAngle +" " + endAngle);
        }



        var t = 0;
        while(t<=1){
            var angle = lerp(startAngle,endAngle,t);
            var point = getPoint(angle,centerCircle.r);
            point.x += centerCircle.x;
            point.y += centerCircle.y;
            this.points.push(point);
            t+=0.01;
        }
    }








};