
import GameObject from './GameObject/GameObject'

class Player extends GameObject {
  constructor (sprite){
    super()
    this.instance = new PIXI.Sprite.fromImage(sprite)
    this.instance.anchor.set(0.5)
    this.instance.x = window.innerWidth/2
    this.instance.y = window.innerHeight/2
    this.position = { x: 0, y: 0 }

  }
  set_position(x, y){
    this.position.x = x
    this.position.y = y 
  }

}

export default Player