include('common.js')
include('caixa.js')
include('conector_branco.js')
include('../libs/align.js')
include('wago-3er-solo.js')
// include('m3.js')
// include('conector110v.js')
// include('relay.js')

c2 = (function() {
  "use strict"

  const x = 0
  const y = 1
  const z = 2

  function c2() {

    var dim = common.dim

    dim.fonte = [97.5, 160, 38]
    dim.caixa = [150, 70, 50]
    dim.walls = [2, 2, 6]
    dim.c12v5v = [22.3, 17, 6]
    dim.base_fonte = [dim.fonte[x] + 2 * dim.walls[x], 90, dim.walls[z] + 15]
    dim.offset_suportes = [-30, 0, 0]

    var c2 = caixa({
      size: dim.caixa,
      walls: dim.walls,
      center: [1, 1, 0],
      radius: [1, 1, 0],
      suporte: [1, 0, 0],
    }).setColor([0.8, 0.8, 0.9])

    var base_fonte = cube({size: dim.base_fonte, radius: [1, 1, 1]}).align(c2, {
      begin: [0, 1, 1],
      end: [1, 0, 0]
    })

    var fonte = cube({size: dim.fonte}).align(c2, {
      begin: [0, 1, 1],
      end: [1, 0, 0],
      gaps: [dim.walls[x], dim.walls[y] + 5, dim.walls[z]]
    })

    var cb1 = conector_branco().rotateZ(180).align(c2, {
      begin: [1, 1, 1],
      gaps: [dim.walls[x], dim.walls[y], 0]
    })

    var cb2 = conector_branco().rotateZ(90).align(c2, {
      begin: [1, 0, 1],
      end: [0, 1, 0],
      gaps: [dim.walls[x], dim.walls[y], 0]
    })

    var wago1 = wago3er().rotateZ(180).align(c2, {
      end: [0, 1, 0],
      begin:[0, 0, 1],
      gaps: [0, dim.walls[y], dim.walls[z] - 4]
    }).align(base_fonte, {endToBegin: [1, 0, 0]})

    var wago2 = wago1.align(wago1, {endToBegin: [0, 1, 0]})

    var c12v5v = caixa({
      size: [dim.c12v5v[x] + 4, dim.c12v5v[y] + 4, dim.c12v5v[z]],
      walls: [2, 2, 0],
      center: [1, 1, 0]
    }).align(wago2, {
      end: [1, 0, 0],
      endToBegin: [0, 1, 0],
      gaps: [0, 0, dim.walls[z]]
    })

    var trilho = cube({size: [dim.caixa[x], 40, 4]}).align(c2, {
      center: [1, 1, 0],
      begin: [0, 0, 1]
    })

    c2.properties.tampa = c2.properties.tampa.union(c2.properties.tampa.properties.suporteY.translate(dim.offset_suportes))

    var zoomOn = cube({size: [30, 30, 10]}).align(c12v5v, {center: [1, 1, 1]})

    return c2
        .union(base_fonte)
        .union(c2.properties.suporteY.translate(dim.offset_suportes))
        .union(cb1)
        .union(cb2)
        .union(wago1)
        .union(wago2)
        .union(c12v5v)
        // .union(c2.properties.tampa)
        .subtract(fonte)
        .subtract(cb1.properties.buraco)
        .subtract(cb2.properties.buraco)
        .subtract(trilho)
        // .intersect(zoomOn)


  }

  return c2
})()

main = function() {
  align.init()
  c = c2()
  return c//.union(c.properties.tampaY)
}
