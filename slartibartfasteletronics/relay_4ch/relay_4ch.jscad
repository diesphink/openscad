var relay_4ch = (function() {

  dim = {
    x: 76,
    y: 56,
    z: 15,
    folga: 0.3,
    parede: 1.2,
    altura_pcb: 7
  }

  function shell() {
    shell = cube({
      size: [
        dim.x + (dim.parede + dim.folga) * 2,
        dim.y + (dim.parede + dim.folga) * 2,
        dim.z],
      center: [1, 1, 0],
      radius: [1, 1, 0]
    })

    hollow = cube({
      size: [
        dim.x + dim.folga * 2,
        dim.y + dim.folga * 2,
        dim.z + dim.folga * 2],
      center: [1, 1, 0],
      radius: [1, 1, 0]
    }).translate([0, 0, dim.parede])

    return shell.subtract(hollow)
  }

  function screw_hole(pos) {
    screw_r = 1.6
    gap_screw_shell = 3.4 // distância da parede ao centro do screw
    // return cylinder({r: 1.6 + dim.parede, h: dim.altura_pcb, center: [true, true, false]})
    var screw_hole = cube({
        size:[16, 16, dim.altura_pcb],
        fn: 32,
        // center:[1, 1, 0],
        radius: [screw_r + dim.parede, 1.6 + dim.parede, 0]})
      .intersect(cube({
          size: [
            screw_r + dim.parede + dim.folga + gap_screw_shell,
            screw_r + dim.parede + dim.folga + gap_screw_shell,
            dim.altura_pcb]}))
      .translate([-dim.parede - screw_r, -dim.parede - screw_r , 0])
      .subtract(cylinder({r: 1.6, h: dim.altura_pcb, center: [true, true, false]}))
      .setColor([1,0,0])

      if (pos != null) {
        if (pos.indexOf("S") != -1) {
          screw_hole = screw_hole.mirroredY()
          .translate([0, -dim.y/2 + gap_screw_shell, 0])
        } else {
          screw_hole = screw_hole.translate([0, dim.y/2 - gap_screw_shell, 0])
        }
        if (pos.indexOf("W") != -1) {
          screw_hole = screw_hole.mirroredX()
          .translate([-dim.x/2 + gap_screw_shell, 0, 0])
        } else {
          screw_hole = screw_hole.translate([dim.x/2 - gap_screw_shell, 0, 0])
        }
      }
      return screw_hole
  }

  function cable_hole() {
    return cube({
      size: [dim.x + dim.folga * 2, dim.parede * 3, dim.z],
      center: [1, 1, 0]
    })
    .setColor([1, 0, 0])
    .translate([0, dim.y/2 + dim.parede, dim.altura_pcb])
  }

  function base() {
    return shell()
      .union(screw_hole("NW"))
      .union(screw_hole("NE"))
      .union(screw_hole("SW"))
      .union(screw_hole("SE"))
      .subtract(cable_hole())
  }

  return {base}
})()

function main() {
  return relay_4ch.base();
}
