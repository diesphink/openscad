include('../libs/align.js')
include('../libs/distribute.js')
include('../libs/split.js')
include('../libs/toolparts.js')


base_escritorio2 = (function() {
"use strict"

  const X = 0; const Y = 1; const Z = 2;

  function base_escritorio2() {

    var dim_con = [203, 181, 10]
    var dim_isopor = [200, 36, 200]
    var parede_interna = 5
    var dim_base = [210, dim_isopor[Y] + dim_con[Z] + parede_interna, 190]
    var dim_tubo = {r: 153/2, parede: 4, comprimento: dim_base[Y]-dim_con[Z]}

    var base = cube({size: dim_base, radius: 2, fn: 16})

    var conector = cube({size: dim_con})
    conector = conector
      .subtract(toolparts.makeChamferer(Y, [10, 300, 10]).align(conector, {center: [0, 1, 0], centerToBegin:[1, 0, 0], centerToEnd:[0, 0, 1]}))
      .subtract(toolparts.makeChamferer(Y, [10, 300, 10]).align(conector, {center: [0, 1, 0], centerToBegin:[0, 0, 0], centerToEnd:[1, 0, 1]}))
      .rotateX(90)
      .align(base, {center:[1,0,0], begin:[0,1,0], end:[0,0,1]})


    var isopor = cube({size: dim_isopor}).align(base, {center: [1,0,0], begin: [0,0,1]}).translate([0, parede_interna + dim_con[Z], 2])

    var tubo_externo = cylinder({r: dim_tubo.r + dim_tubo.parede, h: dim_tubo.comprimento, center: [true, true, true]})
      .rotateX(90)
      .align(conector, {beginToEnd:[0,1,0], center:[1,0,1]})
    var tubo_interno = cylinder({r: dim_tubo.r, h: dim_tubo.comprimento})
      .rotateX(90)
      .align(tubo_externo, {center:[1,1,1]})

    base = base.subtract(conector).subtract(isopor).union(tubo_externo).subtract(tubo_interno)

    return base.align(null, {center:[1,1,0]})

  }

  return base_escritorio2
})()

main = function() {
  align.init()
  split.init()

  return base_escritorio2()
}
