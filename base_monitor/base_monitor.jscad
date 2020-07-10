include('../libs/align.js')

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
}
