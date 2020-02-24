include('common.js')
include('align.js')
include('wago222.jscad')
include('m3.jscad')
include('conector110v.jscad')
include('caixa.js')

c1 = (function() {
  "use strict"

  const x = 0
  const y = 1
  const z = 2

  function halfwago() {
    var wago = wago222()
    var b = wago.getBounds()

    var half = align({
      obj: cube({size: [50, 50, 50]}),
      ref: wago,
      begin: [0, 1, 1],
      beginToCenter: [1, 0, 0]
    })

    return wago.intersect(half)

  }

  function c1() {

    var dim = common.dim

    dim.tomada = {
      superior: [23.4, 43.5, 19],
      inferior: [19.2, 35.4, 23],
      folga: 0,
      fios: 10
    }
    dim.tomada.total = [dim.tomada.superior[0], dim.tomada.superior[1], dim.tomada.superior[2] + dim.tomada.inferior[2]]
    dim.caixa = [100, 60, 50]
    dim.elevado_tomada = [30, dim.caixa[y], dim.caixa[z] - dim.tomada.superior[z]]
    dim.walls = [2, 2, 4]
    dim.posicao_c110v = [-5, 0, 10]

    var base = caixa({
      size: dim.caixa,
      walls: dim.walls,
      center: [1, 1, 0],
      radius: [1, 1, 0],
      suporte: [1, 0, 0]
    })

    var c1 = base.caixa

    var elevado_tomada = align({
      obj: cube({size: dim.elevado_tomada}),
      ref: c1,
      center: [0, 1, 0],
      end: [1, 0, 0],
      begin: [0, 0, 1],
      gaps: [dim.walls[x], 0, dim.walls[z]]})

    var tomada = cube({
      size: [dim.tomada.inferior[x] + dim.tomada.folga, dim.tomada.inferior[y] + dim.tomada.folga, dim.caixa[z]],
      radius: [1, 1, 1]
    })
    tomada = align({
      obj: tomada,
      ref: elevado_tomada,
      center: [1, 1, 0],
      begin: [0, 0, 1]
    })

    var tomada_fios = cube({
      size: [dim.elevado_tomada[x]/2, dim.tomada.fios, dim.elevado_tomada[z]]
    })
    tomada_fios = align({
      obj: tomada_fios,
      ref: elevado_tomada,
      center: [0, 1, 0],
      begin: [1, 0, 1]
    })

    var wago = halfwago().rotateZ(90)
    wago = align({
      obj: wago,
      ref: c1,
      center: [0, 1, 0],
      begin:[1, 0, 0],
      gaps: [dim.walls[x], 0, dim.walls[z]]
    })

    var m3s = m3()
    var m3_buraco = align({
      obj: m3s.buraco,
      ref: c1,
      center: [1, 1, 0],
      gaps: [0, 0, dim.walls[z]]
    })
    var m3_suporte = align({
      obj: m3s.suporte,
      ref: c1,
      center: [1, 1, 0],
      gaps: [0, 0, dim.walls[z]]
    })

    var c110v = align({
      obj: conector110v(),
      ref: c1,
      center: [1, 0, 0],
      begin: [0, 1, 1],
      gaps: [0, 0, dim.walls[z]]
    })

    var saidas = align({
      obj: conector110v(),
      ref: c1,
      center: [1, 0, 0],
      end: [0, 1, 0],
      begin: [0, 0, 1],
      gaps: [0, 0, dim.walls[z]]
    })

    return c1
      .union(elevado_tomada)
      .union(wago)
      .union(m3_suporte)
      .union(base.suporteX)
      .subtract(tomada)
      .subtract(tomada_fios)
      .subtract(m3_buraco)
      .subtract(c110v)
      .subtract(saidas)

  }

  return c1
})()

main = function() {
  return c1()
}
