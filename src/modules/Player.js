
import * as PIXI from 'pixi.js'

import Character from './Character'
import Game from './Game'
import { key_pressed, keycode_map } from '../keyboard'

class Player extends Character {
  constructor (initialize){
    super(initialize)
    this.speed = 5
    this.attack_range = 200

    // function binding
    this._update_position = this._update_position.bind(this)
    this.update = this.update.bind(this)
    this.check_boundary = this.check_boundary.bind(this)

  }
  check_boundary(world){
    if(this.position.x < 0) this.position.x = 0
    if(this.position.y < 0) this.position.y = 0
    if(this.position.x > world.width) this.position.x = world.width
    // assume player sprite height is around 100
    if(this.position.y > world.height - 50) this.position.y = world.height - 50
  }
  _update_position(){
    this.does_moved = false
    let facing
    let sqrt2 = Math.sqrt(2)

    if(key_pressed[keycode_map['w']] && key_pressed[keycode_map['a']]){
      facing = 'left'
      this.position.x -= this.speed / sqrt2
      this.position.y -= this.speed / sqrt2
      this.does_moved = true
    }
    else if(key_pressed[keycode_map['w']] && key_pressed[keycode_map['d']]){
      facing = 'right'
      this.position.x += this.speed / sqrt2
      this.position.y -= this.speed / sqrt2
      this.does_moved = true
    }
    else if(key_pressed[keycode_map['s']] && key_pressed[keycode_map['a']]){
      facing = 'left'
      this.position.x -= this.speed / sqrt2
      this.position.y += this.speed / sqrt2
      this.does_moved = true
    }
    else if(key_pressed[keycode_map['s']] && key_pressed[keycode_map['d']]){
      facing = 'right'
      this.position.x += this.speed / sqrt2
      this.position.y += this.speed / sqrt2
      this.does_moved = true
    }
    else if(key_pressed[keycode_map['w']]){
      facing = 'up'
      this.position.y -= this.speed
      this.does_moved = true
    }
    else if(key_pressed[keycode_map['s']]){
      facing = 'down'
      this.position.y += this.speed
      this.does_moved = true
    }
    else if(key_pressed[keycode_map['a']]){
      facing = 'left'
      this.position.x -= this.speed
      this.does_moved = true
    }
    else if(key_pressed[keycode_map['d']]){
      facing = 'right'
      this.position.x += this.speed
      this.does_moved = true
    }
    this.set_facing(facing)
    if(!this.does_moved){
      this.sprite.animationSpeed = 0
      this.sprite.gotoAndPlay(0)
    }
    else 
      this.sprite.animationSpeed = Character.prototype.base_animation_factor * this.speed
    this.check_boundary(Game.instance.world)
  }
  update(data){
    this.score = data.score
    this.hp = data.hp
    this.render_hp_bar()
    this._update_position()
  }
}


export default Player