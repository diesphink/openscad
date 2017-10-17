SRCS=$(wildcard *.scad)
OBJS=$(SRCS:.scad=.stl)
all: $(OBJS)
	echo teste

%.stl: %.scad
	openscad -m make -o output/$@ $<
