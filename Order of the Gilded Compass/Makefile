SCADS=$(wildcard *.scad)
STLS=$(SCADS:%.scad=output/%.stl)

all: $(STLS)

# Inclui as dependências geradas pelo openscad
include $(wildcard output/*.deps)

output/%.stl: %.scad
	openscad -m make -o $@ -d $@.deps $<

clean:
	rm output/*.stl
