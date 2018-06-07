

import * as PIXI from 'pixi.js'

import World from './World'
import Player from './Player'
import Panel from '../Panel'

let instance = null
const canvas = { width: window.innerWidth, height: window.innerHeight }

class Game extends PIXI.Application {
  constructor(props){
    super(props)
    // singleton
    if(!instance)instance = this
    else return instance

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
  create_player(data){
    this.player = new Player(data)
    this.world.add_object(this.player)
    this.world.viewport = this.player.position
  }

  static get instance() {
    return instance
  }
  set game_loop(callback) {
    this.ticker.add(callback)
  }
}

export default Game