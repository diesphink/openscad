include('../libs/align.js')

function split({obj, at, axis}) {
  ob = obj.getBounds()
  var cube_size = [ob[1].x - ob[0].x, ob[1].y - ob[0].y, ob[1].z - ob[0].z]
  if (at == null)
    cube_size[axis] = cube_size[axis]/2
  else
    cube_size[axis] = at
  splitter = cube({size: cube_size})
  .align(obj, {begin: [1, 1, 1]})

  return [obj.intersect(splitter), obj.subtract(splitter), splitter]

}

base_monitor = (function() {

  var x = 0; y = 1; z = 2

  var dim = [71, 57, 31]

  function forma_base(dimensoes) {
    var base = cube({size: dimensoes})
    base = base.union(
      cylinder({r: (dimensoes[x])/2, h: dimensoes[z], fn: 50})
      .align(base, {center: [1, 0, 0], centerToBegin: [0, 1, 0]})
    )

    return base
  }

  function base_monitor() {

    paredes = 4
    sobra_z = 4

    var externo = forma_base([dim[x] + paredes * 2, dim[y], dim[z] + sobra_z])

    return externo.subtract(
        forma_base([dim[x], dim[y], sobra_z]).setColor([0.1, 0.7, 0.2])
        .align(externo, {center: [1, 0, 0], end: [0, 1, 1]})
    )
  }

  return base_monitor
})()

main = function() {
  align.init()
  
  return base_monitor()
  // return split({
  //   obj: split({axis: 2, at: 30, obj: base_monitor()})[1],
  //   axis: 2,
  //   at: 2
  // }) [0]
}
