

import { canvas } from '../constants'


class MiniMap {
  constructor(x, y){
    this.instance = new PIXI.Container()
    this.instance.x = x
    this.instance.y = y
	/*
    // mini map background
    let graphics = new PIXI.Graphics()
    graphics.beginFill(0xFFFFFF)
    graphics.lineStyle(3, 0x2196F3)
    graphics.drawRect(0, 0, 500, 150)
    this.instance.addChild(graphics)
	*/
	this.set_minimap()
	
	
	
    this.player_sign = new PIXI.Graphics()
    this.player_sign.beginFill(0x2196F3)
    this.player_sign.drawCircle(0, 0, 10)
    this.instance.addChild(this.player_sign)
	
	
    this.update.bind(this)
	
	//this.set_player_sign()
	
	
  }
  update(player_position, player_team){
    this.player_sign.x = player_position.x / 20 + 6
    this.player_sign.y = player_position.y / 20 + 6
	this.team = player_team
  }
  set_minimap(){
	let minimap = new PIXI.Sprite.fromImage('../assets/images/minimap.jpg')
	minimap.position.x = 256
	minimap.position.y = 81
	minimap.anchor.x = 0.5
	minimap.anchor.y = 0.5
	this.instance.addChild(minimap)
  }
  /*
  set_player_sign(){
	this.player_sign = this.team == 1 ?
	new PIXI.Sprite.fromImage('../assets/images/fox_icon.png') :
	new PIXI.Sprite.fromImage('../assets/images/panda_icon.png')
	this.instance.addChild(this.player_sign)
  }
  */
  
  
}

export default MiniMap