/**
 * replay_details.js
 * Created by Ugrend on 6/2/2016.
 */

/*
Just adding this for testing will prob remove

 */

function loadBeatMap(){

    database.get_data(database.TABLES.BEATMAPS,replay.bmMd5Hash, function(e){

        if(typeof e.data != 'undefined'){
            osu.beatmaps.BeatmapLoader.load(replay.bmMd5Hash, showReplayData);
        }else{
            var loading =   new PNotify({
                title: 'Downloading Beatmap',
                text: "Loading \n" + replay.bmMd5Hash,
                type: 'info',
                hide: 'false'
            });
            osu.webapi.beatmaps.loadBeatMap(replay.bmMd5Hash, function (e) {
                loading.update({'hide': true});
                osu.beatmaps.BeatmapLoader.load(replay.bmMd5Hash, showReplayData);
            })
        }


    });


}


function showReplayData(beatmap){
    osu.ui.interface.mainscreen.hide_main_screen();
    osu.ui.interface.scorescreen.mods = replay.mods;
    osu.ui.interface.scorescreen.beatmap = beatmap;
    osu.ui.interface.scorescreen.played_by = replay.playerName;
    osu.ui.interface.scorescreen.date_played = replay.time_played;
    osu.ui.interface.scorescreen.total_score = replay.tScore;
    osu.ui.interface.scorescreen.t300Hits = replay.h300;
    osu.ui.interface.scorescreen.t300gHits = replay.hGekis;
    osu.ui.interface.scorescreen.t100Hits = replay.h100;
    osu.ui.interface.scorescreen.t100kHits = replay.hKatus;
    osu.ui.interface.scorescreen.t50Hits = replay.h50;
    osu.ui.interface.scorescreen.tMissHits = replay.hMisses ;
    osu.ui.interface.scorescreen.maxCombo = replay.tCombo;
    osu.ui.interface.scorescreen.grade = replay.grade;
    osu.ui.interface.scorescreen.accuracy = replay.accuracy;
    setTimeout(function () {
        document.getElementById("render_zone").className = "";
        osu.ui.interface.scorescreen.renderScoreScreen();
    }, 500);
}