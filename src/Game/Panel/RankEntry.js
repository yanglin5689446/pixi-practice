

import { canvas } from '../../constants'

class RankEntry {
  constructor(x, y){
    this.renderer = new PIXI.Container()
    this.renderer.x = x
    this.renderer.y = y
    
    this.icon = new PIXI.Sprite(PIXI.loader.resources['fox_icon'].texture)
    this.icon.x = 40
    this.icon.y = 6
    this.renderer.addChild(this.icon)
    this.nickname = new PIXI.Text('', { fontSize: 16 })
    this.nickname.x = 76
    this.nickname.y = 3
    this.renderer.addChild(this.nickname)

    this.text_kill = new PIXI.Text('kill', { fontSize: 12 })
    this.text_kill.x = 76
    this.text_kill.y = 20
    this.renderer.addChild(this.text_kill)

    this.kills = new PIXI.Text('0', { fontSize: 12 })
    this.kills.x = 110
    this.kills.y = 20
    this.kills.anchor.set(1, 0)
    this.renderer.addChild(this.kills)

    this.coin_icon = new PIXI.Sprite(PIXI.loader.resources['coin_icon'].texture)
    this.coin_icon.x = 120
    this.coin_icon.y = 22
    this.coin_icon.scale.set(0.2)
    this.renderer.addChild(this.coin_icon)

    this.gold = new PIXI.Text('0', { fontSize: 12 })
    this.gold.x = 135
    this.gold.y = 20
    this.renderer.addChild(this.gold)
    this.renderer.visible = false

    this.update = this.update.bind(this)
  }
  update(player){
    this.renderer.visible = true

    switch(player.team){
      case 1:
        this.icon.texture = PIXI.loader.resources['fox_icon'].texture
        break
      case 2:
        this.icon.texture = PIXI.loader.resources['panda_icon'].texture
        break
    }
    this.nickname.text = player.nickname.toString()
    this.kills.text = player.stats.kills.toString()
    this.gold.text = player.stats.gold.toString()

  }
}

export default RankEntry