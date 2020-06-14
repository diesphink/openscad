include('common.js')
include('caixa.js')
include('conector_branco.js')
include('align.js')
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

    var base_fonte = align({
      obj: cube({size: dim.base_fonte, radius: [1, 1, 1]}),
      ref: c2,
      begin: [0, 1, 1],
      end: [1, 0, 0]
    })

    var fonte = align({
      obj: cube({size: dim.fonte}),
      ref: c2,
      begin: [0, 1, 1],
      end: [1, 0, 0],
      gaps: [dim.walls[x], dim.walls[y] + 5, dim.walls[z]]
    })

    var cb1 = align({
      obj: conector_branco().rotateZ(180),
      ref: c2,
      begin: [1, 1, 1],
      gaps: [dim.walls[x], dim.walls[y], 0]
    })

    var cb2 = align({
      obj: conector_branco().rotateZ(90),
      ref: c2,
      begin: [1, 0, 1],
      end: [0, 1, 0],
      gaps: [dim.walls[x], dim.walls[y], 0]
    })

    var wago1 = align({
      obj: wago3er().rotateZ(180),
      ref: c2,
      end: [0, 1, 0],
      begin:[0, 0, 1],
      gaps: [0, dim.walls[y], dim.walls[z] - 4]
    })
    wago1 = align({
      obj: wago1,
      ref: base_fonte,
      endToBegin: [1, 0, 0]
    })

    var wago2 = align({
      obj: wago1,
      ref: wago1,
      endToBegin: [0, 1, 0]})

    var c12v5v = align({
      obj: caixa({
        size: [dim.c12v5v[x] + 4, dim.c12v5v[y] + 4, dim.c12v5v[z]],
        walls: [2, 2, 0],
        center: [1, 1, 0]
      }),
      ref: wago2,
      end: [1, 0, 0],
      endToBegin: [0, 1, 0],
      gaps: [0, 0, dim.walls[z]]
    })

    var trilho = align({
      obj: cube({size: [dim.caixa[x], 40, 4]}),
      ref: c2,
      center: [1, 1, 0],
      begin: [0, 0, 1]
    })

    c2.properties.tampa = c2.properties.tampa.union(c2.properties.tampa.properties.suporteY.translate(dim.offset_suportes))

    var zoomOn = align({
      obj: cube({size: [30, 30, 10]}),
      ref: c12v5v,
      center: [1, 1, 1]
    })

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
  c = c2()
  return c//.union(c.properties.tampaY)
}
