plug_12v = (function() {
  "use strict"

  var dim = {
    x: 32,
    y0: 10,
    y1: 14,
    y2: 10,
    r: 3.5,
    z: 11,
    folga: 0.2,
    parede: 1.2,
    altura_plugue: 2
  }

  function base() {
    var shell = cube({
      size: [
        dim.x,
        dim.y1 + (dim.folga + dim.parede) * 2,
        dim.z + dim.folga + dim.parede
      ],
      center: [0, 1, 0],
      radius: [1, 1, 0]
    })

    return shell.subtract(hollow())
  }

  function hollow() {
    return cube({size:[1, dim.y0 + dim.folga * 2, dim.z * 3], center:[0, 1, 0]}).translate([0, 0, dim.parede])
    .union(cube({size:[22, dim.y1 + dim.folga * 2, dim.z * 3], center:[0, 1, 0]}).translate([1, 0, dim.parede]))
    .union(cube({size:[7, dim.y2 + dim.folga * 2, dim.z * 3], center:[0, 1, 0]}).translate([23, 0, dim.parede + 1]))
    .union(cube({size:[2, dim.r*2 + dim.folga * 2, dim.z * 3], center:[0, 1, 0]}).translate([30, 0, dim.parede + dim.altura_plugue + dim.r]))
    .union(cylinder({r: dim.r + dim.folga, h: 2, center: [true, true, false]}).rotateY(90).translate([30, 0, dim.parede + dim.altura_plugue + dim.r]))

  }

  return {base, dim, hollow}
})()

function main() {
  return plug_12v.base()
}
