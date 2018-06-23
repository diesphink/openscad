module aropq() {
  translate([0,0,1.5])
  difference() {
    cylinder (3, 12, 12, center=true, $fn=100);
    cylinder (6, 11, 11, center=true, $fn=100);
  };
}

module arogd() {
  translate([0,0,1.5])
  difference() {
    cylinder (3, 20, 20, center=true, $fn=100);
    cylinder (6, 19, 19, center=true, $fn=100);
  };
}


/*difference() {
  translate([-20, -20, 0])
    cube([40, 40, 8]);
  translate([0,0,5.01])
    cylinder (6, 10, 10, center=true, $fn=100);
};*/
translate([-20, -20, 0])
  cube([40, 40, 1]);
translate([0,0,1]) {
  aropq();
  arogd();
}
