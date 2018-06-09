
import 'pixi-layers'
import { canvas } from '../constants'

import World from './World'
import Panel from './Panel'
import Player from './GameObject/Character/Player'
import Tower from './GameObject/Tower'
import NPC from './GameObject/Character/NPC'


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
    this.stage = new PIXI.display.Stage()
    this.stage.interactive = true
    this.objects = {}
    this.players = {}

    instance = this

  }
  create_world(w = 3000, h = 3000){
    this.world = new World(w, h)
    this.stage.addChild(this.world.renderer)
  }
  create_player(data){
    this.player = new Player(data)
    this.world.add_object(this.player)
    this.world.viewport = this.player.position
  }
  create_panel(player){
    this.panel = new Panel(player)
    this.panel.update_score(player.score)
    this.stage.addChild(this.panel.renderer)
  }
  create_towers(data){
    const world = this.world
    const margin = 300
    const towers = {
      fox: data.fox.map(tower => new Tower('main_tower', tower.x, tower.y, tower.tier)),
      panda: data.panda.map(tower => new Tower('main_tower', tower.x, tower.y, tower.tier))
    }
    this.objects.towers = towers

    world.add_objects(towers.fox)
    world.add_objects(towers.panda)
    this.panel.mini_map.add(towers.fox[0])
    this.panel.mini_map.add(towers.fox[1])
    this.panel.mini_map.add(towers.fox[2])
    this.panel.mini_map.add(towers.panda[0])
    this.panel.mini_map.add(towers.panda[1])
    this.panel.mini_map.add(towers.panda[2])


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