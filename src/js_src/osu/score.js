/**
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
        SS: {name:"SS",small_icn:"",large_icn:""},
        S:  {name:"S",small_icn:"",large_icn:""},
        A:  {name:"A",small_icn:"",large_icn:""},
        B:  {name:"B",small_icn:"",large_icn:""},
        C:  {name:"C",small_icn:"",large_icn:""},
        D:  {name:"D",small_icn:"",large_icn:""},
        SSH:  {name:"SSH",small_icn:"",large_icn:""},
        SH:  {name:"SH",small_icn:"",large_icn:""}
    }),


    /**
     *
     * @param h300  {Number}
     * @param h100  {Number}
     * @param h50   {Number}
     * @param hMisses {Number}
     * @returns
     */
    getGrade: function(h300,h100,h50,hMisses){
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
        var total_hits =  h300 + h100 + h50 + hMisses;
        if(h300 == total_hits){
            return this.GRADES.SS
        }
        if((h300/total_hits)*100 > 90) {
            if (hMisses > 0 || (h50 / total_hits) * 100 > 1) {
                return this.GRADES.A;
            }
            return this.GRADES.S;
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
        //TODO: This calculation doesn't seem to get same results as game, i must be missing something
        var maxHits = (h300 + h100 + h50 + hMisses)*300;
        var actualHits = (h300*300 + h100*100 + h50*50);
        return parseFloat((actualHits / maxHits * 100).toFixed(2));
    },

    parseAccuracyFromReplay: function (replay) {
        return this.getAccuracy(replay.h300 + replay.hGekis, replay.h100 + replay.hKatus, replay.h50, replay.hMisses)
    }





};