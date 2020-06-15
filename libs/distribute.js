/*

(c) 2020 diesphink
This code is licensed under MIT license (see LICENSE for details)

Função distribute

  Distribui de um modo especificado (mode) os objetos (objs) em um determinado
  eixo (axis), retornando os objetos reposicionados.

  Os modos de distribuição são os seguintes:

    DISTRIBUTE_MODE_BEGIN:  Distribui os objetos equidistando seus inícios
    DISTRIBUTE_MODE_CENTER: Distribui os objetos equidistando seus centros
    DISTRIBUTE_MODE_END:    Distribui os objetos equidistando seus fins
    DISTRIBUTE_MODE_GAPS:   Distribui os objetos equidistando os espaços entre
                            eles

  Os valores possíveis para axis são:
    0 - eixo x
    1 - eixo y
    2 - eixo z

  Range indica o espaço dentro do eixo que será utilizado para a distribuição,
  caso não seja informado, serão utilizados os valores máximo e mínimo das
  posições dos objetos.

  Quando a distribuição utilizar o modo DISTRIBUTE_MODE_GAPS, é possível
  adicionar um gap também nos extremos, através do parâmetro outer_gap = true,
  com isso será adicionado o mesmo espaçamento calculado também antes e depois
  dos objetos. Para indicar um espaçamento específico, é possível informar
  diretamente o valor no parâmetro outer_gap.

Parâmetros
  objs:       Array de objetos que serão distribuídos
  axis:       Eixo onde será feita a distribuição (0, 1 ou 2, para eixos x, y e
              z respectivamente)
  mode:       Modo da distribuição (DISTRIBUTE_MODE_BEGIN,
              DISTRIBUTE_MODE_CENTER, DISTRIBUTE_MODE_END e
              DISTRIBUTE_MODE_GAPS)
  outer_gap:  Apenas quando utilizando DISTRIBUTE_MODE_GAPS, por padrão é false,
              se true irá incluir o mesmogap calculado antes e depois dos
              objetos, se numérico irá incluir o gap passado antes e depois
  range:      Indica o espaço que será preenchido pela distribuição, caso não
              seja informado serão utilizados os valroes mínimo e máximo dos
              objetos

Retorno:
  Novo array de objetos com os objetos reposicionados conforme distribuição

Exemplo:
  // Cria 5 objetos em posições e tamanhos aleatórios e distribui eles no eixo X
  var cubes = []
  for (var i = 1; i <= 5; i++) {
    var cubo = cube({size: [0.2 + Math.random() * 2, 0.2 + Math.random() * 2, 0.2 + Math.random() * 2]})
    cubo = cubo.translate([Math.random()*10, 0, 0])
    cubes.push(cubo)
  }
  cubes = distribute({objs: cubes, axis: 0, mode: DISTRIBUTE_MODE_GAPS, range: [0, 10]})

*/

const DISTRIBUTE_MODE_BEGIN = 0
const DISTRIBUTE_MODE_CENTER = 1
const DISTRIBUTE_MODE_END = 2
const DISTRIBUTE_MODE_GAPS = 3

distribute = (function() {
  "use strict"

  const BEGIN = 0;
  const CENTER = 1;
  const END = 2;
  const SIZE = 3;

  function distribute({objs, axis, mode = DISTRIBUTE_MODE_GAPS, outer_gap = false, range = null}) {

    var ret = []

    var property = axis == 0 ? 'x' : (axis == 1 ? 'y' : 'z')

    // Ordena os objetos no array com base na ordem no eixo indicado
    objs = objs.sort( (o1, o2) =>  o1.getBounds()[0][property] - o2.getBounds()[0][property])

    // Coleta cada uma das métricas relevantes
    var metrics = objs.map(o => {
      var bounds = o.getBounds()
      var ret = []
      ret[BEGIN] = bounds[0][property]
      ret[CENTER] = (bounds[1][property] + bounds[0][property])/2
      ret[END] = bounds[1][property]
      ret[SIZE] = bounds[1][property] - bounds[0][property]
      return ret
    })

    var ranges
    if (range == null) {

       ranges = metrics.reduce(function (range, m) {
        for (var loopmodes = BEGIN; loopmodes <= SIZE; loopmodes++) {
          if (range[0][loopmodes] == null || m[loopmodes] < range[0][loopmodes])
            range[0][loopmodes] = m[loopmodes]
          if (range[1][loopmodes] == null || m[loopmodes] > range[1][loopmodes])
            range[1][loopmodes] = m[loopmodes]
        }
        return range
      }, [[], []])

    } else {
      ranges = [[], []]
      for (var loopmodes = BEGIN; loopmodes <= SIZE; loopmodes++) {
        ranges[0][loopmodes] = range[0]
        ranges[1][loopmodes] = range[1]
      }
    }

    if (mode == DISTRIBUTE_MODE_GAPS) {
      // Move os objetos considerando apenas o espaço entre eles
      var total_range = ranges[1][END] - ranges[0][BEGIN]
      var total_size = metrics.reduce((total_size, m) => total_size += m[SIZE], 0)

      var space_between
      if (typeof outer_gap == 'number') {
        space_between = (total_range - total_size - 2 * outer_gap)/(objs.length - 1)
      } else if (outer_gap)
        space_between = (total_range - total_size)/(objs.length + 1)
      else
        space_between = (total_range - total_size)/(objs.length - 1)

      var acc = ranges[0][BEGIN];
      if (typeof outer_gap == 'number')
        acc += outer_gap;
      else if (outer_gap)
        acc += space_between;
      for (var i = 0; i < objs.length; i++) {
        var translation = [0, 0, 0]
        translation[axis] = acc - metrics[i][BEGIN]
        acc += metrics[i][SIZE] += space_between
        ret[i] = objs[i].translate(translation)
      }
    } else {
      // Move os objetos para o método simples (begin, center, end)
      var space_between = (ranges[1][mode] - ranges[0][mode])/(objs.length-1)
      for (var i = 0; i < objs.length; i++) {
        var translation = [0, 0, 0]
        translation[axis] = ranges[0][mode] + (i * space_between) - metrics[i][mode]
        ret[i] = objs[i].translate(translation)
      }
    }

    return ret
  }

  return distribute
})()


distributeX = (function() {
  function distributeX({objs, mode, outer_gap, range}) {return distribute({objs, mode, outer_gap, range, axis: 0})}
  return distributeX
})()

distributeY = (function() {
  function distributeY({objs, mode, outer_gap, range}) {return distribute({objs, mode, outer_gap, range, axis: 1})}
  return distributeY
})()

distributeZ = (function() {
  function distributeZ({objs, mode, outer_gap, range}) {return distribute({objs, mode, outer_gap, range, axis: 2})}
  return distributeZ
})()
