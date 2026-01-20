![Foo](https://raw.githubusercontent.com/fedeghe/malta/master/src/media/malta.png)

# D D D 



# contents

- preface 

- 1: Basic concepts
    - 1.0: The Canvas tag
    - 1.1: Coordinates and logical coordinates




# Basic concepts

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
                         // if we set no id attribute and there is only one canvas
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

![Foo](https://raw.githubusercontent.com/fedeghe/ddd/master/dist/book/media/system0.png)

We need then to change the coordinate system into one we all feel more comfortable to draw in.


``` js 
var width = 800,
    height = 600;
    // we'll do that more properly with a matrix
    // here we do that by hand
    renderable = ({x, y}) => ({
        x: x - width/2,    // traslate
        y: - y + height/2  // invert and traslate
    }); 
```

![Foo](https://raw.githubusercontent.com/fedeghe/ddd/master/dist/book/media/system3.png)

---

### 1.2: Before jumping the the rabbit's hole  

At that point the book could take the annoying path of introducing all what is needed to dive directly into the engine:  
- mapping modes  
- basic algebra and applied geometry. 
- 3 points orientation. 
- area of a polygon
- point in triangle test
- point in polygon test
- point on line test
- point line distance
- point on line projection
- triangulation of a polygon
- basic matrix theory:
  - linear transformation
  - inversions, translations, rotations
  - homogeneous coordinates
  - rotations
  - change of base
- some very classic algorithms:
  - Beizer curves
  - b-spline fitting
  - Cohen-Sutherland line clipping
  - Bresenham's Algorithm for line drawing
  - Sutherland-Hodgman Polygon Clipping
  
but, I will NOT.  
I'll assume you know. The code will be there on the library for you to use (and check).

So without further ado, let jump into the _perspective_ topic.


# The engine

## 2.1 The perspective

![perspective](https://raw.githubusercontent.com/fedeghe/ddd/master/dist/book/media/perspective.png)

The perspective is a tecnique to represent on a plane a tridimensional object.  
Lines that in 3D are parallel (usually apart vertical ones) meet in the 2D plane in a so called _vanishing-point_. Those vanishing points line on the same line, called _horizon_.  

## 2.2 The coordinates transformations

We will build models and move them, do all the math in 3D and each time we want to "see" it on our screen we will need to run:  

1) a viewing transformation  
    from World coordinates (x<sub>w</sub>, y<sub>w</sub>, z<sub>w</sub>) 
    into Eye coordinates (x<sub>e</sub>, y<sub>e</sub>, z<sub>e</sub>)

2) a perspective transformation  
    from eye coordinates (x<sub>e</sub>, y<sub>e</sub>, z<sub>e</sub>)  
    into screen coordinates (X, Y)

### 2.2.1 the viewing transformation

The first transformation we need to compute in the one that changes the coordinate system from the world into a coordinate system having its origin in the our eye (one for the moment), the point of view, or camera. I'll refer to that point with the E letter.

![view transformation](https://raw.githubusercontent.com/fedeghe/ddd/master/dist/book/media/transformation0.png)

---
