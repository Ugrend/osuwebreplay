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

    parse_type: function (hitObjectInt) {
        var newCombo = false;
        if((hitObjectInt & this.TYPES.NEW_COMBO)){
            newCombo = true;
        }
        if((hitObjectInt & osu.objects.hitobjects.TYPES.CIRCLE)){
            return {type: this.TYPES.CIRCLE,new_combo: newCombo}
        }
        if((hitObjectInt & osu.objects.hitobjects.TYPES.SLIDER)){
            return {type: this.TYPES.SLIDER,new_combo: newCombo}
        }
        if((hitObjectInt & osu.objects.hitobjects.TYPES.SPINNER)){
            return {type: this.TYPES.SPINNER,new_combo: newCombo}
        }
    },
    parse_line: function (line_array, game) {
            var type = this.parse_type(parseInt(line_array[3]));
            var x = line_array[0];
            var y = line_array[1];
            if(game){
                x = game.calculate_x(x);
                y = game.calculate_y(y);
            }
            var timer = line_array[2];
    },
    //https://gist.github.com/peppy/1167470
    create_stacks: function (hitobjects, stackLeniency, circleSize, hardrock) {

        for(var i = hitobjects.length -1; i > 0; i--){
            var hitObjectI = hitobjects[i].object;
            if(hitObjectI.stack !=0 || hitObjectI.type == "spinner") continue;

            if(hitObjectI.type == "circle"){
                for(var n = i -1; n >=0; n--){
                    var hitObjectN = hitobjects[n].object;
                    if(hitObjectN.type == "spinner") continue;

                    var timeI = hitObjectI.hit_time - (1000*stackLeniency); //convert to miliseconds
                    var timeN = hitObjectN.hit_time;
                    if(timeI > timeN) break;

                    var distance = osu.helpers.math.distance(hitObjectI.x,hitObjectI.y,hitObjectN.x,hitObjectN.y);
                    if(distance < 3){
                        console.log(n);
                        hitObjectN.stack = hitObjectI.stack + 1;
                        hitObjectI = hitObjectN;
                    }

                }
            }
        }

        for(i = 0; i < hitobjects.length; i++){
            var hitObject = hitobjects[i].object;
            var stack = hitObject.stack;
            var offset = (stack * (circleSize * 0.05));
            var x = hitObject.x - offset;
            var y = hitObject.y - offset;
            if(hardrock)
                y = y + offset;

            hitObject.x = x;
            hitObject.y = y;
            hitObject.init();
        }




    }

};