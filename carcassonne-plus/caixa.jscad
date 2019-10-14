include('common.js')

caixa = (function() {
  "use strict"

  var dim = common.dim.caixa

  function caixa_grid(rows, cols, z) {
    z = z + dim.folga_z
    var box = cube({
      size: [dim.x, dim.y, z + dim.bottom + 2/*folga para não ter curva na parte superior, será recortado abaixo*/],
      radius: [dim.radius_xy, dim.radius_xy, dim.radius_z],
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

    var tampa_lid = cube({size: [dim.lid.x, dim.lid.y, dim.lid.z]})
    .setColor([0.4, 0.4, 0.7])
    .translate([(dim.x-dim.lid.x)/2,(dim.y-dim.lid.y)/2, z - dim.lid.z + dim.bottom])

    var tampa_lid_grip_hole = cube({
      size: [dim.lid.grip_x, dim.y + 2, dim.lid.z + 2],
      center: [true, false, false],
      fn: 20
    })
    .setColor([0.4, 0.4, 0.7])
    .translate([dim.x/2, -1, z - dim.lid.z + dim.bottom])

    return box.subtract(filas).subtract(tampa_lid).subtract(tampa_lid_grip_hole);
  }

  return {dim, caixa_grid}
})()

function main() {
  // var meeples = caixa.caixa_grid(2,1,20) // ?????
  // var abades = caixa.caixa_grid(3, 2, 21)
  // var estalagens = caixa.caixa_grid(3, 2, 20)
  // var construtores1 = caixa.caixa_grid(3, 2, 21)
  // var construtores2 = caixa.caixa_grid(3, 2, 15)
  // var construtores3 = caixa.caixa_grid(1, 1, 21)
  var mensagens = caixa.caixa_grid(3, 2, 15)
  // var barqueiros = caixa.caixa_grid(1, 1, 4.5)
  // var minas = caixa.caixa_grid(3, 2, 15)
  // var feiticeiro = caixa.caixa_grid(2, 1, 11)
  // var bandidos = caixa.caixa_grid(3, 2, 15)
  return mensagens
}
