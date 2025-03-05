function collide_BC_BC (bc1,bc2){
  let distance_center = (bc2.center.dif(bc1.center)).size();
  if (abs(distance_center)<=(bc1.r/2+bc2.r/2)){
    return true
  }
  return false
}
function collide_BC_AABB (bc1,aabb1){
  // visual sat (linhas)
  /*
  strokeWeight(3)
  colore (aabb1.cor[0],aabb1.cor[1],aabb1.cor[1])
  line(aabb1.minP.x,-180,aabb1.maxP.x,-180)
  line(180,aabb1.minP.y,180,aabb1.maxP.y)
  colore (bc1.cor[0],bc1.cor[1],bc1.cor[1])
  line(bc1.center.x-bc1.r,-190,bc1.center.x+bc1.r,-190)
  line(190,bc1.center.y-bc1.r,190,bc1.center.y+bc1.r)
  strokeWeight(1)
  */
  // calcular usando sat
  let close_x = max(aabb1.minP.x,min(bc1.center.x,aabb1.maxP.x))
  let close_y = max(aabb1.minP.y,min(bc1.center.y,aabb1.maxP.y))
  let dP = new Vec2(bc1.center.x-close_x,bc1.center.y-close_y)
  let dist = dP.dot(dP);
  return (dist<=(bc1.r)**2)
  //print("Closest dist: "+dist_to_closest_point)
  //print("Bound r: "+bc1.r)

}
function collide_BC_OBB (bc1,obb1){
  // rotacionar obb para uma abb
  // essa func retorna também os pontos da AABB
  let auxPoints = obb1.turn_OBB_to_AABB()
  let auxAABB = new AABB(auxPoints,[32,32,32])
  let auxBC = new BC(bc1.pts,[32,32,32]);
  let cosa = cos(-obb1.angle)
  let sina = sin(-obb1.angle)
  let dx = auxBC.center.x-obb1.center.x
  let dy = auxBC.center.y-obb1.center.y
  let newX = dx * cosa - dy * sina;
  let newY = dx * sina + dy * cosa;
  let newPoint = new Vec2 (newX,newY)
  auxBC.center = newPoint
  // auxBC.draw()
  //auxAABB.draw()
  return collide_BC_AABB(auxBC,auxAABB);
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
  let pointsAABB = [aabb1.maxP,aabb1.minP,new Vec2(aabb1.maxP.x,aabb1.minP.y),new Vec2(aabb1.minP.x,aabb1.maxP.y)]
  let pointsOBB = [obb1.p1,obb1.p2,obb1.p3,obb1.p4,obb1.center]
  for (let p of pointsAABB){
    if(obb1.checkPoint(p)){
      return true
    }
  }
  for (let q of pointsOBB){
    if (aabb1.checkPoint(q)){
      return true
    }
  }
  return false
}
function collide_OBB_OBB (obb1,obb2){

  let pointsOBB1 = [obb1.p1,obb1.p2,obb1.p3,obb1.p4]
  let pointsOBB2 = [obb2.p1,obb2.p2,obb2.p3,obb2.p4]
  for (let p of pointsOBB2){
    if(obb1.checkPoint(p)){
      return true
    }
  }
  for (let q of pointsOBB1){
    if (obb2.checkPoint(q)){
      return true
    }
  }
  return false
}