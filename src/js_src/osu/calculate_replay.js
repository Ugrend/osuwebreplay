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

        if(i == 104){
            true;
        }
        //since im skiping frames to see if they hit the object it may cause the next object to get a miss
        // so i will replay those frames to see if they hit the object

        lastFrame -= frameSkip;
        frameSkip = 0;

        for(true; lastFrame < replayframes.length; lastFrame++){
            var replayFrame = replayframes[lastFrame];
            var difference = hitTime - (replayFrame.t -replayOffset);


            if(difference < -20){
                frameSkip++;
            }
            //replay data seems to indicate objects got missed, yet are hit in the osu game,
            // im guessing there is some breathing room to hit the object? because i need to increase the radius of the circle way to much for it to 'hit'
            // This is defently wrong but it seems to 'work' i must be doing something wrong elsewhere
            if(difference < -40){
                break;
            }

            var isClick = false; // if this is a hold or click (if button is down)
            M1 = false;
            M2 = false;
            K1 = false;
            K2 = false;
            SMOKE = false;
            var REPLAYHIT = false;
            var isClickTime = 0; // make click last 10+ms? As keys are missing the hitobject so maybe i need to click event to have a buffer?
            for(var j = 0 ; j < replayFrame.keys.length ; j++){
                var key = replayFrame.keys[j];
                if(key == osu.keypress.KEYS.M1 || key == osu.keypress.KEYS.K1){
                    if(K1M1Down == false){
                        isClick = true;
                        isClickTime = replayFrame.t;
                        K1M1Down = true;
                    }

                    M1 = (key == osu.keypress.KEYS.M1);
                    K1 = (key == osu.keypress.KEYS.K1);
                }
                else{
                    K1M1Down = false;
                }
                if(key == osu.keypress.KEYS.M2 || key == osu.keypress.KEYS.K2){
                    if(K2M2Down == false){
                        isClick = true;
                        isClickTime = replayFrame.t;
                        K2M2Down = true;
                    }

                    M2 = (key == osu.keypress.KEYS.M2);
                    K2 = (key == osu.keypress.KEYS.K2);
                }
                else{
                    K2M2Down = false
                }
                if(key == osu.keypress.KEYS.SMOKE){
                    SMOKE = true;
                }
            }


            if(!M1 && !M2 && !K1 && !K2){
                K1M1Down = false;
                K2M2Down = false;
            }

            //TODO: sliders/spiners
            if(isClick && !IS_HIT && isIn(hitObject,replayFrame,radius)){
                if(difference  <= hitObject.hitOffset.HIT_MISS && difference  > hitObject.hitOffset.HIT_50){
                    //Hit to early and is a miss
                    console.log("MISS " + i);
                    hitObject.hitType = 'HIT_MISS';
                    hitObject.hitTime = replayFrame.t - replayOffset;
                    IS_HIT = true;
                    REPLAYHIT = true;
                }
                if(difference  <= hitObject.hitOffset.HIT_50 && difference  > hitObject.hitOffset.HIT_100){
                    //Hit is a 50
                    hitObject.hitType = 'HIT_50';
                    hitObject.hitTime = replayFrame.t - replayOffset;
                    IS_HIT = true;
                    REPLAYHIT = true;
                }
                if(difference <= hitObject.hitOffset.HIT_100 && difference  > hitObject.hitOffset.HIT_300){
                    //Hit is a 100
                    hitObject.hitType = 'HIT_100';
                    hitObject.hitTime = replayFrame.t - replayOffset;
                    IS_HIT = true;
                    REPLAYHIT = true;
                }
                if(difference <= hitObject.hitOffset.HIT_300){
                    //Hit is a 300
                    hitObject.hitType = 'HIT_300';
                    hitObject.hitTime = Math.min(replayFrame.t - replayOffset, hitObject.hitTime-1);
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


        if(hitObject.hitType == 'HIT_MISS' && !hitObject.is_spinner){
            console.log(i);
        }


    }

    return keyPresses;


};
