wall_mount = (function() {
  "use strict"

  var dim = {
    x: 34,
    y0: 8,
    y1: 12,
    z0: 3,
    z1: 5,
    parede:1.2,
    folga: 0.2
  }

  function hook() {
    var shell = cube({
      size: [
        dim.x,
        dim.y0,
        dim.z0
      ],
      center: [1, 0, 0]
    })

    var p1 = polygon([
      [0, 0],
      [0, dim.y1],
      [dim.z1, dim.y1],
      [dim.z1, dim.y1 - dim.y0]])

    var wedge = linear_extrude({height: dim.x}, p1)
    wedge = wedge.rotateY(270).rotateZ(180).translate([-dim.x/2, dim.y1, dim.z0])

    return shell.union(wedge).setColor([0, 1, 0, 0.5])
  }

  function base() {
    var shell = cube({
      size: [
        dim.x + (dim.parede + dim.folga) * 2,
        dim.y1 + (dim.y1 - dim.y0) + (dim.parede + dim.folga) * 2,
        dim.z0 + dim.z1 + dim.parede + dim.folga
      ],
      center: [1, 0, 0]
    }).translate([0, -dim.parede-dim.folga, 0])
    return shell
  }

  function hollow() {
    var shell = cube({
      size: [
        dim.x + dim.folga * 2,
        dim.y0 + (dim.y1 - dim.y0) + dim.folga * 2,
        dim.z0 + dim.folga
      ],
      center: [1, 0, 0]
    })

    var p1 = polygon([
      [0, 0],
      [0, dim.y1 + (dim.y1 - dim.y0) + dim.folga * 2],
      [dim.z1 + dim.folga*2, dim.y1 + (dim.y1 - dim.y0) + dim.folga * 2],
      [dim.z1 + dim.folga*2, dim.y1 - dim.y0]])

    var wedge = linear_extrude({height: dim.x + dim.folga * 2}, p1)
    wedge = wedge.rotateY(270).rotateZ(180).translate([-dim.x/2 - dim.folga, dim.y1 + (dim.y1 - dim.y0) + dim.folga * 2, dim.z0 - dim.folga])

    return shell.union(wedge).setColor([1, 0, 0, 0.5])
  }

  return {hook, base, dim, hollow}
})()

function main() {
 return wall_mount.base().subtract(wall_mount.hollow())
  // return wall_mount.hook().translate([-wall_mount.dim.folga, -(wall_mount.dim.y0 - wall_mount.dim.y1), 0]).union(wall_mount.hollow())
}
