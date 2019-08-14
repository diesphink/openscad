common = (function() {
  "use strict"

  var dim = {
    x: 43,
    y: 42,
    z: 25,
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
      z: 14
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
      folga: 0.4,
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
        bloco: 5
      }
    },
     base: {
       y: 50,
       x: 90,
       z: 3,
       parede_grossa: 2,
       parede_fina: 2,
       folga: 0,
       raio_parafuso_grande: 6/2,
       suporte: {
         z: 50
       },
     },
     rj45: {
       x: 19,
       y: 23.5,
       espaco_cabos: 20,
       distancia: 2,
       buraco: {
         x: 15,
         y: 20.5
       }
     }
  }

  dim.slit.interno.z_pos = dim.z - (dim.slit.interno.z/2)
  dim.tampa.lid.x = dim.placa.x + dim.placa.folga - dim.tampa.folga
  dim.base.suporte.y = dim.slit.z
  dim.base.inicio_ranhura = dim.y/2 - 10
  dim.base.x = dim.base.folga + dim.x + dim.slit.x*2 + 6*dim.base.parede_grossa + dim.base.raio_parafuso_grande * 2
  dim.parede_caixa = (dim.y-dim.placa.y-dim.placa.folga)/2
  dim.x = dim.parede_caixa * 3 + dim.rj45.x + dim.placa.x + dim.placa.folga

  dim.x = dim.x + 5
  console.log(dim.x)
  dim.z = dim.z + 5
  dim.canto.z = dim.canto.z + 5
  dim.slit.interno.z_pos += 5
  // dim.slit.interno.z += 5


return {dim}
})()
