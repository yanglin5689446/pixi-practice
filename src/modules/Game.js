

import World from './World'
import Panel from './Panel'


let instance = null
const canvas = { width: window.innerWidth, height: window.innerHeight }

class Game extends PIXI.Application {
  constructor(props){
    super(props)
    // singleton
    if(!instance)instance = this
    else return instance

    this.panel = new Panel()
    this.stage.addChild(this.panel.instance)

    // configuration
    this.renderer.view.style.position = 'absolute';
    this.renderer.view.style.display = 'block';
    this.renderer.autoResize = true;
    this.renderer.resize(canvas.width, canvas.height);
    this.stage.interactive = true
    this.mouse_position = { x: 0, y: 0 }
  }
  create_world(w = 3000, h = 3000){
    this.world = new World(w, h)
    this.stage.addChildAt(this.world.instance, this.stage.children.length -1 )
  }

  static get instance() {
    return instance
  }

}

export default Game