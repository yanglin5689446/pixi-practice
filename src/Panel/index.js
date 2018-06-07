
import { canvas } from '../constants'
import MiniMap from './MiniMap'
import Scoreboard from './Scoreboard'


class Panel {
  constructor(player){
	  this.instance = new PIXI.Container()

    this.scoreboard = new Scoreboard(canvas.width - 250, 50)
    this.instance.addChild(this.scoreboard.instance)
    this.mini_map = new MiniMap(50, canvas.height - 200, player.team)
    this.instance.addChild(this.mini_map.instance)

    //function binding
    this.update_score = this.update_score.bind(this)

    // setup
    this.create_score(player.team)

    this.update_score(0)
  }

  create_countdown(){
    this.countdown_text = new PIXI.Text('')
    this.countdown_text.anchor.set(0.5)
    this.countdown_text.x = canvas.width/2
    this.countdown_text.y = 50
    this.instance.addChild(this.countdown_text)
  }
  create_score(player){
    this.score_text = new PIXI.Text(player.score)
    this.score_text.x = 20
    this.score_text.y = 20
    this.instance.addChild(this.score_text)
  }
  update_score(score){
    this.score_text.text = `Score: ${score}`
  }
}

export default Panel