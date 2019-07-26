common = (function() {

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

  return {distributeY, distributeX};
})()
