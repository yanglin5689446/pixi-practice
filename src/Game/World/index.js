
import 'pixi-layers'
import { canvas } from '../../constants'

class World {
  constructor(width, height){
    this.width = width || window.innerWidth
    this.height = height || window.innerHeight
    this.renderer = new PIXI.display.Stage()
    this.renderer.group.enableSort = true
    this.renderer.group.on('sort', (object) => (object.zOrder = -object.y))

    // function bindingws
    this.add_object = this.add_object.bind(this)
    this.add_objects = this.add_objects.bind(this)
    this.remove_object = this.remove_object.bind(this)
    this.exceed_boundary = this.exceed_boundary.bind(this)
    this.draw_borders = this.draw_borders.bind(this)
	
    // draw border
    this.draw_borders()
	
    this.add_ground()

  }

  add_object(game_object){
    this.renderer.addChild(game_object.renderer)
  }
  add_objects(game_objects){
    game_objects.forEach(game_object => this.renderer.addChild(game_object.renderer))
  }
  remove_object(game_object){
    this.renderer.removeChild(game_object.renderer)
  }

  exceed_boundary(position){
    return 0 <= position.x && position.x < this.width && 0 <= position.y && position.y < this.height
  }

  draw_borders(){
    let borders = new PIXI.Graphics()
    borders.lineStyle(10, 0x777777)
       .moveTo(0, 0)
       .lineTo(0, this.height)
       .lineTo(this.width, this.height)
       .lineTo(this.width, 0)
       .lineTo(0, 0)

    this.renderer.addChild(borders)
  }

  add_ground(){
	  let ground = new PIXI.Sprite(PIXI.loader.resources["ground"].texture)
	  this.renderer.addChild(ground)
  }
  
  set viewport(vw){
    this.renderer.x = -vw.x + canvas.width/2
    this.renderer.y = -vw.y + canvas.height/2
  }

}

export default World