include('align.js')
include('m3.js')

caixa = (function() {

  var dim = {}

  dim.suporte = {
    raio: 6,
    altura: 10,
    altura_superior: 3
  }

  function caixa({size, walls, radius = [0, 0, 0], center = [0, 0, 0]} = {}) {
    var outer = cube({
      size: size,
      center: center,
      radius: radius
    })

    var inner = cube({
      size: [
        size[0] - 2*walls[0],
        size[1] - 2*walls[1],
        size[2] - 1*walls[2]
      ],
      center: [center[0], center[1], 0],
      radius: radius
    }).translate([0, 0, walls[2] + 0.01])

    if (center[2] == 1)
      inner = inner.translate([0, 0, size[2]/2])

    var suporte = suporte_m3()

    var suporteX = align({
      obj: suporte.rotateZ(90),
      ref: outer,
      center: [0, 1, 0],
      endToBegin:[1, 0, 0],
      end: [0, 0, 1]
    }).union(align({
      obj: suporte.rotateZ(270),
      ref: outer,
      center: [0, 1, 0],
      beginToEnd:[1, 0, 0],
      end: [0, 0, 1]
    }))

    var suporteY = align({
      obj: suporte.rotateZ(180),
      ref: outer,
      center: [1, 0, 0],
      endToBegin:[0, 1, 0],
      end: [0, 0, 1]
    }).union(align({
      obj: suporte.rotateZ(0),
      ref: outer,
      center: [1, 0, 0],
      beginToEnd:[0, 1, 0],
      end: [0, 0, 1]
    }))

    return {caixa: outer.subtract(inner), suporteX, suporteY}
  }

  function suporte_m3() {
    var p1 = cylinder({
      r: dim.suporte.raio,
      h: dim.suporte.altura_superior,
      center: [1, 1, 0]})

    var p2 = cylinder({
      r1: dim.suporte.raio,
      r2: 0,
      h: dim.suporte.altura - dim.suporte.altura_superior,
      center: [1, 1, 0]
    }).translate([0, 0, dim.suporte.altura_superior])

    var half = cube({
      size: [20, 20, 20],
      center: [1, 0, 0]})

    var suporte = p1.union(p2).intersect(half)

    var parafuso = align({
      obj: m3({h: 7}),
      ref: suporte,
      center: [1, 1, 0],
      begin: [0, 0, 1]
    })

    return suporte.subtract(parafuso).subtract(parafuso.properties.cabeca).rotateY(180).translate([0, 0, dim.suporte.altura])
  }

  return caixa
})()

main = function() {

  var c = caixa({size: [60, 60, 30], walls: [2, 2, 2], center: [1, 1, 0]})
  return c.caixa.union(c.suporteX)
}
