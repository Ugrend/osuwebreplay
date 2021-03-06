/**
 * score.js
 * Created by ugrend on 2/06/2016.
 */

var osu  = osu || {};
osu.score = {


    /*
     Accuracy = Total points of hits / (Total number of hits * 300)
     Total points of hits 	(Number of 50s * 50 + Number of 100s * 100 + Number of 300s * 300)
     Total number of hits 	(Number of misses + Number of 50's + Number of 100's + Number of 300's)

     For reference: 300 = 6/6, 100 = 2/6, 50 = 1/6, Miss = 0/6.

     */
    GRADES: Object.freeze({
        SS: {name:"SS",small_icn:"ranking_x_small",large_icn:"ranking_x"},
        S:  {name:"S",small_icn:"ranking_s_small",large_icn:"ranking_s"},
        A:  {name:"A",small_icn:"ranking_a_small",large_icn:"ranking_a"},
        B:  {name:"B",small_icn:"ranking_b_small",large_icn:"ranking_b"},
        C:  {name:"C",small_icn:"ranking_c_small",large_icn:"ranking_c"},
        D:  {name:"D",small_icn:"ranking_d_small",large_icn:"ranking_d"},
        SSH:  {name:"SSH",small_icn:"ranking_xh_small",large_icn:"ranking_xh"},
        SH:  {name:"SH",small_icn:"ranking_sh_small",large_icn:"ranking_sh"}
    }),


    /**
     *
     * @param h300  {Number}
     * @param h100  {Number}
     * @param h50   {Number}
     * @param hMisses {Number}
     * @returns
     */
    getGrade: function(h300,h100,h50,hMisses,mods){
        /*
         SS = 100% Accuracy
         S = Over 90% 300s, less than 1% 50s and no misses.
         A = Over 80% 300s and no misses OR over 90% 300s.
         B = Over 70% 300s and no misses OR over 80% 300s.
         C = Over 60% 300s.
         D = Anything else.


         Special grades

         Silver SS (SSH) = Normal grade SS with 'hidden' and/or 'flashlight' mod.
         Silver S (SH) = Normal grade S with 'hidden' and/or 'flashlight' mod.

         */
        var is_silver = false;
        for(var i =0; i < mods.length ; i++){
            if(mods[i].code == "FL" || mods[i].code == "HD"){
                is_silver = true;
            }
        }


        var total_hits =  h300 + h100 + h50 + hMisses;
        if(h300 == total_hits){
            if(is_silver) return this.GRADES.SSH;else return this.GRADES.SS
        }
        if((h300/total_hits)*100 > 90) {
            if (hMisses > 0 || (h50 / total_hits) * 100 > 1) {
                return this.GRADES.A;
            }
             if(is_silver) return this.GRADES.SH; else return this.GRADES.S;
        }
        if((h300/total_hits)*100 > 80) {
            if (hMisses > 0) {
                return this.GRADES.B;
            }
            return this.GRADES.A;
        }
        if((h300/total_hits)*100 > 70) {
            if (hMisses > 0) {
                return this.GRADES.C;
            }
            return this.GRADES.B;
        }
        if((h300/total_hits)*100 > 60) {
            return this.GRADES.C;
        }
        return this.GRADES.D;
    },

    getAccuracy: function(h300,h100,h50,hMisses){
        var maxHits = h300 + h100 + h50 + hMisses;
        var percent = (h300 * 300 + h100* 100 + h50 * 50) / (maxHits * 300) * 100;
        return parseFloat(percent).toFixed(2);
    },

    parseAccuracyFromReplay: function (replay) {
        return this.getAccuracy(replay.h300 + replay.hGekis, replay.h100 + replay.hKatus, replay.h50, replay.hMisses)
    }





};