var FOREGROUND = "#FF0000",
    BACKGROUND = "#000000",
    W = 600,
    H = 600,
    c = window.myCanvas, // or document.getElementByTagName("canvas")[0]
                         // if we set no id attribute and there is only one canvas
    ctx = c.getContext("2d");

c.setAttribute('width' , W);
c.setAttribute('height', H);

function clear () {
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, c.width, c.height);
}

function rebase(p) {
    // this will be done with a linear transformation with a basic matrix
    // for the moment let's do it manually
    return {
        x: p.x + W/2,  // traslate
        y: - p.y + H/2 // invert Y and translate
    };
}

function drawLine(point1, point2, options) {
  var p1 = rebase(point1),
        p2 = rebase(point2);
  ctx.strokeStyle = options.color || FOREGROUND;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

const d = Math.max(W, H)/2;
clear(); 
drawLine({x:-d, y:0}, {x:d, y:0}, {color:' #222'});
drawLine({x:0, y:-d}, {x:0, y:d}, {color:'#222'});
drawLine({x:-200, y:-50}, {x:100, y: 50},  {color:'green'});
