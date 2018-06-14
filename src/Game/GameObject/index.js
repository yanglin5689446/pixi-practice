    
import 'pixi-layers'
import Game from '../index'

class GameObject {
	constructor(){
    this.renderer = new PIXI.Container()
    this.renderer.interactive = true
    this.renderer.buttonMode = true
    this.apply_animation = this.apply_animation.bind(this)
    this.apply_filter = this.apply_filter.bind(this)
    this.apply_tint = this.apply_tint.bind(this)

  }
  apply_animation(animation_name){
    let animation = new PIXI.extras.AnimatedSprite(animation_name)
    animation.anchor.set(0.5)
    animation.animationSpeed = 0.5
    animation.loop = false
    animation.onComplete = () => {
      this.renderer.removeChild(animation)
      animation.destroy()
    }
    this.renderer.addChild(animation)
    animation.play()
  }
  apply_filter(filter){
  }
  apply_tint(part, tint, duration){
    this[part].tint = tint
    setTimeout(() => (this[part].tint = 0xFFFFFF), duration)
  }
}
export default GameObject

