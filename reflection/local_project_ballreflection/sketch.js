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
    return sqrt(this.dot(this))
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
function linePlaneIntersection(p1,p2,q,n){
  let num = q.dif(p1).dot(n)
  let div = p2.dif(p1).dot(n)
  let final = num/div
  return final
}
function intersect(A,B,C,D){
  let AB = B.dif(A);
  let AC = C.dif(A);
  let AD = D.dif(A);
  let ABxAC = AB.cross(AC)
  let ABxAD = AB.cross(AD)
  let cond1 = ABxAC*ABxAD;
  let CA = A.dif(C);
  let CB = B.dif(C);
  let CD = D.dif(C);
  let CDxCA = CD.cross(CA)
  let CDxCB = CD.cross(CB)
  let cond2 = CDxCA*CDxCB;
  if (cond1 < 0 && cond2 <0){
    return true
  }
  return false
 
}
function arrayLenght(array) {
  let size = 0;
  while (edges[size]!=null){
    size++
  }
  return size;
}
function renderLines(array){
  let array_size = arrayLenght(array)
  for (let i=0;i<array_size;i++){
    colore(0,255,0)
    line(array[i][0].x,array[i][0].y,array[i][1].x,array[i][1].y)
  }
}
/// guardam a posição do mouse no plano cartesiano
var mouseXC, mouseYC = 0
//Particula
var pos = new Vec2(0,0)
var dr = new Vec2(48,32)
var vel = 1
var edges = []
var alfa = 1;
var beta = 1;
function setup(){
  createCanvas(1600,900)
  frameRate(24)
  edges.push([new Vec2 (-width/2,height/2),
              new Vec2 (-width/2,-height/2)
             ])
  edges.push([new Vec2 ((width/2),height/2),
              new Vec2 ((width/2),-height/2)
             ])
  edges.push([new Vec2 (width/2,height/2),
              new Vec2 (-width/2,height/2)
              ])
  edges.push([new Vec2 (width/2,-height/2),
              new Vec2 (-width/2,-height/2)
              ])
}
function draw(){
  goCartesian()
  strokeWeight(2)
  //point(mouseXC,mouseYC);
  renderLines(edges)
  strokeWeight(1)
  let pos2 = pos.sum(dr.mult(vel))
  let edges_size = arrayLenght(edges)
  let minT = Infinity;
  let colisao = false;
  let colIndex = 0;
  for (let i=0;i<edges_size;i++){
    let ei = edges[i]
    if (intersect(pos,pos2,ei[0],ei[1])){
      let nC = ei[1].dif(ei[0]).rot90()
      //nC = nC.normalize()
      let q = ei[0]
      let t = linePlaneIntersection(pos,pos2,q,nC)
      /* // "Debug"
      print("pos: ["+pos.x+","+pos.y+"]")
      print("pos2: ["+pos2.x+","+pos2.y+"]")
      print("normal: ["+nC.x+","+nC.y+"]")
      print("q: "+q)
      print("t: "+t)
      print("------------------------------")
      */
      if (t<minT){
        minT = t;
        n = nC;
        colIndex = i;
      }
      colisao = true
    }
  }
  if (!colisao){
    pos = pos2
  }else{
    let tAux = minT*0.99
    let aux1 = dr.mult(tAux);
    let pt = pos.add(aux1)
    pos = pt;
    colore(255,0,0)
    circle(pos.x,pos.y,30)
    let ei = edges[colIndex]
    let nC = ei[1].dif(ei[0]).rot90()
    dr = dr.reflection(nC,alfa,beta)
    nC = nC.normalize()
    print(nC)
  }
  colore(0)
  strokeWeight(1)
  circle(pos.x,pos.y,10)
  dr.pos = pos;
  dr.render()
  
}
function mouseClicked(){
  let x1 = random(-width/2,width/2)
  let x2 = random(-width/2,width/2)
  let y1 = random(-height/2,height/2)
  let y2 = random(-height/2,height/2)
  edges.push([new Vec2(x1,y1),new Vec2(x2,y2)])
}
function keyPressed(){
  if (key=='d'){
    if (arrayLenght(edges)>0){
      edges.pop()
    }
  }
}
function goCartesian()
{
  background(255)
  
  mouseXC = mouseX - width/2
  mouseYC = height/2 - mouseY
  
  colore(128,0,0)
  //seta(0,height/2,width, height/2)
  colore(0,128,0)
  //seta(width/2,height,width/2, 0)
  
  translate(width/2,height/2)
  scale(1,-1,1)  
}
function grabMouse()
{
  mouseXC = mouseX - width/2
  mouseYC = height/2 - mouseY
}

function texto(str,x,y)
{
  push()
    translate( x, y)
    scale(1,-1)
    translate(-x,-y)
  
    // desenha o texto normalmente
    text(str,x,y)
  pop()
}
function colore(c1,c2,c3,c4)
{
  if(c4 != null)
  {
    fill(c1,c2,c3,c4)
    stroke(c1,c2,c3,c4)
    return
  }
  if(c3 != null)
  {
    fill(c1,c2,c3)
    stroke(c1,c2,c3)
    return
  }
  
  if(c2 == null )
  {
    fill(c1)
    stroke(c1)
  }
  else
  {
    fill(c1,c1,c1,c2)
    stroke(c1,c1,c1,c2)
  }    
}

function seta(x1,y1,x2,y2)
{
  // o segmento de reta
  line(x1,y1,x2,y2)
  var dx = x2-x1, dy = y2-y1
  var le = sqrt(dx*dx + dy*dy) // comprimento do vetor
  // o vetor v é unitário paralelo ao segmento, com mesmo sentido
  var vx = dx/le, vy = dy/le
  // o vetor u é unitário e perpendicular ao segmento
  var ux = -vy
  var uy = vx
  // a cabeça triangular
  triangle(x2,y2,
           x2-5*vx+2*ux, y2-5*vy+2*uy,
           x2-5*vx-2*ux, y2-5*vy-2*uy)
}
