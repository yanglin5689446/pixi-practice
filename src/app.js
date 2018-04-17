
import { origin } from './constants'
import World from './modules/World'
import Particle from './modules/Particle'
import Player from './modules/Player'

const canvas_w = window.innerWidth, canvas_h = window.innerHeight
let world = new World(1000, 1000)

const origin_x = canvas_w/2, origin_y = canvas_h/2
const origin_gx = world.width/2, origin_gy = world.height/2

let app = new PIXI.Application({ backgroundColor: 0xEEEEEE });
app.renderer.view.style.position = 'absolute';
app.renderer.view.style.display = 'block';
app.renderer.autoResize = true;
app.renderer.resize(canvas_w, canvas_h);

let mouse = { x: 0, y: 0 }
let player
let particles
let score = 0
let tick = 0

// event listener
app.stage.interactive = true;
app.stage.on('mousemove', (e) => (mouse = e.data.global))


// generate player
player = new Player('./assets/images/square.png')

player.set_position(origin_gx, origin_gy)
app.stage.addChild(player.instance)

// generate particles
particles = Particle.generate(500, world.width, world.height)
particles.map(particle => app.stage.addChild(particle.instance))


app.ticker.add(game_loop)

function distance(x1, y1, x2, y2) {
  return (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)
}

function game_loop(delta) {
  // update position dirction
  let relative_x = mouse.x - origin_x, relative_y = mouse.y - origin_y
  player.instance.rotation = Math.atan2(relative_y, relative_x)
  // update player positon
  let dx = relative_x / 100, dy = relative_y / 100
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
    if(distance(player.instance.x, player.instance.y, p.instance.x, p.instance.y) < 1000){
      app.stage.removeChild(p.instance)
      p = null
      score += 5
    }
    else p.move(-dx, -dy)
  })

  tick ++ 
  if(tick % 600 === 0){
    let new_particles = Particle.generate(20, world.width, world.height)
    new_particles.map(particle => app.stage.addChild(particle.instance))
    particles = particles.concat(new_particles)
  }
}

document.body.appendChild(app.view);