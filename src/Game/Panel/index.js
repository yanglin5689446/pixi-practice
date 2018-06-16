
import { canvas } from '../../constants'
import MiniMap from './MiniMap'
import Scoreboard from './Scoreboard'
import Status from './Status'



class Panel {
  constructor(player){
	  this.renderer = new PIXI.Container()

    //this.scoreboard = new Scoreboard(canvas.width - 250, 50)
    //this.renderer.addChild(this.scoreboard.renderer)
    this.mini_map = new MiniMap(canvas.width - 550, canvas.height - 200, player.team)
    this.renderer.addChild(this.mini_map.renderer)
    this.status = new Status(player.team)
    this.renderer.addChild(this.status.renderer)
  }
  update(player){
    this.mini_map.update(player.renderer.position, player.team)
    this.status.update(player.stats, player.abilities)
  }
  resize(){
    //this.scoreboard.renderer.position.set(canvas.width - 250, 50)
    this.mini_map.renderer.position.set(canvas.width - 550, canvas.height - 200)
  }
}

export default Panel