include('carcassonne-logo.js')

main = function() {
  "use strict"

  var dimensoes_buraco = [100, 30, 3]
  var espaco_tampa = 5
  var espaco_clip = 3
  var z_tampa = 0.6
  var z_clip = 0.6
  var z_texto = 1
  var radius = 5
  var largura_borda = 2
  var fn = 8

  var base = cube({
    size: [dimensoes_buraco[0], dimensoes_buraco[1], dimensoes_buraco[2] + z_clip],
    center: [1, 1, 0]
  })

  var tampa = cube({
    size: [dimensoes_buraco[0] + espaco_tampa, dimensoes_buraco[1] + espaco_tampa, z_tampa],
    center: [1, 1, 0],
    radius: [radius, radius, 0],
    fn: fn
  }).translate([0, 0, dimensoes_buraco[2] + z_clip])

  var borda_tampa = cube({
    size: [dimensoes_buraco[0] + espaco_tampa, dimensoes_buraco[1] + espaco_tampa, z_texto],
    center: [1, 1, 0],
    radius: [radius, radius, 0],
    fn: fn
  }).translate([0, 0, dimensoes_buraco[2] + z_clip + z_tampa])

  var buraco_borda = cube({
    size: [dimensoes_buraco[0] + espaco_tampa - largura_borda, dimensoes_buraco[1] + espaco_tampa - largura_borda, z_texto *2],
    center: [1, 1, 0],
    radius: [radius, radius, 0],
    fn: fn
  }).translate([0, 0, dimensoes_buraco[2] + z_clip + z_tampa - z_texto/2])

  borda_tampa = borda_tampa.subtract(buraco_borda).setColor([0.9, 0.9, 0.9])

  var clip = cube({
    size: [dimensoes_buraco[0] + espaco_clip, dimensoes_buraco[1]/2, z_clip],
    center: [1, 1, 0],
    radius: [espaco_clip, espaco_clip, 0],
    fn: 12
  })



  var texto = logo.logo().scale([0.5, 0.5, 0.2 * z_texto]).translate([0, 0, z_clip + dimensoes_buraco[2] + z_tampa]).setColor([0.9, 0.9, 0.9])

  return base.union([tampa, texto, borda_tampa, clip])
}
