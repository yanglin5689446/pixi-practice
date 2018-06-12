    
import 'pixi-layers'
import Game from '../index'

class GameObject {
	constructor(){
    this.renderer = new PIXI.Container()
    this.apply_animation = this.apply_animation.bind(this)
    this.apply_filter = this.apply_filter.bind(this)
  }
  apply_animation(animation_name){
    let animation = new PIXI.extras.AnimatedSprite(animation_name)
    animation.anchor.set(0.5)
    animation.animationSpeed = 0.5
    animation.loop = false
    animation.onComplete = () => this.renderer.removeChild(animation)
    this.renderer.addChild(animation)
    animation.play()
  }
  apply_filter(filter, duration){
  }
}
export default GameObject

