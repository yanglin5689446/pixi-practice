
import 'pixi-layers'
import { canvas } from '../constants'

import World from './World'
import Panel from './Panel'
import Player from './GameObject/Character/Player'
import Tower from './GameObject/Tower'
import NPC from './GameObject/Character/NPC'
import Coin from './GameObject/Coin'



import { animations } from '../Effects/animations'

let instance = null

class Game extends PIXI.Application {
  constructor(props){
    super(props)

    // configuration
    this.renderer.view.style.position = 'absolute';
    this.renderer.view.style.display = 'block';
    this.renderer.autoResize = true;
    this.renderer.resize(canvas.width, canvas.height)

    this.stage = new PIXI.display.Stage()

    this.stage.interactive = true
    this.objects = {}
    this.items = {}
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
    this.world.viewport = this.player.renderer.position
  }
  create_panel(player){
    this.panel = new Panel(player)
    this.stage.addChild(this.panel.renderer)
  }
  create_towers(data){
    const world = this.world
    const margin = 300
    const towers = data.map((tower, index) => new Tower(tower, index))
    this.objects.towers = towers

    world.add_objects(towers)
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
  update_items(items){
    if(!this.items.coins)this.items.coins = {}

    Object.keys(items.coins.data).forEach(key => {
      if(!this.items.coins[key]){
        this.items.coins[key] = new Coin(items.coins.data[key], key)
        this.world.add_object(this.items.coins[key])
      }
    })
    items.coins.removed.forEach(key => {
      if(this.items.coins[key]){
        this.world.remove_object(this.items.coins[key])
        delete this.items.coins[key]
      }
    })
  }
  update_attacks(attacks){
    attacks.forEach(attack => {
      let attacker = null, target = null
      switch(attack.attacker.type){
        case 'player':
          if(this.players[attack.attacker.id])
            attacker = this.players[attack.attacker.id]
          else if(this.player.id === attack.attacker.id)
            attacker = this.player
          break
      }
      switch(attack.target.type){
        case 'tower':
          if(this.objects.towers[attack.target.id])
            target = this.objects.towers[attack.target.id]
          break
        case 'player':
          if(this.players[attack.target.id])
            target = this.players[attack.target.id]
          else if(this.player.id === attack.target.id)
            target = this.player
          break
      }
      if(attacker && target){
        target.apply_animation(animations[attack.type])
        target.apply_tint('sprite', 0xF44336, 200)
      }
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