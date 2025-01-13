/// guardam a posição do mouse no plano cartesiano
var mouseXC, mouseYC = 0

function setup(){
  createCanvas(400,400)  
}

function draw(){
  // desenha o fundo e configura o sistema cartesiano, simplificando o
  // processo de desenho das formas na tela
  goCartesian()  
  
  // desenha vários vetores usando tons de cinza e opacidade a 50%
  // veja a documentação da função colore(), que é bastante útil.
  colore(196, 128) 
  var R = 128
  for( ang=0; ang<2*PI; ang += PI/36)
    seta(0,0, R*cos(ang), R*sin(ang))
  
  // renderiza uma mensagem usando a função customizada texto().
  // isso evita que o texto seja afetado pelas transformações.
  colore(64,0,0,128)
  texto("o cursor está aqui", mouseXC, mouseYC)
  
  // por fim, utiliza as varáveis mouseXC e mouseYC para desenhar o texto
  colore(128,32,32)
  seta(0,0, mouseXC, mouseYC)
}

/* Desenha o plano de fundo da cena. Sobrescreva de acordo com suas necessidades.
 * Além disso, desenha um plano cartesiano centrado na origem, i.e., os 2 eixos.
 * 
 * NOTA: A partir dessa chamada, toda a cena é desenhada de acordo com o sistema
 *       cartesiano, i.e., a origem está no centro da tela, o eixo Y cresce para
 *       cima e o eixo X para a direita. Isso foi projetado para simplificar os
 *       trabalhos.
 */
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

/// Atualiza as variáveis globais com as coordenadas do mouse no plano cartesiano
function grabMouse()
{
  mouseXC = mouseX - width/2
  mouseYC = height/2 - mouseY
}

/** Renderiza texto corretamente no plano cartesiano
 *  @param str Texto a ser escrito
 *  @param x Posição horizontal do canto inferior esquerdo texto
 *  @param y Posição vertical do canto inferior esquerdo texto
 */
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


/* Define as cores de preenchimento e de contorno com o mesmo valor.
 * Há várias opções de trabalho em RGB nesse caso:
 *  - caso c1,c2,c3 e c4 sejam passados, o efeito padrão é uma cor RGBA
 *  - caso c1,c2 e c3 sejam passados, tem-se uma cor RGB.
 *  - caso c1 e c2 sejam passados, c1 é um tom de cinza e c2 é opacidade.
 *  - caso apenas c1 seja passado, c1 é um tom de cinza.
 */
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

/* Desenha um segmento de reta com seta do ponto (x1,y1) para (x2,y2)
 */
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
