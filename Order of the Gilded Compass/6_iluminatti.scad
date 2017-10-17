include <common.scad>;

module duplo_grande(tiles = 12, texto = "Hidden Temple")
{
	x = 90;
	z = (altura_base) + (tiles * altura_tile) + folga + (altura_ranhura);
	y = 68;
	echo(str("[Z] Altura do box: ", z));
	echo(str("[Y] Profundidade do box: ", y));
	difference() {
		// Base
		cube([x, y, z]);

		tile_y = 60;
		tile_x = 30;

		// Tile 1
		translate([largura_parede, (y - tile_y - folga) / 2, 0])
		tile_slot(x = tile_x, y = tile_y, pegador_y1 = true);

		// Tile 2
		translate([x - largura_parede - tile_x - folga, (y - tile_y - folga) / 2, 0])
		tile_slot(x = tile_x, y = tile_y, pegador_y2 = true);

		// Tampa
		tampa_x(z = z, y = y);

		// Slot dos dados
		translate([(x - tamanho_dado) / 2, (y - 2 * tamanho_dado) / 2, z - altura_ranhura - tamanho_dado + 0.02])
			dice_slot(n_y = 2);
	}

	// Texto
	label_x1(texto = texto, z = z, x = x);

}

module dice_slot(n_x = 1, n_y = 1) {
	color([0.5,0.5,0.7]) union() {
		hull() {
		cube([tamanho_dado * n_x, tamanho_dado * n_y, tamanho_dado]);
		translate ([-1, -1, tamanho_dado - 2 ])
			cube([tamanho_dado * n_x + 2, tamanho_dado * n_y + 2, 2]);
		translate([tamanho_dado * n_x / 2, 0, 0])
			cylinder(h=15, r1 = 0, r2 = 7);
		translate([tamanho_dado * n_x / 2, tamanho_dado * n_y, 0])
				cylinder(h=15, r1 = 0, r2 = 7);
			}
		}
}

duplo_grande(tiles = 10, texto = "Illuminati");
