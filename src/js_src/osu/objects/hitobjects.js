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




    }

};