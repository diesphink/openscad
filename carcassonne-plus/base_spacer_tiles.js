include('common.js')

tiles = (function() {
  "use strict"

  var dim = common.dim.tiles

  function tiles(qtdTiles) {
    var space = cube({
      size: [dim.x * qtdTiles + common.dim.base.folga_tiles, dim.y, dim.z]
    })
    var bnd = space.getBounds()[1];

    return union(space).setColor([0, 1, 0.3, 1]);
  }

  return {dim, tiles}
})()
