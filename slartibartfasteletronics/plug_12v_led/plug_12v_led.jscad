plug_12v_led = (function() {
  "use strict"

  var dim = {
    x: 36,
    y0: 4,
    y1: 9,
    y2: 12,
    r: 6,
    z: 12,
    folga: 0.2,
    parede: 1.2,
  }

  function base() {
    var shell = cube({
      size: [
        dim.x,
        dim.r*2 + (dim.folga + dim.parede) * 2,
        dim.z + dim.folga + dim.parede
      ],
      center: [0, 1, 0],
      radius: [1, 1, 0]
    })

    return shell.subtract(hollow())
  }

  function hollow() {
    return cube({size:[1, dim.y0 + dim.folga * 2, dim.z * 3], center:[0, 1, 0]}).translate([0, 0, dim.parede])
    .union(cube({size:[12, dim.y1 + dim.folga * 2, dim.z * 3], center:[0, 1, 0]}).translate([1, 0, dim.parede]))
    .union(cube({size:[22, dim.y2 + dim.folga * 2, dim.z * 3], center:[0, 1, 0]}).translate([13, 0, dim.parede]))
    .union(cube({size:[2, dim.r*2 + dim.folga * 2, dim.z * 3], center:[0, 1, 0]}).translate([35, 0, dim.parede + dim.r]))
    .union(cylinder({r: dim.r + dim.folga, h: 2, center: [true, true, false]}).rotateY(90).translate([35, 0, dim.parede + dim.r]))

  }

  return {base, dim, hollow}
})()

function main() {
  return plug_12v_led.base()
}