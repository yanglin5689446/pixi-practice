
import { canvas } from '../constants'
import MiniMap from './MiniMap'
import Scoreboard from './Scoreboard'


class Panel {
  constructor(){
	  this.instance = new PIXI.Container()

    //function binding
    this.create_countdown = this.create_countdown.bind(this)
    
    this.update_score = this.update_score.bind(this)
    this.create_score = this.create_score.bind(this)

    this.scoreboard = new Scoreboard(canvas.width - 250, 50)
    this.instance.addChild(this.scoreboard.instance)
    this.mini_map = new MiniMap(50, canvas.height - 200)
    this.instance.addChild(this.mini_map.instance)

    // setup
    this.create_score()

    this.update_score(0)
  }

  create_countdown(){
    this.countdown_text = new PIXI.Text('')
    this.countdown_text.anchor.set(0.5)
    this.countdown_text.x = canvas.width/2
    this.countdown_text.y = 50
    this.instance.addChild(this.countdown_text)
  }
  create_score(){
    this.score_text = new PIXI.Text('')
    this.score_text.x = 20
    this.score_text.y = 20
    this.instance.addChild(this.score_text)
  }
  update_score(score){
    this.score_text.text = `Score: ${score}`
  }
}

export default Panel