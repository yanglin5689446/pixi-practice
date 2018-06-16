
import GameObject from './index.js'
import { animations } from '../../Effects/animations'
import { filters } from '../../Effects/filters'

import socket from '../../socket'
import Game from '../index'


const towers_config = [
  {
    hp_bar: { x: -150, y: -300, w: 300, h: 10 }
  },
  {
    hp_bar: { x: -100, y: -200, w: 200, h: 10 }
  }
]

class Tower extends GameObject {
  constructor (initialize, id){
    super()
    this.stats = initialize.stats
    this.renderer.position.x = initialize.stats.x   
    this.renderer.position.y = initialize.stats.y
    this.id = id
    this.team = initialize.team
    this.tier = initialize.tier
    this.object_type = 'tower'
	
	  this.sprite = this.team === 1 ?
		  new PIXI.Sprite(PIXI.loader.resources[`fox_tower${this.tier}`].texture) :
		  new PIXI.Sprite(PIXI.loader.resources[`panda_tower${this.tier}`].texture)
	
    this.sprite.anchor.set(0.5, 0.8)
    this.sprite.interactive = true
    this.sprite.hitArea = new PIXI.Rectangle(-50, -50, 100, 100)
    this.sprite.on('mouseover', () => {
      if(Game.instance.player.team === this.team)
        this.sprite.filters = [filters['green_outline']]
      else 
        this.sprite.filters = [filters['red_outline']]
    })
    this.sprite.on('mouseout', () => this.sprite.filters = [])
    this.renderer.addChild(this.sprite)

    this.hp_bar = new PIXI.Graphics()
    this.renderer.addChild(this.hp_bar)

    this.icon = this.team === 1 ?
      new PIXI.Sprite(PIXI.loader.resources['bamboo_icon'].texture) :
      new PIXI.Sprite(PIXI.loader.resources['plum_icon'].texture)
    this.icon.x = this.stats.x / 20 + 6
    this.icon.y = this.stats.y / 20 + 6
    this.icon.anchor.set(0.5)

    switch(this.tier){
      case 1:
        this.icon.scale.set(0.6)
        break
      case 2:
        this.icon.scale.set(0.42)
        break

    }

    Game.instance.panel.mini_map.renderer.addChild(this.icon)

    // function binding
    this.render_hp_bar = this.render_hp_bar.bind(this)
    this.render_hp_bar(towers_config[this.tier - 1].hp_bar)
    this.sprite.on('mousedown', (e) => Game.instance.player.interact(this))

  }
  update(data){
    if(this.stats.dead){
      this.renderer.visible = false
      this.icon.visible = false
      return
    }
    this.render_hp_bar(towers_config[this.tier - 1].hp_bar)
    this.stats.hp = data.stats.hp
    this.stats.dead = data.stats.dead
  }
  render_hp_bar(setting){
    const ratio = (this.stats.hp / this.stats.max_hp)

    this.hp_bar.clear()
    this.hp_bar.beginFill(0xFF0000)
    this.hp_bar.drawRect(setting.x, setting.y, setting.w, setting.h)
    this.hp_bar.beginFill(0x8BC34A)
    this.hp_bar.drawRect(setting.x, setting.y, setting.w  * ratio, setting.h)
  }
}

export default Tower
