include('common.js')

caixa_tampa = (function() {
  "use strict"

  var dim = common.dim.caixa

  function caixa_tampa() {
    var box = cube({
      size: [dim.x, dim.y, dim.tampa.z + 2/*folga para não ter curva na parte superior, será recortado abaixo*/],
      radius: [dim.radius_xy, dim.radius_xy, dim.radius_z],
      fn: 12
    });
    box = box.intersect(cube({
      size: [dim.x, dim.y, dim.tampa.z]
    }))

    var tampa_lid = cube({
      size: [dim.lid.x - dim.lid.folga, dim.lid.y - dim.lid.folga, dim.lid.z],
      radius: [dim.radius_xy, dim.radius_xy, 0],
      fn: 12
    })
    .setColor([0,0,1])
    .translate([(dim.x-dim.lid.x)/2,(dim.y-dim.lid.y)/2, dim.tampa.z])

    var tampa_lid_grip_hole = cube({
      size: [dim.lid.grip_x, dim.y, dim.lid.z - dim.lid.folga_grip],
      center: [true, false, false],
    })
    .translate([dim.x/2, 0, dim.tampa.z])

    var tampa_lid_spacer = cube({
      size: [dim.lid.x - dim.lid.folga - dim.lid.wall, dim.lid.y - dim.lid.folga - dim.lid.wall, dim.lid.z + 2],
      radius: [dim.radius_xy, dim.radius_xy, 0],
      fn: 32
    })
    .translate([(dim.x-dim.lid.x+dim.lid.wall)/2,(dim.y-dim.lid.y+dim.lid.wall)/2, dim.tampa.z -1])

    tampa_lid = tampa_lid.union(tampa_lid_grip_hole).subtract(tampa_lid_spacer)
    .setColor([0.4, 0.4, 0.7])

  

    return box.union(tampa_lid)
  }

  return {caixa_tampa}
})()

function main() {
  return caixa_tampa.caixa_tampa()
}
