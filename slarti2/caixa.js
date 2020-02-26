include('align.js')
include('m3.js')

caixa = (function() {

  var dim = {}

  var x = 0; y = 1; z = 2

  dim.suporte = {
    raio: 6,
    altura: 10,
    altura_superior: 3
  }

  function caixa({size, walls, radius = [0, 0, 0], center = [0, 0, 0], tampa_z = 2, tampa_walls = [0, 0, 2]} = {}) {
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

    var caixa = outer.subtract(inner)

    var suporte = suporte_m3()

    caixa.properties.suporteX = align({
      obj: suporte.rotateZ(90),
      ref: caixa,
      center: [0, 1, 0],
      endToBegin:[1, 0, 0],
      end: [0, 0, 1]
    }).union(align({
      obj: suporte.rotateZ(270),
      ref: caixa,
      center: [0, 1, 0],
      beginToEnd:[1, 0, 0],
      end: [0, 0, 1]
    }))

    caixa.properties.suporteY = align({
      obj: suporte.rotateZ(180),
      ref: caixa,
      center: [1, 0, 0],
      endToBegin:[0, 1, 0],
      end: [0, 0, 1]
    }).union(align({
      obj: suporte.rotateZ(0),
      ref: caixa,
      center: [1, 0, 0],
      beginToEnd:[0, 1, 0],
      end: [0, 0, 1]
    }))

    var tampa = cube({
      size: [size[x], size[y], tampa_z], radius, center
    })
    if (tampa_z != tampa_walls[z])
      tampa = tampa.subtract(cube({
        size: [size[x] - 2 * tampa_walls[x], size[y] - 2 * tampa_walls[y], tampa_z - tampa_walls[z]],
        center: [1, 1, 0]
      }).translate([0, 0, tampa_walls[z]]))

    caixa.properties.tampaX = align({
      obj: tampa,
      ref: caixa,
      center: [1, 1, 0],
      beginToEnd: [0, 0, 1]
    }).union(align({
      obj: suporte_m3_tampa(tampa_z).rotateZ(270),
      ref: caixa,
      center: [0, 1, 0],
      beginToEnd:[1, 0, 1]
    })).union(align({
      obj: suporte_m3_tampa(tampa_z).rotateZ(90),
      ref: caixa,
      center: [0, 1, 0],
      beginToEnd:[0, 0, 1],
      endToBegin: [1, 0, 0]
    }))

    caixa.properties.tampaY = align({
      obj: tampa,
      ref: caixa,
      center: [1, 1, 0],
      beginToEnd: [0, 0, 1]
    }).union(align({
      obj: suporte_m3_tampa(tampa_z),
      ref: caixa,
      center: [1, 0, 0],
      beginToEnd:[0, 1, 1]
    })).union(align({
      obj: suporte_m3_tampa(tampa_z).rotateZ(180),
      ref: caixa,
      center: [1, 0, 0],
      beginToEnd:[0, 0, 1],
      endToBegin: [0, 1, 0]
    }))


    return caixa
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

  function suporte_m3_tampa(tampa_z) {
    var suporte = cylinder({
      r: dim.suporte.raio,
      h: tampa_z,
      center: [1, 1, 0]})
    .intersect(cube({
      size: [20, 20, 20],
      center: [1, 0, 0]}))

    var parafuso = align({
      obj: cylinder({r: 1.7, h: tampa_z}),
      ref: suporte,
      center: [1, 1, 0],
      begin: [0, 0, 1]
    })

    return suporte.subtract(parafuso)
  }

  return caixa
})()

main = function() {

  var c = caixa({size: [60, 60, 30], walls: [2, 2, 2], center: [1, 1, 0], tampa_z: 5, tampa_walls: [3, 3, 2]})
  return c.union(c.properties.suporteX).union(c.properties.tampaX.translate([0, 0, 10]))
  // return c.properties.tampaY
}
