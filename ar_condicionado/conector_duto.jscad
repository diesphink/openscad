include('../libs/align.js')
include('../libs/distribute.js')
include('../libs/split.js')
include('../libs/toolparts.js')


conector_duto = (function() {
"use strict"

  const X = 0; const Y = 1; const Z = 2;

  function conector_duto() {

    var dim_tubo = {r: 161/2, h: 60, parede: 4}
    var dim_grid = {qtd: 5, size: 3}
    var dim_base = {x: 20, y: 10, z: 10}
    var dim_auxiliar = {r: 10, z: 10}

    var tubo = cylinder({r: dim_tubo.r, h: dim_tubo.h, center: [true, true, false]})
      .subtract(cylinder({r: dim_tubo.r - dim_tubo.parede, h: dim_tubo.h, center: [true, true, false]}))

    var base = cube({size: [dim_tubo.r * 2 + dim_base.x * 2, dim_tubo.r * 2 + dim_base.y * 2, dim_base.z], center: [1, 1, 0]})
      .subtract(cylinder({r: dim_tubo.r, h: dim_base.z, center: [true, true, false]}))
    base = base
      .subtract(toolparts.makeChamferer(Y, [10, 300, 10]).align(base, {center: [0, 1, 0], centerToBegin:[1, 0, 0], centerToEnd:[0, 0, 1]}))
      .subtract(toolparts.makeChamferer(Y, [10, 300, 10]).align(base, {center: [0, 1, 0], centerToBegin:[0, 0, 0], centerToEnd:[1, 0, 1]}))

    var suporte_auxiliar = cylinder({r1: dim_tubo.r + dim_auxiliar.r, r2: dim_tubo.r, h: dim_auxiliar.z, center: [true, true, false]})
    .subtract(cylinder({r: dim_tubo.r, h: dim_auxiliar.z, center: [true, true, false]}))
    .align(base, {beginToEnd: [0, 0, 1]})

    var grid = cylinder({r: dim_tubo.r, h: dim_grid.size, center: [true, true, false]})
    var holes = toolparts.makeGridPuncher(dim_grid.qtd, dim_grid.size, [dim_tubo.r * 2, dim_tubo.r * 2, dim_grid.size])
      .align(grid, {center:[1, 1, 1]})
      .rotateZ(45)
    grid = grid.subtract(holes)
    tubo = tubo.union(grid).union(base).union(suporte_auxiliar)

    return tubo

  }

  return conector_duto
})()

main = function() {
  align.init()
  split.init()

  return conector_duto()
}
