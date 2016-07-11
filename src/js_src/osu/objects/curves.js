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
                console.log("Unknown slider type")
        }


    }

    /*
     * Gets point at given percentage/time;
     */
    get_point(t) {

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
            var p = beziers[i].getLUT(); //100 is overkill but w/e
            this.points = this.points.concat(p);
        }


    }

    __generate_passthrough(){
        this.__generate_beizer();
    }








};