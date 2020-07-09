/*

(c) 2020 diesphink
This code is licensed under MIT license (see LICENSE for details)

Função split

  Recorta o objeto (obj) na posição indicada (at) em um determinado eixo (axis),
  retornando uma matriz de objetos para cada pedaço recortado.

  Os valores possíveis para axis são:
    0 - eixo x
    1 - eixo y
    2 - eixo z

  A posição do recorte pode ser um valor único para o recorte, ou um array com
  os diversos valores. Será recortada cada uma das posições informadas no array.

  Se a posição do recorte (at) não for informado, o objeto será recortado pela
  metade no eixo indicado.

Parâmetros
  obj:    Objeto que será recortado
  axis:   Eixo onde será feito o recorte (0, 1 ou 2, eixos x, y e z
          respectivamente)
  at:     Posição no eixo onde será feito o recorte, pode ser um valor direto
          (e.g. 3.7), uma matriz de valores (e.g. [3.7, 5, 6.8]). Se não for
          informado, usará a metade dos extremos do objeto informado

Retorno
  matriz com cada um dos pedaços do objeto recortado

Exemplo
  // Cria metade de um cilindro, como a projeção de um semi círculo
  // Note que a função retorna dois objetos em um array, sendo descartado
  // o segundo objeto
  obj = split({
    obj: cylinder({r: 3, h: 4}),
    axis: 0
  })[0]

Funções extras
  Funções splitX, slpitY e splitZ, com o mesmo comportamento indicado para
  split, mas com o eixo já indicado no método para simplicidade

*/

split = (function() {
  "use strict"

  function split({obj, axis, at = null}) {

    var ob = obj.getBounds()
    var cube_size = [ob[1].x - ob[0].x, ob[1].y - ob[0].y, ob[1].z - ob[0].z]
    // Não informado, usa metade da dimensão
    if (at == null)
      cube_size[axis] = cube_size[axis]/2
    // Array com valores, usa o último e segue em loop nos outros
    // Está utilizando o último para não precisar ajustar as medidas de corte
    else if (Array.isArray(at)) {
      cube_size[axis] = at.pop()
    // Valor direto
    } else
      cube_size[axis] = at

    var splitter = cube({size: cube_size}).align(obj, {begin: [1, 1, 1]})

    if (Array.isArray(at) && at.length >= 1) {
      return split({obj: obj.intersect(splitter), axis, at}).concat([obj.subtract(splitter)])
    } else
      return [obj.intersect(splitter), obj.subtract(splitter)]

  }

  return split
})()

splitX = (function() {
  function splitX({obj, at = null}) {return split({obj, at, axis: 0})}
  return splitX
})()

splitY = (function() {
  function splitY({obj, at = null}) {return split({obj, at, axis: 1})}
  return splitY
})()

splitZ = (function() {
  function splitZ({obj, at = null}) {return split({obj, at, axis: 2})}
  return splitZ
})()
