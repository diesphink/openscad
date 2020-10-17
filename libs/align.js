/*

(c) 2020 diesphink
This code is licensed under MIT license (see LICENSE for details)

Função align

  Alinha um objeto (obj) considerando uma referência (ref) em begin/center/end,
  possibilitando gaps, retornando objeto reposicionado.

  Para cada uma das matrizes de eixos (begin, center, end, beginToCenter,
  beginToEnd, centerToBegin, centerToEnd, endToBegin, endToCenter) possibilita
  receber 0 ou 1 em cada eixo ([eixo_x, eixo_y, eixo_z]) para establecer que o
  objeto deve ser alinhado dessa forma nesse eixo.

  Nesses cenários, begin (início) indica o menor valor do(s) objeto(s) no eixo,
  center (centro) indica o ponto médio ((max-min)/2) e end (fim) indica o maior
  valor do objeto no eixo.

  Gaps indica quanto deve ser deixado de espaço entre objeto e referência, para
  alinhamentos baseadas no begin (início) ou center (centro) do objeto, é
  aplicado um translate positivo do valor informado, para alinhamentos baseados
  no end (fim), é aplicado um translate negativo do valor passado. Valores
  negativos podem ser utilizados para inverter a lógica.

  Ref pode ser tanto um objeto, e aí serão considerados os limites dele, quanto
  pode ser uma coordenada ([x, y, z]) nos planos. Quando ref não for informado,
  usa o ponto de origem dos planos ([0,0,0])

Parâmetros

  obj:            Objeto a ser reposicionado/alinhado
  ref:            Objeto de referência para o alinhamento, se não informado
                  utiliza origem: [0,0,0]
  gaps:           Matriz indicando em cada eixo ([eixo_x, eixo_y, eixo_z])
                  quanto deve ser deixado de gap entre objeto e referência
  begin:          Matriz indicando alinhamento do início do objeto com o início da referência
  beginToCenter:  Matriz indicando alinhamento do início do objeto com o centro da referência
  beginToEnd:     Matriz indicando alinhamento do início do objeto com o fim da referência
  centerToBegin:  Matriz indicando alinhamento do centro do objeto com o início da referência
  center:         Matriz indicando alinhamento do centro do objeto com o centro da referência
  centerToEnd:    Matriz indicando alinhamento do centro do objeto com o fim da referência
  endToBegin:     Matriz indicando alinhamento do fim do objeto com o início da referência
  endToCenter:    Matriz indicando alinhamento do fim do objeto com o centro da referência
  end:            Matriz indicando alinhamento do fim do objeto com o fim da referência

Retorno
  obj reposicionado de acordo com os parâmetros de alinhamento com referência

Exemplo
  // Cria um cubo e alinha ele acima do cubo1, centralizado nos eixos x e y
  var cubo1 = cube({size: [2, 2, 2]})
  var cubo2 = align({
    obj: cube({size: [1, 1, 1]})
    ref: cubo1,
    center: [1, 1, 0],
    beginToEnd: [0, 0, 1]
  })

*/

align = (function() {
  "use strict"

  function align({obj, ref = null,
    gaps = [0, 0, 0],
    begin = [0, 0, 0],
    center = [0, 0, 0],
    end = [0, 0, 0],
    beginToCenter = [0, 0, 0],
    beginToEnd = [0, 0, 0],
    centerToBegin = [0, 0, 0],
    centerToEnd = [0, 0, 0],
    endToBegin = [0, 0, 0],
    endToCenter = [0, 0, 0]
    } = {}) {
    var ob = obj.getBounds()
    var rb;
    if (ref == null)
      rb = [{x:0, y:0, z: 0}, {x:0, y:0, z: 0}]
    else if (Array.isArray(ref))
      rb = [{x: ref[0], y: ref[1], z: ref[2]}, {x: ref[0], y: ref[1], z: ref[2]}]
    else
      rb = ref.getBounds()


    var bRef = [rb[0].x, rb[0].y, rb[0].z]
    var bObj = [ob[0].x, ob[0].y, ob[0].z]
    var cRef = [(rb[0].x + rb[1].x) / 2, (rb[0].y + rb[1].y) / 2, (rb[0].z + rb[1].z) / 2]
    var cObj = [(ob[0].x + ob[1].x) / 2, (ob[0].y + ob[1].y) / 2, (ob[0].z + ob[1].z) / 2]
    var eRef = [rb[1].x, rb[1].y, rb[1].z]
    var eObj = [ob[1].x, ob[1].y, ob[1].z]
    var deltas = [0, 0, 0]

    for (var i = 0; i <= 2; i++) {
      var from = null
      var to = null 
      if (begin[i] || beginToCenter[i] || beginToEnd[i])
        from = bObj[i]
      if (centerToBegin[i] || center[i] || centerToEnd[i])
        from = cObj[i]
      if (endToBegin[i] || endToCenter[i] || end[i])
        from = eObj[i]

      if (begin[i] || centerToBegin[i] || endToBegin[i])
        to = bRef[i]
      if (beginToCenter[i] || center[i] || endToCenter[i])
        to = cRef[i]
      if (beginToEnd[i] || centerToEnd[i] || end[i])
        to = eRef[i]

      if (from != null && to != null)
        deltas[i] = to - from

      if (endToBegin[i] || endToCenter[i] || end[i])
        deltas[i] -= gaps[i]
      else
        deltas[i] += gaps[i]

    }

    return obj.translate(deltas)
  }

  function init() {
    if (CSG.align) return;
    CSG.prototype.align = function(ref,
      {
        gaps = [0, 0, 0],
        begin = [0, 0, 0],
        center = [0, 0, 0],
        end = [0, 0, 0],
        beginToCenter = [0, 0, 0],
        beginToEnd = [0, 0, 0],
        centerToBegin = [0, 0, 0],
        centerToEnd = [0, 0, 0],
        endToBegin = [0, 0, 0],
        endToCenter = [0, 0, 0]
      } = {}) {
        return align({
          obj: this,
          ref, gaps, begin, center, end, beginToCenter, beginToEnd, centerToBegin, centerToEnd, endToBegin, endToCenter
        })
      }
    }

  return {align, init};
})()
