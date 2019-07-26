suporte2 = (function() {
  "use strict"

var dim = {}

// base
dim.base = {
  x: 53.4,
  y: 38.54,
  z: 3,
  vao: {
    x: 2,
    y: 9
  }
}

// 47.76

dim.base.y_ate_vao = (dim.base.y - dim.base.vao.y)/2

// Bloco grande
dim.bg = {
  x: 26.48,
  y: 33.7,
  z: 33.4,
  interno: {
    x: 23.74,
    y: 27.36,
    z: 25,
  }
}
dim.bg.padding = (dim.base.y - dim.bg.y) / 2
dim.bg.interno.padding = {
  x: (dim.bg.x - dim.bg.interno.x) / 2,
  y: (dim.bg.y - dim.bg.interno.y) / 2,
  z: (dim.bg.z - dim.bg.interno.z) + 0.01
}

// Bloco pequeno
dim.bp = {
  x: 12,
  y: 12,
  z: 33.4,
  interno: {
    x: 7,
    y: 7,
    z: 25,
  }
}
dim.bp.interno.padding = {
  x: (dim.bp.x - dim.bp.interno.x) / 2,
  y: (dim.bp.y - dim.bp.interno.y) / 2,
  z: (dim.bp.z - dim.bp.interno.z) + 0.01
}

// Cilindro grande
dim.c = {
  r: 27/2,
  r_interno: 20.4/2,
  h: 33.4,
  pos: {}
}
dim.c.pos.y = dim.base.y/2
dim.c.pos.x = dim.base.x - dim.c.pos.y

// Cilindro pequeno, parafuso
dim.cp = {
  r: 8/2,
  r_interno: 3/2,
  h: 18,
  pos: {}
}
dim.cp.pos.y = dim.base.y/2
dim.cp.pos.x = 12

// Ranhura grande
dim.ranhura1 = {
  distancia: dim.c.pos.x - dim.cp.pos.x,
  tamanho: 9/2,
  z: 7
}

// Ranhura fina
dim.ranhura2 = {
  distancia: (dim.ranhura1.distancia - dim.ranhura1.tamanho - dim.c.r_interno)/2 + dim.c.r_interno,
  tamanho: 3/2,
  z: 7
}

function cinza() {
    var x = 0, y = 0;

    var base = polygon([
      [x, y],
      [x += dim.base.x, y],
      [x, y += dim.base.y_ate_vao],
      [x -= dim.base.vao.x, y],
      [x, y += dim.base.vao.y],
      [x += dim.base.vao.x, y],
      [x, y += dim.base.y_ate_vao],
      [x -= dim.base.x, y],
    ])
    base = base.extrude({ offset: [0, 0, dim.base.z] })

    // Bloco grande
    var bg = cube({size: [dim.bg.x, dim.bg.y, dim.bg.z]})
    var bgi = cube({size: [dim.bg.interno.x, dim.bg.interno.y, dim.bg.interno.z]})
    bgi = bgi.translate([dim.bg.interno.padding.x, dim.bg.interno.padding.y, dim.bg.interno.padding.z])

    bg = bg.subtract(bgi)
    bg = bg.translate([dim.bg.padding + 1, dim.bg.padding, 0])


    // Bloco pequeno 1 e 2
    var bp1 = cube({size: [dim.bp.x, dim.bp.y, dim.bp.z]})
    var bpi = cube({size: [dim.bp.interno.x, dim.bp.interno.y, dim.bp.interno.z]})
    bpi = bpi.translate([dim.bp.interno.padding.x, dim.bp.interno.padding.y, dim.bp.interno.padding.z])

    bp1 = bp1.subtract(bpi)
    bp1 = bp1.translate([dim.base.x - dim.bg.padding - dim.bp.x, dim.bg.padding, 0])
    var bp2 = bp1.translate([0, dim.base.y - 2*dim.bg.padding - dim.bp.y, 0])

    // Cilindro grande
    var c1 = cylinder({r: dim.c.r, h: dim.c.h}).translate([dim.c.pos.x, dim.c.pos.y, 0])
    var c1i = cylinder({r: dim.c.r_interno, h: dim.c.h}).translate([dim.c.pos.x, dim.c.pos.y, 0])

    // Cilindro pequeno
    var c2 = cylinder({r: dim.cp.r, h: dim.cp.h}).translate([dim.cp.pos.x, dim.cp.pos.y, 0])
    var c2i = cylinder({r: dim.cp.r_interno, h: dim.cp.h}).translate([dim.cp.pos.x, dim.cp.pos.y, 0])

    // Ranhura grande
    var ranhura1 = CSG.Path2D.arc({
      center: [dim.c.pos.x, dim.c.pos.y, 0],
      radius: dim.ranhura1.distancia,
      startangle: 150,
      endangle: 210,
      resolution: 32
    })

    ranhura1 = ranhura1.expandToCAG(dim.ranhura1.tamanho)
    ranhura1 = ranhura1.extrude({ offset: [0, 0, dim.ranhura1.z] })

    // Ranhura grande
    var ranhura2 = CSG.Path2D.arc({
      center: [dim.c.pos.x, dim.c.pos.y, 0],
      radius: dim.ranhura2.distancia,
      startangle: 120,
      endangle: 240,
      resolution: 32
    })

    ranhura2 = ranhura2.expandToCAG(dim.ranhura2.tamanho)
    ranhura2 = ranhura2.extrude({ offset: [0, 0, dim.ranhura2.z] })


    return base
    .union(bg)
    .union(bp1)
    .union(bp2)
    .union(c1)
    .union(c2)
    .setColor([0.7, 0.7, 0.7])
    .subtract(c1i)
    .subtract(c2i)
    .subtract(ranhura1)
    .subtract(ranhura2)
    // .union(ranhura2.setColor(1,0,0,0.5))
  }

  return {dim, cinza}
})()

function main() {
  return suporte2.cinza()
}
