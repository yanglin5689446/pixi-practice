
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
let player
let players = []
let particles = []


let socket = io(server, {transports: ['websocket'], upgrade: false});

socket.on('initialize', (data) => {
  player = new Player('assets/images/square.png', data.player)
  game.world.add_object(player)
  game.world.viewport = player.position

  particles = data.objects.particles.map(particle => 
    particle ? new Particle(particle.x, particle.y) : null)
  game.world.add_objects(particles.filter(particle => particle))
})

socket.on('render', (data) => {
  // update player position
  player.position.x = data.players[player.id].x
  player.position.y = data.players[player.id].y
  player.score = data.players[player.id].score
  game.panel.update_score(player.score)

  game.world.viewport = player.position
  
  // update other objects
  // other player
  Object.keys(data.players).forEach(key => {
    if(key == player.id)return
    if(!players[key]){
      players[key] = new PIXI.Sprite.fromImage('assets/images/square.png')
      players[key].anchor.set(0.5)
      
      game.world.instance.addChild(players[key])
    }
    players[key].x = data.players[key].x
    players[key].y = data.players[key].y
    players[key].rotation = data.players[key].rotation
  })

  data.disconnected.forEach(key => delete players[key])
  // particles
  data.objects.particles.forEach((particle, index) => {
    
    if(!particle){
      if(particles[index])game.world.remove_object(particles[index])
    }
    else{
      particles[index].x = particle.x
      particles[index].y = particle.y
      if(player.distance_between(particles[index]) < player.body_radius){
        socket.emit('event', { 
          type: 'eat_particle', 
          payload:{ index } 
        })
      }
    }
    
  })

  let mouse_delta = { x: game.mouse_position.x - origin.x, y: game.mouse_position.y - origin.y }
  player.update_status(mouse_delta)
  socket.emit('event', { 
    type: 'update_position', 
    payload:{ x: player.position.x, y: player.position.y, rotation: player.instance.rotation } 
  })
})
