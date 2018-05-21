

import GameObject from './GameObject/GameObject'
import Game from './Game'

class Character extends GameObject {
  constructor (initialize){
    super()

    this.id = initialize.id || 0
    this.score = 0
    this.body_radius = 80
    this.attack_range = 200
    this.hp = initialize.hp
    this.max_hp = initialize.max_hp
    this.nickname = initialize.nickname || 'anonymous'
    this.facing = 'down'

    this.instance = new PIXI.Container()
    this.instance.x = initialize.x || 0
    this.instance.y = initialize.y || 0
    
    // player sprite initialize
    let sprite = new PIXI.Sprite(PIXI.loader.resources["fox"].texture)

    let frames = []
    let frame_width = sprite.width/4, frame_height = sprite.height/4
    for(let i = 0; i < 4 ; i ++){
      for(let j = 0; j < 4 ;j ++){
        let clip = new PIXI.Rectangle(frame_width * j, frame_height * i, frame_width, frame_height)
        frames.push(new PIXI.Texture(sprite.texture, clip))   
      }
    }

    this.player_sprite = new PIXI.extras.AnimatedSprite(frames)
    this.player_sprite.anchor.set(0.5)
    this.player_sprite.scale.set(0.5)

    this.player_sprite.animationSpeed = 0.05
    this.player_sprite.loop = false

    this.instance.addChild(this.player_sprite)
    
    // nickname label initialize
    this.nickname_text = new PIXI.Text(this.nickname, { fontSize: 12 });
    this.nickname_text.anchor.set(0.5)
    this.nickname_text.position.y = -75

    this.instance.addChild(this.nickname_text)
    
    // hp bar initialize
    this.hp_bar = new PIXI.Graphics() 
    this.instance.addChild(this.hp_bar)

    // alias
    this.position = this.instance.position
    this.rotation = this.instance.rotation

    // function binding
    this.set_facing = this.set_facing.bind(this)
  }

  render_hp_bar(){
    const origin = { x: -40, y: -65}, w = 80, h = 10, ratio = (this.hp / this.max_hp)

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
  set_facing(facing){
    if(this.facing === facing)return;
    this.facing = facing
    switch(facing){
      case 'up':
        this.player_sprite.onFrameChange = (frame) => 
            frame === 4 && this.player_sprite.gotoAndPlay(0)
        this.player_sprite.onComplete = null
        this.player_sprite.gotoAndPlay(0)

        break
      case 'down':
        this.player_sprite.onFrameChange = (frame) => 
            frame === 8 && this.player_sprite.gotoAndPlay(4)
        this.player_sprite.onComplete = null
        this.player_sprite.gotoAndPlay(4)

        break
      case 'left':
        this.player_sprite.onFrameChange = (frame) => 
            frame === 12 && this.player_sprite.gotoAndPlay(8)
        this.player_sprite.onComplete = null
        this.player_sprite.gotoAndPlay(8)
        break
      case 'right':
        this.player_sprite.onFrameChange = null
        this.player_sprite.onComplete = () => this.player_sprite.gotoAndPlay(12)
        this.player_sprite.gotoAndPlay(12)
        break
    }
  }
}

export default Character