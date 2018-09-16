include('wall_mount.js')

main = function() {
  return wall_mount.base().subtract(wall_mount.hollow())
}
