

import Game from './modules/Game'
import Particle from './modules/Particle'
import Player from './modules/Player'
import NPC from './modules/NPC'
import io from 'socket.io-client'

import { origin } from './constants'

// player setup
let game;

let player
let players = []
let particles = []

function start_connection(){
  let nickname = document.getElementById('nickname').value
  let socket = io(SERVER, {transports: ['websocket'], upgrade: false});

  // initialize event handler
  socket.on('initialize', (data) => {
    // create new world
    game = new Game({ backgroundColor: 0xEEEEEE })
    game.create_world(5000, 5000)
    // register mouse move event handler
    game.stage.on('mousemove', (e) => (game.mouse_position = e.data.global))

    player = new Player('assets/images/square.png', data.player)
    game.world.add_object(player)
    game.world.viewport = player.position

    // initialize object
    particles = data.objects.particles.map(particle => 
      particle ? new Particle(particle.x, particle.y) : null)
    game.world.add_objects(particles.filter(particle => particle))

    // initialize score
    game.panel.update_score(player.score)
    document.getElementById('login-panel').setAttribute('hidden', 'hidden')
    document.body.replaceChild(game.view, document.body.childNodes[0])
  })

  // render event handler
  socket.on('render', (data) => {
    // update player position
    player.position.x = data.players[player.id].x
    player.position.y = data.players[player.id].y
    player.score = data.players[player.id].score
    player.hp = data.players[player.id].hp
    player.render_hp_bar()
    game.panel.update_score(player.score)

    game.world.viewport = player.position
    
    // update other objects
    // other player
    Object.keys(data.players).forEach(key => {
      if(key == player.id)return
      if(!players[key]){
        players[key] = new NPC('assets/images/square.png', data.players[key])
        game.world.add_object(players[key])
      }
      else players[key].update_status(data.players[key])
    })

    data.disconnected.forEach(key => {
      if(players[key])
        game.world.remove_object(players[key])
      delete players[key]
    })
    // particles
    const data_particles = data.objects.particles
    data_particles.removals.forEach(index => { 
      if(particles[index])
        game.world.remove_object(particles[index])
      particles[index] = null
    })

    data_particles.news.forEach((particle) => {
      let new_particle = new Particle(particle.x, particle.y)
      game.world.add_object(new_particle)
      particles.push(new_particle)
    })
    particles.forEach((particle, index) => {
      if(particle && player.distance_between(particle) < player.body_radius){
        socket.emit('event', {
          type: 'eat_particle',
          payload: { index }
        })      
      }
    })

    let mouse_delta = { x: game.mouse_position.x - origin.x, y: game.mouse_position.y - origin.y }
    let delta = player.update_status(mouse_delta)
    socket.emit('event', { 
      type: 'update_position', 
      payload:{ x: delta.x, y: delta.y, rotation: player.player_sprite.rotation } 
    })
  })

  // emit initialize event
  socket.emit('initialize', { nickname: nickname || 'anonymous' })
}  

window.onload = () => 
  document.getElementById('submit_button')
    .addEventListener('click', start_connection)



