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
