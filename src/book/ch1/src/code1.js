var FOREGROUND = "#FF0000",
    BACKGROUND = "#000000",
    W = 600,
    H = 600,
    c = document.getElementById("myCanvas"), // or even window.myCanvas
    ctx = c.getContext("2d");
   
c.width = W;
c.height = H;

function clear () {
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, c.width, c.height);
}

function draw(x, y) {
  const PSIZE = 10;
  ctx.fillStyle = FOREGROUND;
  ctx.fillRect(x-PSIZE/2, y-PSIZE/2, PSIZE, PSIZE);
}

clear(); 
//    *                 *                 * 
      draw(0, 0);       draw(W/2, 0);     draw(W,0);
//
//
//    *                 *                 *
      draw(0, H/2);     draw(W/2, H/2);   draw(W, H/2);
//
//
//    *                 *                 *
       draw(0, H);      draw(W/2, H);     draw(W, H);