include <cyl_head_bolt.SCAD>;

$fn=60;

dim = [22.3, 76.6, 6];
x = 0;
y = 1;
z = 2;

difference() {
  intersection() {
    cube([dim[x], dim[x], 50], center=true);
    import("cam_base.STL", convexity = 5);
  }
  translate([0, 0, 5]) #nutcatch_sidecut("M3", l=100, clk=0.1, clh=0.1, clsl=0.1);
  rotate([180, 0, 0])
    hole_through("M3");
}

/*difference() {
	translate([-15, -15, 0]) cube([80, 30, 50]);
	rotate([180,0,0]) nutcatch_parallel("M5", l=5);
	translate([55, 0, 9]) nutcatch_sidecut("M8", l=100, clk=0.1, clh=0.1, clsl=0.1);
}*/
