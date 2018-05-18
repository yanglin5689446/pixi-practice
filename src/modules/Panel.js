
import { canvas } from '../constants'

class Panel {
  constructor(){
	  this.instance = new PIXI.Container()
    // create score text
    this.score_text = new PIXI.Text('');
    this.score_text.x = 20;
    this.score_text.y = canvas.height - 50;
    this.instance.addChild(this.score_text)
    // create countdown text
    this.countdown_text = new PIXI.Text('');
    this.countdown_text.anchor.set(0.5)
    this.countdown_text.x = canvas.width/2;
    this.countdown_text.y = 50;
    this.instance.addChild(this.countdown_text)
    
    //function binding
    this.update_score = this.update_score.bind(this)
    
    // setup
    this.update_score(0)
  }
  update_score(score){
    this.score_text.text = `Score: ${score}`
  }
  update_score(score){
    this.score_text.text = `Score: ${score}`
  }
}

export default Panel