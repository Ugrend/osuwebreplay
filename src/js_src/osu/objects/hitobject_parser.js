/**
 *
 *
 * Created by Ugrend on 18/07/2016.
 */
osu = osu || {};
osu.objects = osu.objects || {};

osu.objects.HitObjectParser = {
    TYPES: {
        CIRCLE: 1,
        SLIDER: 2,
        NEW_COMBO: 4,
        SPINNER: 8,
    },

    HIT_SOUNDS: {
        SOUND_NORMAL: 0,
        SOUND_WHISTLE: 2,
        SOUND_FINISH: 4,
        SOUND_CLAP: 8,
    },
    HIT_ADDITIONS: {
        NORMAL: 1,
        SOFT: 2,
        DRUM: 3,
    },


    parse_type: function (hitObjectInt) {
        var newCombo = false;
        if ((hitObjectInt & this.TYPES.NEW_COMBO)) {
            newCombo = true;
        }
        if ((hitObjectInt & osu.objects.HitObjectParser.TYPES.CIRCLE)) {
            return {type: this.TYPES.CIRCLE, new_combo: newCombo}
        }
        if ((hitObjectInt & osu.objects.HitObjectParser.TYPES.SLIDER)) {
            return {type: this.TYPES.SLIDER, new_combo: newCombo}
        }
        if ((hitObjectInt & osu.objects.HitObjectParser.TYPES.SPINNER)) {
            return {type: this.TYPES.SPINNER, new_combo: newCombo}
        }
    },
    parse_line: function (line, timing, sliderMulti) {

        var get_timing_point = function (offset) {
            for(var i = timing.length -1 ; i >=0 ; i--){
                if(timing[i].offset <= offset)  return timing[i];
            }
            return timing[0];
        };

        var parse_additions = function (strAdditions) {
            if(!strAdditions) return {};
            var additions = {};
            var adds = strAdditions.split(":");
            if(adds.length > 0){
                additions.sample = +adds[0];
            }
            if(adds.length > 1){
                additions.additionalSample = +adds[1];
            }
            if(adds.length > 2){
                additions.customSampleIndex = +adds[2];
            }
            if(adds.length > 3){
                additions.hitSoundVolume = +adds[3];
            }
            if(adds.length > 4){
                additions.hitsound = +adds[4];
            }

            return additions;
        };

        var hitObject = {};

        var hitArray = line.split(',');

        var type = this.parse_type(+hitArray[3]);

        hitObject.x = +hitArray[0];
        hitObject.y = +hitArray[1];
        hitObject.startTime = +hitArray[2];
        hitObject.type = type.type;
        hitObject.newCombo = type.new_combo;
        hitObject.hitSounds = [];
        hitObject.timing = get_timing_point(hitObject.startTime);
        hitObject.is_slider = false;
        hitObject.is_circle = false;
        hitObject.is_spinner = false;

        var soundByte = +hitArray[4];
        if ((soundByte & this.HIT_SOUNDS.SOUND_WHISTLE) == this.HIT_SOUNDS.SOUND_WHISTLE)
            hitObject.hitSounds.push(this.HIT_SOUNDS.SOUND_WHISTLE);
        if ((soundByte & this.HIT_SOUNDS.SOUND_FINISH) == this.HIT_SOUNDS.SOUND_FINISH)
            hitObject.hitSounds.push(this.HIT_SOUNDS.SOUND_FINISH);
        if ((soundByte & this.HIT_SOUNDS.SOUND_CLAP) == this.HIT_SOUNDS.SOUND_CLAP)
            hitObject.hitSounds.push(this.HIT_SOUNDS.SOUND_CLAP);
        if (hitObject.hitSounds.length === 0)
            hitObject.hitSounds.push(this.HIT_SOUNDS.SOUND_NORMAL);


        if (hitObject.type == this.TYPES.CIRCLE) {
            hitObject.is_circle = true;
            hitObject.additions = parse_additions(hitArray[5]);
        }
        if (hitObject.type == this.TYPES.SPINNER) {
            hitObject.is_spinner = true;
            hitObject.endTime = +hitArray[5];
            hitObject.additions = +hitArray[6];
        }
        if (hitObject.type == this.TYPES.SLIDER) {
            hitObject.is_slider = true;
            var sliderData = hitArray[5].split("|");
            hitObject.sliderType = sliderData[0];
            hitObject.repeatCount = +hitArray[6];
            hitObject.pixelLength = +hitArray[7];
            hitObject.additions = parse_additions(hitArray[10]);
            hitObject.edges =[];
            var sounds    = [];
            var additions = [];
            if (hitArray[8])  sounds = hitArray[8].split('|');
            if (hitArray[9])  additions = hitArray[9].split('|');
            for (var x = 0; x < hitObject.repeatCount+1 ; x++) {
                var edge = {
                    sounds: [],
                    additions: parse_additions(additions[x])
                };

                if (sounds[x]) {
                    soundByte = sounds[x];
                    //TODO: function this
                    if ((soundByte & this.HIT_SOUNDS.SOUND_WHISTLE) == this.HIT_SOUNDS.SOUND_WHISTLE)
                        edge.sounds.push(this.HIT_SOUNDS.SOUND_WHISTLE);
                    if ((soundByte & this.HIT_SOUNDS.SOUND_FINISH) == this.HIT_SOUNDS.SOUND_FINISH)
                        edge.sounds.push(this.HIT_SOUNDS.SOUND_FINISH);
                    if ((soundByte & this.HIT_SOUNDS.SOUND_CLAP) == this.HIT_SOUNDS.SOUND_CLAP)
                        edge.sounds.push(this.HIT_SOUNDS.SOUND_CLAP);
                    if (hitObject.hitSounds.length === 0)
                        edge.sounds.push(this.HIT_SOUNDS.SOUND_NORMAL);
                } else {
                    edge.sounds.push(this.HIT_SOUNDS.SOUND_NORMAL);
                }

                hitObject.edges.push(edge);
            }

            hitObject.points = [];
            for(var i = 1; i < sliderData.length; i++){
                var points = sliderData[i].split(":");
                hitObject.points.push({x:+points[0], y:+points[1]});
            }


            var beats = (hitObject.pixelLength * hitObject.repeatCount) /(100*sliderMulti)
            hitObject.duration = Math.ceil(beats * hitObject.timing.millisecondsPerBeat);
            hitObject.endTime = hitObject.startTime + hitObject.duration;

        }


        return hitObject;
    },


    //https://gist.github.com/peppy/1167470
    create_stacks: function (hitobjects, stackLeniency, circleSize, hardrock) {
        for (var i = hitobjects.length - 1; i > 0; i--) {
            var hitObjectI = hitobjects[i];
            if (hitObjectI.stack != 0 || hitObjectI.type == osu.objects.HitObjectParser.TYPES.SPINNER) continue;

            if (hitObjectI.type == osu.objects.HitObjectParser.TYPES.CIRCLE) {
                for (var n = i - 1; n >= 0; n--) {
                    var hitObjectN = hitobjects[n];
                    if (hitObjectN.type == osu.objects.HitObjectParser.TYPES.SPINNER) continue;

                    var timeI = hitObjectI.startTime - (1000 * stackLeniency); //convert to miliseconds
                    var timeN = hitObjectN.startTime;
                    if (timeI > timeN) break;

                    var distance = osu.helpers.math.distance(hitObjectI.x, hitObjectI.y, hitObjectN.x, hitObjectN.y);
                    if (distance < 3) {
                        hitObjectN.stack = hitObjectI.stack + 1;
                        hitObjectI = hitObjectN;
                    }
                }
            }
        }

        for (i = 0; i < hitobjects.length; i++) {
            var hitObject = hitobjects[i];
            var stack = hitObject.stack;
            var offset = (stack * (circleSize * 0.05));
            var x = hitObject.x - offset;
            var y = hitObject.y - offset;
            if (hardrock)
                y = y + offset;

            hitObject.x = x;
            hitObject.y = y;
        }



    },

    initialiseHitObjects: function (hitobjects) {
        for(var i = 0; i < hitobjects.length; i++){
            hitobjects[i].init();
        }

    },

    calculate_follow_points: function (hitobjects, game) {

        for(var i = 0; i < hitobjects.length -1; i++){
            var hitObject1 = hitobjects[i];
            var hitObject2 = hitobjects[i+1];
            if (hitObject1.type == osu.objects.HitObjectParser.TYPES.SPINNER) continue;
            if (hitObject2.type == osu.objects.HitObjectParser.TYPES.SPINNER) continue;
            if(hitObject2.newCombo) continue;

            var startX = game.calculate_original_x(hitObject1.endX || hitObject1.x);
            var startY = game.calculate_original_y(hitObject1.endY || hitObject1.y);
            var endX = game.calculate_original_x(hitObject2.x);
            var endY = game.calculate_original_y(hitObject2.y);
            var distance = osu.helpers.math.distance(startX,startY,endX,endY);
            if(distance > 50){
                hitObject1.followPoint = new osu.objects.FollowPoint(hitObject1, hitObject2);
                hitObject1.followPoint.init();
            }
        }

    }

};