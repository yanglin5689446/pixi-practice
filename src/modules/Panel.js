
import { canvas } from '../constants'

class Panel {
  constructor(){
	  this.instance = new PIXI.Container()

    //function binding
    this.create_countdown = this.create_countdown.bind(this)
    this.update_score = this.update_score.bind(this)
    this.create_score = this.create_score.bind(this)
    this.create_scoreboard = this.create_scoreboard.bind(this)
    this.update_scoreboard = this.update_scoreboard.bind(this)    

    // setup
    this.create_countdown()
    this.create_score()
    //this.create_scoreboard()
    this.update_score(0)
  }
  create_scoreboard(){
    this.scoreboard = new PIXI.Container()
    this.scoreboard.x = canvas.width - 250
    this.scoreboard.y = 50
    // scoreboard background
    let graphics = new PIXI.Graphics()
    graphics.beginFill(0xFFFFFF)
    graphics.lineStyle(3, 0x2196F3)
    graphics.drawRect(0, 0, 200, 360)
    this.scoreboard.addChild(graphics)
    // scoreboard field
    let player_name = new PIXI.Text('Name', { fontSize: 16 })
    player_name.anchor.set(0.5)
    player_name.x = 200/4
    player_name.y = 30
    this.scoreboard.addChild(player_name)

    let player_score = new PIXI.Text('Score', { fontSize: 16 })
    player_score.anchor.set(0.5)
    player_score.x = 200/4*3
    player_score.y = 30
    this.scoreboard.addChild(player_score)

    this.instance.addChild(this.scoreboard)

  }
  update_scoreboard(){

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
    this.score_text.y = canvas.height - 50
    this.instance.addChild(this.score_text)
  }
  update_score(score){
    this.score_text.text = `Score: ${score}`
  }
}

export default Panel