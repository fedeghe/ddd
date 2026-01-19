class ddd{
  constructor(options){
    this.colors = {
      FOREGROUND: 'red',
      BACKGROUND: "black"
    };
    this.width = options.width || 600;
    this.height = options.height || 600;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
  clear(){
    this.ctx.fillStyle = this.colors.BACKGROUND;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  drawPoint(point, options) {
    const PSIZE = options.size ||20,
      r = this.#renderable(point);
    this.ctx.fillStyle = options.color || this.colors.FOREGROUND;
    this.ctx.fillRect(r.x-PSIZE/2, r.y-PSIZE/2, PSIZE, PSIZE);
  }
  drawLine(point1, point2, options) {
    const p1 = this.#renderable(point1),
      p2 = this.#renderable(point2);
    this.ctx.strokeStyle = options.color || this.colors.FOREGROUND;
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.stroke();
  }

  // private is ok
  #renderable(p){
    return {
        x: p.x + this.width/2,
        y: this.height/2 - p.y
    };
  }
}

const myddd = new ddd({width:600, height:600, canvas:window.myCanvas});
const colors = [
  'red', 'green', 'blue',
  'yellow', 'cyan', 'magenta',
  '#fff', '#888', '#333'
],
d = 300;

// ================

myddd.clear(); 

myddd.drawLine({x:-d, y:0}, {x:d, y:0}, {color:'white'});
myddd.drawLine({x:0, y:-d}, {x:0, y:d}, {color:'white'});

myddd.drawLine({x:-200, y:-50}, {x:100, y: 50},  {color:'green'});
