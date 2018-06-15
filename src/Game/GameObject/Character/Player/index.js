
import Character from '../index'
import Game from '../../../index.js'

import { key_pressed, keycode_map } from '../../../../keyboard'
import socket from '../../../../socket'
import { distance_between } from '../../../../utilities'


class Player extends Character {
  constructor (initialize){
    super(initialize)
    this.speed = initialize.speed
    this.attack_damage = initialize.attack_damage
    this.reachable_range = initialize.reachable_range
    this.gold = initialize.gold
    this.level = initialize.level
    this.exp = initialize.exp
    this.next_level_exp = initialize.next_level_exp
    this.attack_available_timestamp = initialize.attack_available_timestamp

    // function binding
    this._update_position = this._update_position.bind(this)
    this.create_reachable_circle = this.create_reachable_circle.bind(this)
    this.update = this.update.bind(this)
    this.is_cooldown = this.is_cooldown.bind(this)
    this.interact_item = this.interact_item.bind(this)
    this.interact_object = this.interact_object.bind(this)

    this.create_reachable_circle()
  }
  create_reachable_circle(){
    this.reachable_circle = new PIXI.Graphics()
    this.reachable_circle.alpha = 0.3
    this.reachable_circle.beginFill(0x90CAF9, 1);   
    this.reachable_circle.drawCircle(0, 0, this.reachable_range)
    this.reachable_circle.endFill()
    this.reachable_circle.interactive = true
    this.reachable_circle.x = this.renderer.x
    this.reachable_circle.y = this.renderer.y

    this.reachable_circle.zIndex = -1

    Game.instance.world.renderer.addChildAt(this.reachable_circle)
  }
  is_cooldown(){
    return Date.now() <= this.attack_available_timestamp
  }
  _update_position(){
    this.does_moved = false
    let facing
    
    this.does_moved = true


    if(key_pressed[keycode_map['w']]){
      facing = 'up'
      this.renderer.position.y -= this.speed
    }
    else if(key_pressed[keycode_map['s']]){
      facing = 'down'
      this.renderer.position.y += this.speed
    }
    else if(key_pressed[keycode_map['a']]){
      facing = 'left'
      this.renderer.position.x -= this.speed
    }
    else if(key_pressed[keycode_map['d']]){
      facing = 'right'
      this.renderer.position.x += this.speed
    }
    else this.does_moved = false

    this.set_facing(facing)
    if(!this.does_moved){
      this.sprite.animationSpeed = 0
      this.sprite.gotoAndPlay(0)
    }
    else 
      this.sprite.animationSpeed = Character.base_animation_factor() * this.speed
  }
  update(data){
    this.speed = data.speed
    this.attack_damage = data.attack_damage
    this.reachable_range = data.reachable_range
    this.gold = data.gold
    this.level = data.level
    this.exp = data.exp
    this.next_level_exp = data.next_level_exp
    this.attack_available_timestamp = data.attack_available_timestamp

    this.render_hp_bar(data.hp)

    if(this.hp > 0){
      this.renderer.visible = true
      this.reachable_circle.visible = true
      
      this.renderer.x = data.x
      this.renderer.y = data.y

      this._update_position()
    }
    else {
      this.renderer.visible = false
      this.reachable_circle.visible = false
    }
    this.reachable_circle.x = this.renderer.x
    this.reachable_circle.y = this.renderer.y
  }
  interact_item(item){
    if(this.hp <= 0) return 
    if(distance_between(this, item) <= this.reachable_range){
      socket.emit('event', {
        type: 'pick_coin',
        payload:{
          id: this.id,
          coin_id: item.id
        }
      })
    }

  }

  interact_object(object){
    if(this.hp <= 0) return 
    if(this.is_cooldown())return

    if(this.team !== object.team){
      if(distance_between(this, object) <= this.reachable_range){
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
            }
          }
        })
      }
    }
  }
}


export default Player