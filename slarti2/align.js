align = (function() {

  function align({obj, ref,
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
    rb = ref.getBounds()
    ob = obj.getBounds()


    bRef = [rb[0].x, rb[0].y, rb[0].z]
    bObj = [ob[0].x, ob[0].y, ob[0].z]
    cRef = [(rb[0].x + rb[1].x) / 2, (rb[0].y + rb[1].y) / 2, (rb[0].z + rb[1].z) / 2]
    cObj = [(ob[0].x + ob[1].x) / 2, (ob[0].y + ob[1].y) / 2, (ob[0].z + ob[1].z) / 2]
    eRef = [rb[1].x, rb[1].y, rb[1].z]
    eObj = [ob[1].x, ob[1].y, ob[1].z]
    deltas = [0, 0, 0]

    for (i = 0; i <= 2; i++) {
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

  return align;
})()
