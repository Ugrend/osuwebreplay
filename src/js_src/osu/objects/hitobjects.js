/**
 * hitobjects.js
 * Created by Ugrend on 17/06/2016.
 */

osu = osu || {};
osu.objects = osu.objects || {};

osu.objects.HitObject = class HitObject{
    constructor(hitObjectData, size, approachRate, game){
        this._x = 0;
        this._y = 0;
        this.game = game || false;
        this.combo = 1;
        this.colour = 0xFFFFFF;
        this.stack = 0;
        this.size = size;
        this.approachRate = approachRate;
        this.followPoint = false;
        this.drawn = false;
        //these are defaults that should be overridden by the game
        this.hitOffset = {
            HIT_300: 79.5,
            HIT_100: 139.5,
            HIT_50: 199.5,
            HIT_MISS: 500
        };


        $.extend(this, hitObjectData);


        this.hitType = 'HIT_MISS';
        this.hitTime = this.startTime;
        if(this.game && this.game.is_hardrock) this._y = 384 - this._y;
        switch (this.type){
            case osu.objects.HitObjectParser.TYPES.CIRCLE:
                this.object = new osu.objects.Circle(this);
                break;
            case osu.objects.HitObjectParser.TYPES.SLIDER:
                this.object = new osu.objects.Slider(this);
                break;
            case osu.objects.HitObjectParser.TYPES.SPINNER:
                this.object = new osu.objects.Spinner(this);
        }
        this.initialised = false;
    }
    set x(v){
        this._x = v;
        if(this.initialised) this.object.updatePositions();
    };
    get x() { return this._x}
    set y(v){
        this._y = v;
        if(this.initialised) this.object.updatePositions();
    };
    get y() { return this._y}

    init(){
        if(!this.game){
            throw "Cannot Intialise object without game object!";
        }
        this.x = this.game.calculate_x(this.x);
        this.y = this.game.calculate_y(this.y);
        this.drawn = false;




        if(this.game.is_doubletime){
            this.startTime *= osu.helpers.constants.DOUBLE_TIME_MULTI;
            if(this.endTime) this.endTime *= osu.helpers.constants.DOUBLE_TIME_MULTI;
            this.hitTime *=osu.helpers.constants.DOUBLE_TIME_MULTI;

        }
        this.object.init();
        //endX/Y will get intiatied by a slider else just use hitObject x
        this.ScorePoint = new osu.objects.ScorePoint(this.endX||this.x,this.endY||this.y, this.game);


        this.initialised = true;
    }

    draw(cur_time){
        if(!this.drawn){
            this.game.hit_object_container.addChild(this.ScorePoint.getContainer());
            this.drawn = true;
        }

        var followResult = false;
        if(this.followPoint){
            followResult = this.followPoint.draw(cur_time);
        }
        var drawResult = this.object.draw(cur_time);
        if(!drawResult){
            this.game.hit_object_container.removeChild(this.ScorePoint.getContainer());
        }

        return drawResult ||  followResult;
    }

    hit(cur_time, pos){
        return this.object.hit(cur_time, pos);
    }


};