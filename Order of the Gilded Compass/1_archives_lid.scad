include <lib/common.scad>;

module lid(tiles = 12, texto = "Hidden Temple")
{
	x = 90;
	z = (altura_base) + (tiles * altura_tile) + folga + (altura_ranhura);
	y = 68;

		// Tampa
		tampa(z = z, y = y, x = x);

	// Texto
	label_lid(texto = texto, z = z, x = x, y = y);
}

module tampa(y = 60, x = 55 ) {

	largura_ranhura = y - (2 * largura_parede_ranhura);
	largura_acima_ranhura = largura_ranhura - (2 * profundidade_ranhura);

	color([0,0.7,0.5])
	union() {

		// Tampa (ranhura 1)
    translate([x, profundidade_ranhura, 0])
    rotate([90,0,0]) rotate([0,0,90])
      prism(x, altura_ranhura * 0.8, profundidade_ranhura * 0.8);

    // Tampa (ranhura 2)
    translate([x, y - (2 * largura_parede_ranhura) - profundidade_ranhura, 0])
    rotate([0,0,90])
      prism(x, altura_ranhura * 0.8, profundidade_ranhura * 0.8);



		// Tampa (todo o resto)
		translate([0,profundidade_ranhura, 0])
		cube([x, largura_acima_ranhura, altura_ranhura * 0.8 ]);
	}
}


lid(tiles = 13, texto = "Archives");
