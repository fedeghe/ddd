(function () {
    var thisScript = document.currentScript,
        parent = thisScript.parentElement;

    var renderable = function(p){
        return {
            x: p.x + this.width/2,
            y: this.height/2 - p.y
        };
    }
    function ddd(options){
        this.colors = {
            FOREGROUND: 'red',
            BACKGROUND: "black"
        };
        this.width = options.width || 600;
        this.height = options.height || 600;
        if (options.canvas) {
            this.canvas = options.canvas;
        } else {
            this.canvas = document.createElement("canvas");
            parent.insertBefore(this.canvas, thisScript);
        }
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
    ddd.prototype.drawLine = function(point1, point2, options) {
        var ren = renderable.bind(this),
            p1 = ren(point1),
            p2 = ren(point2);
        this.ctx.strokeStyle = options.color || this.colors.FOREGROUND;
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
    }

    ddd.prototype.clear = function() {
        this.ctx.fillStyle = this.colors.BACKGROUND;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    window.ddd = ddd;
})();