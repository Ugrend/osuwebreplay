/**
 * osu_performance.js
 * Created by Ugrend on 23/07/2016.
 */
var osu = osu || {};
osu.game = osu.game || {};
osu.game.Perforamnce = class Performance{
    //https://osu.ppy.sh/wiki/Score
    //Score = Hit Value + Hit Value * (Combo multiplier * Difficulty multiplier * Mod multiplier) / 25
    //Circle Size, HP Drain and Overall Difficulty are giving for each tick a "diffculty point";
    // e.g. the maximum a map can give is 27 difficulty points with CS7, OD10 and HP10;
    // the minimum a map can give is 2 difficulty points with CS2, OD0 and HP0. CS cannot normally go below 2 or above 7.
    // Note that mods won't change the Difficulty multiplier. The original values are counting.
    constructor(difficultyRating, modMulti, hpDrain){
        this.combo = 0;
        this.score = 0;
        this.lifebar = 1;
        this._difficultyRating = difficultyRating;
        this._modMulti = modMulti;


        this.totalHits = 0;
        this.h300 = 0;
        this.h100 =0;
        this.h50 = 0;
        this.hMiss  = 0;
        this.accuracy = 1;
    }

    add300(){
        this.h300++;
        this.addPoints(300);

    }
    add100(){
        this.h100++;
        this.addPoints(100);

    }
    add50(){
        this.h50++;
        this.addPoints(50);

    }
    addMiss(){
        this.hMiss++;
        console.log('ayy');
        this.resetCombo();
    }

    addPoints(p){
        this.score += Math.round(p + p * (this.combo * this._difficultyRating * this._modMulti) / 25);
        this.accuracy = osu.score.getAccuracy(this.h300,this.h100,this.h50,this.hMiss);
        this.combo++;
    }
    resetCombo(){
        if(this.combo > 10){
            osu.audio.sound.play_sound(osu.audio.sound.COMBOBREAK);
        }
        this.combo = 0;
        this.accuracy = osu.score.getAccuracy(this.h300,this.h100,this.h50,this.hMiss);
    }


};