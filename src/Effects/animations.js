
import * as PIXI from 'pixi.js'

const animations = { frames: {} }

function load_fox_animations(){
  let sprite = new PIXI.Sprite(PIXI.loader.resources['fox'].texture)
  animations.fox = {}
  const keys = ['up', 'down', 'left', 'right']
  let frame_width = sprite.width/4, frame_height = sprite.height/4
  for(let i = 0; i < 4 ; i ++){
    let frames = []
    for(let j = 0; j < 4 ;j ++){
      let clip = new PIXI.Rectangle(frame_width * j, frame_height * i, frame_width, frame_height)
      frames.push(new PIXI.Texture(sprite.texture, clip))   
    }
    animations.fox[keys[i]] = frames
  } 
}

function load_panda_animations(){
  let sprite = new PIXI.Sprite(PIXI.loader.resources['panda'].texture)
  animations.panda = {}
  const keys = ['up', 'down', 'left', 'right']
  let frame_width = sprite.width/4, frame_height = sprite.height/4
  for(let i = 0; i < 4 ; i ++){
    let frames = []
    for(let j = 0; j < 4 ;j ++){
      let clip = new PIXI.Rectangle(frame_width * j, frame_height * i, frame_width, frame_height)
      frames.push(new PIXI.Texture(sprite.texture, clip))   
    }
    animations.panda[keys[i]] = frames
  } 
}

function load_fox_minion_animations(){
  let sprite = new PIXI.Sprite(PIXI.loader.resources['fox_minion'].texture)
  animations.fox_minion = {}
  const keys = ['up', 'down', 'left', 'right']
  let frame_width = sprite.width/4, frame_height = sprite.height/4
  for(let i = 0; i < 4 ; i ++){
    let frames = []
    for(let j = 0; j < 4 ;j ++){
      let clip = new PIXI.Rectangle(frame_width * j, frame_height * i, frame_width, frame_height)
      frames.push(new PIXI.Texture(sprite.texture, clip))   
    }
    animations.fox_minion[keys[i]] = frames
  } 
}

function load_panda_minion_animations(){
  let sprite = new PIXI.Sprite(PIXI.loader.resources['panda_minion'].texture)
  animations.panda_minion = {}
  const keys = ['up', 'down', 'left', 'right']
  let frame_width = sprite.width/4, frame_height = sprite.height/4
  for(let i = 0; i < 4 ; i ++){
    let frames = []
    for(let j = 0; j < 4 ;j ++){
      let clip = new PIXI.Rectangle(frame_width * j, frame_height * i, frame_width, frame_height)
      frames.push(new PIXI.Texture(sprite.texture, clip))   
    }
    animations.panda_minion[keys[i]] = frames
  } 
}

function load_coin_animation(){
  let sprite = new PIXI.Sprite(PIXI.loader.resources['coin'].texture)
  let frame_width = sprite.width/5, frame_height = sprite.height/2
  let frames = []
  for(let i = 0; i < 2 ; i ++){
	  for(let j = 0; j < 5 ; j ++){
		let clip = new PIXI.Rectangle(frame_width * j, frame_height * i, frame_width, frame_height)
		frames.push(new PIXI.Texture(sprite.texture, clip))   
	  }
  }
  animations.coin = frames

}

function load_normal_attack_animation(){
  let sprite = new PIXI.Sprite(PIXI.loader.resources['normal_attack'].texture)
  let frame_width = sprite.width/5, frame_height = sprite.height/2
  let frames = []
  for(let i = 0; i < 5 ; i ++){
    let clip = new PIXI.Rectangle(frame_width * i, 0, frame_width, frame_height)
    frames.push(new PIXI.Texture(sprite.texture, clip))   
  } 
  for(let i = 0; i < 2 ; i ++){
    let clip = new PIXI.Rectangle(frame_width * i, frame_height, frame_width, frame_height)
    frames.push(new PIXI.Texture(sprite.texture, clip))   
  } 
  animations.normal_attack = frames

}

function setup_animations(){
  load_fox_animations()
  load_panda_animations()
  load_fox_minion_animations()
  load_panda_minion_animations()

  load_coin_animation()
  load_normal_attack_animation()
}


export { animations, setup_animations }