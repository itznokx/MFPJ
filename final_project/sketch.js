/// guardam a posição do mouse no plano cartesiano
var mouseXC, mouseYC = 0;
var points = [];
var rP = 5;
var o;
var u;
var v;
function randomPoints(maxP){
  let pts = []
  for (let i = 0;i<maxP;i++){
    pts.push(randomPoint())
  }
  
  return pts
}
function setup(){
  frameRate(120)
  createCanvas(800,800)
  o = random(PI)
  points1 = randomPoints(rP)
  points2 = randomPoints(rP)
  u = new Vec2 (cos(o),sin(o))
}
var bound1 = null;
var bound2 = null;
var actual = 1;
var colorB1 = [64,64,255]
var colorB2 = [255,64,64]
var pointsB1 = [0,0,255]
var pointsB2 = [255,0,0]
function draw(){
  let ponder = 1000
  let lowPonder = 50
  goCartesian()
  let mouseInB1 = 0
  let mouseInB2 = 0
  let mousePoint = new Vec2 (mouseXC,mouseYC)
  if (bound1!=null){
    bound1.draw()
    bound1.drawSelfPoints(pointsB1)
    if (bound1.checkPoint(mousePoint)==true){
      print("Mouse in b1")
      mouseInB1 = 1
    }
  }
  if (bound2!=null){
    bound2.draw()
    bound2.drawSelfPoints(pointsB2)
    if (bound2.checkPoint(mousePoint)==true){
      print("Mouse in b2")
      mouseInB2 = 1
    }
  }
  colore(255*mouseInB2,64,255*mouseInB1);
  circle(mouseXC,mouseYC,4)
}
function keyPressed(){
  if (key=='c'){
    if (actual==1){
      bound1 = null;
      bound1 = new BC(points1,colorB1)
    }
    if (actual==2){
      bound2 = null;
      bound2 = new BC(points2,colorB2)
    }
  }
  if (key=='o'){
    if (actual==1){
      bound1 = null;
      bound1 = new OBB(points1,u,colorB1)
    }
    if (actual==2){
      bound2 = null;
      bound2 = new OBB(points2,u,colorB2)
    }
  }
  if (key=='a'){
    if (actual==1){
      bound1 = null;
      bound1 = new AABB(points1,colorB1)
    }
    if (actual==2){
      bound2 = null;
      bound2 = new AABB(points2,colorB2)
    }
  }
  if (key=='r'){
    if (actual==1){
      points1 = randomPoints(rP)
      if (bound1.type=="AABB"){
        bound1 = null;
        bound1 = new AABB(points1,colorB1)
      }
      if (bound1.type=="OBB"){
        bound1 = null;
        bound1 = new OBB(points1,u,colorB1)
      }
      if (bound1.type=="BC"){
        bound1 = null;
        bound1 = new BC(points1,colorB1)
      }
    }
    if (actual==2){
      points2 = randomPoints(rP)
      if (bound2.type=="AABB"){
        bound2 = null;
        bound2 = new AABB(points2,colorB2)
      }
      if (bound2.type=="OBB"){
        bound2 = null;
        bound2 = new OBB(points2,u,colorB2)
      }
      if (bound2.type=="BC"){
        bound2 = null;
        bound2 = new BC(points2,colorB2)
      }
    }
  }
  if (key=='1'){
    actual = 1
  }
  if (key=='2'){
    actual= 2
  }
  if (key=='k'){
    if(actual==1){
      bound1 == null
    }
    if(actual==2){
      bound2 == null
    }
  }
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
