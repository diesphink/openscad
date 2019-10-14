include('common.js')

caixa = (function() {
  "use strict"

  var dim = common.dim

  function caixa(z) {
    var space = cube({
      size: [z + dim.caixa.folga_z + dim.caixa.bottom + dim.caixa.tampa.z + dim.base.folga_caixa, dim.tiles.y, dim.tiles.z]
    })
    var bnd = space.getBounds()[1];

    return union(space).setColor([0, 1, 0.3, 1]);
  }

  return {dim, caixa}
})()
