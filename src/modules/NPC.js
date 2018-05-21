
import Character from './Character'
import Game from './Game'

class NPC extends Character {
  constructor (initialize){
    super(initialize)
    this.update_status.bind(this)
  }
  update_status(data){
    this.instance.x = data.x
    this.instance.y = data.y
    this.hp = data.hp
    this.set_facing(data.facing)

    this.render_hp_bar()
  }
}

export default NPC