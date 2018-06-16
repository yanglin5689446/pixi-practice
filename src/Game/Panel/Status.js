

import { canvas } from '../../constants'
import { filters } from '../../Effects/filters'


class Status {
  constructor(team){
    this.renderer = new PIXI.Container()
    this.renderer.x = 50
    this.renderer.y = 50
    this.renderer.filters = [filters['grey_outline']]
    this.team = team
	

    this.exp_bar = new PIXI.Graphics()
    this.renderer.addChild(this.exp_bar)

    if(this.team === 1) 
      this.icon = new PIXI.Sprite(PIXI.loader.resources['fox_big_icon'].texture)
    else if(this.team === 2)
      this.icon = new PIXI.Sprite(PIXI.loader.resources['panda_big_icon'].texture)

    this.icon.anchor.set(0.5)
	
    this.renderer.addChild(this.icon)
    this.render_exp_bar(0, 100)
	this.set_stat_icons()
	
  }
  render_exp_bar(exp, next_level_exp){
    const origin = { x: 20, y: 0}, w = 200, h = 20, ratio = exp / next_level_exp
    this.exp_bar.clear()
    this.exp_bar.beginFill(0x333333)
    this.exp_bar.drawRect(origin.x, origin.y, w, h)
    this.exp_bar.beginFill(0x8BC34A)
    this.exp_bar.drawRect(origin.x, origin.y, w  * ratio, h)
  }
  update(player){
    this.level = player.level
    this.render_exp_bar(player.exp, player.next_level_exp)
  }
  set_stat_icons(){
	this.attack_damage_icon = new PIXI.Sprite(PIXI.loader.resources['attack_damage'].texture)
	this.speed_icon = new PIXI.Sprite(PIXI.loader.resources['speed'].texture)
	this.max_hp_icon = new PIXI.Sprite(PIXI.loader.resources['max_hp'].texture)
	this.attack_speed_icon = new PIXI.Sprite(PIXI.loader.resources['attack_speed'].texture)
	this.reachable_range_icon = new PIXI.Sprite(PIXI.loader.resources['reachable_range'].texture)
	this.attack_damage_icon.x = -20
	this.attack_damage_icon.y = 30
	this.speed_icon.x = -20
	this.speed_icon.y = 60
	this.max_hp_icon.x = -20
	this.max_hp_icon.y = 90
	this.attack_speed_icon.x =-20
	this.attack_speed_icon.y =120
	this.reachable_range_icon.x = -20
	this.reachable_range_icon.y = 150
	
	this.renderer.addChild(this.attack_damage_icon)
	this.renderer.addChild(this.speed_icon)
	this.renderer.addChild(this.max_hp_icon)
	this.renderer.addChild(this.attack_speed_icon)
	this.renderer.addChild(this.reachable_range_icon)
	
	
  }
  
  
}

export default Status