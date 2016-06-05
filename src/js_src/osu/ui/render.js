/**
 * Created by Ugrend on 4/06/2016.
 */


var osu = osu || {};
osu.ui = osu.ui || {};
osu.ui.renderer = {



    renderWidth: window.innerWidth *.98,
    renderHeight: window.innerHeight *.98,
    renderer: null,
    masterStage: new PIXI.Container(),
    render_zone: document.getElementById("render_zone"),
    fixed_aspect: false,

    /**
     *
     * @param child add to renderer stage
     */
    addChild: function(child){
        this.masterStage.addChild(child);
    },
    removeChild: function(child){
        this.masterStage.removeChild(child);
    },

    clearStage: function(){
        this.masterStage.removeChildren();
    },
    animate: function () {
        this.renderer.render(this.masterStage);
        requestAnimationFrame(this.animate.bind(this));
    },
    resize: function(){
        var x = window.innerWidth *.98;
        var y = window.innerHeight *.98;

        //just to make my life easier fix the render ratio for game play
        if(this.fixed_aspect) {
            var fixed_ratio_y = (3 / 4) * x;
            var fixed_ratio_x = (4 / 3) * y;

            if (fixed_ratio_y > y) {
                //if we increasing y bigger than the screen we need to make x smaller
                x = fixed_ratio_x;
            }
            else {
                y = fixed_ratio_y;
            }
        }
        this.renderWidth =  x;
        this.renderHeight = y;
        if(this.renderer != null) {
            this.renderer.view.style.width = this.renderWidth + 'px';
            this.renderer.view.style.height = this.renderHeight + 'px';
        }
    },
    start: function () {
        this.resize();
        if(this.renderer == null) {
            this.renderer = PIXI.autoDetectRenderer(this.renderWidth, this.renderHeight);
            this.render_zone.appendChild(this.renderer.view);
            this.animate();
            window.onresize = this.resize.bind(this);
        }else{
            console.log("renderer already started resizing instead");
            this.renderer.width =  this.renderWidth;
            this.renderer.height = this.renderHeight;
            this.renderer.view.width = this.renderWidth;
            this.renderer.view.height = this.renderHeight;
        }

    },
    hide: function () {
        this.render_zone.innerHTML = "";
    },
    show: function(){
        this.render_zone.appendChild(this.renderer.view);
    }
};


