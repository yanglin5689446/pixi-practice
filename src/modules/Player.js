
import Character from './Character'
import Game from './Game'

class Player extends Character {
  constructor (initialize){
    super(initialize)

    // function binding
    this.update_by_cursor_position = this.update_by_cursor_position.bind(this)
    this.check_boundary = this.check_boundary.bind(this)

  }
  check_boundary(world){
    if(this.position.x < 0) this.position.x = 0
    if(this.position.y < 0) this.position.y = 0
    if(this.position.x > world.width) this.position.x = world.width
    if(this.position.y > world.height) this.position.y = world.height
  }
  update(data){
    this.position.x = data.x
    this.position.y = data.y
    this.score = data.score
    this.hp = data.hp
    this.render_hp_bar()
  }
  update_by_cursor_position(mouse_delta){
    // facing
    let angle = Math.atan2(mouse_delta.y, mouse_delta.x) + Math.PI
    if(Math.PI/4 < angle && angle < Math.PI*3/4)this.set_facing('up')
    else if(Math.PI*5/4 < angle && angle < Math.PI*7/4)this.set_facing('down')
    else if(Math.PI*3/4 < angle && angle < Math.PI*5/4)this.set_facing('right')
    else this.set_facing('left')
    // movement facing
    let distance = Math.sqrt(mouse_delta.x * mouse_delta.x + mouse_delta.y * mouse_delta.y)
    let unit_vector = { x: mouse_delta.x/distance, y: mouse_delta.y/distance }

    // movement speed
    if(distance < 50) this.speed = 0
    else if(50 < distance && distance < 200) this.speed = 3
    else if(200 < distance) this.speed = 6
    let prev = { x: this.instance.position.x, y: this.instance.position.y }  

    this.player_sprite.animationSpeed = 0.05 * this.speed / 3
    this.instance.position.x += this.speed * unit_vector.x 
    this.instance.position.y += this.speed * unit_vector.y

    // check if object exceed boundary
    this.check_boundary(Game.instance.world)

    return { x: this.instance.position.x - prev.x, y: this.instance.position.y - prev.y }
  }

}

export default Player