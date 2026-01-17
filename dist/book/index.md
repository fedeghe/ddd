![Foo](https://raw.githubusercontent.com/fedeghe/malta/master/src/media/malta.png)

# D D D 










# contents

- preface 

- 1: Elementary concepts
    - 1.0: The Canvas
    - 1.1: Coordinates and logical coordinates




# Elementary concepts

### 1.0: The Canvas  

The `canvas` is an html5 tag introduced by  (no it's not a typo) in 2004 and then _quickly_ adopted and available in every browser as standard core feature (2008).  
It provides a bitmap-based area on the browser allowing to draw programmatically shapes, graphics and more. This was the demise of macromedia Flash.  

But let's stop boring thing and let's dive in as quick as possible:
``` html
<!--
 ### html/canvas.html ### 
-->

```
now we can test it
``` js
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
````