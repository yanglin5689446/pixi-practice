
import Character from '../index'
import Game from '../../../index.js'

import { key_pressed, keycode_map } from '../../../../keyboard'
import socket from '../../../../socket'
import { distance_between } from '../../../../utilities'


class Player extends Character {
  constructor (initialize){
    super(initialize)
    this.speed = 5
    this.attack_range = 200
    this.attack_damage = 5

    // function binding
    this._update_position = this._update_position.bind(this)
    this.create_attack_range_ring = this.create_attack_range_ring.bind(this)
    this.update = this.update.bind(this)
    this.check_boundary = this.check_boundary.bind(this)
    this.interact = this.interact.bind(this)
    this.create_attack_range_ring()
  }
  create_attack_range_ring(){
    this.attack_range_ring = new PIXI.Graphics()
    this.attack_range_ring.alpha = 0.3
    this.attack_range_ring.beginFill(0x90CAF9, 1);   
    this.attack_range_ring.drawCircle(0, 0, this.attack_range)
    this.attack_range_ring.endFill()
    this.renderer.addChildAt(this.attack_range_ring, 0)
  }
  check_boundary(world){
    if(this.renderer.position.x < 0) this.renderer.position.x = 0
    if(this.renderer.position.y < 0) this.renderer.position.y = 0
    if(this.renderer.position.x > world.width) this.renderer.position.x = world.width
    // assume player sprite height is around 100
    if(this.renderer.position.y > world.height - 50) this.renderer.position.y = world.height - 50
  }
  _update_position(){
    this.does_moved = false
    let facing
    let sqrt2 = Math.sqrt(2)

    if(key_pressed[keycode_map['w']] && key_pressed[keycode_map['a']]){
      facing = 'left'
      this.renderer.position.x -= this.speed / sqrt2
      this.renderer.position.y -= this.speed / sqrt2
      this.does_moved = true
    }
    else if(key_pressed[keycode_map['w']] && key_pressed[keycode_map['d']]){
      facing = 'right'
      this.renderer.position.x += this.speed / sqrt2
      this.renderer.position.y -= this.speed / sqrt2
      this.does_moved = true
    }
    else if(key_pressed[keycode_map['s']] && key_pressed[keycode_map['a']]){
      facing = 'left'
      this.renderer.position.x -= this.speed / sqrt2
      this.renderer.position.y += this.speed / sqrt2
      this.does_moved = true
    }
    else if(key_pressed[keycode_map['s']] && key_pressed[keycode_map['d']]){
      facing = 'right'
      this.renderer.position.x += this.speed / sqrt2
      this.renderer.position.y += this.speed / sqrt2
      this.does_moved = true
    }
    else if(key_pressed[keycode_map['w']]){
      facing = 'up'
      this.renderer.position.y -= this.speed
      this.does_moved = true
    }
    else if(key_pressed[keycode_map['s']]){
      facing = 'down'
      this.renderer.position.y += this.speed
      this.does_moved = true
    }
    else if(key_pressed[keycode_map['a']]){
      facing = 'left'
      this.renderer.position.x -= this.speed
      this.does_moved = true
    }
    else if(key_pressed[keycode_map['d']]){
      facing = 'right'
      this.renderer.position.x += this.speed
      this.does_moved = true
    }
    this.set_facing(facing)
    if(!this.does_moved){
      this.sprite.animationSpeed = 0
      this.sprite.gotoAndPlay(0)
    }
    else 
      this.sprite.animationSpeed = Character.base_animation_factor() * this.speed
    this.check_boundary(Game.instance.world)
  }
  update(data){
    this.score = data.score
    this.hp = data.hp
    if(this.hp > 0){
      this.render_hp_bar()
      this._update_position()
    }
    else {

    }

  }
  interact(object){
    if(this.team !== object.team){
      console.log(distance_between(this, object))
      if(distance_between(this, object) <= this.attack_range){
        socket.emit('event', {
          type: 'attack',
          payload:{
            type: 'normal_attack',
            attacker: {
              type: 'player',
              id: this.id,
            },
            target: {
              type: object.object_type,
              id: object.id
            },
          }
        })
      }
    }
  }
}


export default Player