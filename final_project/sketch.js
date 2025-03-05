/// guardam a posição do mouse no plano cartesiano
var mouseXC, mouseYC = 0;
var points = [];
var numberOfRandomPoints = 2;
function randomPoints(maxP){
  let pts = []
  for (let i = 0;i<maxP;i++){
    pts.push(randomPoint())
  }
  
  return pts
}
function setup(){
  frameRate(10)
  createCanvas(400,400)
  points1 = randomPoints(numberOfRandomPoints)
  points2 = randomPoints(numberOfRandomPoints)
  
}
var bound1 = null;
var bound2 = null;
var boundAux = null;
var actual = 1;
var colorB1 = [64,64,255]
var colorB2 = [255,64,64]
var pointsB1 = [0,0,255]
var pointsB2 = [255,0,0]
var b1b2collision;
function draw(){
  goCartesian()
  b1b2collision = false
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
    if(bound2!=null){
      if(bound2.checkCollide(bound1)){
        b1b2collision = true
      }else{
        b1b2collision = false
      }
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
        b1b2collision = true
      }else{
        b1b2collision = false
      }
    }
  }
  colore(0)
  texto("Colisao entre b1 b2: ",-180,180)
  texto("Mouse em b1: ",-180,160)
  texto("Mouse em b2: ",-180,140)
  colore(0)
  colore(0,128*b1b2collision,0);
  texto((b1b2collision==true),-60,180)
  colore(0)
  colore(0,128*mouseInB1,0);
  texto((mouseInB1==true),-90,160)
  colore(0)
  colore(0,128*mouseInB2,0);
  texto((mouseInB2==true),-90,140)
  colore(128*mouseInB2,0,128*mouseInB1)
  circle(mouseXC,mouseYC,4)
  colore(0,0,0)
  texto("Bounding Cursor: ",-180,-180)
  if (actual==1){
    colore(0,0,255)
  }
  if (actual==2){
    colore(255,0,0)
  }
  texto(actual,-70,-180)
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
      //print(o)
      bound1 = new OBB(points1,u,colorB1)
    }
    if (actual==2){
      bound2 = null;
      let o = random(PI)
      let u = new Vec2 (cos(o),sin(o))
      //print(o)
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

    if (actual==1 && bound1!=null){
      points1 = randomPoints(numberOfRandomPoints)
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
    if (actual==2&&bound2!=null){
      points2 = randomPoints(numberOfRandomPoints)
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