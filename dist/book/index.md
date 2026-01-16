

![Foo](https://raw.githubusercontent.com/fedeghe/malta/master/src/media/malta.png)

# DDD











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
<canvas id="myCanvas"></canvas>
```



``` js
class Counter {
  
  constructor (init) {
    this.data = init;
    this.sliced = { A3: 0, A4: 0};
  }
  
  slice(color, format, mode){
    if(!(color in this.data)) return;
    var trg = this.data[color];
  	switch(format) {
      case 'A3': 
        trg.B += [4, 5][mode];
        trg.b += [4.4/8, 2/8][mode];
        trg.I += [4, 0][mode];
        break;
      case 'A4': 
      	trg.B += [2, 1][mode];
        trg.b += [5/8, 1.8/8][mode];
        trg.I += [0, 8][mode];
        break;
    }
    this.sliced[format]++;
  }

  sliceAll(els){
    for (var color in els) 
      for (var format in els[color]) 
        els[color][format].forEach(
          (count, index) => {
          	while (count--)
            	this.slice(color, format, index); 
          }
        );
  }
  
  stats() {
    const tot = {
    	Bands: 0,
      	JoinedBands: 0,
    	Inner: 0
    };
    for(var k in this.data){
      const B = Math.floor(this.data[k].B),
        b = Math.floor(this.data[k].b),
        I = Math.floor(this.data[k].I);
      tot.Bands += B;
      tot.JoinedBands += b;
      tot.Inner += I;
      console.log(k, { Bands : B, Joinedbands : b, Inner : I });
    }
    console.log('sliced', this.sliced);
    console.log('total', tot);
  }
}

````