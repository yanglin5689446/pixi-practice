
import { origin } from './constants'
import World from './modules/World'
import Particle from './modules/Particle'
import Player from './modules/Player'

let world = new World(3000, 3000, { backgroundColor: 0xEEEEEE })
document.body.appendChild(world.view);

world.stage.on('mousemove', (e) => (world.mouse_position = e.data.global))

// world setup
let player = new Player('assets/images/square.png')
world.add_object(player)

let particles = Array(500).fill(0).map(i => new Particle(world.height, world.width))
world.add_objects(particles)

world.game_loop = (delta) => {
  let mouse_delta = { x: world.mouse_position.x - origin.x, y: world.mouse_position.y - origin.y }
  player.update_position_according_to(mouse_delta)

  particles.forEach(p => {
    if(player.distance_between(p) < player.body_radius){
      player.score += 1
      world.remove_object(p)
      p = null
    }
  })
  
  world.viewport = player.position
}

