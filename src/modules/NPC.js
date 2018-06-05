
import Character from './Character'
import Game from './Game'

class NPC extends Character {
  constructor (initialize){
    super(initialize)

    this.sprite.interactive = true
    this.update_status.bind(this)
  }
  update_status(data){
    this.speed = data.speed || 0
    if(!data.moved){
      this.sprite.animationSpeed = 0
      this.sprite.gotoAndPlay(0)
    }
    else 
      this.sprite.animationSpeed = Character.prototype.base_animation_factor * data.speed
    this.instance.x = data.x
    this.instance.y = data.y
    this.hp = data.hp
    this.set_facing(data.facing)

    this.render_hp_bar()
  }
}

export default NPC