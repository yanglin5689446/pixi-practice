
import GameObject from './index.js'
import { animations } from '../../Effects/animations'
import socket from '../../socket'
import Game from '../index'


const towers_config = [
  {
    max_hp: 10000,
    scale: 0.8,
    hp_bar: { x: -150, y: -300, w: 300, h: 10 }
  },
  {
    max_hp: 5000,
    scale: 0.5,
    hp_bar: { x: -100, y: -200, w: 200, h: 10 }
  }
]

class Tower extends GameObject {
  constructor (sprite, x, y, tier){
    super()
    this.renderer.position.x = x   
    this.renderer.position.y = y
    this.max_hp = towers_config[tier - 1].max_hp
    this.hp = this.max_hp

    this.sprite = new PIXI.Sprite(PIXI.loader.resources[sprite].texture)
    this.sprite.anchor.set(0.5, 0.8)
    this.sprite.scale.set(towers_config[tier - 1].scale)
    this.sprite.interactive = true
    this.sprite.on('mousedown', () => {
      this.apply_animation(animations.normal_attack)
      socket.emit('event', {
        type: 'attack',
        attacker: game.renderer.player.id,
        defender: 1
      })
    })

    this.renderer.addChild(this.sprite)
    this.hp_bar = new PIXI.Graphics()

    this.renderer.addChild(this.hp_bar)  

    // function binding
    this.render_hp_bar = this.render_hp_bar.bind(this)
    this.render_hp_bar(towers_config[tier - 1].hp_bar)
  }
  render_hp_bar(setting){
    const ratio = (this.hp / this.max_hp)

    this.hp_bar.beginFill(0xFF0000)
    this.hp_bar.lineStyle(0, 0, 0);

    this.hp_bar.moveTo(setting.x, setting.y);
    this.hp_bar.lineTo(setting.x + setting.w, setting.y);
    this.hp_bar.lineTo(setting.x + setting.w, setting.y + setting.h);
    this.hp_bar.lineTo(setting.x, setting.y + setting.h);
    this.hp_bar.lineTo(setting.x, setting.y);

    this.hp_bar.beginFill(0x8BC34A)
    this.hp_bar.moveTo(setting.x, setting.y);
    this.hp_bar.lineTo(setting.x + setting.w * ratio, setting.y);
    this.hp_bar.lineTo(setting.x + setting.w * ratio, setting.y + setting.h);
    this.hp_bar.lineTo(setting.x, setting.y + setting.h);
    this.hp_bar.lineTo(setting.x, setting.y);
  }
}

export default Tower
