// ==UserScript==
// @name        osuWebReplay
// @namespace   https://ugrend.com
// @include     https://osu.ppy.sh/s/*
// @include     https://osu.ppy.sh/b/*
// @include     https://osu.ppy.sh/u/*
// @version     1
// @grant       none
// @downloadURL https://raw.githubusercontent.com/Ugrend/mmmyeh/master/webpreview-greasemonkey.js
// ==/UserScript==



function addWebReplayLink(){
    $('.require-login').each(function(i){
        if($(this).next().length === 0){
            $(this).after('&nbsp;<a href="javascript:void(0);" class="webReplayLink">webReplay</a>');
        }
    });
}

function Uint8ToString(u8a){
    var CHUNK_SZ = 0x8000;
    var c = [];
    for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
        c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
    }
    return c.join("");
}

function hideOverlay(){
    $('#webReplayFrame').hide();
    $("#overlayFrame").hide(500,function(){
        $('#webReplayFrame').html('');
    });
}
function showOverlay(){
    $('#webReplayFrame').show();
    $("#overlayFrame").show()
}


function setupBeatmapPage(){
    $('.beatmapListing').bind("DOMNodeInserted",function(e){
        var $target = $(e.target);
        if($target.hasClass('row1p') || $target.hasClass('row2p')){
            var $replayLink = $target.find('.require-login');
            if($replayLink.next().length === 0){
                $replayLink.after('&nbsp;<a href="javascript:void(0);" class="webReplayLink">webReplay</a>');
            }
        }
    });

    addWebReplayLink();
}


function setupUserPage(){
    $('.beatmapListing').bind("DOMNodeInserted",function(e){
        var $target = $(e.target);
        if($target.hasClass('prof-beatmap')){
            var $replayLink = $target.find('.pp-display-weight').find('a');
            if($replayLink.length === 1){
                if($replayLink.next().length === 0){
                    $replayLink.after('&nbsp;<a href="javascript:void(0);" class="webReplayLink">webReplay</a>');
                }
            }

        }
    });

}


$(document).ready(function(){

    $('body').append('<div id="webReplayFrame"></div>');
    $('body').append('<div id="overlayFrame" style="display:none;"></div>');
    $('#overlayFrame').css({
        'min-width':"100%",
        'min-height':$(document).height(),
        'z-index': "99998",
        'position': 'absolute',
        'top': "0",
        'left': "0",
        'background-color': 'black',
        'opacity': 0.5

    });

    $('#overlayFrame, body').on('click', function(){
        hideOverlay();
    });


    $('.beatmapListing').on('click','.webReplayLink', function(){
        var url = $(this).prev().attr('href');


        //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data

        var oReq = new XMLHttpRequest();
        oReq.open("GET", url, true);
        oReq.responseType = 'arraybuffer';

        oReq.onload = function (oEvent) {
            var arrayBuffer = oReq.response; // Note: not oReq.responseText
            if (arrayBuffer) {
                var replayData = btoa(Uint8ToString(new Uint8Array(arrayBuffer)));
                showOverlay();
                $('#webReplayFrame').html('  <iframe style="position: fixed; top: 100px; left: 50%; width: 75%; height:75%; margin-left: -37.5%; border: 0; z-index:99999; border-radius: 5px" src="https://ugrend.github.io/mmmyeh#'+ replayData  +'" width="1024" height="768"></iframe> ');

            }
        };

        oReq.send(null);
    });

    if(window.location.href.match(/^https?:\/\/osu\.ppy\.sh\/u\//)){
        setupUserPage();
    }else{
        setupBeatmapPage()
    }
});