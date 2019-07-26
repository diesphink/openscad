tiles = (function() {
  "use strict"

  var dim = {
    size: 46,
    y: 46,
    z: 46,
    x: 2.2
  }

  function tiles(qtdTiles) {
    var space = cube({
      size: [dim.x * qtdTiles, dim.y, dim.z]
    })
    var bnd = space.getBounds()[1];

    // var grip1 = sphere({r: 8, fn: 12 }).translate([bnd.x, bnd.y/2, bnd.z/2]);
    // var grip2 = sphere({r: 8, fn: 12 }).translate([0, bnd.y/2, bnd.z/2]);

    return union(space).setColor([0, 1, 0.3, 1]);
  }

  return {dim, tiles}
})()

function main() {
  return tiles.tiles(12);
  // .union(plug_12v.screw_tab().translate([plug_12v.dim.x/2, -11, 0]))
  // .union(plug_12v.screw_tab().mirroredY().translate([plug_12v.dim.x/2, 11, 0]))
}
