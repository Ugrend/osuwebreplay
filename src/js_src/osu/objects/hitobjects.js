/**
 * hitobjects.js
 * Created by Ugrend on 17/06/2016.
 */

osu = osu || {};
osu.objects = osu.objects || {};
osu.objects.hitobjects = {
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

    SLIDER_TYPES: {
        CATMULL: "C",
        BEZIER: "B",
        LINEAR: "L",
        PASSTHROUGH: "P"
    },

    parse_type: function (hitObjectInt) {
        var newCombo = false;
        if ((hitObjectInt & this.TYPES.NEW_COMBO)) {
            newCombo = true;
        }
        if ((hitObjectInt & osu.objects.hitobjects.TYPES.CIRCLE)) {
            return {type: this.TYPES.CIRCLE, new_combo: newCombo}
        }
        if ((hitObjectInt & osu.objects.hitobjects.TYPES.SLIDER)) {
            return {type: this.TYPES.SLIDER, new_combo: newCombo}
        }
        if ((hitObjectInt & osu.objects.hitobjects.TYPES.SPINNER)) {
            return {type: this.TYPES.SPINNER, new_combo: newCombo}
        }
    },
    parse_line: function (line, timing) {
        var hitObject = {};

        var hitArray = line.split(',');

        var type = this.parse_type(parseInt(hitArray[3]));

        hitObject.x = parseInt(hitArray[0]);
        hitObject.y = parseInt(hitArray[1]);
        hitObject.startTime = parseInt(hitArray[2]);
        hitObject.type = type.type;
        hitObject.newCombo = type.new_combo;
        hitObject.hitSounds = [];

        var soundByte = parseInt(hitArray[4]);
        if ((soundByte & this.HIT_SOUNDS.SOUND_WHISTLE) == this.HIT_SOUNDS.SOUND_WHISTLE)
            hitObject.hitSounds.push(this.HIT_SOUNDS.SOUND_WHISTLE);
        if ((soundByte & this.HIT_SOUNDS.SOUND_FINISH) == this.HIT_SOUNDS.SOUND_FINISH)
            hitObject.hitSounds.push(this.HIT_SOUNDS.SOUND_FINISH);
        if ((soundByte & this.HIT_SOUNDS.SOUND_CLAP) == this.HIT_SOUNDS.SOUND_CLAP)
            hitObject.hitSounds.push(this.HIT_SOUNDS.SOUND_CLAP);
        if (hitObject.hitSounds.length === 0)
            hitObject.hitSounds.push(this.HIT_SOUNDS.NORMAL);


        if (hitObject.type == this.TYPES.CIRCLE) {
            hitObject.additions = this.parse_additions(hitArray[5]);
        }
        if (hitObject.type == this.TYPES.SPINNER) {
            hitObject.endTime = parseInt(hitArray[5]);
            hitObject.additions = parseInt(hitArray[6]);
        }
        if (hitObject.type == this.TYPES.SLIDER) {
            var sliderData = hitArray[5].split("|");
            hitObject.sliderType = sliderData[0];
            hitObject.repeatCount = parseInt(hitArray[6]);
            hitObject.pixelLength = parseInt(hitArray[7]);


        }


        return hitObject;
    },

    parse_additions: function (strAdditions) {
        return {};
    },

    //https://gist.github.com/peppy/1167470
    create_stacks: function (hitobjects, stackLeniency, circleSize, hardrock) {

        for (var i = hitobjects.length - 1; i > 0; i--) {
            var hitObjectI = hitobjects[i].object;
            if (hitObjectI.stack != 0 || hitObjectI.type == "spinner") continue;

            if (hitObjectI.type == "circle") {
                for (var n = i - 1; n >= 0; n--) {
                    var hitObjectN = hitobjects[n].object;
                    if (hitObjectN.type == "spinner") continue;

                    var timeI = hitObjectI.hit_time - (1000 * stackLeniency); //convert to miliseconds
                    var timeN = hitObjectN.hit_time;
                    if (timeI > timeN) break;

                    var distance = osu.helpers.math.distance(hitObjectI.x, hitObjectI.y, hitObjectN.x, hitObjectN.y);
                    if (distance < 3) {
                        console.log(n);
                        hitObjectN.stack = hitObjectI.stack + 1;
                        hitObjectI = hitObjectN;
                    }

                }
            }
        }

        for (i = 0; i < hitobjects.length; i++) {
            var hitObject = hitobjects[i].object;
            var stack = hitObject.stack;
            var offset = (stack * (circleSize * 0.05));
            var x = hitObject.x - offset;
            var y = hitObject.y - offset;
            if (hardrock)
                y = y + offset;

            hitObject.x = x;
            hitObject.y = y;
            hitObject.init();
        }


    }

};
