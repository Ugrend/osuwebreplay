/**
 * calculate_replay.js
 * Created by Ugrend on 21/07/2016.
 */



var osu  = osu || {};

osu.calculateReplay = function (hitobjects, replayframes, unscaledCircleSize) {
    //Pre calculate replay hits on hitobjects
    //returns an array of when keys were pressed at what time and if it was a hit
    var isIn = function(objectPos,curPos, radius){
        //check if vector is in circle/slider
        var distance = Math.hypot(objectPos.x - curPos.x, objectPos.y - curPos.y)
        var result = distance <= radius;
        return result
    };


    var replayOffset = replayframes[2].t *-1;
    if(replayOffset < 0) replayOffset =1;
    var lastFrame = 2;

    var keyPresses = [];
    var K1M1Down = false;
    var K2M2Down = false;
    var radius = (unscaledCircleSize /2);
    var M1 = false;
    var M2 = false;
    var K1 = false;
    var K2 = false;
    var SMOKE = false;


    var frameSkip = 0;
    for(var i = 0; i < hitobjects.length; i++){
        var hitObject = hitobjects[i];

        var hitTime = hitObject.startTime;
        var IS_HIT = false;


        lastFrame -= frameSkip;
        for(true; lastFrame < replayframes.length; lastFrame++){
            var replayFrame = replayframes[lastFrame];
            var difference = hitTime - (replayFrame.t -replayOffset);

            if(difference < hitObject.hitOffset.HIT_50*-1){
                break;
            }

            var isClick = false; // if this is a hold or click (if button is down)
            M1 = false;
            M2 = false;
            K1 = false;
            K2 = false;
            SMOKE = false;
            var REPLAYHIT = false;
            for(var j = 0 ; j < replayFrame.keys.length ; j++){
                var key = replayFrame.keys[j];
                if(key == osu.keypress.KEYS.M1 || key == osu.keypress.KEYS.K1){
                    if(K1M1Down == false){
                        isClick = true;
                        K1M1Down = true;
                    }

                    M1 = (key == osu.keypress.KEYS.M1);
                    K1 = (key == osu.keypress.KEYS.K1);
                }

                if(key == osu.keypress.KEYS.M2 || key == osu.keypress.KEYS.K2){
                    if(K2M2Down == false){
                        isClick = true;
                        K2M2Down = true;
                    }

                    M2 = (key == osu.keypress.KEYS.M2);
                    K2 = (key == osu.keypress.KEYS.K2);
                }
                if(key == osu.keypress.KEYS.SMOKE ){
                    SMOKE = true;
                }
            }


            if(!M1 && !K1){
                K1M1Down = false;
            }
            if(!M2 && !K2){
                K2M2Down = false;
            }

            difference = Math.abs(difference);
            //TODO: sliders/spiners
            if(isClick && !IS_HIT && isIn(hitObject,replayFrame,radius)){
                if(difference <= hitObject.hitOffset.HIT_300){
                    //Hit is a 300
                    hitObject.hitType = 'HIT_300';
                    hitObject.hitTime = replayFrame.t - replayOffset;
                    IS_HIT = true;
                    REPLAYHIT = true;
                }else if (difference <= hitObject.hitOffset.HIT_100){
                    //Hit is a 100
                    hitObject.hitType = 'HIT_100';
                    hitObject.hitTime = replayFrame.t - replayOffset;
                    IS_HIT = true;
                    REPLAYHIT = true;
                }else if (difference  <= hitObject.hitOffset.HIT_50){
                    //Hit is a 50
                    hitObject.hitType = 'HIT_50';
                    hitObject.hitTime = replayFrame.t - replayOffset;
                    IS_HIT = true;
                    REPLAYHIT = true;
                }else if (difference  <= hitObject.hitOffset.HIT_MIS){
                    //Hit to early and is a miss
                    hitObject.hitType = 'HIT_MISS';
                    hitObject.hitTime = replayFrame.t - replayOffset;
                    IS_HIT = true;
                    REPLAYHIT = true;
                }
            }





            keyPresses.push({
                M1: M1,
                M2: M2,
                K1: K1,
                K2: K2,
                SMOKE: SMOKE,
                REPLAYHIT: REPLAYHIT,
                t: replayFrame.t -replayOffset
            });

            if(REPLAYHIT){
                replayFrame++;
                break;
            }

        }
    }

    return keyPresses;


};
