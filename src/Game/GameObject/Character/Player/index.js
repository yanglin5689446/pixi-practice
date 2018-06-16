
import Character from '../index'
import Game from '../../../index.js'

import { key_pressed, keycode_map } from '../../../../keyboard'
import socket from '../../../../socket'


class Player extends Character {
  constructor (initialize){
    super(initialize)
    this.abilities = initialize.abilities

    this.cd_bar = new PIXI.Graphics()
    this.renderer.addChild(this.cd_bar)

    // function binding
    this._update_position = this._update_position.bind(this)
    this._update_cd = this._update_cd.bind(this)
    this.create_reachable_circle = this.create_reachable_circle.bind(this)
    this.update = this.update.bind(this)
    this.is_cooldown = this.is_cooldown.bind(this)
    this.interact = this.interact.bind(this)

    this.create_reachable_circle()
  }
  _update_reachable_range(){
    this.reachable_circle.clear()
    this.reachable_circle.alpha = 0.3
    this.reachable_circle.beginFill(0x90CAF9, 1);   
    this.reachable_circle.drawCircle(0, 0, this.stats.reachable_range)
    this.reachable_circle.endFill()
  }
  create_reachable_circle(){
    this.reachable_circle = new PIXI.Graphics()
    this.reachable_circle.interactive = true
    this.reachable_circle.x = this.renderer.x
    this.reachable_circle.y = this.renderer.y

    this._update_reachable_range()

    this.reachable_circle.zIndex = -1

    Game.instance.world.renderer.addChildAt(this.reachable_circle)
  }
  is_cooldown(){
    return Date.now() <= this.stats.attack_available_timestamp
  }
  _update_cd(){
    const current_time = Date.now()
    const ratio = this.stats.attack_available_timestamp > current_time 
                ? (this.stats.attack_available_timestamp - current_time) / this.stats.cd
                : 0
    this.cd_bar.clear()
    this.cd_bar.beginFill(0x90CAF9);  
    this.cd_bar.drawRect(-50, 80, 100 * ratio , 10)
  }
  _update_position(){
    this.does_moved = true
    let facing

    if(key_pressed[keycode_map['w']])
      facing = 'up'
    else if(key_pressed[keycode_map['s']])
      facing = 'down'
    else if(key_pressed[keycode_map['a']])
      facing = 'left'
    else if(key_pressed[keycode_map['d']])
      facing = 'right'
    else this.does_moved = false

    this.set_facing(facing)
    if(!this.does_moved){
      this.sprite.animationSpeed = 0
      this.sprite.gotoAndPlay(0)
    }
    else 
      this.sprite.animationSpeed = Character.base_animation_factor() * this.stats.speed
  }
  update(data){
    this.stats = data.stats
    this.abilities = data.abilities

    this._update_cd()
    this._update_reachable_range()

    this.render_hp_bar(data.stats.hp)
    if(this.stats.hp > 0){
      this.renderer.visible = true
      this.reachable_circle.visible = true
      
      this.renderer.x = this.stats.x
      this.renderer.y = this.stats.y

      this._update_position()
    }
    else {
      this.renderer.visible = false
      this.reachable_circle.visible = false
    }
    this.reachable_circle.x = this.renderer.x
    this.reachable_circle.y = this.renderer.y
    Game.instance.world.viewport = this.renderer.position

    socket.emit('event', { 
      type: 'update', 
      payload: { 
        id: this.id,
        facing: this.stats.facing,
        moved: this.does_moved
      } 
    })

  }

  interact(target){
    if(this.stats.hp <= 0) return 

    socket.emit('event', {
      type: 'click',
      payload:{
        player: this.id,
        target: {
          type: target.object_type,
          id: target.id
        }
      }
    })

  }
}


export default Player