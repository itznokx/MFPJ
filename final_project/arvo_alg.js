function arvo (aabb,c){
  let d2 = 0;
  // check x
  if ( c.x < aabb.min.x){
    d2 += (min.x-c.x)*(min.x-c.x)
  }
  else{
    if (c.x > aabb.max.x)
      d2 += (c.x - aabb.max.y)*(c.x - aabb.max.y)
  }
  //check y
  //check z
  let c2 = c.r*c.r;
  return (d2<=c2)
}
