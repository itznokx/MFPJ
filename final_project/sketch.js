/// guardam a posição do mouse no plano cartesiano
var mouseXC, mouseYC = 0;
var points = [];
var rP = 2;
function randomPoints(maxP){
  let pts = []
  for (let i = 0;i<maxP;i++){
    pts.push(randomPoint())
  }
  
  return pts
}
function setup(){
  frameRate(120)
  createCanvas(400,400)
  points1 = randomPoints(rP)
  points2 = randomPoints(rP)
  
}
var bound1 = null;
var bound2 = null;
var boundAux = null;
var actual = 1;
var colorB1 = [64,64,255]
var colorB2 = [255,64,64]
var pointsB1 = [0,0,255]
var pointsB2 = [255,0,0]
function draw(){
  goCartesian()
  let mouseInB1 = 0
  let mouseInB2 = 0
  let mousePoint = new Vec2 (0,0)
  mousePoint.x = mouseXC
  mousePoint.y = mouseYC
  //print("MouseX: "+mouseXC+"\nMouseY: "+mouseYC)
  if (bound1!=null){
    bound1.draw()
    bound1.drawSelfPoints(pointsB1)
    if (bound1.checkPoint(mousePoint)==true){
      print("Mouse in b1")
      mouseInB1 = 1
    }
    if (bound1.type=="OBB"){
      //bound1.draw_OBB_to_AABB();
    }
  }
  if (bound2!=null){
    bound2.draw()
    bound2.drawSelfPoints(pointsB2)
    if (bound2.checkPoint(mousePoint)==true){
      print("Mouse in b2")
      mouseInB2 = 1
    }
    if (bound2.type=="OBB"){
      //bound2.draw_OBB_to_AABB();
    }
    if(bound1!=null){
      if(bound2.checkCollide(bound1)){
        texto("Eles colidem",-100,100)
      }
    }
  }
  colore(255*mouseInB2,32,255*mouseInB1);
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
      let o = random(PI)
      let u = new Vec2 (cos(o),sin(o))
      print(o)
      bound1 = new OBB(points1,u,colorB1)
    }
    if (actual==2){
      bound2 = null;
      let o = random(PI)
      let u = new Vec2 (cos(o),sin(o))
      print(o)
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
        let o = random(PI)
        let u = new Vec2 (cos(o),sin(o))
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
        let o = random(PI)
        let u = new Vec2 (cos(o),sin(o))
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
      print("kill1")
      bound1 == null
    }
    if(actual==2){
      print("kill2")
      bound2 == null
    }
  }
}