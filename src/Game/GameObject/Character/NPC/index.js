
import Character from '../index'
import Game from '../../../index'

class NPC extends Character {
  constructor (initialize){
    super(initialize)
    this.speed = initialize.speed
    this.attack_damage = initialize.attack_damage

    this.sprite.interactive = true
    this.sprite.on('mousedown', () => Game.instance.player.interact(this))
  }

  update_status(data){
    this.speed = data.speed || 0
    if(!data.moved){
      this.sprite.animationSpeed = 0
      this.sprite.gotoAndPlay(0)
    }
    else 
      this.sprite.animationSpeed = Character.base_animation_factor() * data.speed
    this.renderer.x = data.x
    this.renderer.y = data.y
    this.hp = data.hp
    this.set_facing(data.facing)

    this.render_hp_bar()
  }
}

export default NPC