common = (function() {

  dim = {
    base: { // Base indica a soma de todas as 5 filas diferentes de tiles, que correrão no eixo X, distribuídos no Y
      x: 180, // Distância completa que cada fila terá, e consequentemente a base toda terá
      y: 260, // Distância completa que a soma das 5 filas terá
      z: 28, // Altura das bases
      gap: 2, // Espaçamento das beiradas no eixo X
      bottom: 0.6, // Altura da base até começar o vão dos tiles
      folga_tiles: 0.2,  // Folga extra para o X, nos tiles
      folga_caixa: 0.6
    },
    tiles: { // tamanhos dos tiles, para espaçamento na base
      y: 46, // Tamanho no Y, está com folga, a medida é 45
      z: 46, // Tamanho no Z, está com folga, a medida é 45, e o tile vai em pé, por isso Z
      x: 2.2, // "altura" do tile, com folga de .2, o tile vai em pé, por isso X
    },
    caixa: { // Tamnho das caixas de peças e componentes
      y: 45, // Tem o mesmo tamanho de um tile
      x: 45, // Tem o mesmo tamanho de um tile
      folga_z: 0.5, // Possui uma folga no z em comparação com a medida recebida como altura dos componentes
      bottom: 0.6, // Parede inferior da caixa
      wall: 2, // Grossura ads paredes
      inner_wall: 0.8, // Grossura das paredes internas
      radius_xy: 2, // curvatura horizontal da caixa
      radius_z: 0, // curvatura vertical (z) da caixa (é menorzinha, para ficar igual da tampa)
      lid: {
        x: 43.2,
        y: 43.2,
        z: 2,
        grip_x: 10,
        folga_grip: 0.4,
        folga: 0.4,
        wall: 2
      },
      tampa: {
        z: 0.6
      }
    }
  }

  function distributeX(objects, x, gap) {
    var total = 0;
    for (var i = 0; i < objects.length; i++)
      total += objects[i].getBounds()[1].x;

    if (total > x)
      return objects;

    var space_between = (x - (2 * gap) - total)/(objects.length-1);
    for (var i = 0; i < objects.length; i++) {
      var current = gap;
      if (i != 0)
        current = objects[i-1].getBounds()[1].x + space_between;
      objects[i] = objects[i].translate([current, 0, 0]);
    }
    return objects;
  }

  function distributeY(objects, y, gap) {
    var total = 0;
    for (var i = 0; i < objects.length; i++)
      total += objects[i].getBounds()[1].y;

    if (total > y)
      return objects;

    var space_between = (y - (2 * gap) - total)/(objects.length-1);
    for (var i = 0; i < objects.length; i++) {
      var current = gap;
      if (i != 0)
        current = objects[i-1].getBounds()[1].y + space_between;
      objects[i] = objects[i].translate([0, current, 0]);
    }
    return objects;
  }

  return {distributeY, distributeX, dim};
})()
