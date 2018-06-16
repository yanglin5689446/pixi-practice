
import * as PIXI from 'pixi.js'

import GameObject from '../index'
import { animations } from '../../../Effects/animations'

class Character extends GameObject {
  constructor (initialize){
    super()

    this.id = initialize.id || 0
    
    this.stats = initialize.stats

    this.nickname = initialize.nickname || 'anonymous'
    this.team = initialize.team || 1
    this.object_type = 'player'

    this.renderer.x = initialize.stats.x || 0
    this.renderer.y = initialize.stats.y || 0
    
    // player sprite initialize
    this.module = (this.team === 1 ? animations.fox : animations.panda)
    this.sprite = new PIXI.extras.AnimatedSprite(this.module[this.stats.facing || 'down'])
    this.sprite.anchor.set(0.5)
    this.renderer.addChild(this.sprite)
    if(this.stats.facing)this.sprite.play()
    
    // nickname label initialize
    this.nickname_text = new PIXI.Text(this.nickname, { fontSize: 12 });
    this.nickname_text.anchor.set(0.5)
    this.nickname_text.position.y = -75

    this.renderer.addChild(this.nickname_text)
    
    // hp bar initialize
    this.hp_bar = new PIXI.Graphics() 
    this.renderer.addChild(this.hp_bar)

    // function binding
    this.set_facing = this.set_facing.bind(this)
  }

  render_hp_bar(hp){
    this.stats.hp = hp
    const origin = { x: -40, y: -65}, w = 80, h = 10, ratio = (this.stats.hp / this.stats.max_hp)

    this.hp_bar.clear()
    this.hp_bar.beginFill(0xFF0000)
    this.hp_bar.drawRect(origin.x, origin.y, w, h)
    this.hp_bar.beginFill(0x8BC34A)
    this.hp_bar.drawRect(origin.x, origin.y, w  * ratio, h)
  }
  set_facing(facing){
    if(this.stats.facing === facing)return;
    this.stats.facing = facing
    if(this.module[facing]){
      this.sprite.textures = this.module[facing]
      this.sprite.play()
    }
  }
  static base_animation_factor(){
    return 0.015
  }
}

export default Character
