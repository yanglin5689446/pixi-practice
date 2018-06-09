
import * as PIXI from 'pixi.js'

import GameObject from '../index'
import { animations } from '../../../Effects/animations'

class Character extends GameObject {
  constructor (initialize){
    super()

    this.id = initialize.id || 0
    this.score = 0
    this.body_radius = 80
    this.hp = initialize.hp
    this.max_hp = initialize.max_hp
    this.nickname = initialize.nickname || 'anonymous'
    this.team = initialize.team || 1
    this.facing = 'down'

    this.renderer.x = initialize.x || 0
    this.renderer.y = initialize.y || 0
    
    // player sprite initialize
    this.module = this.team == 1 ? animations.fox : animations.panda
    this.sprite = new PIXI.extras.AnimatedSprite(this.module.up)
    this.sprite.anchor.set(0.5)
    this.sprite.scale.set(0.5)

    this.renderer.addChild(this.sprite)
    
    // nickname label initialize
    this.nickname_text = new PIXI.Text(this.nickname, { fontSize: 12 });
    this.nickname_text.anchor.set(0.5)
    this.nickname_text.position.y = -75

    this.renderer.addChild(this.nickname_text)
    
    // hp bar initialize
    this.hp_bar = new PIXI.Graphics() 
    this.renderer.addChild(this.hp_bar)

    // alias
    this.position = this.renderer.position
    this.rotation = this.renderer.rotation

    // function binding
    this.set_facing = this.set_facing.bind(this)
  }

  render_hp_bar(){
    const origin = { x: -40, y: -65}, w = 80, h = 10, ratio = (this.hp / this.max_hp)

    this.hp_bar.beginFill(0xFF0000)
    this.hp_bar.lineStyle(0, 0, 0);

    this.hp_bar.moveTo(origin.x, origin.y);
    this.hp_bar.lineTo(origin.x + w, origin.y);
    this.hp_bar.lineTo(origin.x + w, origin.y + h);
    this.hp_bar.lineTo(origin.x, origin.y + h);
    this.hp_bar.lineTo(origin.x, origin.y);

    this.hp_bar.beginFill(0x8BC34A)
    this.hp_bar.moveTo(origin.x, origin.y);
    this.hp_bar.lineTo(origin.x + w * ratio, origin.y);
    this.hp_bar.lineTo(origin.x + w * ratio, origin.y + h);
    this.hp_bar.lineTo(origin.x, origin.y + h);
    this.hp_bar.lineTo(origin.x, origin.y);
  }
  set_facing(facing){
    if(this.facing === facing)return;
    this.facing = facing
    if(this.module[facing]){
      this.sprite.textures = this.module[facing]
      this.sprite.play()
    }
  }
  static base_animation_factor(){
    return 0.02
  }
}

export default Character
