
import Character from '../index'
import Game from '../../../index'

class NPC extends Character {
  constructor (initialize){
    super(initialize)
    this.speed = initialize.speed
    this.attack_damage = initialize.attack_damage    

    this.sprite.interactive = true
    this.sprite.on('mousedown', () => Game.instance.player.interact(this))
    this.sprite.on('mouseover', () => {
      if(Game.instance.player.team === this.team)
        this.sprite.filters = [filters['green_outline']]
      else 
        this.sprite.filters = [filters['red_outline']]
    })
    this.sprite.on('mouseout', () => this.sprite.filters = [])
  }

  update_status(data){
    if(data.hp > 0){
      this.renderer.visible = true
      this.render_hp_bar(data.hp)
    }
    else {
      this.renderer.visible = false
      this.hp = 0
    }

    this.speed = data.speed || 0
    if(!data.moved){
      this.sprite.animationSpeed = 0
      this.sprite.gotoAndPlay(0)
    }
    else 
      this.sprite.animationSpeed = Character.base_animation_factor() * data.speed
    this.renderer.x = data.x
    this.renderer.y = data.y
    this.set_facing(data.facing)
  }
}

export default NPC