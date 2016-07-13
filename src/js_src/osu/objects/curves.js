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
        this.__generate_beizer();
    }








};