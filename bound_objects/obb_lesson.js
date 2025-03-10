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
function projectAndDraw(pts,axis){
  let dotUU = 1/(axis.dot(axis))
  let preCalc = axis.mult(dotUU)
  let minS = Infinity;
  let maxS = -Infinity;
  for (let pi of pts ){
    let s = pi.dot(axis) * dotUU
    let vpi = axis.mult(s)
    minS = min(minS,s)
    maxS = max(maxS,s)
    //colore(0,64,0,64)
    //circle(vpi.x,vpi.y,5)
    //colore(128,64)
    //line(pi.x,pi.y,vpi.x,vpi.y)
  }
  return [minS,maxS]
}
function drawOBB (u,v,center,largura,altura){
  let uAux = u.mult(largura/2)
  let vAux = v.mult(altura/2)
  let p1 = center.add(uAux.add(vAux))
  let p2 = center.add(uAux.dif(vAux))
  let p3 = center.dif(uAux.add(vAux))
  let p4 = center.dif(uAux.dif(vAux))
  colore(64,64)
  quad(p1.x,p1.y,
       p2.x,p2.y,
       p3.x,p3.y,
       p4.x,p4.y)
}
/// guardam a posição do mouse no plano cartesiano
var mouseXC, mouseYC = 0;
var points = [];
var rP = 100;
var o;
var u;
var v;
function setup(){
  createCanvas(400,400)
  for (let i = 0;i<rP;i++){
    points.push(randomPoint())
  }
  o = random(PI)
  u = new Vec2 (cos(o),sin(o))
  v = u.rot90()
  uMinus = v.rot90()
}

function draw(){
  let ponder = 1000
  let lowPonder = 50
  goCartesian()
  renderPoints(points)
  colore(128,128)
  drawAxis(u.mult(ponder))
  drawAxis(uMinus.mult(ponder))
  colore(0,0,255)
  drawAxis(u.mult(lowPonder))
  colore(128,0,128)
  drawAxis(v.mult(lowPonder))
  let [minU, maxU] = projectAndDraw(points,u)
  let [minV, maxV] = projectAndDraw(points,v)
  let larguraOBB = maxU-minU
  let alturaOBB = maxV-minV
  print ("largura obb: "+larguraOBB)
  print ("altura obb: "+alturaOBB)
  let uc = (maxU+minU)/2
  let vc = (maxV+minV)/2
  let pu = u.mult(uc)
  let pv = v.mult(vc)
  let center = pu.add(pv)
  drawOBB(u,v,center,larguraOBB,alturaOBB)
}
function goCartesian()
{
  background(255)
  
  mouseXC = mouseX - width/2
  mouseYC = height/2 - mouseY
  
  colore(128,0,0)
  seta(0,height/2,width, height/2)
  colore(0,128,0)
  seta(width/2,height,width/2, 0)
  
  translate(width/2,height/2)
  scale(1,-1,1)  
}

/// Atualiza as variáveis globais com as coordenadas do mouse no plano cartesiano
function grabMouse()
{
  mouseXC = mouseX - width/2
  mouseYC = height/2 - mouseY
}

/** Renderiza texto corretamente no plano cartesiano
 *  @param str Texto a ser escrito
 *  @param x Posição horizontal do canto inferior esquerdo texto
 *  @param y Posição vertical do canto inferior esquerdo texto
 */
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


/* Define as cores de preenchimento e de contorno com o mesmo valor.
 * Há várias opções de trabalho em RGB nesse caso:
 *  - caso c1,c2,c3 e c4 sejam passados, o efeito padrão é uma cor RGBA
 *  - caso c1,c2 e c3 sejam passados, tem-se uma cor RGB.
 *  - caso c1 e c2 sejam passados, c1 é um tom de cinza e c2 é opacidade.
 *  - caso apenas c1 seja passado, c1 é um tom de cinza.
 */
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

/* Desenha um segmento de reta com seta do ponto (x1,y1) para (x2,y2)
 */
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
