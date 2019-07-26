include('common.js')
include('tiles.jscad')
include('components.jscad')

function distributeX(objects) {
  return common.distributeX(objects, dim.x, dim.gap);
}
function distributeY(objects) {
  return common.distributeY(objects, dim.y, dim.gap);
}

var dim = {
  x: 240,
  y: 180,
  z: 28,
  gap: 3,
  bottom: 3,
}

main = function() {

  inicial = tiles.tiles(1);
  basico = tiles.tiles(71);
  pontuacao = tiles.tiles(8);
  rio = tiles.tiles(12);

  estalagens = tiles.tiles(18);
  circulos = tiles.tiles(6);
  construtores = tiles.tiles(24);
  maquinas = tiles.tiles(8);
  mensagens = tiles.tiles(8);
  barqueiros = tiles.tiles(8);
  minas = combine(tiles.tiles(1), tiles.tiles(8));
  feiticeiro = tiles.tiles(8);
  bandidos = combine(tiles.tiles(8), tiles.tiles(2));


  fila1 = distributeX([combine(inicial, basico), pontuacao, rio])
  fila2 = distributeX([estalagens, circulos, construtores, maquinas, mensagens, barqueiros])
  fila3 = distributeX([minas, feiticeiro, bandidos])

  filas = distributeY([union(fila1), union(fila2), union(fila3)])

  filas = union(filas).translate([0, 0, dim.bottom])

  final = cube({
    size: [dim.x, dim.y, dim.z]
  });

  // final = final.union(filas);
  final = final.subtract(filas);

  final = final.translate([final.getBounds()[1].x/-2, final.getBounds()[1].y/-2, 0])

  return final//.intersect(cube({size:[30, 60, 40]}).translate([-120, 35, 0]));
}

combine = function(obj1, obj2) {
  var b0 = obj1.getBounds()[0];
  var b1 = obj1.getBounds()[1];
  return union(
    obj1,
    cube({size: [1, b1.y, b1.z]}).translate([b1.x, b0.y, b1.z/3]),
    obj2.translate([b1.x + 1, b0.y, b0.z])
  )//.setColor([1,0,0]);
}
