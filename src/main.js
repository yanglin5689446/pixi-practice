
import * as PIXI from 'pixi.js'
import io from 'socket.io-client'

import { preload_assets, preload_complete } from './loader'
import { keyup_listener, keydown_listener } from './keyboard'
import { filters } from './Effects/filters'


import Game from './modules/Game'
import { MainTower, SubTower } from './modules/Tower'
import Particle from './modules/Particle'
import Player from './modules/Player'
import NPC from './modules/NPC'

import { origin, canvas } from './constants'

// player setup
let game

let player
let other_players = []
let particles = []
let buffer = {}
let towers = { fox: {}, panda:{} }

let socket


function game_loop(delta){
  // update player position

  const { panel, player, world } = game

  player.update(buffer.players[player.id]);

  panel.update_score(player.score)
  panel.mini_map.update(player.position, player.team)

  world.viewport = player.position
  
  // update other objects
  // other player
  Object.keys(buffer.players).forEach(key => {
    if(key == player.id)return;
    if(!other_players[key]){
      other_players[key] = new NPC(buffer.players[key])
      world.add_object(other_players[key])
    }
    else other_players[key].update_status(buffer.players[key])
  })

  buffer.disconnected.forEach(key => {
    if(other_players[key])
      world.remove_object(other_players[key])
    delete other_players[key]
  })

  // towers
  towers.fox.main.hp = buffer.objects.towers.fox.main.hp
  towers.fox.main.render_hp_bar()

  socket.emit('event', { 
    type: 'update_position', 
    payload:{ 
      x: player.position.x, 
      y: player.position.y, 
      facing: player.facing,
      speed: player.speed,
      moved: player.does_moved
    } 
  })
}

function initialize_game(){
  let nickname = document.getElementById('nickname').value

  // keyboard event binding
  document.addEventListener('keydown', keydown_listener)
  document.addEventListener('keyup', keyup_listener)

  
  socket = io(SERVER, {transports: ['websocket'], upgrade: false});

  // initialize event handler
  socket.on('initialize', (data) => {
    // create new world
    game = new Game({ backgroundColor: 0xEEEEEE })
    game.create_world(10000, 3000)
    // register mouse move event handler
    game.stage.on('mousemove', (e) => (game.mouse_position = e.data.global))

    // inistialize player
    game.create_player(data.player)

    // initialize panel
    game.create_panel(game.player)

    // set up objects
    towers.fox.main = new MainTower(300, game.world.height/2)
    towers.fox.main.onMouseDown = (e) => {
      towers.fox.main.under_attack()
      socket.emit('interact', { type: 'click', payload: 'fox_main' })
    }
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



    // start game loop
    game.game_loop = game_loop

    // hide login interface
    document.getElementById('login-panel').setAttribute('hidden', 'hidden')
    document.body.replaceChild(game.view, document.body.childNodes[0])
  })

  // update data event handler
  socket.on('update', (data) => (buffer = data))

  // emit initialize event
  let team = 0
  if(document.getElementById('team_fox').checked)team = 1
  else if(document.getElementById('team_panda').checked)team = 2
  else team = Math.ceil(Math.random() * 2)

  socket.emit('initialize', { nickname: nickname || 'anonymous', team })
}  



window.onload = () => {
  document.getElementById('submit_button').addEventListener('click', initialize_game)
  preload_assets()
  window.addEventListener('resize', () => {
    // Resize the renderer
    canvas.width = window.innerWidth
    canvas.height =  window.innerHeight 
    game.renderer.resize(window.innerWidth, window.innerHeight);
    if(game.player)
      game.world.viewport = game.player.position
  })
}




