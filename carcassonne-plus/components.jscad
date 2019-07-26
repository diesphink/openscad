include('common.js')

comps = (function() {
  "use strict"

  var dim = {
    size: 45,
    y: 45,
    x: 45,
    bottom: 1,
    wall: 2,
    inner_wall:1,

  }

  function base(z) {
    var box = cube({
      size: [dim.x, dim.y, z + dim.bottom]
    })
    var space = cube({
      size: [dim.x - 2*dim.wall, dim.y - 2*dim.wall, z + dim.bottom * 2]
    }).translate([dim.wall, dim.wall, dim.bottom])
    box = box.subtract(space);

    return box;
  }

  function compsgrid(rows, cols, z) {
    var box = cube({
      size: [dim.x, dim.y, z + dim.bottom + 2],
      radius: [2, 2, 2],
      fn: 32
    });
    box = box.intersect(cube({
      size: [dim.x, dim.y, z + dim.bottom]
    }))

    var tam_x = dim.x;
    tam_x -= dim.wall*2; // paredes externas
    tam_x -= dim.inner_wall * (cols - 1); // paredes internas
    tam_x /= cols;

    var tam_y = dim.y;
    tam_y -= dim.wall*2; // paredes externas
    tam_y -= dim.inner_wall * (rows - 1); // paredes internas
    tam_y /= rows;

    var filas = []
    for (var r = 0; r < rows; r++) {
      var fila = []
      for (var c = 0; c < cols; c++) {
        fila.push(cube({size:[tam_x, tam_y, z]}));
      }
      fila = union(common.distributeX(fila, dim.x, dim.wall));
      filas.push(fila);
    }
    filas = translate([0, 0, dim.bottom], common.distributeY(filas, dim.y, dim.wall));


    return box.subtract(filas);
  }

  function compssimple(rows, cols, z) {
    return base(z);
  }

  function tampa() {
    var c1 = cube({
      size: [dim.x, dim.y, dim.bottom * 3],
      radius: [2, 2, 0],
      fn: 32
    });

    var radius_interno = 2 - dim.wall / 2;
    var c2 = cube({
      size: [dim.x - dim.wall, dim.y - dim.wall, dim.bottom * 3],
      radius: [radius_interno, radius_interno, 0],
      fn: 32
    }).translate([dim.wall/2, dim.wall/2, dim.bottom]);
    return c1.subtract(c2);
  }

  function tampa_subtracter(z) {
    var c1 = cube({
      size: [dim.x + dim.wall, dim.y  + dim.wall, dim.bottom * 2],
      fn: 32
    }).translate([-dim.wall/2, -dim.wall/2, 0]);

    var radius_interno = 2 - dim.wall / 2;
    var c2 = cube({
      size: [dim.x - dim.wall - 0.4, dim.y - dim.wall - 0.4, dim.bottom * 4],
      radius: [radius_interno, radius_interno, 0],
      fn: 32
    }).translate([dim.wall/2 + 0.2, dim.wall/2 + 0.2, -dim.bottom]);
    return c1.subtract(c2).translate([0, 0, z - 1 * dim.bottom]);

  }

  return {dim, compsgrid, tampa, tampa_subtracter}
})()

function main() {
  // return comps.tampa_subtracter().translate([0, 0, 5]).union(comps.tampa());
  return comps.compsgrid(3, 3, 3).subtract(comps.tampa_subtracter(3))//.union(comps.tampa().setColor(1,1,0,1).mirroredZ().translate([0, 0, 9]));
  // .union(plug_12v.screw_tab().translate([plug_12v.dim.x/2, -11, 0]))
  // .union(plug_12v.screw_tab().mirroredY().translate([plug_12v.dim.x/2, 11, 0]))
}
