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
        this.controllPoints.unshift(this.startPoint);
        this.__generate_beizer();
    }

    __generate_beizer(){
        var beziers = [];
        var cP = [];
        var lastP = false;
        for(var i = -1; i < this.controllPoints.length; i++){
            var tPos;
            if(i==-1){
                tPos = this.startPoint;
            }else{
                tPos = this.controllPoints[i];
            }
            if(lastP && tPos.x == lastP.x && tPos.y == lastP.y){
                if(cP.length >=2){
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