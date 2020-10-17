include('align.js')
include('split.js')
include('distribute.js')

Box = (function() {
  "use strict"

  var x = 0;
  var y = 1;
  var z = 2;

  const LID_SLIDE = 0;

  class Box {

    constructor() {
      this.dimensions = [5, 3, 2]
      this.wall_dimensions = [0.2, 0.2, 0.2];
      this.radius = [0.1, 0.1, 0.1]
      this.inner_radius = null
      this.fn = 16

      this.lid_type = LID_SLIDE;
      this.z_lid = 0.2; 
      this.lid_gap = 0.1

      this.slide = {}
      this.slide.direction = x
    }

    _basicBox() {

      var inner_hollow_dimensions = [
        this.dimensions[x]-this.wall_dimensions[x] * 2,
        this.dimensions[y]-this.wall_dimensions[y] * 2,
        this.dimensions[z]-this.wall_dimensions[z] * 2
      ]

      if (this.lid_type == LID_SLIDE)
        inner_hollow_dimensions[z] = inner_hollow_dimensions[z] + this.wall_dimensions[z] + 0.01

      var inner_hollow_radius = this.inner_radius || [
        this.radius[x] - this.wall_dimensions[x],
        this.radius[y] - this.wall_dimensions[y],
        this.radius[z] - this.wall_dimensions[z]
      ]

      var inner_hollow_translate = [0, 0, this.wall_dimensions[z]]

      var outer_shell = cube({size: this.dimensions, radius: this.radius, fn: this.fn})
      var inner_hollow = cube({size: inner_hollow_dimensions, radius: inner_hollow_radius, fn: this.fn})
      inner_hollow = inner_hollow.translate(inner_hollow_translate)

      return outer_shell.subtract(inner_hollow.align(outer_shell, {center: [1, 1, 0]}))
    }

    _cutHoleForLid(basic_box) {
      if (this.lid_type == LID_SLIDE)
        return this._cutHoleForLidSlide(basic_box)
    }

    _cutHoleForLidSlide(basic_box) {

      var third_of_lid = this.z_lid/3
      var other_direction = this.slide.direction == x ? y : x
      var half_of_wall = this.wall_dimensions[other_direction] / 2
      var slide_radius = Math.min(third_of_lid, half_of_wall)
      var slide_cube_dims = [this.dimensions[x], this.dimensions[y], this.z_lid]
      slide_cube_dims[other_direction] = slide_cube_dims[other_direction] - 2 * this.wall_dimensions[other_direction]

      var slide_hollow_cyl = cylinder({r: slide_radius, h: this.dimensions[this.slide.direction]})
      if (this.slide.direction == x)
        slide_hollow_cyl = slide_hollow_cyl.rotateY(90)
      else
        slide_hollow_cyl = slide_hollow_cyl.rotateX(90)
      var slide_hollow_cube = cube({size: slide_cube_dims})

      var slide_hollow = slide_hollow_cube.union(
        slide_hollow_cyl.align(slide_hollow_cube, {
          center: [this.slide.direction == x, this.slide.direction == y, 1],
          centerToBegin: [this.slide.direction == y, this.slide.direction == x, 0]})
      ).union(slide_hollow_cyl.align(slide_hollow_cube, {
          center: [this.slide.direction == x, this.slide.direction == y, 1],
          centerToEnd: [this.slide.direction == y, this.slide.direction == x, 0]})
      )

      slide_hollow = slide_hollow.align(basic_box, {
        center: [this.slide.direction == y, this.slide.direction == x, 0],
        end: [0, 0, 1]
      })


      // var slide_hollow1 = align({
      //   obj: slide_hollow_c,
      //   ref: basic_box,
      //   begin: [1, 1, 0],
      //   end: [0, 0, 1]
      // })
      //
      // var slide_translation = [0, 0, -third_of_lid]
      // slide_translation[other_direction] = this.wall_dimensions[other_direction] - slide_radius

      // return basic_box.union(slide_hollow_cyl).union(slide_hollow_cube)
      return basic_box.subtract(slide_hollow)
    }

    box() {
      var basic_box = this._basicBox()
      var holed_box = this._cutHoleForLid(basic_box)
      return holed_box;
    }
  }
  return Box;
})()


main = function() {
  align.init()

  var b = new Box()
  return b.box()
}
