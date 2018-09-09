led_driver = (function() {
  var dim = {
    x: 89,
    y: 38,
    z: 5,
    folga: 0.2,
    parede: 1.2,
    altura_cabos: 2,
    abertura_cabos: 10,
    screw_holder: {
      r: 1.3,
      z: 3,
      gap: 4
    }
  }
  function shell() {
    shell = cube({
      size: [
        dim.x + (dim.parede + dim.folga) * 2,
        dim.y + (dim.parede + dim.folga) * 2,
        dim.z],
      center: [1, 1, 0],
      radius: [1 + dim.parede, 1 + dim.parede, 0],
      fn: 16
    })

    hollow = cube({
      size: [
        dim.x + (dim.folga) * 2,
        dim.y + (dim.folga) * 2,
        dim.z],
      center: [1, 1, 0],
      radius: [1, 1, 0],
      fn: 16
    }).translate([0, 0, dim.parede])
    return shell.subtract(hollow)
  }

  function cable_hollow(pos) {
    var cable_hollow = cube({
      size: [dim.parede * 3, dim.abertura_cabos, dim.z],
      center: [1, 0, 0],
      radius: [0, 1, 1],
      fn: 16
    })

    if (pos.indexOf("NE") != -1)
      return cable_hollow.translate([dim.x/2, dim.y/2 - 4 - dim.abertura_cabos, dim.altura_cabos + dim.parede])
    else if (pos.indexOf("SW") != -1)
      return cable_hollow.translate([-dim.x/2, -dim.y/2 + 4, dim.altura_cabos + dim.parede])
  }

  function screw_holder(pos) {
    var screw_holder = cylinder({r: dim.screw_holder.r, h: dim.screw_holder.z, center: [true, true, false]}).setColor([1, 0, 0])
    if (pos.indexOf("NW") != -1)
      return screw_holder.translate([-dim.x/2 + dim.screw_holder.gap, dim.y/2 - dim.screw_holder.gap, dim.parede])
    else if (pos.indexOf("SE") != -1)
      return screw_holder.translate([+dim.x/2 - dim.screw_holder.gap, -dim.y/2 + dim.screw_holder.gap, dim.parede])
  }

  function base() {
    return shell().subtract(cable_hollow("SW")).subtract(cable_hollow("NE")).union(screw_holder("NW")).union(screw_holder("SE"))
  }

  return {base, dim}
})()

function main() {
  return led_driver.base()
}
