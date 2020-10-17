include('../libs/align.js')
include('c1.jscad')

main = function() {
  align.init()
  return c1().properties.tampaY
}
