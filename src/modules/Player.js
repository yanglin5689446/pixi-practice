
import GameObject from './GameObject/GameObject'
import Game from './Game'

class Player extends GameObject {
  constructor (sprite, initialize){
    super()

    this.instance = new PIXI.Sprite.fromImage(sprite)
    this.instance.anchor.set(0.5)
    this.instance.x = initialize.x || 0
    this.instance.y = initialize.y || 0

    this.id = initialize.id || 0
    this.score = 0
    this.body_radius = 500
    // alias
    this.position = this.instance.position
    this.rotation = this.instance.rotation

    // function binding
    this.update_status = this. update_status.bind(this)
    this.check_boundary = this. check_boundary.bind(this)

  }
  check_boundary(world){
    if(this.position.x < 0) this.position.x = 0
    if(this.position.y < 0) this.position.y = 0
    if(this.position.x > world.width) this.position.x = world.width
    if(this.position.y > world.height) this.position.y = world.height
  }
  update_status(mouse_delta){
    // rotation
    this.instance.rotation = Math.atan2(mouse_delta.y, mouse_delta.x)
    // movement direction
    let distance = Math.sqrt(mouse_delta.x * mouse_delta.x + mouse_delta.y * mouse_delta.y)
    let unit_vector = { x: mouse_delta.x/distance, y: mouse_delta.y/distance }

    // movement speed
    if(distance < 50) this.speed = 0
    else if(50 < distance && distance < 200) this.speed = 3
    else if(200 < distance) this.speed = 6
    let prev = { x: this.instance.position.x, y: this.instance.position.y }  
    this.instance.position.x += this.speed * unit_vector.x 
    this.instance.position.y += this.speed * unit_vector.y

    // check if object exceed boundary
    this.check_boundary(Game.instance.world)

    return { x: this.instance.position.x - prev.x, y: this.instance.position.y - prev.y }

  }


}

export default Player