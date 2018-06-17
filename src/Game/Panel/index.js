
import { canvas } from '../../constants'
import MiniMap from './MiniMap'
import Ranking from './Ranking'
import Status from './Status'



class Panel {
  constructor(player){
	  this.renderer = new PIXI.Container()

    this.ranking = new Ranking(canvas.width - 210, 30)
    this.renderer.addChild(this.ranking.renderer)
    this.mini_map = new MiniMap(canvas.width - 550, canvas.height - 200, player.team)
    this.renderer.addChild(this.mini_map.renderer)
    this.status = new Status(player.team)
    this.renderer.addChild(this.status.renderer)
  }
  update(player, players){
    this.mini_map.update(player.renderer.position, player.team)
    this.status.update(player.stats, player.abilities)
    this.ranking.update(players)
  }
  resize(){
    this.ranking.renderer.position.set(canvas.width - 250, 50)
    this.mini_map.renderer.position.set(canvas.width - 550, canvas.height - 200)
  }
}

export default Panel