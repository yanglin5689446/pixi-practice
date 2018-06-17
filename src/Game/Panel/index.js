
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

    this.countdown = new PIXI.Text('10', { 
      fontSize: 60,
      fill: 0xEEEEEE,
      lineJoin: 'round',
      stroke: 0x0,
      strokeThickness: 10
    })
    this.countdown.position.set(canvas.width/2, canvas.height/2)
    this.countdown.anchor.set(0.5)
    this.countdown.visible = false
    this.renderer.addChild(this.countdown)

    this.winner_text = new PIXI.Text('', { 
      fontSize: 120,
      fill: 0xEEEEEE,
      lineJoin: 'round',
      stroke: 0x0,
      strokeThickness: 10
    })
    this.winner_text.position.set(canvas.width/2, canvas.height/2)
    this.winner_text.anchor.set(0.5)
    this.winner_text.visible = false
    this.renderer.addChild(this.winner_text)


    this.game_over = this.game_over.bind(this)
  }
  update(player, players){
    this.mini_map.update(player.renderer.position, player.team)
    this.status.update(player.stats, player.abilities)
    this.ranking.update(players)
    if(player.stats.dead){
      this.countdown.visible = true
      const remain_time = Math.ceil((player.revive_timestamp - Date.now()) / 1000)
      this.countdown.text = remain_time.toString()
    }
    else this.countdown.visible = false

  }
  game_over(win){
    this.winner_text.text = (win ? 'YOU WIN!' : 'YOU LOSE!')
    this.winner_text.visible = true
  }
  resize(){
    this.winner_text.position.set(canvas.width/2, canvas.height/2)
    this.countdown.position.set(canvas.width/2, canvas.height/2)
    this.ranking.renderer.position.set(canvas.width - 250, 50)
    this.mini_map.renderer.position.set(canvas.width - 550, canvas.height - 200)
  }
}

export default Panel