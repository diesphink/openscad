include('common.js')
include('align.js')
include('wago-3er-solo.jscad')
include('m3.jscad')
include('conector110v.jscad')
include('caixa.js')
include('conector_branco.js')
include('relay.jscad')

c1 = (function() {
  "use strict"

  const x = 0
  const y = 1
  const z = 2

  function c1() {

    var dim = common.dim

    dim.caixa = [130, 70, 30]
    dim.walls = [2, 2, 5]

    dim.tomada = {
      superior: [43.5, 19, 24],
      inferior: [35.4, 23, 21],
      buraco: [37, dim.walls[y], 24],
      folga: 0,
      fios: 10
    }

    dim.elevado_tomada = [
      dim.tomada.superior[x] + 5,
      dim.tomada.superior[y] + dim.tomada.inferior[y],
      dim.caixa[z]]
    dim.c110v_offset = [2, 0, 0]

    var base = caixa({
      size: dim.caixa,
      walls: dim.walls,
      center: [1, 1, 0],
      radius: [1, 1, 0],
      suporte: [1, 0, 0]
    })

    var c1 = base.caixa.setColor([0.8, 0.8, 0.9])

    var elevado_tomada = align({
      obj: cube({size: dim.elevado_tomada}),
      ref: c1,
      center: [0, 1, 0],
      end: [1, 1, 0],
      begin: [0, 0, 1],
      gaps: [dim.walls[x], dim.walls[y], 0]})

    var tomada_superior = align({
      obj: cube({size: dim.tomada.superior}),
      ref: elevado_tomada,
      center: [1, 0, 0],
      end: [0, 1, 1]
    })

    var tomada_inferior = align({
      obj: cube({size: dim.tomada.inferior}),
      ref: elevado_tomada,
      center: [1, 0, 0],
      end: [0, 0, 1],
      begin: [0, y, 1]
    })

    var tomada_buraco = align({
      obj: cube({size: dim.tomada.buraco}),
      ref: elevado_tomada,
      center: [1, 0, 0],
      end: [0, 1, 1],
      gaps: [0, -dim.walls[y], 0]
    })

    var m3s = m3()

    var m3_suporte = align({
      obj: m3s.suporte,
      ref: c1,
      center: [1, 1, 0],
      gaps: [0, 0, dim.walls[z]]
    })
    m3_suporte = align({obj: m3_suporte, ref: elevado_tomada, endToBegin: [1, 0, 0], gaps: [2, 0, 0]})

    var m3_buraco = align({
      obj: m3s.buraco,
      ref: m3_suporte,
      center: [1, 1, 0],
      gaps: [0, 0, dim.walls[z]]
    })

    var wago1 = align({
      obj: wago3er().rotateZ(90),
      ref: c1,
      center: [1, 0, 0],
      begin:[0, 1, 1],
      gaps: [0, 0, dim.walls[z] - 4]
    })
    wago1 = align({obj: wago1, ref: m3_suporte, endToBegin: [1, 0, 0], gaps: [2, 0, 0]})

    var wago2 = align({
      obj: wago3er().rotateZ(270),
      ref: c1,
      center: [1, 0, 0],
      begin:[0, 0, 1],
      end:[0, 1, 0],
      gaps: [0, 0, dim.walls[z] - 4]
    })
    wago2 = align({obj: wago2, ref: m3_suporte, endToBegin: [1, 0, 0], gaps: [2, 0, 0]})

    var rly = align({
      obj: relay(),
      ref: c1,
      end: [0, 1, 0],
      begin: [1, 0, 1],
      gaps: [dim.walls[x], dim.walls[y], dim.walls[z]]
    })

    var cb = conector_branco(2)

    var cb_base = align({
      obj: cb.base,
      ref: rly,
      begin: [0, 0, 1],
      end: [0, 1, 0],
      beginToEnd: [1, 0, 0],
      gaps: [1, -dim.walls[y], 0]
    })

    var cb_buraco = align({
      obj: cb.buraco,
      ref: cb_base,
      begin: [1, 0, 1],
      end: [0, 1, 0],
    })

    var c110v = align({
      obj: conector110v(),
      ref: c1,
      center: [0, 0, 0],
      begin: [1, 1, 1],
      gaps: [dim.walls[x], 0, dim.walls[z]]
    }).translate(dim.c110v_offset)



    return c1
      .union(elevado_tomada)
      .subtract(tomada_superior)
      .subtract(tomada_inferior)
      .union(wago1)
      .union(wago2)
      .union(m3_suporte)
      .union(cb_base)
      .union(base.suporteY)
      .union(rly)
      .subtract(m3_buraco)
      .subtract(c110v)
      .subtract(cb_buraco)
      .subtract(rly.properties.buraco)
      .subtract(tomada_buraco)
  }

  return c1
})()

main = function() {
  return c1()
}
