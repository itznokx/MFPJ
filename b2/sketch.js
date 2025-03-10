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
  if (cond1 <= 0 && cond2 <=0){
    return true
  }
  return false
 
}
function pointOfIntersection(A,B,C,D){
  let dr = D.dif(C);
  let nm = (B.dif(A)).rot90()
  let q = B
  let t = linePlaneIntersection(C,D,q,nm)
  if (t>1 || t<0){
    return null
  }
  let pF = C.add(dr.mult(t))
  return pF;
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
function renderSeta(array){
  let array_size = arrayLenght(array)
  for (let i=0;i<array_size;i++){
    colore(0,0,0)
    seta(array[i][0].x,array[i][0].y,array[i][1].x,array[i][1].y)
  }
}
function calculateIntersections(array){
  let finalInter = []
  let array_size = arrayLenght(array)
  for (let i=0;i<array_size;i--){
    let A = array[i][0]
    let B = array[i][1]
    for (let j=0;j<array_size;j++){
      if(j!=i){
        let C = array[j][0]
        let D = array[j][1]
        if (intersect(A,B,C,D)){
          let li = array[i]
          let n = (B.dif(A)).rot90()
          let t = linePlaneIntersection(C,D,A,n)
          let dr = D.dif(C)
          let pt = C.add(dr.mult(t))
          finalInter.push(new Vec2(pt.x,pt.y))
        }
      }
    }
  }
  return finalInter
}
function calculateIntersections2(array1,array2){
  let finalInter = []
  let array1_size = arrayLenght(array1)
  let array2_size = arrayLenght(array2)
  for (let i=0;i<array1_size;i++){
    let A = array1[i][0]
    let B = array1[i][1]
    for (let j=0;j<array2_size;j++){
      let C = array2[j][0]
      let D = array2[j][1]
      if (intersect(A,B,C,D)){
        let li = array1[i]
        let n = (B.dif(A)).rot90()
        let t = linePlaneIntersection(C,D,A,n)
        let dr = D.dif(C)
        let pt = C.add(dr.mult(t))
        finalInter.push(new Vec2(pt.x,pt.y))
      }
    }
  }
  return finalInter
}
// calcular angulos por produto escalar
// ambos vetores DEVEM estar normalizados
// |u|.|v|.cos(B)
function calculateAnglesE(v1,v2){
  return abs(acos(v1.dot(v2)))
}
// calcular angulos por produto vetorial
// ambos vetores DEVEM estar normalizados
// |u|.|v|.sen(B)
function calculateAnglesV(v1,v2){
  return abs(asin(v1.cross(v2)))
}
function calculateQuadrant(ponto){
  let x = ponto.x
  let y = ponto.y
  //1,2
  if (x >=0 && y >=0){
    if (x>y){
      return 1
    }
    if (x<y){
      return 2
    }
  }
 // 3,4
 if (x < 0 && y >=0){
  if (-x>y){
      return 4
    }
    if (-x<y){
      return 3
    }
 }
 // 5,6
 if (x < 0 && y < 0){
  if (x>y){
      return 6
    }
    if (x<y){
      return 5
    }
 }
 // 7,8
 if (x >= 0 && y < 0){
    if (x>-y){
      return 8
    }
    if (x<-y){
      return 7
    }
 }
}
var lines = []
var boxLines = []
var intersections = []
function setup(){
  boxLines.push([new Vec2(-width/1,height/1),new Vec2(width/1,height/1)])
  boxLines.push([new Vec2(width/1,height/1),new Vec2(width/1,-height/1)])
  boxLines.push([new Vec2(-width/1,-height/1),new Vec2(width/1,-height/1)])
  boxLines.push([new Vec2(-width/1,height/1),new Vec2(-width/1,-height/1)])
  createCanvas(400,400)
}
function draw(){
  goCartesian()
  intersections = calculateIntersections2(boxLines,lines)
  renderLines(boxLines)
  renderSeta(lines)
  renderPoints(intersections)
  colore(0)
  if (arrayLenght(lines)<2){
    seta(0,0,mouseXC,mouseYC)
  }
  if (arrayLenght(lines)==2){
    let AB = lines[0][1].dif(lines[0][0]).normalize()
    let CD = lines[1][1].dif(lines[1][0]).normalize()
    //print("["+AB.x+","+AB.y+"]")
    //print("["+CD.x+","+CD.y+"]")
    print(calculateQuadrant(AB))
    print(calculateQuadrant(CD))
    print("Angulo E: "+calculateAnglesE(AB,CD))
    print("Angulo V: "+calculateAnglesV(AB,CD))
    
  }
  texto("(-1,+1)",(-width/4)-45,(height/4))
  texto("(+1,+1)",(width/4)+10,(height/4))
  texto("(-1,-1)",(-width/4)-45,(-height/4))
  texto("(+1,-1)",(width/4)+10,(-height/4))
}
function mouseClicked(){
  if (arrayLenght(lines)<2){
    lines.push([new Vec2(0,0),new Vec2(mouseXC,mouseYC)])
  }
}
function keyPressed(){
  if (key=='d'){
    if (arrayLenght(lines)>0){
      lines.pop()
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
function grCDMouse()
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
