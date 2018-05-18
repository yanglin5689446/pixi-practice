
import GameObject from './GameObject/GameObject'
import Game from './Game'

class Player extends GameObject {
  constructor (sprite, initialize){
    super()

    this.id = initialize.id || 0
    this.score = 0
    this.body_radius = 500
    this.hp = initialize.hp
    this.max_hp = initialize.max_hp
    this.nickname = initialize.nickname


    this.instance = new PIXI.Container()
    this.instance.x = initialize.x || 0
    this.instance.y = initialize.y || 0
    
    this.player_sprite = new PIXI.Sprite.fromImage(sprite)
    this.player_sprite.anchor.set(0.5)
    this.instance.addChild(this.player_sprite)
    
    this.nickname_text = new PIXI.Text(this.nickname, { fontSize: 12 });
    this.nickname_text.anchor.set(0.5)
    this.nickname_text.position.y = -60

    this.instance.addChild(this.nickname_text)
    
    this.hp_bar = new PIXI.Graphics() 
    this.instance.addChild(this.hp_bar)

    // alias
    this.position = this.instance.position

    // function binding
    this.update_status = this.update_status.bind(this)
    this.check_boundary = this.check_boundary.bind(this)
    this.render_hp_bar = this.render_hp_bar.bind(this)

  }
  check_boundary(world){
    if(this.position.x < 0) this.position.x = 0
    if(this.position.y < 0) this.position.y = 0
    if(this.position.x > world.width) this.position.x = world.width
    if(this.position.y > world.height) this.position.y = world.height
  }
  update_status(mouse_delta){
    // rotation
    this.player_sprite.rotation = Math.atan2(mouse_delta.y, mouse_delta.x)
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
  render_hp_bar(){
    const origin = { x: -40, y: -50}, w = 80, h = 10, ratio = (this.hp / this.max_hp)

    this.hp_bar.beginFill(0xFF0000)
    this.hp_bar.lineStyle(0, 0, 0);

    this.hp_bar.moveTo(origin.x, origin.y);
    this.hp_bar.lineTo(origin.x + w, origin.y);
    this.hp_bar.lineTo(origin.x + w, origin.y + h);
    this.hp_bar.lineTo(origin.x, origin.y + h);
    this.hp_bar.lineTo(origin.x, origin.y);

    this.hp_bar.beginFill(0x8BC34A)
    this.hp_bar.moveTo(origin.x, origin.y);
    this.hp_bar.lineTo(origin.x + w * ratio, origin.y);
    this.hp_bar.lineTo(origin.x + w * ratio, origin.y + h);
    this.hp_bar.lineTo(origin.x, origin.y + h);
    this.hp_bar.lineTo(origin.x, origin.y);
  }


}

export default Player