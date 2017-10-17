use <prisma.scad>

// Slot de tiles (parede indica as paredes de suporte quando tem pegador)
altura_base = 1;
tamanho_parede = 3;
largura_parede = 1;
folga = 2;

// Propriedades para a tampa
largura_parede_ranhura = 1;
altura_ranhura = 1.5;
profundidade_ranhura = 1.5;

// Altura do tile
altura_tile = 2;

// Slot de dados
tamanho_dado = 14;

module tile(x=1, y=1, altura=1, pegador=false) {
	color([1,0,0,1]) {
		x = x + 2.1;
		y = y + 2.1;
		z = (altura * 2) + 1;
		z = 100;
		translate([-0.05,-0.05,-0.05]) {
			cube([x, y, z]);
			if (pegador == "x") {
				translate([2, -2, 0])
				cube([x - 4, 2.05, z]);
			}
		}
	}
}

module tile_generico_g(y=12) {
	tile(x = 55, y = 30,pegador="x");
}

module tile_slot(x = 30, y = 30, pegador_x1, pegador_x2, pegador_y1, pegador_y2) {

	x = x + folga;
	y = y + folga;

	color([1,0,0,1]) union() {
		translate([0, 0, altura_base])
		cube([x, y, 100]);

		color([1,1,0,1]) {

		if (pegador_x1) {
			translate([tamanho_parede, -10, altura_base])
			cube([x - 2*(tamanho_parede), 20, 100]);
		}

		if (pegador_x2) {
			translate([tamanho_parede, y - 10, altura_base])
			cube([x - 2*(tamanho_parede), 20, 100]);
		}

		if (pegador_y1) {
			translate([-10, tamanho_parede, altura_base])
			cube([20, y - 2*(tamanho_parede), 100]);
		}

		if (pegador_y2) {
			translate([x - 10, tamanho_parede, altura_base])
			cube([20, y - 2*(tamanho_parede), 100]);
		}
		}

	}
}

module label_x1(texto = "Texto", z = 28, x = 90, ) {
	// Label
	font = "Liberation Sans";
	color([0, 0.2, 0.3])
  translate ([x / 2, 0.05, z / 2]) {
		rotate ([90,0,0]) {
			linear_extrude(height = 1) {
				text(texto,
					font = font,
					size = 8,
					spacing = 1,
					halign="center",
					valign="center" );
			}
		}
	}
}

module label_lid(texto = "Texto", z = 28, x = 90, y = 90) {
	// Label
	font = "Liberation Sans";
	color([0, 0.2, 0.3])
  translate ([x / 2, y / 2, altura_ranhura * 0.8 - 0.05]) {
		rotate ([0,0,0]) {
			linear_extrude(height = 1) {
				text(texto,
					font = font,
					size = 8,
					spacing = 1,
					halign="center",
					valign="center" );
			}
		}
	}
}

module tampa_x(y = 60, z = 28 ) {

	z = z - altura_ranhura;
	largura_ranhura = y - (2 * largura_parede_ranhura);
	largura_acima_ranhura = largura_ranhura - (2 * profundidade_ranhura);

	color([0,0.7,0.5]) union() {

		// Tampa (ranhura 1)
    translate([250, profundidade_ranhura + largura_parede_ranhura + 0.01, z])
    rotate([90,0,0]) rotate([0,0,90])
      prism(500, altura_ranhura, profundidade_ranhura);

    // Tampa (ranhura 2)
    translate([250, y - largura_parede_ranhura - profundidade_ranhura - 0.01, z])
    rotate([0,0,90])
      prism(500, altura_ranhura, profundidade_ranhura);



		// Tampa (todo o resto)
		translate([-1,largura_parede_ranhura + profundidade_ranhura, z])
		cube([500, largura_acima_ranhura,500]);
	}
}
