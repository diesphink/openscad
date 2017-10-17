SCADS = $(wildcard *.scad)
STLS = $(SCADS:%.scad=output/%.stl)
OPENSCAD = openscad

all: $(STLS)

# Inclui as dependências geradas pelo openscad
include $(wildcard output/*.deps)

output/%.stl: %.scad

# Cria o diretório se não existir
	if [ ! -d output ]; then mkdir output; fi

# Gera os arqivos stl (e deps)
	$(OPENSCAD) -m make -o $@ -d $@.deps $<

clean:
	rm -rf output
