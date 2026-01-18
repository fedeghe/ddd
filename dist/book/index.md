![Foo](https://raw.githubusercontent.com/fedeghe/malta/master/src/media/malta.png)

# D D D 



# contents

- preface 

- 1: Basic concepts
    - 1.0: The Canvas tag
    - 1.1: Coordinates and logical coordinates




# Elementary concepts

### 1.0: The Canvas  

The `canvas` is an html5 tag introduced by  (no it's not a typo) in 2004 and then _quickly_ adopted and available in every browser as standard core feature (2008).  
It provides a bitmap-based area on the browser allowing to draw programmatically shapes, graphics and more. This was the demise of macromedia Flash.  

Start from a canvas tag in a html document `<canvas id="myCanvas"></canvas>`. That's all the markup we need in that book.  

``` js
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
````

---

### 1.1: Coordinates and logical coordinates  

In _math_ almost all the numerical results will be similar to rational numbers (indeed a computer can only have finite decimal digits). The native methods available for us to draw on the canvas though accepts only integers; those parameters are exactly the coordinates of our points in the coordinates system of the canvas. This system has the origin in the top left of the screen, the x-axis is horizontal pointing toward the right and they-axis is vertical pointing toward the bottom.

This means to draw a line we have to that this coordinate system into account

```
          A     B
drawLine(6,2, 10,6).  // watch the canvas does NOT provide that, we will in out simple library
```

![Foo](https://raw.githubusercontent.com/fedeghe/ddd/master/dist/book/media/system0.png)

the truth is that to draw a line in the canvas we have to write something like:

``` js
ctx.beginPath();   // Start a path
ctx.moveTo(6, 2);  // Move to initial point
ctx.lineTo(10, 6); // Draw a line to (10, 6)
ctx.stroke();      // Render
```

but we can create out own `drawLine` function to do that.  
Another more important thing is to change the coordinate system into one we all feel more comfortable to draw in.

![Foo](https://raw.githubusercontent.com/fedeghe/ddd/master/dist/book/media/system1.png)

``` js 
var width = 800,
    height = 600;
    renderable = ({x, y}) => ({
        x,
        y: height - y
    }); 
```
