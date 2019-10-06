common = (function() {
  "use strict"

  var dim = {
    x: 43,
    y: 43,
    z: 21,
    cabo: 5,
    fn: 18,
    placa: {
      x: 38,
      y: 38,
      folga: 0.5,
    },
    canto: {
      x: 3,
      y: 3,
      z: 10
    },
    canto_grande: {
      x: 5,
      y: 5,
      raio_parafuso: 1,
      z_parafuso: 7
    },
    clip: {
      y: 5,
      z: 5,
      distancia_borda: 3
    },
    slit: {
      x: 4,
      y: 10,
      z: 12,
      interno: {
        x: 2.8,
        y: 6,
        z: 6,
      },
      raio_parafuso: 3.6/2,
    },
    tampa: {
      z: 2,
      folga: 0.5,
      r: 16/2,
      snap: {
        r: 1,
        y: 5,
        folga: 0.5
      },
      lid: {
        z: 5,
        x: 5,
        barra: 5,
      }
    },
     base: {
       y: 50,
       x: 80,
       z: 3,
       parede_grossa: 2,
       parede_fina: 2,
       folga: 0.5,
       raio_parafuso_grande: 6/2,
       suporte: {
         z: 50
       },
     }
  }

  dim.placa.x = 39
  dim.placa.y = 39
  dim.z = 21
  dim.canto.z = 9


  dim.slit.interno.z_pos = dim.z - (dim.slit.interno.z/2)
  dim.tampa.lid.x = dim.placa.x + dim.placa.folga - dim.tampa.folga
  dim.base.suporte.y = dim.slit.z
  dim.base.inicio_ranhura = dim.y/2 - 10
  dim.base.x = dim.base.folga + dim.x + dim.slit.x*2 + 6*dim.base.parede_grossa + dim.base.raio_parafuso_grande * 2


return {dim}
})()
