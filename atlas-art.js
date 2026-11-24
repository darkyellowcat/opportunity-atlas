// A folded trail map rendered in an oblique projection. The artwork contains no external assets.
(() => {
  class OpportunityAtlas extends HTMLElement {
    connectedCallback() {
      if (this.canvas) return;
      this.canvas = document.createElement('canvas');
      this.append(this.canvas);
      this.resize = new ResizeObserver(() => this.paint());
      this.resize.observe(this);
      this.paint();
    }

    disconnectedCallback() {
      this.resize?.disconnect();
      this.canvas?.remove();
      this.canvas = null;
    }

    paint() {
      const { width, height } = this.getBoundingClientRect();
      if (!width || !height) return;
      const density = Math.min(window.devicePixelRatio || 1, 2);
      const c = this.canvas;
      c.width = Math.round(width * density);
      c.height = Math.round(height * density);
      const g = c.getContext('2d');
      if (!g) return;
      const scale = Math.min(width / 492, height / 285);
      g.setTransform(scale * density, 0, 0, scale * density,
        (width - 492 * scale) * density / 2, (height - 285 * scale) * density / 2);
      const ink = '#21323f';
      const line = (pts, color = ink, weight = 2) => {
        g.beginPath();
        pts.forEach(([x,y], i) => i ? g.lineTo(x,y) : g.moveTo(x,y));
        g.lineJoin = 'round'; g.lineCap = 'round'; g.strokeStyle = color; g.lineWidth = weight; g.stroke();
      };
      const shape = (pts, fill, stroke = ink, weight = 2) => {
        g.beginPath();
        pts.forEach(([x,y], i) => i ? g.lineTo(x,y) : g.moveTo(x,y));
        g.closePath(); g.fillStyle = fill; g.fill();
        if (stroke) { g.strokeStyle = stroke; g.lineWidth = weight; g.lineJoin = 'round'; g.stroke(); }
      };
      const dot = (x,y,r,fill,stroke = null) => {
        g.beginPath(); g.arc(x,y,r,0,Math.PI*2);g.fillStyle=fill;g.fill();
        if(stroke){g.strokeStyle=stroke;g.lineWidth=1.8;g.stroke();}
      };
      function card(x,y,skew,rise,depth,top,edge,art) {
        g.save();
        g.transform(1,skew,-.65,.64,x,y);
        g.shadowColor = 'rgba(18,44,49,.11)';g.shadowBlur=3;g.shadowOffsetY=3;
        shape([[0,0],[213,0],[213,136],[0,136]],edge);
        g.shadowColor='transparent';
        g.setTransform(scale * density,0,0,scale*density,
          (width-492*scale)*density/2,(height-285*scale)*density/2);
        let a=[x,y-rise], b=[x+213,y+skew*213-rise], d=[x-.65*136,y+.64*136-rise], c=[b[0]-.65*136,b[1]+.64*136];
        shape([d,c,[c[0],c[1]+depth],[d[0],d[1]+depth]],edge);
        shape([b,c,[c[0],c[1]+depth],[b[0],b[1]+depth]],edge);
        g.transform(1,skew,-.65,.64,x,y-rise);
        shape([[0,0],[213,0],[213,136],[0,136]],top);
        g.save(); g.clip();
        art();
        g.restore();g.restore();
      }

      // Registration marks around the aerial map and the offset shadow.
      for (let x=30;x<480;x+=13) for (let y=16;y<278;y+=13) {
        if ((x>402 && y<112) || (x<82 && y>135)) dot(x,y,.85,'rgba(37,65,65,.24)');
      }
      shape([[83,208],[304,264],[424,182],[200,132]],'rgba(62,80,66,.13)',null);
      card(184,132,.205,0,6,'#f7a58c','#d36d56',() => {
        for(let i=0;i<20;i++)line([[i*14-50,0],[i*14-8,136]],'#d9775b',1.2);
        shape([[11,110],[52,110],[52,126],[11,126]],'#ffe8d4',null);
      });
      card(176,116,.178,3,5,'#8598bc','#42577d',() => {
        for(let k=0;k<7;k++)line([[0,10+20*k],[213,10+20*k]],'#5e7299',1);
        for(let k=0;k<11;k++)line([[10+k*20,0],[10+k*20,136]],'#5e7299',1);
        line([[0,117],[44,117],[77,93],[145,93],[178,55],[214,55]],'#e6da9b',5);
      });
      card(188,92,.21,0,5,'#f7efc9','#bbb18c',() => {
        shape([[0,0],[73,0],[73,136],[0,136]],'#ebe7c5',null);
        shape([[140,0],[213,0],[213,136],[140,136]],'#fbf2d5',null);
        for(let k=0;k<8;k++)line([[0,10+k*19],[213,10+k*19]],'#d9d8b7',.85);
        for(let k=0;k<12;k++)line([[8+k*18,0],[8+k*18,136]],'#d9d8b7',.85);
        for(let k=0;k<7;k++){
          g.beginPath();g.moveTo(5+k*8,-2);g.bezierCurveTo(19+k*8,20,4+k*6,33,14+k*6,48);
          g.bezierCurveTo(23+k*6,63,24+k*6,68,17+k*3,83);
          g.strokeStyle='#a8b797';g.lineWidth=1.35;g.stroke();
        }
        shape([[94,96],[105,78],[128,76],[147,90],[139,115],[121,118],[106,107]],'#b1c7a8',null);
        line([[-4,105],[36,78],[65,89],[103,56],[123,62],[148,42],[178,48],[216,15]],'#374950',6);
        line([[-4,105],[36,78],[65,89],[103,56],[123,62],[148,42],[178,48],[216,15]],'#faf6db',3.7);
        line([[36,78],[46,54],[67,48],[80,30],[108,27]],'#bd553b',3.2);
        [[36,78],[65,89],[103,56],[148,42],[178,48]].forEach(([x,y])=>dot(x,y,3.5,'#fffae4',ink));
        line([[72,0],[72,136]],'#a3a68b',1.15);
        line([[141,0],[141,136]],'#b4ae92',1.15);
        for(let k=0;k<3;k++)line([[158,104+k*5],[195-k*6,104+k*5]],'#898e75',1.7);
      });
      // A freestanding enamel wayfinding post, with painted sides and punched rivets.
      const X=265,Y=117;
      g.save();g.translate(X,Y);
      shape([[-4,0],[2,-2],[11,3],[5,6]],'#233e44',null);
      shape([[-3,-80],[1,-82],[4,1],[0,4]],'#f6d992');
      shape([[1,-82],[5,-80],[8,1],[4,3]],'#ad8251');
      shape([[-38,-69],[33,-79],[49,-70],[34,-58],[-37,-50]],'#dc6946');
      shape([[-38,-73],[33,-83],[49,-74],[34,-62],[-37,-54]],'#f88456');
      dot(-28,-64,1.4,ink); line([[-18,-65],[19,-70]],ink,2.6);
      shape([[32,-49],[-28,-57],[-41,-49],[-30,-37],[31,-30]],'#496a64');
      shape([[32,-52],[-28,-60],[-41,-52],[-30,-40],[31,-33]],'#68958a');
      line([[-16,-47],[17,-43]],'#fff3c9',2.2);
      g.restore();
      // Tiny contour marks frame the object without competing with the destination pins.
      [[97,61],[392,116],[412,215]].forEach(([x,y])=>{
        line([[x-4,y],[x+4,y]],'#849989',1);line([[x,y-4],[x,y+4]],'#849989',1);
      });
    }
  }
  if ('customElements' in window && 'ResizeObserver' in window) customElements.define('opportunity-atlas',OpportunityAtlas);
})();

// Small drawn pictograms keep the topic labels legible in every installed system font.
(() => {
  const marks = {
    algorithm(g,line,circle) {
      line([[7,20],[15,11],[25,20],[34,10]]);
      [[7,20],[15,11],[25,20],[34,10]].forEach(([x,y])=>circle(x,y,2.8,true));
      line([[6,29],[34,29]],1.6);
    },
    software(g,line) {
      line([[6,8],[34,8],[34,29],[6,29],[6,8]]);line([[6,14],[34,14]],1.5);
      line([[12,18],[16,21],[12,24]]);line([[21,24],[26,24]]);
    },
    systems(g,line,circle) {
      for(const y of [11,19,27]) {line([[7,y],[20,y-5],[33,y],[20,y+5],[7,y]]);}
    },
    ai(g,line,circle) {
      const points=[[8,10],[8,25],[20,6],[20,18],[20,30],[32,10],[32,25]];
      [[0,2],[0,3],[1,3],[1,4],[2,5],[3,5],[3,6],[4,6]].forEach(([a,b])=>line([points[a],points[b]],1.5));
      points.forEach(([x,y])=>circle(x,y,2.5,true));
    },
    security(g,line) {
      line([[20,5],[32,9],[31,19],[27,25],[20,30],[13,25],[9,19],[8,9],[20,5]]);
      line([[15,17],[19,21],[25,14]]);
    },
    hardware(g,line) {
      line([[11,10],[29,10],[29,26],[11,26],[11,10]]);
      line([[16,14],[24,14],[24,22],[16,22],[16,14]],1.5);
      for(const x of [15,20,25]){line([[x,6],[x,10]]);line([[x,26],[x,30]]);}
      for(const y of [14,18,22]){line([[7,y],[11,y]]);line([[29,y],[33,y]]);}
    },
    graphics(g,line,circle) {
      line([[7,28],[19,7],[32,28],[7,28]]);line([[9,23],[25,16]],1.5);
      [[7,28],[19,7],[32,28]].forEach(([x,y])=>circle(x,y,2.5,true));
    }
  };
  for(const [key,draw] of Object.entries(marks)){
    const canvas=document.createElement('canvas');canvas.width=80;canvas.height=72;
    const g=canvas.getContext('2d');
    if(!g) return;
    g.scale(2,2);g.strokeStyle='#283c3d';g.fillStyle='#283c3d';
    const line=(points,w=1.9)=>{g.beginPath();points.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.lineWidth=w;g.lineJoin='round';g.lineCap='round';g.stroke();};
    const circle=(x,y,r,fill)=>{g.beginPath();g.arc(x,y,r,0,2*Math.PI);if(fill)g.fill();else g.stroke();};
    draw(g,line,circle);
    document.documentElement.style.setProperty('--glyph-'+key,'url('+canvas.toDataURL('image/png')+')');
  }
})();

document.querySelector('.skip-link')?.addEventListener('click', event => {
  event.preventDefault();
  const main = document.getElementById('app');
  main?.focus();
  main?.scrollIntoView({ block: 'start' });
});
