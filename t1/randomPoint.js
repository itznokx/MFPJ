function setup() {
  createCanvas(400, 400);
  background(240);
  // 2-Dimensional Grade
  for (let x = 0;x<height;x+=20){
    line(x,0,x,width)
  }
  for (let y = 0;y<width;y+=20){
    line(0,y,width,y)
  }
  stroke(255,0,0)
  // Make X line and Y line in center
  line(0,height/2,width,height/2)
  line(width/2,0,width/2,height)
  // n random points in the grade
  let n = 10;
  for (let i=0;i<n;i+=1){
    strokeWeight(5)
    stroke(0,255,0)
    let x = random(0,width)
    let y = random(0,height)
    point(x,y)
  }
}

function draw() {

  
}