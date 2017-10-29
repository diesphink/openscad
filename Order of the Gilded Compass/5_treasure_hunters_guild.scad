include <lib/common.scad>;

module duplo_grande(tiles = 12, texto = "Hidden Temple")
{
	x = 90;
	z = (altura_base) + (tiles * altura_tile) + folga + (altura_ranhura);
	y = 70;
	echo(str("[Z] Altura do box: ", z));
	echo(str("[Y] Profundidade do box: ", y));
	difference() {
		// Base
		cube([x, y, z]);

		tile_y = 62;
		tile_x = 49;

		// Tile 1
		/*translate([largura_parede, (y - tile_y - largura_parede - folga ), 0])*/
		translate([(x - tile_x - 2)/2, (y - tile_y - folga) / 2, 0])
		tile_slot(x = tile_x, y = tile_y, pegador_x2 = true, pegador_y1 = false);


		// Tiles sobre tudo
		tile_y_sobre = 49;
		tile_x_sobre = 62;
		translate([(x - tile_x_sobre - 2)/2, (y - tile_y_sobre - folga) / 2, altura_base + 18 * altura_tile])
		tile_slot(x = tile_x_sobre, y = tile_y_sobre, pegador_x2 = false, pegador_y1 = false);

		/*translate([(x - 70) / 2, (y - 45) / 2, altura_base + 12 * altura_tile])
		tile_slot(x = 70, y = 45);*/

		// Tampa
		tampa_x(z = z, y = y);

	}

	// Texto
	label_x1(texto = "Treasure", z = z*1.3, x = x);
	label_x1(texto = "Hunters' Guild", z = z*0.7, x = x);
}

duplo_grande(tiles = 22, texto = "Treasure Hunters' Guild");
