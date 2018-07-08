altura_caixa = 72;

x = 204;
y = 171;
z = 50;

folga = 2;
div = 3;
curr_y = 0;

module token_holder_slot(vector, texto = "") {
  x = vector[0];
  y = vector[1];
  z = vector[2];

  myx = x + folga;
  myy = z + folga + 1; //1 from the lettering
  myz = y + 1; // 1 from lettering

  translate([0, 0, altura_caixa - y]) {
    cube([myx, myy, myz]);
    /*translate([2, 0,- 0.9])
      label_x1(texto=texto);*/
  }
}

module label_x1(texto = "Texto") {
	// Label
	font = "Liberation Sans";
	color([0, 0.2, 0.3])
    rotate([0, 0, 90])
			linear_extrude(height = 1) {
				text(texto,
					font = font,
					size = 6,
					spacing = 1,
					halign="left",
					valign="top" );
			}
}

module base() {

  difference() {
    cube([x, y, z]);
    translate([div, 0, 0]) {

      // Library
      y1 = div;
      dim1 = [100, 68, 20.5];
      translate([0, y1, 0])
        token_holder_slot(dim1, "L");

      // University
      y2 = y1 + div + folga + 1 + dim1[2];
      dim2 = [100, 40, 27];
      translate([0, y2, 0])
        token_holder_slot(dim2, "U");

      // Auction House
      y3 = y2 + div + folga + 1 + dim2[2];
      dim3 = [100, 58, 40.5];
      translate([0, y3, 0])
        token_holder_slot(dim3, "AH");

      // Sunken Galleon
      y4 = y3 + div + folga + 1 + dim3[2];
      dim4 = [100, 40, 23];
      translate([0, y4, 0])
        token_holder_slot(dim4, "SG");

      // Trasure Tower
      y5 = y4 + div + folga + 1 + dim4[2];
      dim5 = [100, 40, 27];
      translate([0, y5, 0])
        token_holder_slot(dim5, "TT");

    }

    translate([div * 2 + 100 + folga, 0, 0]) {
      // Archives
      y1 = div;
      dim1 = [90, 68, 30.5];
      translate([0, y1, 0])
        token_holder_slot(dim1, "A");

      // Treasure Hunter's Guild
      y2 = y1 + div + folga + 1 + dim1[2] + 4;
      dim2 = [90, 70, 48.5];
      translate([0, y2, 0])
        token_holder_slot(dim2, "THG");

      // Illuminati
      y3 = y2 + div + folga + 1 + dim2[2] + 4;
      dim3 = [90, 60, 24.5];
      translate([0, y3, 0])
        token_holder_slot(dim3, "I");

      // Hidden Temple
      y4 = y3 + div + folga + 1 + dim3[2] + 4;
      dim4 = [90, 60, 28.5];
      translate([0, y4, 0])
        token_holder_slot(dim4, "HT");

    }
  }
}
intersection() {
  /*translate([0,0,30.01])*/
    /*cube([300,300,2]);*/
  base();
}
