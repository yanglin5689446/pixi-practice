

import { canvas } from '../../constants'
import { filters } from '../../Effects/filters'


class Status {
  constructor(team){
    this.renderer = new PIXI.Container()
    this.renderer.x = 50
    this.renderer.y = 50
    this.renderer.filters = [filters['grey_outline']]
    this.team = team


    this.exp_bar = new PIXI.Graphics()
    this.renderer.addChild(this.exp_bar)

    if(this.team === 1) 
      this.icon = new PIXI.Sprite(PIXI.loader.resources['fox_icon'].texture)
    else if(this.team === 2)
      this.icon = new PIXI.Sprite(PIXI.loader.resources['panda_icon'].texture)

    this.icon.scale.set(2)
    this.icon.anchor.set(0.5)

    this.renderer.addChild(this.icon)
    this.render_exp_bar(0, 100)
  }
  render_exp_bar(exp, next_level_exp){
    const origin = { x: 20, y: 0}, w = 200, h = 20, ratio = exp / next_level_exp

    this.exp_bar.clear()
    this.exp_bar.beginFill(0x333333)
    this.exp_bar.drawRect(origin.x, origin.y, w, h)
    this.exp_bar.beginFill(0x8BC34A)
    this.exp_bar.drawRect(origin.x, origin.y, w  * ratio, h)
  }
  update(player){
    this.level = player.level
    this.render_exp_bar(player.exp, player.next_level_exp)

  }
  
  
}

export default Status