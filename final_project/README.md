# Projeto final de Matemática e Física para Jogos
> Dimitri Barreto Medeiros - 509066
> MFPJ - 2024.2
## Descrição
Simulador de colisões entre Bounding Volumes (AABB,OBB,Circle) desenvolvido em `p5.js`
### Funções
- [x] Colisão entre AABB x AABB
- [x] Colisão entre AABB x OBB
- [x] Colisão entre AABB x Circle
- [x] Colisão entre OBB x Circle
- [x] Colisão entre OBB x OBB
- [x] Circle x Circle
- [x] Alternar entre cursores de bounding-volume
- [x] Mudar iterativamente o bounding-volume (AABB,OBB,Circle)
- [x] Reformular "nuvem" de pontos do bounding-volume correspondendo ao cursor atual
- [ ] Mudar iterativamente o numéro de pontos gerados aleatoriamente
## Como iniciar
- Para iniciar o programa, basta abrir o arquivo `index.html` com qualquer navegador (`recomendado o uso do navegador firefox`)
- Por padrão, as bounding boxes irão ser geradas a partir de 2 pontos aleatórios gerados automaticamente. Isso pode ser alterado no arquivo [sketch.js](https://github.com/itznokx/MFPJ/blob/master/final_project/sketch.js), na linha 4.
- O arquivo [index.html](https://github.com/itznokx/MFPJ/blob/master/final_project/index.html) pode ser alterado para melhor dinâmica na visualização do programa.

## Comandos

- Pressione `1` ou `2` para alterar o "cursor" de bounding1 para bounding2 ou vice-versa.
- Pressione `A` para gerar ou alterar o bounding-volume atual (citado no item anterior) para uma AABB.
- Pressione `O` para gerar ou alterar o bounding-volume atual  para uma OBB.
- Pressione `C` para gerar ou alterar o bounding-volume atual  para um Bounding Circle.
- Pressione `R` para re-calcular os pontos (DEFINIDOS NO ARQUIVO [sketch.js](https://github.com/itznokx/MFPJ/blob/master/final_project/sketch.js), LINHA 4) do volume referente ao cursor atual. Cuidado, essa função irá gerar novos pontos e, eventualmente, um novo bounding-volume referente irá ser calculado no lugar.

