
import { canvas } from '../constants'

class World {
  constructor(width, height){
    this.width = width || window.innerWidth
    this.height = height || window.innerHeight
    this.instance = new PIXI.Container()

    // function binding
    this.add_object = this.add_object.bind(this)
    this.add_objects = this.add_objects.bind(this)
    this.remove_object = this.remove_object.bind(this)
    this.exceed_boundary = this.exceed_boundary.bind(this)
    this.draw_borders = this.draw_borders.bind(this)
    this.draw_grids = this.draw_grids.bind(this)


    // draw border
    this.draw_borders()
    this.draw_grids()

  }

  add_object(game_object){
    this.instance.addChild(game_object.instance)
  }
  add_objects(game_objects){
    game_objects.forEach(game_object => this.instance.addChild(game_object.instance))
  }
  remove_object(game_object){
    this.instance.removeChild(game_object.instance)
  }

  exceed_boundary(position){
    return 0 <= position.x && position.x < this.width && 0 <= position.y && position.y < this.height
  }

  draw_grids(){
    let grids = new PIXI.Graphics()
    grids.lineStyle(2, 0xBDBDBD)
    for(let x = 0; x < this.width; x += 100)
       grids.moveTo(x, 0).lineTo(x, this.height)
    for(let y = 0; y < this.height; y += 100)
       grids.moveTo(0, y).lineTo(this.width, y)    
    this.instance.addChild(grids)
  }

  draw_borders(){
    let borders = new PIXI.Graphics()
    borders.lineStyle(2, 0xBDBDBD)
       .moveTo(0, 0)
       .lineTo(0, this.height)
       .lineTo(this.width, this.height)
       .lineTo(this.width, 0)
       .lineTo(0, 0)

    this.instance.addChild(borders)
  }

  set viewport(vw){
    this.instance.x = -vw.x + canvas.width/2
    this.instance.y = -vw.y + canvas.height/2
  }
}

export default World