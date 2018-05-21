
import io from 'socket.io-client'

import { preload_assets, preload_complete } from './loader'

import Game from './modules/Game'
import { MainTower, SubTower } from './modules/Tower'
import Particle from './modules/Particle'
import Player from './modules/Player'
import NPC from './modules/NPC'

import { origin, canvas } from './constants'

// player setup
let game

let player
let players = []
let particles = []
let buffer = {}
let towers = { fox: {}, panda:{} }

let socket


function game_loop(){
  // update player position

  player.update(buffer.players[player.id]);
  game.panel.update_score(player.score)

  game.world.viewport = player.position
  
  // update other objects
  // other player
  Object.keys(buffer.players).forEach(key => {
    if(key == player.id)return
    if(!players[key]){
      players[key] = new NPC(buffer.players[key])
      game.world.add_object(players[key])
    }
    else players[key].update_status(buffer.players[key])
  })

  buffer.disconnected.forEach(key => {
    if(players[key])
      game.world.remove_object(players[key])
    delete players[key]
  })
  // particles
  const data_particles = buffer.objects.particles
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
  // towers
  towers.fox.main.hp = buffer.objects.towers.fox.main.hp
  towers.fox.main.render_hp_bar()

  let mouse_delta = { x: game.mouse_position.x - origin.x, y: game.mouse_position.y - origin.y }
  let delta = player.update_by_cursor_position(mouse_delta)
  socket.emit('event', { 
    type: 'update_position', 
    payload:{ x: delta.x, y: delta.y, facing: player.facing } 
  })
}

function start_connection(){
  let nickname = document.getElementById('nickname').value
  
  socket = io(SERVER, {transports: ['websocket'], upgrade: false});

  // initialize event handler
  socket.on('initialize', (data) => {
    // create new world
    game = new Game({ backgroundColor: 0xEEEEEE })
    game.create_world(10000, 3000)
    // register mouse move event handler
    game.stage.on('mousemove', (e) => (game.mouse_position = e.data.global))

    player = new Player(data.player)
    game.world.add_object(player)
    game.world.viewport = player.position


    // initialize object
    particles = data.objects.particles.map(particle => 
      particle ? new Particle(particle.x, particle.y) : null)
    game.world.add_objects(particles.filter(particle => particle))

    towers.fox.main = new MainTower(300, 3000/2)
    towers.fox.main.onMouseDown = (e) => 
      socket.emit('interact', { type: 'click', payload: 'fox_main' })
    towers.fox.top = new SubTower(300, game.world.height/4)
    towers.fox.bottom = new SubTower(300, game.world.height*3/4)
    towers.panda.main = new MainTower(game.world.width - 300, game.world.height/2)
    towers.panda.top = new SubTower(game.world.width - 300, game.world.height/4)
    towers.panda.bottom = new SubTower(game.world.width - 300, game.world.height*3/4)

    game.world.add_object(towers.fox.main)
    game.world.add_object(towers.fox.top)
    game.world.add_object(towers.fox.bottom)
    game.world.add_object(towers.panda.main)
    game.world.add_object(towers.panda.top)
    game.world.add_object(towers.panda.bottom)

    // initialize score
    game.panel.update_score(player.score)

    // connect 
    game.game_loop = game_loop

    document.getElementById('login-panel').setAttribute('hidden', 'hidden')
    document.body.replaceChild(game.view, document.body.childNodes[0])
  })

  // update data event handler
  socket.on('update', (data) => (buffer = data))

  // emit initialize event
  socket.emit('initialize', { nickname: nickname || 'anonymous' })
}  



window.onload = () => {
  document.getElementById('submit_button').addEventListener('click', start_connection)
  preload_assets()
}




