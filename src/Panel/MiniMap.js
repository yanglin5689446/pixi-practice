

import { canvas } from '../constants'

class MiniMap {
  constructor(x, y){
    this.instance = new PIXI.Container()
    this.instance.x = x
    this.instance.y = y
    // mini map background
    let graphics = new PIXI.Graphics()
    graphics.beginFill(0xFFFFFF)
    graphics.lineStyle(3, 0x2196F3)
    graphics.drawRect(0, 0, 500, 150)
    this.instance.addChild(graphics)

    this.player_sign = new PIXI.Graphics()
    this.player_sign.beginFill(0x2196F3)
    this.player_sign.drawCircle(0, 0, 10)
    this.instance.addChild(this.player_sign)

    this.update.bind(this)
  }
  update(player_position){
    this.player_sign.x = player_position.x / 20
    this.player_sign.y = player_position.y / 20
  }

}

export default MiniMap