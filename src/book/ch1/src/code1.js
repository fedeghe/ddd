var FOREGROUND = "#FF0000",
    BACKGROUND = "#000000",
    W = 600,
    H = 600,
    c = window.myCanvas, // or document.getElementByTagName("canvas")[0]
                         // if we set no idattribute and there is only one canvas
    ctx = c.getContext("2d");

c.width = W;
c.height = H;

function clear () {
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, c.width, c.height);
}

function draw(x, y, color) {
  const PSIZE = 50;
  ctx.fillStyle = color || FOREGROUND;
  ctx.fillRect(x-PSIZE/2, y-PSIZE/2, PSIZE, PSIZE);
}

clear(); 

draw(0, 0);       draw(W/2, 0, "green");     draw(W, 0, 'blue');

draw(0, H/2, 'yellow');     draw(W/2, H/2, 'cyan');   draw(W, H/2, 'magenta');

draw(0, H, '#ddd');      draw(W/2, H, '#888');     draw(W, H, '#555');