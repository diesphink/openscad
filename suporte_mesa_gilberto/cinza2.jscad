suporte2b = (function() {
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
dim.base.y_ate_vao = (dim.base.y - dim.base.vao.y)/2

// 47.76

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

// Blocos
dim.blocos = {
  z: 33.4,
  x: 47,
  y: 33.7,
  parede: 3,
  base: 6,
  vaos: {
    x: 7,
    y: 8
  },
  padding: {},
  grande: {},
  pequeno: {}
}

dim.blocos.padding.x = (dim.base.x - dim.blocos.x)/2
dim.blocos.padding.y = (dim.base.y - dim.blocos.y)/2
dim.blocos.grande.x = dim.c.pos.x - dim.blocos.padding.x - dim.blocos.vaos.x/2
dim.blocos.pequeno.x = dim.blocos.x - dim.blocos.vaos.x - dim.blocos.grande.x
dim.blocos.pequeno.y = (dim.blocos.y - dim.blocos.vaos.y)/2



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

function roundedcube(x, y) {
  var ext = cube({
    size: [x, y, dim.blocos.z],
    radius: [1, 1, 3],
    fn: 20
  })

  var int = cube({size: [x - 2*dim.blocos.parede, y - 2*dim.blocos.parede, dim.blocos.z]})
  .translate([dim.blocos.parede, dim.blocos.parede, dim.base.z + dim.blocos.base])

  return ext.subtract(int)
}

function cinza() {
    var x = 0, y = 0;

    var base = cube({
      size: [dim.base.x, dim.base.y, dim.base.z],
      radius: [2, 2, 0],
      fn: 20
    })
    .subtract(cube({
      size: [dim.base.vao.x, dim.base.vao.y, dim.base.z],
      center: [0, 1, 0],
    }).translate([dim.base.x - dim.base.vao.x, dim.base.y/2, 0])
  )

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

    // blocos
    var b1 = roundedcube(dim.blocos.grande.x, dim.blocos.y)
    .translate([dim.blocos.padding.x, dim.blocos.padding.y, 0])

    var b2 = roundedcube(dim.blocos.pequeno.x, dim.blocos.pequeno.y)
    .translate([dim.blocos.padding.x + dim.blocos.grande.x + dim.blocos.vaos.x, dim.blocos.padding.y, 0])

    var b3 = b2.translate([0, dim.blocos.pequeno.y + dim.blocos.vaos.y, 0])


    return base
    .union(b1)
    .union(b2)
    .union(b3)
    // .union(bg)
    // .union(bp1)
    // .union(bp2)
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
  var m1 = suporte2b.cinza()
  var m2 = m1.union(m1.translate([0, suporte2b.dim.base.y + 5, 0]))
  m2 = m2.union(m1.translate([0, -suporte2b.dim.base.y - 5, 0]))
  // m = m.union(m.mirroredY().translate([0, -8, 0]))
  return m2
}
