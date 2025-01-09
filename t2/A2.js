class Vec{
  constructor (_x,_y,_z){
    this.x = _x;
    this.y = _y;
    // 0 se for um vetor 2D
    this.z = _z;
  }
  // Soma
  sum (v2){
    return new Vec(this.x+v2.x,this.y+v2.y,this.z+v2.z);
  }
  // Subtração
  // Cuidado ao usar essa operação
  dif (v2){
    return new Vec(this.x-v2.x,this.y-v2.y,this.z-v2.z);
  }
  inverse (){
    this.x = this.x*(-1);
    this.y = this.y*(-1);
    this.z = this.z*(-1);
  }
  mult (k){
    return new Vec(this.x*k,this.y*k,this.z*k);
  }
  // Produto Escalar (dot product)
  dot (v2){
    return this.x*v2.x+this.y*v2.y+this.z*v2.z;
  }
  // Produto Vetorial (cross product)
  cross (v2){
    let x3 = this.y*v2.z - this.z*v2.y
    let y3 = this.x*v2.z - this.z*v2.x
    let z3 = this.x*v2.y - this.y*v2.x
    return new Vec(x3,y3,z3);
  }
  // Projeção
  projection (v2){
    let self = new Vec(this.x,this.y,this.z);
    let num = self.dot(v2);
    let den = v2.dot(v2);
    return v2.mult(num/den);
  }
}



function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
