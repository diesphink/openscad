include('common.js')
include('base_spacer_tiles.js')
include('base_spacer_caixa.js')

function distributeX(objects) {
  return common.distributeX(objects, dim.x, dim.gap);
}
function distributeY(objects) {
  return common.distributeY(objects, dim.y, (dim.y/5-common.dim.tiles.y)/2);
}

var dim = common.dim.base // Para o que me é relevante, só ligo para as dimensões da base

main = function() {
  var fila = cube({
    size: [dim.x, dim.y/5, dim.z]
  })

  filas = []

  starter = tiles.tiles(1)
  basico = tiles.tiles(71)
  meeples = combine([tiles.tiles(10),tiles.tiles(10),tiles.tiles(10),tiles.tiles(10),tiles.tiles(10),tiles.tiles(10)])
  abades = caixa.caixa(21)
  pontuacao = tiles.tiles(8)
  rio = tiles.tiles(12);
  estalagens = combine([tiles.tiles(18), caixa.caixa(20)]);
  circulos = tiles.tiles(6);
  construtores = combine([tiles.tiles(24), caixa.caixa(21), caixa.caixa(15), caixa.caixa(21)]);
  maquinas = combine([tiles.tiles(8), tiles.tiles(8)]);
  mensagens = combine([tiles.tiles(8), caixa.caixa(15)]);
  barqueiros = combine([tiles.tiles(8), caixa.caixa(4)]);
  minas = combine([tiles.tiles(1), tiles.tiles(8), caixa.caixa(15)]);
  feiticeiro = combine([tiles.tiles(8), caixa.caixa(11)]);
  bandidos = combine([tiles.tiles(8), caixa.caixa(15)]);


  filas[4] = [basico, starter]
  filas[3] = [meeples, rio]
  filas[2] = [mensagens, estalagens, abades, pontuacao]
  filas[1] = [maquinas, circulos, barqueiros, bandidos, feiticeiro]
  filas[0] = [minas, construtores]

  for (var i = 0; i < filas.length; i++) {
    filas[i] = union(distributeY([union(distributeX(filas[i]))])).translate([0, 0, dim.bottom])
    filas[i] = fila.subtract(filas[i])
  }

  // return union(distributeY(filas))
  return filas[2]
}

combine = function(objs) {
  var curr = objs[0]
  z_translate = curr.getBounds()[1].z/3
  for (var i = 1; i < objs.length; i++) {
    var b0 = curr.getBounds()[0];
    var b1 = curr.getBounds()[1];
    curr = union(
      curr,
      cube({size: [1, b1.y, b1.z]}).translate([b1.x, b0.y, z_translate]),
      objs[i].translate([b1.x + 1, b0.y, b0.z])
    )
  }
  return curr;
}
