
import { canvas } from '../../constants'
import RankEntry from './RankEntry'


class Ranking {
  constructor(x, y){
    this.renderer = new PIXI.Container()
    this.renderer.x = x
    this.renderer.y = y
    
    // renderer background
  	let graphics = []
  	for(let i = 0;i < 5; i++){
  		graphics[i] = new PIXI.Graphics()
  		graphics[i].beginFill(0xFFFFFF, 0.8)
  		graphics[i].lineStyle(0)
  		graphics[i].drawRoundedRect(0, i*50, 180, 40, 10)
  		this.renderer.addChild(graphics[i])
  	}

      // renderer field
  	this.setup()

    this.update = this.update.bind(this)
  }

  setup(){
	  const cups = [ 'gold_cup', 'silver_cup', 'bronze_cup' ]
	  cups.forEach((name, index) => {
		  let cup = new PIXI.Sprite(PIXI.loader.resources[name].texture)
		  cup.x = 8
		  cup.y = 5 + index * 50
		  this.renderer.addChild(cup)
	  })
    this.rankings = Array(5).fill(0).map((v, index) => {
      let ranking = new RankEntry(8, index * 50)
      this.renderer.addChild(ranking.renderer)
      return ranking      
    })

  }
  update(players){
    let ranking = Object.keys(players)
      .sort((a, b) => {
        if(players[a].stats.kills != players[b].stats.kills)
          return players[b].stats.kills - players[a].stats.kills
        else
          return players[b].stats.gold - players[a].stats.gold 
      })
    let k = Math.min(ranking.length, 5)
    for(let i = 0 ;i < k ;i ++)
      this.rankings[i].update(players[ranking[i]])

    for(let i = ranking.length ;i < 5 ;i ++)this.rankings[i].renderer.visible = false
  }
}

export default Ranking