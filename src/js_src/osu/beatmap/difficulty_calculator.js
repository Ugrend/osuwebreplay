/**
 * difficuly_calculator.js
 * Created by Ugrend on 23/06/2016.
 *
 * Code ported from opsu See
 * https://github.com/itdelatrisu/opsu/blob/master/src/itdelatrisu/opsu/beatmap/BeatmapDifficultyCalculator.java
 */

var osu = osu || {};
osu.beatmaps = osu.beatmaps || {};

osu.beatmaps.DifficultyCalculator = class DifficultyCalculator{

    static get DifficultyType() {
        return Object.freeze({
            SPEED: 0,
            AIM: 1

        });

    }

    constructor(parsedBeatmapData){
        this.TpHitObject = class TpHitObject{



            constructor(hitObject){
                this.TpSlider = class TpSlider {
                    constructor(hitObject){
                        this.startTime = hitObject.startTime;
                        this.sliderTime = (hitObject.endTime - this.startTime)/hitObject.repeatCount;
                        this.curve = new osu.objects.Curve(hitObject);
                    }

                    getPosAtTime(time){
                        var t = (time - this.startTime) / this.sliderTime;
                        var floor = Math.floor(t);
                        t = (floor % 2 == 0) ? t - floor : floor + 1 - t;
                        return this.curve.get_point(t);
                    }


                };


                this.DECAY_BASE = [ 0.3, 0.15 ];
                this.ALMOST_DIAMETER = 90;
                this.STREAM_SPACING_TRESHOLD = 110;
                this.SINGLE_SPACING_TRESHOLD = 125;
                this.SPACING_WEIGHT_SCALING = [1400, 26.25];
                this.LAZY_SLIDER_STEP_LENGTH = 1;
                this.lazySliderLengthFirst = 0;
                this.lazySliderLengthSubsequent = 0;
                this.strains = [ 1, 1 ];


                this.hitObject = hitObject;
                var scalingFactor = (52/hitObject.size);
                this.normalizedStartPosition = {
                    x: hitObject.x * scalingFactor,
                    y: hitObject.y * scalingFactor
                };
                if(hitObject.is_slider){
                    var slider = new this.TpSlider(hitObject);
                    var sliderFollowCircleRadius = hitObject.size * 3;
                    var segmentLength = slider.sliderTime;
                    var segmentEndTime = segmentLength + hitObject.startTime;
                    var cursorPos = {
                        x: hitObject.x,
                        y: hitObject.y
                    };
                    for (var time = hitObject.startTime + this.LAZY_SLIDER_STEP_LENGTH; time < segmentEndTime; time += this.LAZY_SLIDER_STEP_LENGTH) {
                        var sliderPos = slider.getPosAtTime(time);
                        var difference = {x: sliderPos.x, y: sliderPos.y};
                        difference.x -= cursorPos.x;
                        difference.y -= cursorPos.y;
                        var distance = Math.sqrt(difference.x * difference.x + difference.y * difference.y);
                        if (distance > sliderFollowCircleRadius) {
                            difference.x /= distance;
                            difference.y /= distance;
                            distance -= sliderFollowCircleRadius;
                            cursorPos.x +=difference.x * distance;
                            cursorPos.y +=difference.y * distance;
                            this.lazySliderLengthFirst += distance;
                        }
                    }
                    this.lazySliderLengthFirst *= scalingFactor;
                    if (hitObject.repeatCount % 2 == 1) {
                        this.normalizedEndPosition = {
                            x: cursorPos.x * scalingFactor,
                            y: cursorPos.y * scalingFactor
                        }
                    }
                    if(hitObject.repeatCount > 1){
                        segmentEndTime += segmentLength;
                        for (var time = segmentEndTime - segmentLength + this.LAZY_SLIDER_STEP_LENGTH; time < segmentEndTime; time += this.LAZY_SLIDER_STEP_LENGTH) {
                            var sliderPos = slider.getPosAtTime(time);
                            var difference = {x: sliderPos.x, y: sliderPos.y};
                            difference.x -= cursorPos.x;
                            difference.y -= cursorPos.y;
                            var distance = Math.sqrt(difference.x * difference.x + difference.y * difference.y);
                            if (distance > sliderFollowCircleRadius) {
                                difference.x /= distance;
                                difference.y /= distance;
                                distance -= sliderFollowCircleRadius;
                                cursorPos.x +=difference.x * distance;
                                cursorPos.y +=difference.y * distance;
                                this.lazySliderLengthFirst += distance;
                            }
                        }
                        this.lazySliderLengthSubsequent *= scalingFactor;
                        if (hitObject.repeatCount % 2 == 0){
                            this.normalizedEndPosition = {
                                x: cursorPos.x * scalingFactor,
                                y: cursorPos.y * scalingFactor
                            }
                        }

                    }

                }
                else{
                    this.normalizedEndPosition ={
                        x: this.normalizedStartPosition.x,
                        y: this.normalizedStartPosition.y
                    };
                }

            }
            getStrain(type){
                return this.strains[type];
            }

            calculateStrains(previousHitObject){
                this.calculateSpecificStrain(previousHitObject, osu.beatmaps.DifficultyCalculator.DifficultyType.SPEED);
                this.calculateSpecificStrain(previousHitObject, osu.beatmaps.DifficultyCalculator.DifficultyType.AIM);
            }

            spacingWeight(distance, type) {
            switch (type) {
            case osu.beatmaps.DifficultyCalculator.DifficultyType.SPEED:
                var weight;
                if (distance > this.SINGLE_SPACING_TRESHOLD)
                    weight = 2.5;
                else if (distance > this.STREAM_SPACING_TRESHOLD)
                    weight = 1.6 + 0.9 * (distance - this.STREAM_SPACING_TRESHOLD) / (this.SINGLE_SPACING_TRESHOLD - this.STREAM_SPACING_TRESHOLD);
                else if (distance > this.ALMOST_DIAMETER)
                    weight = 1.2 + 0.4 * (distance - this.ALMOST_DIAMETER) / (this.STREAM_SPACING_TRESHOLD - this.ALMOST_DIAMETER);
                else if (distance > this.ALMOST_DIAMETER / 2)
                    weight = 0.95 + 0.25 * (distance - (this.ALMOST_DIAMETER / 2)) / (this.ALMOST_DIAMETER / 2);
                else
                    weight = 0.95;
                return weight;
            case osu.beatmaps.DifficultyCalculator.DifficultyType.AIM:
                return Math.pow(distance, 0.99);
            default:
                // Should never happen.
                return 0;
            }
        }

            calculateSpecificStrain(previousHitObject,type) {
                var addition = 0;
                var timeElapsed = this.hitObject.startTime - previousHitObject.hitObject.startTime;
                var decay = Math.pow(this.DECAY_BASE[type], timeElapsed / 1000);

                if (this.hitObject.is_spinner) {
                    // Do nothing for spinners
                } else if (this.hitObject.is_slider) {
                    switch (type) {
                        case osu.beatmaps.DifficultyCalculator.DifficultyType.SPEED:
                            addition = this.spacingWeight(previousHitObject.lazySliderLengthFirst +
                                    previousHitObject.lazySliderLengthSubsequent * (Math.max(previousHitObject.hitObject.repeatCount||0, 1) - 1) +
                                    this.distanceTo(previousHitObject), type) * this.SPACING_WEIGHT_SCALING[type];
                            break;

                        case osu.beatmaps.DifficultyCalculator.DifficultyType.AIM:
                            var spaceWeight1 = this.spacingWeight(previousHitObject.lazySliderLengthFirst, type);
                            var spaceWeight2 = this.spacingWeight(previousHitObject.lazySliderLengthSubsequent, type);

                            addition = (spaceWeight1 + spaceWeight2 * (Math.max(previousHitObject.hitObject.repeatCount||0, 1) - 1) +
                                this.spacingWeight(this.distanceTo(previousHitObject), type)) * this.SPACING_WEIGHT_SCALING[type];
                            break;
                    }
                } else if (this.hitObject.is_circle) {
                    addition = this.spacingWeight(this.distanceTo(previousHitObject), type) * this.SPACING_WEIGHT_SCALING[type];
                }

                addition /= Math.max(timeElapsed, 50);

                this.strains[type] = previousHitObject.strains[type] * decay + addition;

            }

            distanceTo(prevHitObject){
                var x= this.normalizedStartPosition.x - prevHitObject.normalizedEndPosition.x;
                var y= this.normalizedStartPosition.y - prevHitObject.normalizedEndPosition.y;

                return Math.sqrt(x * x + y * y)
            }

        };

        this.beatmap = parsedBeatmapData;

        this.STAR_SCALING_FACTOR = 0.0675;
        this.EXTREME_SCALING_FACTOR = 0.5;
        this.STRAIN_STEP = 400;
        this.DECAY_WEIGHT = 0.9;
        this.tpHitObjects = [];
        this.starRating = -1;
        this.difficulties = [-1,-1];
        this.stars = [-1,-1];
    }

    calculate(){
        var circleSize = (osu.helpers.constants.OSU_GAME_WIDTH / 16) * (1 -.7 * (this.beatmap.difficulty.CircleSize - 5)/5);

        for(var i = 0; i< this.beatmap.hit_objects.length; i++){
            var hitObject = new osu.objects.HitObject(this.beatmap.hit_objects[i], circleSize, this.beatmap.difficulty.ApproachRate);
            this.tpHitObjects.push(new this.TpHitObject(hitObject))
        }
        if (!this.calculateStrainValues()) {
            console.log("Could not compute strain values. Aborting difficulty calculation.");
            return 0;
        }
        this.difficulties[osu.beatmaps.DifficultyCalculator.DifficultyType.SPEED] = this.calculateDifficulty(osu.beatmaps.DifficultyCalculator.DifficultyType.SPEED);
        this.difficulties[osu.beatmaps.DifficultyCalculator.DifficultyType.AIM] = this.calculateDifficulty(osu.beatmaps.DifficultyCalculator.DifficultyType.AIM);

        this.stars[osu.beatmaps.DifficultyCalculator.DifficultyType.SPEED] = Math.sqrt(this.difficulties[osu.beatmaps.DifficultyCalculator.DifficultyType.SPEED]) * this.STAR_SCALING_FACTOR;
        this.stars[osu.beatmaps.DifficultyCalculator.DifficultyType.AIM] = Math.sqrt(this.difficulties[osu.beatmaps.DifficultyCalculator.DifficultyType.AIM  ]) * this.STAR_SCALING_FACTOR;
        this.starRating = this.stars[osu.beatmaps.DifficultyCalculator.DifficultyType.SPEED] + this.stars[osu.beatmaps.DifficultyCalculator.DifficultyType.AIM] +
            Math.abs(this.stars[osu.beatmaps.DifficultyCalculator.DifficultyType.SPEED] - this.stars[osu.beatmaps.DifficultyCalculator.DifficultyType.AIM]) * this.EXTREME_SCALING_FACTOR;

        return this.starRating.toFixed(2);
    }

    calculateStrainValues() {
        if (this.tpHitObjects.length == 0) {
            console.log("Can not compute difficulty of empty beatmap.");
            return false;
        }

        var currentHitObject = this.tpHitObjects[0];
        var  nextHitObject;
        var index = 0;

        while (++index < this.tpHitObjects.length) {
            nextHitObject = this.tpHitObjects[index];
            nextHitObject.calculateStrains(currentHitObject);
            currentHitObject = nextHitObject;
        }

        return true;
    }

    calculateDifficulty(type) {
		var highestStrains = [];
		var intervalEndTime = this.STRAIN_STEP;
		var maximumStrain = 0;

		var previousHitObject = null;
		for (var i = 0; i < this.tpHitObjects.length; i++) {
			var hitObject = this.tpHitObjects[i];

			while (hitObject.hitObject.startTime > intervalEndTime) {
				highestStrains.push(maximumStrain);

				if (previousHitObject == null)
					maximumStrain = 0;
				else {
					var decay = Math.pow(previousHitObject.DECAY_BASE[type], (intervalEndTime - previousHitObject.hitObject.startTime) / 1000);
					maximumStrain = previousHitObject.getStrain(type) * decay;
				}


				intervalEndTime += this.STRAIN_STEP;
			}

			// Obtain maximum strain
			if (hitObject.getStrain(type) > maximumStrain)
				maximumStrain = hitObject.getStrain(type);

			previousHitObject = hitObject;
		}

		var difficulty = 0;
		var weight = 1;
        var sortNum = function (a,b) {
            return b-a;
        };
        highestStrains.sort(sortNum);

        for(var i = 0 ; i < highestStrains.length; i++){
            var strain = highestStrains[i];
            difficulty += weight * strain;
            weight *= this.DECAY_WEIGHT;
        }

		return difficulty;
	}



};