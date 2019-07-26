suporte1 = (function() {
  "use strict"

var dim = {}
dim.x_com_grip= 37.45
dim.x_sem_grip= 34
dim.y_suporte= 21.88
dim.y_pino= 22.36
dim.y_pino_ponta= 8.5
dim.x_pino_ponta= 6
dim.x_pino= 3
dim.distancia_entre_pinos= 13.5
dim.y_entrancia_entre_pinos = 1
dim.y_sem_grip = 7
dim.altura_pinos = 31.3
dim.z = 34

// computed
dim.y_com_grip = dim.y_suporte - dim.y_sem_grip
dim.x_cada_grip = (dim.x_com_grip - dim.x_sem_grip)/2
dim.borda_ate_pino = (dim.x_com_grip - (2 * dim.x_pino) - dim.distancia_entre_pinos)/2
dim.y_pino_sem_ponta = dim.y_pino - dim.y_pino_ponta
dim.x_pino_so_ponta = dim.x_pino_ponta - dim.x_pino

// interno
dim.x_interno = 30.1
dim.y_interno = 14.6
dim.x_interno_abertura = 32.4
dim.y_interno_abertura = 14.6
dim.y_pino_protusao = 5
dim.borda_ate_pino_interno = (dim.x_interno - (2 * dim.x_pino) - dim.distancia_entre_pinos)/2

// trava
dim.trava = {}
dim.trava.x = 30
dim.trava.y = 3
dim.trava.z = 2


    var x = dim.x_cada_grip, y = 0;
function maior() {
    var externo = polygon([
      [x, y],
      [x += dim.x_sem_grip, y],
      [x, y += dim.y_sem_grip],
      [x += dim.x_cada_grip, y],
      [x, y += dim.y_com_grip],
      [x -= dim.borda_ate_pino, y],
      [x, y += dim.y_pino_sem_ponta],
      [x += dim.x_pino_so_ponta, y],
      [x -= dim.x_pino_so_ponta, y +=dim.y_pino_ponta],
      [x -= dim.x_pino, y],
      [x, y -= dim.y_pino + dim.y_entrancia_entre_pinos],
      [x -= dim.distancia_entre_pinos, y],
      [x, y += dim.y_pino + dim.y_entrancia_entre_pinos],
      [x -= dim.x_pino, y],
      [x -= dim.x_pino_so_ponta, y -=dim.y_pino_ponta],
      [x += dim.x_pino_so_ponta, y],
      [x, y -= dim.y_pino_sem_ponta],
      [x -= dim.borda_ate_pino, y],
      [x, y -= dim.y_com_grip],
      [x += dim.x_cada_grip, y],
    ])
    externo = externo.extrude({ offset: [0, 0, dim.z] })

    x = (dim.x_com_grip - dim.x_interno) / 2
    y = (dim.y_suporte - dim.y_interno) / 2

    var interno = polygon([
      [x, y],
      [x += dim.x_interno, y],
      [x, y += dim.y_interno],
      [x -= dim.borda_ate_pino_interno, y],
      [x, y -= dim.y_pino_protusao],
      [x -= dim.x_pino, y],
      [x, y += dim.y_pino_protusao],
      [x -= dim.distancia_entre_pinos, y],
      [x, y -= dim.y_pino_protusao],
      [x -= dim.x_pino, y],
      [x, y += dim.y_pino_protusao],
      [x -= dim.borda_ate_pino_interno, y],
    ])
    interno = interno.extrude({ offset: [0, 0, dim.z] })

    x = (dim.x_com_grip - dim.x_interno) / 2
    y = (dim.y_suporte - dim.y_interno) / 2

    var interno = polygon([
      [x, y],
      [x += dim.x_interno, y],
      [x, y += dim.y_interno],
      [x -= dim.borda_ate_pino_interno, y],
      [x, y -= dim.y_pino_protusao],
      [x -= dim.x_pino, y],
      [x, y += dim.y_pino_protusao],
      [x -= dim.distancia_entre_pinos, y],
      [x, y -= dim.y_pino_protusao],
      [x -= dim.x_pino, y],
      [x, y += dim.y_pino_protusao],
      [x -= dim.borda_ate_pino_interno, y],
    ])
    interno = interno.extrude({ offset: [0, 0, dim.z] })

    x = 0
    y = 0

    var trava = polygon([
      [x, y],
      [x += dim.trava.z * 2, y],
      [x, y += dim.trava.y],
      [x -= dim.trava.z, y]
    ])

    trava = trava.extrude({ offset: [0, 0, dim.trava.x ]})
    trava = trava.rotateY(270).rotateZ(180).translate([(dim.x_com_grip - dim.trava.x)/2, 0, dim.z - dim.trava.z * 2 - 1])



    // return trava.union(cube({size: [3, 3, 3]}))

    return externo.subtract(
      interno.translate([0, 0, 4])
    )
    .subtract(
      cube({size:[dim.x_com_grip, dim.y_pino + 0.01, 10]})
      .translate([0, dim.y_suporte, dim.altura_pinos])
    )
    .union(trava)
    .setColor([0, 0.4, 0.2])
  }

  return {dim, maior}
})()

function main() {
  return suporte1.maior()
}
