/**
 * Created by Ugrend on 29/11/2016.
 */
osu = osu || {};
osu.helpers = osu.helpers || {};
osu.helpers.Vector = class Vector{

    constructor(x,y,xscale, yscale){
        this._x = x;
        this._y = y;
        this._xScale = xscale || 1;
        this._yScale = yscale || 1;
        this._yScaled = y * yscale || y * 1;
        this._xScaled = x * xscale || x * 1;
    }

    get x(){
        return this._x;
    }
    get y(){
        return this._y;
    }
    set x(x){
        this._x = x;
    }
    set y(y){
        this._y = y;
    }

    set xScaleMulti(multiplier){
        this._xScale = multiplier;
        this._xScaled = multiplier * this.x;
    }
    set yScaleMulti(multiplier){
        this._yScale = multiplier;
        this._yScaled = multiplier * this.y;
    }

    get xScaleMulti(){
        return this._xScale;
    }
    get yScaleMulti(){
        return this._yScale;
    }

    get xScaled(){
        return this._xScaled;
    }

    get yScaled(){
        return this._yScale;
    }

    copy(){
        return new osu.helpers.Vector(this.x,this.y,this.xScaleMulti, this.yScaleMulti);
    }


    static distance(v1,v2,scaled){
        if(scaled){
            var dx = Math.abs(v1.xScaled - v2.xScaled);
            var dy = Math.abs(v1.yScaled - v2.yScaled);
        }
        else{
            dx = Math.abs(v1.x - v2.x);
            dy = Math.abs(v1.y - v2.y);
        }
        return Math.sqrt((dx * dx) + (dy * dy));
    }

    static angle(v1,v2,scaled){
        if(scaled){
            var xDiff = v2.xScaled - v1.xScaled;
            var yDiff = v2.yScaled - v1.yScaled;
        }else{
            xDiff = v2.x - v1.x;
            yDiff = v2.y - v1.y;
        }
        return Math.atan2(yDiff, xDiff);
    }

    static isIn(v1,v2,radius,scaled){
            //check if vector is in circle/slider
            if(scaled) return  Math.hypot(v1.xScaled - v2.xScaled, v1.yScaled - v2.yScaled) <= radius;
            return Math.hypot(v1.x - v2.x, v1.y - v2.y) <= radius;
    }

};