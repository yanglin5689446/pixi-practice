
import Character from '../index'
import Game from '../../../index'
import { filters } from '../../../../Effects/filters'

class NPC extends Character {
  constructor (initialize){
    super(initialize)

    this.sprite.interactive = true
    this.sprite.on('mousedown', () => Game.instance.player.interact(this))
  }

  update_status(data){
    if(data.stats.hp > 0){
      this.renderer.visible = true
      this.render_hp_bar(data.stats.hp)
    }
    else {
      this.renderer.visible = false
      this.stats.hp = 0
    }

    if(!data.moved){
      this.sprite.animationSpeed = 0
      this.sprite.gotoAndPlay(0)
    }
    else 
      this.sprite.animationSpeed = Character.base_animation_factor() * data.stats.speed
    this.renderer.x = data.stats.x
    this.renderer.y = data.stats.y
    this.set_facing(data.stats.facing)
  }
}

export default NPC