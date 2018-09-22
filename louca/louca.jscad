include('opentype.min.js')
include('ubuntu_c_ttf.js')

let fUbuntu = Font3D.parse(ubuntu_c_ttf_data.buffer);

louça = (function() {
  "option explicit"
  var dim = {
    x: 70,
    y: 20,
    z: 2,
    lip: {
      z: 1.5,
      y: 0.5
    },
    magnet: {
      z: 2,
      r: 1.5,
      padding: 3
    },
    folga: 0.2,
    parede: 0.8,
  }

  function base() {
    let c = cube({
      size:[dim.x, dim.y, dim.z],
      center: [1,1,0],
    })

    c = c.union(cube({
      size:[dim.x, dim.y + dim.lip.y * 2, dim.lip.z],
      center: [1,1,0],
      radius: [0, dim.lip.y, dim.lip.z/2]
    }).translate([0, 0, dim.z - dim.lip.z])).setColor([1,1,1])

    c = c.subtract(txt("SUJA").translate([-dim.x/4, 0, dim.z + 0.6]).setColor([0.5,0,0.5]))
    c = c.subtract(txt("LIMPA").translate([dim.x/4, 0, dim.z + 0.2]).setColor([0.5,0.5,0.5]))

    let padding = dim.magnet.r + dim.magnet.padding
    let magx = [-dim.x/2 + padding, 0, dim.x/2 - padding]
    let magy = [dim.y/2 - padding, -dim.y/2 + padding]

    c = c.subtract(magnet_slip().translate([magx[0], magy[0], 0]))
    c = c.subtract(magnet_slip().translate([magx[1], magy[0], 0]))
    c = c.subtract(magnet_slip().translate([magx[2], magy[0], 0]))
    c = c.subtract(magnet_slip().translate([magx[0], magy[1], 0]))
    c = c.subtract(magnet_slip().translate([magx[1], magy[1], 0]))
    c = c.subtract(magnet_slip().translate([magx[2], magy[1], 0]))

    return c
  }

  function txt(text) {
    let fUbuntu = Font3D.parse(ubuntu_c_ttf_data.buffer);
    let cag = Font3D.cagFromString(fUbuntu, text, 10);
    let csg = linear_extrude({ height: 2 }, union(cag));
    return csg.center();
  }

  function magnet_slip() {
    return cylinder({
      r: dim.magnet.r + dim.folga,
      h: dim.z - dim.parede,
      center: [1, 1, 0]
    })
  }

  return {base, dim}
})()

// function vectorText({text, weight, z, text_size, center}) {
//   weight = weight || 2
//   z = z || 1
//   text_size = text_size || 10
//   center = center || [0, 0, 0]
//
//   var l = vector_text(0, 0, text);
//   var o = [];
//   l.forEach(function(pl) {
//      o.push(rectangular_extrude(pl, {w: weight, h: z}));
//   });
//   let final = union(o)
//   var scale = text_size / (final.getBounds()[1].y - final.getBounds()[0].y)
//   let translate1 = [- final.getBounds()[0].x, -final.getBounds()[0].y, 0]
//   let translate2 = [
//     center[0] ? -final.getBounds()[1].x/2 : 0,
//     center[1] ? -final.getBounds()[1].y/2 : 0,
//     center[2] ? -final.getBounds()[1].z/2 : 0
//   ]
//   return final.translate(translate1).translate(translate2).scale([scale, scale, 1]);
// }

function main (param) {
  return union(louça.base())
 }
