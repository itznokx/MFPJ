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
function setup(){
  createCanvas(400,400)
}
function draw(){
  goCartesian()
  goPseudo()
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
function goPseudo(){
  //upper line
  colore (64)
  line(-width/4,height/4,width/4,height/4)
  //r-sided line
  line(width/4,height/4,width/4,-height/4)
  //down line
  line(-width/4,-height/4,width/4,-height/4)
  //l-sided line
  line(-width/4,height/4,-width/4,-height/4)
  colore(0)
  texto("(-1,+1)",(-width/4)-45,(height/4))
  texto("(+1,+1)",(width/4)+10,(height/4))
  texto("(-1,-1)",(-width/4)-45,(-height/4))
  texto("(+1,-1)",(width/4)+10,(-height/4))
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
