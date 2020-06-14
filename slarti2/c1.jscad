include('common.js')
include('../libs/align.js')
include('wago-3er-solo.js')
include('m3.js')
include('conector110v.js')
include('caixa.js')
include('conector_branco.js')
include('relay.js')

c1 = (function() {
  "use strict"

  const x = 0
  const y = 1
  const z = 2

  function c1() {

    var dim = common.dim

    dim.caixa = [130, 70, 30]
    dim.walls = [2, 2, 6] 

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

    var c1 = caixa({
      size: dim.caixa,
      walls: dim.walls,
      center: [1, 1, 0],
      radius: [1, 1, 0],
      suporte: [1, 0, 0],
      tampa_z: 5,
      tampa_walls: [3.5, 3.5, 2]
    }).setColor([0.8, 0.8, 0.9])

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

    var m1 = align({
      obj: m3(),
      ref: c1,
      endToBegin:[0, 0, 1],
      center: [1, 1, 0],
      gaps: [0, dim.perfil_espacamento/2, -dim.walls[z]-0.01]})
    var m2 = m1.translate([0, -dim.perfil_espacamento, 0])

    var wago1 = align({
      obj: wago3er().rotateZ(90),
      ref: c1,
      center: [1, 0, 0],
      begin:[0, 1, 1],
      gaps: [0, 0, dim.walls[z] - 4]
    })

    var wago2 = align({
      obj: wago3er().rotateZ(270),
      ref: c1,
      center: [1, 0, 0],
      begin:[0, 0, 1],
      end:[0, 1, 0],
      gaps: [0, 0, dim.walls[z] - 4]
    })

    var rly = align({
      obj: relay(),
      ref: c1,
      end: [0, 1, 0],
      begin: [1, 0, 1],
      gaps: [dim.walls[x], dim.walls[y], dim.walls[z]]
    })

    var cb = align({
      obj: conector_branco(),
      ref: rly,
      begin: [0, 0, 1],
      end: [0, 1, 0],
      beginToEnd: [1, 0, 0],
      gaps: [4, 0, 0]
    })

    var c110v = align({
      obj: conector110v(),
      ref: c1,
      center: [0, 0, 0],
      begin: [1, 1, 1],
      gaps: [dim.walls[x], 0, dim.walls[z]]
    }).translate(dim.c110v_offset)

    var trilho = align({
      obj: cube({size: [dim.caixa[x], 40, 4]}),
      ref: c1,
      center: [1, 1, 0],
      begin: [0, 0, 1]
    })

    return c1
      .union(c1.properties.suporteY)
      .union(elevado_tomada)
      .subtract(tomada_superior)
      .subtract(tomada_inferior)
      .subtract(tomada_buraco)
      .union(wago1)
      .union(wago2)
      .subtract(m1)
      .subtract(m2)
      .union(m1.properties.protecao)
      .union(m2.properties.protecao)
      .union(cb)
      .subtract(cb.properties.buraco)
      .union(rly)
      .subtract(rly.properties.buraco)
      .subtract(c110v)
      .subtract(trilho)
  }

  return c1
})()

main = function() {
  return c1()
}
