plug_12v = (function() {
  "use strict"

  var dim = {
    x: 32,
    y0: 10,
    y1: 14,
    y2: 10,
    r: 3.2,
    z: 11,
    folga: 0.2,
    parede: 1.2,
    altura_plugue: 2
  }

  // plug_x = 16;
  // plug_y = 32;
  // plug_z = 11;
  // module plug() {
  //   difference() {
  //     cube([plug_x, plug_y, plug_z-0.01], center=true);
  //     // temporário
  //     translate([0, 15, 2])
  //       cube([8.01, 2.01, plug_z], center=true);
  //     translate([0, 10.5, 2])
  //       cube([10.01, 7.01, plug_z], center=true);
  //     translate([0, -4, 1])
  //       cube([14.01, 22.01, plug_z], center=true);
  //     translate([0, -15, 1])
  //       cube([11.01, 2.01, plug_z], center=true);
  //   }
  // }

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

    // shell = shell.subtract(cube({size:[1, dim.y0 + dim.folga * 2, dim.z * 2], center:[0, 1, 0]}).translate([0, 0, dim.parede]))
    // shell = shell.subtract(cube({size:[22, dim.y1 + dim.folga * 2, dim.z * 2], center:[0, 1, 0]}).translate([1, 0, dim.parede]))
    // shell = shell.subtract(cube({size:[7, dim.y2 + dim.folga * 2, dim.z * 2], center:[0, 1, 0]}).translate([23, 0, dim.parede + 1]))
    // shell = shell.subtract(cube({size:[2, dim.r*2 + dim.folga * 2, dim.z * 2], center:[0, 1, 0]}).translate([30, 0, dim.parede + dim.altura_plugue + dim.r]))
    // shell = shell.subtract(cylinder({r: dim.r + dim.folga, h: 2, center: [true, true, false]}).rotateY(90).translate([30, 0, dim.parede + dim.altura_plugue + dim.r]))

    return shell.subtract(hollow())
  }

  function hollow() {
    return cube({size:[1, dim.y0 + dim.folga * 2, dim.z * 2], center:[0, 1, 0]}).translate([0, 0, dim.parede])
    .union(cube({size:[22, dim.y1 + dim.folga * 2, dim.z * 2], center:[0, 1, 0]}).translate([1, 0, dim.parede]))
    .union(cube({size:[7, dim.y2 + dim.folga * 2, dim.z * 2], center:[0, 1, 0]}).translate([23, 0, dim.parede + 1]))
    .union(cube({size:[2, dim.r*2 + dim.folga * 2, dim.z * 2], center:[0, 1, 0]}).translate([30, 0, dim.parede + dim.altura_plugue + dim.r]))
    .union(cylinder({r: dim.r + dim.folga, h: 2, center: [true, true, false]}).rotateY(90).translate([30, 0, dim.parede + dim.altura_plugue + dim.r]))

  }

  return {base, dim, hollow}
})()

function main() {
  return plug_12v.base()
}
