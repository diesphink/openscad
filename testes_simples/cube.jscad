include('../libs/align.js')
include('../libs/split.js')

function main() {
  partes = splitZ({
    obj: sphere({r: 3}),
    at: [2.7,3]
  })
  return partes[0].translate([-1, 0, 0])
  .union(partes[1])
  .union(partes[2].translate([1, 0, 0]))
}
