
import * as PIXI from 'pixi.js'

import GameObject from './GameObject/GameObject'
import { animations } from '../Effects/animations'


class MainTower extends GameObject {
  constructor (x, y){
    super()
    this.instance = new PIXI.Container()
    this.instance.position.x = x   
    this.instance.position.y = y
    this.hp = 10000
    this.max_hp = 10000

    this.sprite = new PIXI.Sprite(PIXI.loader.resources["main_tower"].texture)
    this.sprite.anchor.set(0.5)
    this.sprite.scale.set(0.8)
    this.sprite.interactive = true

    this.instance.addChild(this.sprite)
    this.hp_bar = new PIXI.Graphics()

    this.instance.addChild(this.hp_bar)   

    // animation binding
    this.attack_animation = new PIXI.extras.AnimatedSprite(animations.normal_attack)
    this.attack_animation.anchor.set(0.5)
    this.attack_animation.animationSpeed = 0.5
    this.attack_animation.loop = false
    this.attack_animation.visible = false
    this.attack_animation.onComplete = () => (this.attack_animation.visible = false)
    this.instance.addChild(this.attack_animation)


    // function binding
    this.render_hp_bar = this.render_hp_bar.bind(this)
    this.render_hp_bar()
    this.under_attack = this.under_attack.bind(this)
  }
  render_hp_bar(){
    const origin = { x: -150, y: -200 }, w = 300, h = 10, ratio = (this.hp / this.max_hp)

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
  under_attack(){
    this.attack_animation.visible = true
    this.attack_animation.gotoAndPlay(0)
  }
  set onMouseDown(callback){
    this.sprite.on('mousedown', callback)
  }
}

class SubTower extends GameObject {
  constructor (x, y){
    super()
    this.instance = new PIXI.Container()
    this.instance.position.x = x   
    this.instance.position.y = y
    this.hp = 5000
    this.max_hp = 5000

    this.sprite = new PIXI.Sprite(PIXI.loader.resources["sub_tower"].texture)
    this.sprite.anchor.set(0.5)
    this.sprite.scale.set(0.5)

    this.instance.addChild(this.sprite)
    this.hp_bar = new PIXI.Graphics()

    this.instance.addChild(this.hp_bar)    

    // function binding
    this.render_hp_bar = this.render_hp_bar.bind(this)
    this.render_hp_bar()
  }
  render_hp_bar(){
    const origin = { x: -100, y: -150 }, w = 200, h = 10, ratio = (this.hp / this.max_hp)

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

}

export { MainTower, SubTower }
