class Vec2{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.pos = null;
    this.cor = null;
  }
  render (){
    if (this.cor != null)
      colore(this.cor[0],this.cor[1],this.cor[2])
    if (this.pos == null)
      seta(0,0,this.x,this.y)
    else
      seta(this.pos.x,
           this.pos.y,
           this.pos.x+this.x,
           this.pos.y+this.y);
  }
  add (v2){
    return new Vec2(this.x+v2.x,this.y+v2.y)
  }
  sum (v2){
    return new Vec2(this.x+v2.x,this.y+v2.y)
  }
  dif (v2){
    return new Vec2(this.x - v2.x,this.y - v2.y);
  }
  mult (k){
    return new Vec2(this.x*k,this.y*k);
  }
  // Produto Escalar (dot product)
  dot (v2){
    let scalar = this.x*v2.x+this.y*v2.y
    return scalar
  }
  size(){
    return sqrt(this.x*this.x+this.y*this.y)
  }
  normalize(){
    let invLenght = 1.0 / this.size()
    return this.mult(invLenght);
  }
  cross (v2){
    let prod = this.x*v2.y - this.y*v2.x
    return prod;
  }
  projection(n){
    let v = new Vec2(this.x,this.y)
    let num = v.dot(n);
    let den = n.dot(n);
    let div = num/den
    let vn = n.mult(div)
    let vp = v.dif(vn)
    return [vn, vp]
  }
  reflection(n,alfa,beta){
    let [vn,vp] = this.projection(n)
    let rx = alfa*vp.x - beta*vn.x
    let ry = alfa*vp.y - beta*vn.y
    return new Vec2(rx,ry)
  }
  rot90(){
    return new Vec2 (-this.y,this.x);
  }
  // função de rotação baseado num angl (radianos) theta
  // CUIDADO ao usar (se precisar translade anteriormente para evitar error)
  rot(theta){
    let cosA = cos(theta)
    let sinA = sin(theta)
    let rotX = this.x*cosA - this.y*sinA
    let rotY = this.x*sinA + this.y*cosA
    return new Vec2 (rotX,rotY);
  }
}
// aux functions
function arrayLenght(array) {
  let size = 0;
  while (array[size]!=null){
    size++
  }
  return size;
}
function renderLines(array){
  let array_size = arrayLenght(array)
  for (let i=0;i<array_size;i++){
    colore(0,0,0)
    line(array[i][0].x,array[i][0].y,array[i][1].x,array[i][1].y)
  }
}
function renderPoints(array){
  let array_size = arrayLenght(array)
  for (let i=0;i<array_size;i++){
    circle(array[i].x,array[i].y,5)
  }
}
function randomPoint(o){
  let w = width/4
  let h = height/4
  let x1 = random(-w,w)
  let y1 = random(-h,h)
  return (new Vec2(x1,y1))
}
function renderSeta(array){
  let array_size = arrayLenght(array)
  for (let i=0;i<array_size;i++){
    colore(0,0,0)
    seta(array[i][0].x,array[i][0].y,array[i][1].x,array[i][1].y)
  }
}
function drawAxis(axis){
  seta(0,0,axis.x,axis.y)
}
function minAxis(pts,axis){
  let dotUU = 1/(axis.dot(axis))
  let preCalc = axis.mult(dotUU)
  let minS = Infinity;
  let maxS = -Infinity;
  for (let pi of pts){
    let s = pi.dot(axis) * dotUU
    let vpi = axis.mult(s)
    minS = min(minS,s)
    maxS = max(maxS,s)
    //colore(0,64,0,64)
  }
  return [minS,maxS]
}
function fartestPoint(pi,points){
  let farPi = pi;
  let maxDist = 0;
  for (let p of points){
    let aux = p.dif(pi);
    if (aux.size()>=maxDist){
      farPi = p;
      maxDist = aux.size()
    }
  }
  return [farPi,maxDist];
}
function closestPoint(pi,points){
  let closePi = null;
  let minDist = Infinity;
  for (let p of points){
    let aux = p.dif(pi);
    if (aux.size()<minDist){
      closePi = p;
      minDist = aux.size()
    }
  }
  return closePi;
}