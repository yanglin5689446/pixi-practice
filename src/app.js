
import World from './modules/World'

import Particle from './modules/Particle'

const canvas_w = window.innerWidth, canvas_h = window.innerHeight
let world = new World(1000, 1000)

const origin_x = canvas_w/2, origin_y = canvas_h/2
const origin_gx = world.width/2, origin_gy = world.height/2


let app = new PIXI.Application({ backgroundColor: 0xEEEEEE });
app.renderer.view.style.position = 'absolute';
app.renderer.view.style.display = 'block';
app.renderer.autoResize = true;
app.renderer.resize(canvas_w, canvas_h);

let player
let particles
let score = 0

PIXI.loader
  .add('./assets/images/square.png')
  .load(setup)

function setup(delta){

  // generate particles
  particles = Particle.generate(50, world.width, world.height, app)
  particles.map(particle => app.stage.addChild(particle.instance))

  // generate player
  player = new PIXI.Sprite(PIXI.loader.resources['./assets/images/square.png'].texture)

  player.anchor.x = 0.5
  player.anchor.y = 0.5
  player.x = origin_x
  player.y = origin_y
  player.global_x = origin_gx
  player.global_y = origin_gy


  app.stage.addChild(player)
  app.ticker.add(game_loop)
}

function distance(x1, y1, x2, y2) {
  return (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)
}

function game_loop(delta) {
  // update position dirction
  let mouse = app.renderer.plugins.interaction.mouse.global
  let relative_x = mouse.x - origin_x, relative_y = mouse.y - origin_y
  player.rotation = Math.atan2(relative_y, relative_x)
  // update player positon
  let dx = relative_x / 50, dy = relative_y / 50
  player.global_x += dx
  player.global_y += dy
  if(player.global_x > world.width)player.global_x = world.width
  if(player.global_y > world.height)player.global_y = world.height
  if(player.global_x < 0)player.global_x = 0
  if(player.global_y < 0)player.global_y = 0

  // centralize viewport
  world.viewport.set_center(player.x, player.y)
  let center = world.viewport.center

  particles.forEach(p => {
    if(p.in(world.viewport))p.instance.renderable = false
    else {
      p.instance.renderable = true

      if(distance(player.x, player.y, p.instance.x, p.instance.y) < 1000){
        app.stage.removeChild(p.instance)
        p = null
        score += 5
      }
      else p.move(-dx, -dy)        

    }
  })
}



document.body.appendChild(app.view);