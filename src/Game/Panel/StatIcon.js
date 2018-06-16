

import { canvas } from '../../constants'
import socket from '../../socket'
import Game from '../../Game'


class StatIcon {
  constructor(name, id){
    this.renderer = new PIXI.Container()
    this.object_type = 'abilities'
    this.name = name
    this.id = id

    this.sprite = new PIXI.Sprite(PIXI.loader.resources[name].texture)
    this.renderer.addChild(this.sprite)
    this.upgrade = new PIXI.Sprite(PIXI.loader.resources['upgrade'].texture)
    this.upgrade.scale.set(0.5)
    this.upgrade.x = 20
    this.upgrade.y = 20
    this.upgrade.interactive = true
    this.upgrade.buttonMode = true
    this.upgrade.on('mouseover', () => (this.upgrade.tint = 0x0C8753))
    this.upgrade.on('mouseout', () => (this.upgrade.tint = 0xFFFFFF))
    this.upgrade.on('mousedown', () => Game.instance.player.interact(this))

    this.renderer.addChild(this.upgrade)

    const textStyle = new PIXI.TextStyle({ 
      fontSize: 18,
      fill: 0xEEEEEE,
      lineJoin: 'round',
      stroke: 0x0,
      strokeThickness: 5 
    })

    this.text = new PIXI.Text(`LV. 1`, textStyle)
    this.text.x = 50
    this.renderer.addChild(this.text)
  }
  set level(lv){
    this.text.text = `LV. ${lv}` 
  }
  set can_upgrade(can){
    this.upgrade.visible = can
    if(this.text.text === 'LV. 10')
      this.upgrade.visible = false

  }
}

export default StatIcon