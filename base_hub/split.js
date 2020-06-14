split = (function() {

  function split({obj, at, axis}) {
    ob = obj.getBounds()
    var cube_size = [ob[1].x - ob[0].x, ob[1].y - ob[0].y, ob[1].z - ob[0].z]
    if (at == null)
      cube_size[axis] = cube_size[axis]/2
    else
      cube_size[axis] = at
    splitter = align({
      obj: cube({size: cube_size}),
      ref: obj,
      begin: [1, 1, 1]
    })

    return [obj.intersect(splitter), obj.subtract(splitter), splitter]

  }

  return split;
})()
