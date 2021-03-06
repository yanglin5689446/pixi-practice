
import * as PIXI from 'pixi.js'

import { preload_assets, preload_complete } from './loader'
import { keyup_listener, keydown_listener } from './keyboard'
import { filters } from './Effects/filters'

import Game from './Game'

import socket from './socket'
import { origin, canvas } from './constants'

// player setup
let game = null

function game_loop(delta){
  // update player position
  const panel = game.panel
  const player = game.player
  const status = game.status

  if(status.game_over)panel.game_over(player.team === status.winner)
  panel.update(player, status.players)

  game.update_players(status.players, status.disconnected)
  game.update_objects(status.objects)
  game.update_attacks(status.attacks)

  player.update(status.players[player.id])
}

function initialize_game(){
  let nickname = document.getElementById('nickname').value

  // keyboard event binding
  document.addEventListener('keydown', keydown_listener)
  document.addEventListener('keyup', keyup_listener)

  // connect socket
  socket.open()

  // initialize event handler
  socket.on('initialize', (data) => {
    
    game = new Game({ backgroundColor: 0xEEEEEE })

    // create new world
    game.create_world(10000, 3000)
    // inistialize player
    game.create_player(data.player)
    // initialize panel
    game.create_panel(game.player)
    // intialize towers
    game.create_towers(data.objects.towers)
    // initialize game loop
    game.game_loop = game_loop
    // initialize data buffer
    game.status = {}

    // hide login interface
    document.getElementById('login-panel').setAttribute('hidden', 'hidden')
    document.body.replaceChild(game.view, document.body.childNodes[0])
  })

  // update data event handler
  socket.on('update', (data) => game && (game.status = data))

  // emit initialize event
  let team = 0
  if(document.getElementById('team_fox').checked)team = 1
  else if(document.getElementById('team_panda').checked)team = 2
  else team = Math.ceil(Math.random() * 2 )

  socket.emit('initialize', { nickname: nickname || 'anonymous', team })
}  

window.onload = () => {
  document.getElementById('submit_button').addEventListener('click', initialize_game)
  preload_assets()

  window.addEventListener('resize', () => {
    // Resize the renderer
    canvas.width = window.innerWidth
    canvas.height =  window.innerHeight 
    if(game){
      game.renderer.resize(window.innerWidth, window.innerHeight);
      game.world.viewport = game.player.renderer.position     
      game.panel.resize()

    }
  })
}




