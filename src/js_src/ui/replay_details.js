/**
 * Created by Ugrend on 6/2/2016.
 */

/*
Just adding this for testing will prob remove

 */

function showReplayData(){
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
    hideDropZone();
    osu.ui.interface.scorescreen.renderScoreScreen();
}