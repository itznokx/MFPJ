function collide_BC_BC (bc1,bc2){
  let distance_center = (bc2.center.dif(bc1.center)).size();
  if (abs(distance_center)<=(bc1.r+bc2.r)){
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
  // transforma o circulo para as coordenadas locais da OBB1
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
function getProjectionRange(vertices, axis) {
    let min = vertices[0].dot(axis)
    let max = min;
    for (let i = 1; i < arrayLenght(vertices); i++) {
        let projection = axis.dot(vertices[i]);
        if (projection < min) 
          min = projection;
        if (projection > max) 
          max = projection;
    }
    return { min, max };
}
function overlap (min1,max1,min2,max2){
  return ((max1>=min2)&&(max2>=min1))
}
function collide_AABB_OBB (aabb1,obb1){
  let pointsAABB = [aabb1.maxP,
                    aabb1.minP,
                    new Vec2(aabb1.maxP.x,aabb1.minP.y),
                    new Vec2(aabb1.minP.x,aabb1.maxP.y)]
  let pointsOBB = [ obb1.p1,
                    obb1.p2,
                    obb1.p3,
                    obb1.p4,]
  let allAxis = [ new Vec2(1,0),
                  new Vec2(0,1),
                  obb1.u,
                  obb1.v]
  // fazendo projeções em todas as dimensões da AABB e OBB
  for (let axis of allAxis){
    let projAABB = getProjectionRange(pointsAABB, axis);
    let projOBB = getProjectionRange(pointsOBB, axis);
    if (!overlap(projAABB.min,projAABB.max,projOBB.min,projOBB.max)){
      return false
    }
  }
  return true
}
function collide_OBB_OBB (obb1,obb2){
  // pegar os pontos
  let pointsOBB1 = [obb1.p1,obb1.p2,obb1.p3,obb1.p4]
  let pointsOBB2 = [obb2.p1,obb2.p2,obb2.p3,obb2.p4]
  let p1A = obb2.p1.rot(-obb1.angle)
  let p2A = obb2.p2.rot(-obb1.angle)
  let p3A = obb2.p3.rot(-obb1.angle)
  let p4A = obb2.p4.rot(-obb1.angle)
  // "criando" AABB em coordenadas locais (sistema local de OBB1)
  let auxAABB = new AABB(obb1.turn_OBB_to_AABB(),obb1.cor)
  colore(26)
  // "transformando" a OBB para o sistema local de obb1
  let uAux = new Vec2 (cos(-obb1.angle+obb2.angle),sin(-obb1.angle+obb2.angle))
  let auxOBB = new OBB ([p1A,p2A,p3A,p4A],uAux,obb2.cor)
  return collide_AABB_OBB(auxAABB,auxOBB);
}