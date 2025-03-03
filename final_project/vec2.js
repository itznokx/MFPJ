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
    return new Vec2 (this.y,(-1)*this.x);
  }
}
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
    colore(255,0,0)
    circle(array[i].x,array[i].y,5)
  }
}
function randomPoint(){
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
// AABB
class AABB{
  constructor(points,uColor){
    this.type = "AABB"
    this.cor = uColor;
    this.pts = points;
    let aMaxX = -Infinity;
    let aMaxY = -Infinity;
    let aMinX = Infinity;
    let aMinY = Infinity;
    for (let p of points){
      let auxX = p.x;
      let auxY = p.y;
      aMaxX = max(auxX,aMaxX)
      aMaxY = max(auxY,aMaxY)
      aMinX = min(auxX,aMinX)
      aMinY = min(auxY,aMinY)
    }
    this.minP = new Vec2 (aMinX,aMinY);
    this.maxP = new Vec2 (aMaxX,aMaxY);
  }
  draw(){
    colore(this.cor[0],this.cor[1],this.cor[2],32)
    quad( this.minP.x,this.minP.y,
          this.minP.x,this.maxP.y,
          this.maxP.x,this.maxP.y,
          this.maxP.x,this.minP.y
      )
  }
  drawSelfPoints(cor){
    colore(cor[0],cor[1],cor[2],cor[3])
    renderPoints(this.pts)
  }
}
// OBB
class OBB {
  constructor(points,iU,uColor){
    this.type = "OOBB"
    this.pts = points;
    this.cor = uColor;
    this.pts = points;
    this.u = iU;
    this.v = u.rot90();
    [this.minU, this.maxU] = minAxis(points,this.u)
    [this.minV, this.maxV] = minAxis(points,this.v)
    this.largura = this.maxU - this.minU;
    this.altura = this.maxV - this.minV;
    let uc = (this.maxU+this.minU)/2
    let vc = (this.maxV+this.minV)/2
    let pu = this.u.mult(uc)
    let pv = this.v.mult(vc)
    this.center = pu.add(pv)
    let uAux = this.u.mult(this.largura/2)
    let vAux = this.v.mult(this.altura/2)
    this.p1 = this.center.add(uAux.add(vAux))
    this.p2 = this.center.add(uAux.dif(vAux))
    this.p3 = this.center.dif(uAux.add(vAux))
    this.p4 = this.center.dif(uAux.dif(vAux))
  }

  draw(){
    colore(this.cor[0],this.cor[1],this.cor[2],32)
    quad(this.p1.x,this.p1.y,
        this.p2.x,this.p2.y,
        this.p3.x,this.p3.y,
        this.p4.x,this.p4.y)
  }
  drawSelfPoints(cor){
    colore(cor[0],cor[1],cor[2],cor[3])
    renderPoints(this.pts)
  }
}
// BC (BOUND CIRCLE)
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
class BC {
  constructor(points,uColor){
    this.cor = uColor;
    this.pts = points;
    let auxX = 0;
    let auxY = 0;
    for( let p of points){
      auxX += p.x;
      auxY += p.y;
    }
    let cx = auxX/arrayLenght(points)
    let cy = auxY/arrayLenght(points)
    this.center = new Vec2 (cx,cy);
    let farPoint;
    [farPoint,this.r] = fartestPoint(this.center,points);
    this.r = this.r*2
  }
  draw(){
    noFill()
    circle(this.center.x,this.center.y,this.r)
  }
  drawSelfPoints(cor){
    colore(cor[0],cor[1],cor[2],cor[3])
    renderPoints(this.pts)
  }
}