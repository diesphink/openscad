plug_110v = (function() {
  "use strict"

  var dim = {
    x: 44,
    y0: 20,
    x0: 1,
    y1: 24,
    x1: 19,
    y2: 19,
    x2: 20,
    y3: 17,
    x3: 3,
    y4: 9,
    x4: 1,
    r: 3.5,
    z: 15,
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
    return cube({size:[dim.x0, dim.y0 + dim.folga * 2, dim.z * 10], center:[0, 1, 0]}).translate([0, 0, dim.parede])
    .union(cube({size:[dim.x1, dim.y1 + dim.folga * 2, dim.z * 10], center:[0, 1, 0]}).translate([dim.x0, 0, dim.parede]))
    .union(cube({size:[dim.x2, dim.y2 + dim.folga * 2, dim.z * 10], center:[0, 1, 0]}).translate([dim.x0 + dim.x1, -2.5, dim.parede + 3]))
    .union(cube({size:[dim.x3, dim.y3 + dim.folga * 2, dim.z * 10], center:[0, 1, 0]}).translate([dim.x0 + dim.x1 + dim.x2, -1.5, dim.parede + 3]))
    .union(cube({size:[dim.x4, dim.y4 + dim.folga * 2, dim.z * 10], center:[0, 1, 0]}).translate([dim.x0 + dim.x1 + dim.x2 + dim.x3, 0, dim.parede + dim.parede + 5]))

  }

  return {base, dim, hollow}
})()

function main() {
  return plug_110v.base()
}
