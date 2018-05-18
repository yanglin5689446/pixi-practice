
import GameObject from './GameObject/GameObject'
import Game from './Game'

class NPC extends GameObject {
  constructor (sprite, initialize){
    super()


    this.id = initialize.id || 0
    this.score = 0
    this.body_radius = 500
    this.hp = initialize.hp
    this.max_hp = initialize.max_hp

    this.instance = new PIXI.Container()
    this.instance.x = initialize.x || 0
    this.instance.y = initialize.y || 0
    
    this.player_sprite = new PIXI.Sprite.fromImage(sprite)
    this.player_sprite.anchor.set(0.5)
    this.instance.addChild(this.player_sprite)
    
    this.id_text = new PIXI.Text(this.id, { fontSize: 12 });
    this.id_text.anchor.set(0.5)
    this.id_text.position.y = -60

    this.instance.addChild(this.id_text)
    
    this.hp_bar = new PIXI.Graphics() 
    this.instance.addChild(this.hp_bar)

    // alias
    this.position = this.instance.position
    this.rotation = this.instance.rotation

    // function binding
    this.update_status = this. update_status.bind(this)

  }
  update_status(data){
    this.instance.x = data.x
    this.instance.y = data.y
    this.hp = data.hp

    this.player_sprite.rotation = data.rotation

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

export default NPC