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
        this.renderWidth = window.innerWidth *.98;
        this.renderHeight = window.innerHeight *.98;
        this.renderer.view.style.width = this.renderWidth + 'px';
        this.renderer.view.style.height = this.renderHeight + 'px';
    },
    start: function () {
        if(this.renderer == null) {
            this.renderWidth = window.innerWidth *.98;
            this.renderHeight = window.innerHeight *.98;
            this.renderer = PIXI.autoDetectRenderer(this.renderWidth, this.renderHeight, {transparent: true})
            this.render_zone.appendChild(this.renderer.view);
            this.animate();
            window.onresize = this.resize.bind(this);
        }
        console.log("renderer already started");
    },
    hide: function () {
        this.render_zone.innerHTML = "";
    },
    show: function(){
        this.render_zone.appendChild(this.renderer.view);
    }
};


