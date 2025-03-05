function colide_BC_BC (bc1,bc2){
  let distance_center = (bc2.center.dif(bc1.center)).size();
  if (abs(distance_center)<=(bc1.r+bc2.r)){
    return true
  }
  return false
}
function colide_BC_AABB (bc1,aabb1){
  let closest_point = closestPoint(bc1.center,[aabb1.maxP,aabb1.minP]);
  let dist = bc1.center.dif(closestPoint);
  if (dist.dot(dist)<=bc1.r*bc1.r){
    return true
  }
  else{
    return false
  }
}
function colide_BC_OBB (bc1,obb1){
  // rotacionar obb para uma abb
  // essa func retorna também os pontos da AABB
  let auxPoints = obb1.draw_OBB_to_AABB()
  let auxAABB = new AABB(auxPoints,[0,0,0])
  let auxBC = bc1;
  let cosa = cos(-obb1.angle)
  let sina = sin(-obb1.angle)
  let dx = auxBC.center.x-obb1.center.x
  let dy = auxBC.center.y-obb1.center.y
  let newX = dx * cosa - dy * sina;
  let newY = dx * sina + dy * cosa;
  let newPoint = new Vec2 (newX,newY)
  auxBC.center = newPoint
  return colide_BC_AABB(auxBC,auxAABB);
}
function collide_AABB_AABB (aabb1,aabb2){
  if (aabb1.maxP.x < aabb2.minP.x||
      aabb1.maxP.y < aabb2.minP.y||
      aabb1.minP.x > aabb2.maxP.x||
      aabb1.minP.y > aabb2.maxP.y){
    return false
  }
  return true
}
function collide_AABB_OBB (aabb1,obb1){
  
}
function collide_OBB_OBB (obb1,obb2){

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
  checkPoint(point){
    if (point.x > this.maxP.x||
        point.y > this.maxP.y||
        point.x < this.minP.x||
        point.y < this.minP.y){
      return false
    }
    return true
  }
  checkColide(bound2){
    if (bound2.type=="AABB"){

    }
    if (bound2.type=="OBB"){

    }
    if (bound2.type=="BC"){

    }
  }
}
// OBB
class OBB {
  constructor(points,iU,uColor){
    this.type = "OBB"
    this.angle = acos(iU.dot(new Vec2(1,0)))
    this.pts = points;
    this.cor = uColor;
    this.pts = points;
    this.u = iU;
    this.v = this.u.rot90();
    let [miU, maU] = minAxis(points,this.u)
    let [miV, maV] = minAxis(points,this.v)
    this.minU = miU;
    this.minV = miV;
    this.maxU = maU;
    this.maxV = maV;
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
    //circle(this.p2.x,this.p2.y,10)
    //circle(this.p3.x,this.p3.y,10)
    quad(this.p1.x,this.p1.y,
        this.p2.x,this.p2.y,
        this.p3.x,this.p3.y,
        this.p4.x,this.p4.y)
  }
  draw_OBB_to_AABB(){
    let cosa = cos(-this.angle)
    let sina = sin(-this.angle)
    let p1A = new Vec2( cosa*(this.p1.x-this.center.x)-sina*(this.p1.y-this.center.y),
                        sina*(this.p1.x-this.center.x)+cosa*(this.p1.y-this.center.y))
    let p2A = new Vec2( cosa*(this.p2.x-this.center.x)-sina*(this.p2.y-this.center.y),
                        sina*(this.p2.x-this.center.x)+cosa*(this.p2.y-this.center.y))
    let p3A = new Vec2( cosa*(this.p3.x-this.center.x)-sina*(this.p3.y-this.center.y),
                        sina*(this.p3.x-this.center.x)+cosa*(this.p3.y-this.center.y))
    let p4A = new Vec2( cosa*(this.p4.x-this.center.x)-sina*(this.p4.y-this.center.y),
                        sina*(this.p4.x-this.center.x)+cosa*(this.p4.y-this.center.y))
    colore(128,32)
    quad( p1A.x,p1A.y,
          p2A.x,p2A.y,
          p3A.x,p3A.y,
          p4A.x,p4A.y)
    return [p1A,p2A,p3A,p4A]
  }
  drawSelfPoints(cor){
    colore(cor[0],cor[1],cor[2],cor[3])
    renderPoints(this.pts)
  }
  checkPoint(point){
    let cosa = cos(-this.angle)
    let sina = sin(-this.angle)
    let p1A = new Vec2( cosa*(this.p1.x-this.center.x)-sina*(this.p1.y-this.center.y),
                        sina*(this.p1.x-this.center.x)+cosa*(this.p1.y-this.center.y))
    let p2A = new Vec2( cosa*(this.p2.x-this.center.x)-sina*(this.p2.y-this.center.y),
                        sina*(this.p2.x-this.center.x)+cosa*(this.p2.y-this.center.y))
    let p3A = new Vec2( cosa*(this.p3.x-this.center.x)-sina*(this.p3.y-this.center.y),
                        sina*(this.p3.x-this.center.x)+cosa*(this.p3.y-this.center.y))
    let p4A = new Vec2( cosa*(this.p4.x-this.center.x)-sina*(this.p4.y-this.center.y),
                        sina*(this.p4.x-this.center.x)+cosa*(this.p4.y-this.center.y))
    let auxAABB = new AABB([p1A,p2A,p3A,p4A],[0,0,0])
    //auxAABB.draw()
    let dx = point.x-this.center.x
    let dy = point.y-this.center.y
    let newX = dx * cosa - dy * sina;
    let newY = dx * sina + dy * cosa;
    let newPoint = new Vec2 (newX,newY)
    //colore (0,0,0)
    //circle(newPoint.x,newPoint.y,5)
    return auxAABB.checkPoint(newPoint)
  }
  checkColide(bound2){
    if (bound2.type=="AABB"){

    }
    if (bound2.type=="OBB"){

    }
    if (bound2.type=="BC"){
      
    }
  }
}
// BC (BOUND CIRCLE)
class BC {
  constructor(points,uColor){
    this.type = "BC"
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
    strokeWeight(2)
    colore(this.cor[0],this.cor[1],this.cor[2],128)
    noFill()
    circle(this.center.x,this.center.y,this.r)
    strokeWeight(1)
  }
  drawSelfPoints(cor){
    colore(cor[0],cor[1],cor[2],128)
    renderPoints(this.pts)
  }
  checkPoint(point){
    let distance_center = (this.center.dif(point)).size()
    if (distance_center<=this.r/2){
      return true
    }
    return false
  }
  checkColide(bound2){
    if (bound2.type=="AABB"){

    }
    if (bound2.type=="OBB"){

    }
    if (bound2.type=="BC"){
      
    }
  }
}