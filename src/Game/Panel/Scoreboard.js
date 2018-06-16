
import { canvas } from '../../constants'

class Scoreboard {
  constructor(x, y){
    this.renderer = new PIXI.Container()
    this.renderer.x = x
    this.renderer.y = y
    
    // renderer background
	let graphics = []
	for(let i = 0;i < 3;i++){
		graphics[i] = new PIXI.Graphics()
		graphics[i].beginFill(0xFFFFFF, 0.8)
		graphics[i].lineStyle(0)
		graphics[i].drawRoundedRect(0, i*50, 180, 40, 10)
		this.renderer.addChild(graphics[i])
	}
	
    // renderer field
	this.set_cup_icons()
	
    this.update.bind(this)
  }
  update(){

  }
  set_cup_icons(){
	  const cups = [ 'gold_cup', 'silver_cup', 'bronze_cup' ]
	  this.cups = cups.map((name, index) => {
		  let cup = new PIXI.Sprite(PIXI.loader.resources[name].texture)
		  cup.x = 8
		  cup.y = 5 + index * 50
		  this.renderer.addChild(cup)
		  return cup
	  })
		  
  }
}

export default Scoreboard