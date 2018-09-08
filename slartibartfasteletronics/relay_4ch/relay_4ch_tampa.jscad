include('relay_4ch.jscad')

function main() {
  return relay_4ch.tampa().mirroredZ()//.union(relay_4ch.tampa().setColor([0, 0, 1, 0.4]));
}
