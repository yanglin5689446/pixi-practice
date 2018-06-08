
import { canvas } from '../constants'

import World from './World'
import Panel from './Panel'
import Player from './GameObject/Character/Player'
import Tower from './GameObject/Tower'

import { animations } from '../Effects/animations'

let instance = null

class Game extends PIXI.Application {
  constructor(props){
    super(props)

    // configuration
    this.renderer.view.style.position = 'absolute';
    this.renderer.view.style.display = 'block';
    this.renderer.autoResize = true;
    this.renderer.resize(canvas.width, canvas.height);
    this.stage.interactive = true
    this.mouse_position = { x: 0, y: 0 }
    this.objects = {}
    this.players = {}

    instance = this

  }
  create_world(w = 3000, h = 3000){
    this.world = new World(w, h)
    this.stage.addChildAt(this.world.instance)
  }
  create_player(data){
    this.player = new Player(data)
    this.world.add_object(this.player)
    this.world.viewport = this.player.position
  }
  create_panel(player){
    this.panel = new Panel(player)
    this.panel.update_score(player.score)
    this.stage.addChild(this.panel.instance)
  }
  create_towers(data){
    const world = this.world
    const margin = 300
    const towers = {
      fox:{
        main: new Tower('main_tower', margin, world.height/2, 1),
        top: new Tower('main_tower', margin, world.height/4, 2),
        bottom: new Tower('main_tower', margin, world.height*3/4, 2),
      },
      panda:{
        main: new Tower('main_tower', world.width - margin, world.height/2, 1),
        top: new Tower('main_tower', world.width - margin, world.height/4, 2),
        bottom: new Tower('main_tower', world.width - margin, world.height*3/4, 2)
      }
    }
    this.objects.towers = towers

    world.add_object(towers.fox.main)
    world.add_object(towers.fox.top)
    world.add_object(towers.fox.bottom)
    world.add_object(towers.panda.main)
    world.add_object(towers.panda.top)
    world.add_object(towers.panda.bottom)

  }
  update_players(online, offline){
    // foreach online players, 
    // update their state
    Object.keys(online).forEach(key => {
      if(key === this.player.id)return
      if(!this.players[key]){
        this.players[key] = new NPC(online[key])
        this.world.add_object(this.players[key])
      }
      else this.players[key].update_status(online[key])
    })

    // remove disconnected user
    offline.forEach(key => {
      if(this.players[key])this.world.remove_object(this.players[key])
      delete this.players[key]
    })
  }

  set game_loop(callback) {
    this.ticker.add(callback)
  }
  static get instance(){
    return instance
  }
}

export default Game