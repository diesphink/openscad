# Programas
OPENSCAD = openscad
SLIC3R = ~/opt/slic3r/slic3r

# Os arquivos para compilar
SCADS = $(wildcard *.scad)
STLS = $(SCADS:%.scad=output/%.stl)
GCODES = $(SCADS:%.scad=output/%.gcode)

# Cores
BOLD 				= \033[1;39m
GCODE	  		= \033[1;32m
STL		 		 	= \033[1;35m
NO_COLOR    = \033[m

.SECONDARY: $(STLS)

all: $(GCODES)

# Inclui as dependências geradas pelo openscad
include $(wildcard output/*.deps)

output/%.gcode: output/%.stl
	@# Gera os arqivos stl (e deps)
	@printf "%b" "$(BOLD)[$(GCODE)GCODE$(BOLD)] $(@)$(NO_COLOR)\n";
	@$(SLIC3R) $< 2>&1 | grep -v '=>' | sed 's/^/        /'

output/%.stl: %.scad
	@# Cria o diretório se não existir
	@#
	@if [ ! -d output ]; then mkdir output; fi
	@# Gera os arqivos stl (e deps)
	@printf "%b" "$(BOLD)[$(STL)STL$(BOLD)  ] $(@)$(NO_COLOR)\n";
	@$(OPENSCAD) -m make -o $@ -d $@.deps $< 2>&1 | sed 's/^/        /'

clean:
	rm -rf output
