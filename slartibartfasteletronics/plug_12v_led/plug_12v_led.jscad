plug_12v_led = (function() {
  "use strict"

  var dim = {
    x: 38,
    y0: 4,
    y1: 9,
    y2: 12,
    r: 3.5,
    z: 12,
    folga: 0.2,
    parede: 1.2,
  }

  function base() {
    var shell = cube({
      size: [
        dim.x,
        dim.y2 + (dim.folga + dim.parede) * 2,
        dim.z + dim.parede
      ],
      center: [0, 1, 0],
      radius: [0.5, 0.5, 0]
    })

    return shell.subtract(hollow())
  }

  function hollow() {
    return cube({size:[2, dim.y0 + dim.folga * 2, dim.z * 3], center:[0, 1, 0]}).translate([0, 0, dim.parede])
    .union(cube({size:[12, dim.y1 + dim.folga * 2, dim.z * 3], center:[0, 1, 0]}).translate([2, 0, dim.parede]))
    .union(cube({size:[23 + dim.folga, dim.y2 + dim.folga * 2, dim.z * 3], center:[0, 1, 0]}).translate([14, 0, dim.parede]))
    .union(cube({size:[1, dim.r*2 + dim.folga * 2, dim.z * 3], center:[0, 1, 0]}).translate([37, 0, dim.parede + dim.r + (6 - dim.r)]))
    .union(cylinder({r: dim.r + dim.folga, h: 1, center: [true, true, false]}).rotateY(90).translate([37, 0, dim.parede + dim.r + (6 - dim.r)]))

  }

  return {base, dim, hollow}
})()

function main() {
  return plug_12v_led.base()
}
