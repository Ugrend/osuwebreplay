/**
 * difficuly_calculator.js
 * Created by Ugrend on 23/06/2016.
 *
 * Referenced from https://github.com/Tom94/AiModtpDifficultyCalculator
 */

var osu = osu || {};
osu.beatmaps = osu.beatmaps || {};

osu.beatmaps.DifficultyCalculator = {
    __DIFFICULTY_TYPES:{DIFFICULTY_SPEED:0, DIFFICULTY_AIM:1},


    __STAR_SCALING_FACTOR: 0.045,
    __EXTREME_SCALING_FACTOR: 0.5,
    __PLAY_WIDTH: 512,
    __STRAIN_STEP: 400,
    __DELAY_WEIGHT: 0.9,
    __BEATMAP: null,
    __HIT_OBJECTS: [],
    STAR_RATING: -1,


    calculate_stars: function (beatmap) {
        this.__BEATMAP = beatmap;
        this.STAR_RATING = -1;
        var circleSize = (this.__PLAY_WIDTH / 16.0) * (1.0 - 0.7 * (beatmap.parsed.difficulty.CircleSize - 5.0) / 5.0);



    }





};