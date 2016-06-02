/**
 * Created by Ugrend on 6/2/2016.
 */

/*
Just adding this for testing will prob remove

 */

function showReplayData(){
    mainArea.innerHTML = "";
    for(var k in replay){
        mainArea.innerHTML += '<p>' + k + " : " + replay[k] + "</p>";
    }
}