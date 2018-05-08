
import Game from './modules/Game'
import Particle from './modules/Particle'
import Player from './modules/Player'
import io from 'socket.io-client'

import { origin } from './constants'

const server = 'ws://localhost:30000'

let game = new Game({ backgroundColor: 0xEEEEEE })
document.body.appendChild(game.view);

// create world
game.create_world(5000, 5000)

// register mouse move event handler
game.stage.on('mousemove', (e) => (game.mouse_position = e.data.global))

// player setup
let player = new Player('assets/images/square.png')
game.world.add_object(player)


let particles = Array(500).fill(0).map(i => new Particle(game.world.height, game.world.width))
game.world.add_objects(particles)

let socket = io(server);

socket.on('render', (data) => {
  let mouse_delta = { x: game.mouse_position.x - origin.x, y: game.mouse_position.y - origin.y }
  player.update_status(mouse_delta)
  particles.forEach((particle, index) => {
    if(player.distance_between(particle) < player.body_radius){
      player.score += 1
      game.world.remove_object(particle)
      particles.splice(index, 1)
    }
  })
  //particles = particles.filter(p => p)

  game.panel.update_score(player.score)
  game.world.viewport = player.position
})
