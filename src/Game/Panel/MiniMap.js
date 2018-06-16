

import { canvas } from '../../constants'

class MiniMap {
  constructor(x, y, team){
    this.renderer = new PIXI.Container()
    this.renderer.x = x
    this.renderer.y = y
    this.team = team

	  this.set_minimap()
    this.set_player_icon()

    this.update = this.update.bind(this)
  }
  update(player_position, player_team){
    this.player_icon.x = player_position.x / 20 + 6
    this.player_icon.y = player_position.y / 20 + 6
    this.renderer.removeChild(this.player_icon)
    this.renderer.addChild(this.player_icon)

  }
  set_minimap(){
  	let minimap = new PIXI.Sprite(PIXI.loader.resources['minimap'].texture)
  	minimap.position.x = 256
  	minimap.position.y = 81
  	minimap.anchor.x = 0.5
  	minimap.anchor.y = 0.5
  	this.renderer.addChild(minimap)
  }
  set_player_icon(){
  	this.player_icon = this.team === 1 ?
  	   new PIXI.Sprite(PIXI.loader.resources['fox_icon'].texture) :
  	   new PIXI.Sprite(PIXI.loader.resources['panda_icon'].texture)
    this.player_icon.anchor.set(0.5)
  	this.renderer.addChild(this.player_icon)
  }
  
  
}

export default MiniMap