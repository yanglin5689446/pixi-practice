
import * as PIXI from 'pixi.js'

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
	
	//this.add_ground = this.add_ground.bind(this)

    // draw border
    this.draw_borders()
	
	this.add_ground()

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

  add_ground(){
	  let ground = new PIXI.Sprite.fromImage('../assets/images/ground.jpg')
	  ground.position.x = 5000
	  ground.position.y = 1500
	  ground.anchor.x = 0.5
	  ground.anchor.y = 0.5
	  this.instance.addChild(ground)
  }
  
  set viewport(vw){
    this.instance.x = -vw.x + canvas.width/2
    this.instance.y = -vw.y + canvas.height/2
  }

}

export default World