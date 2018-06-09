
import { canvas } from '../../constants'

class Scoreboard {
  constructor(x, y){
    this.renderer = new PIXI.Container()
    this.renderer.x = x
    this.renderer.y = y
    
    // renderer background
    let graphics = new PIXI.Graphics()
    graphics.beginFill(0xFFFFFF, 0.7)
    graphics.lineStyle(0)
    graphics.drawRoundedRect(0, 0, 200, 360, 10)
    this.renderer.addChild(graphics)
    
    // renderer field
    let player_name = new PIXI.Text('Name', { fontSize: 16 })
    player_name.anchor.set(0.5)
    player_name.x = 200/4
    player_name.y = 30
    this.renderer.addChild(player_name)

    let player_score = new PIXI.Text('Score', { fontSize: 16 })
    player_score.anchor.set(0.5)
    player_score.x = 200/4*3
    player_score.y = 30
    this.renderer.addChild(player_score)

    this.update.bind(this)
  }
  update(){

  }
}

export default Scoreboard