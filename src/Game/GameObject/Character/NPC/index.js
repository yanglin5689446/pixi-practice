
import Character from '../index'
import Game from '../../../index'
import { filters } from '../../../../Effects/filters'
import { animations } from '../../../../Effects/animations'


class NPC extends Character {
  constructor (initialize, type='player'){
    super(initialize)
    if(type == 'mob'){
      this.module = this.team === 1 ? animations.fox_minion : animations.panda_minion
      if(this.module[this.stats.facing || 'down']){
        this.sprite.textures = this.module[this.stats.facing || 'down']
        this.sprite.play()
      }
    }

    this.object_type = type
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