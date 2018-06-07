
import * as PIXI from 'pixi.js'
import { setup_animations } from './Effects/animations'
import { setup_filters } from './Effects/filters'

let complete = false

const preload_assets = () => {
  const loader = PIXI.loader
  PIXI.loader
    .add('fox',  'assets/images/fox.png')
    .add('panda',  'assets/images/panda.png')
    .add('fox_minion',  'assets/images/fox_minion.png')
    .add('main_tower',  'assets/images/main_tower.png')
    .add('sub_tower',  'assets/images/sub_tower.png')
    .add('normal_attack',  'assets/images/attack.png')
    .add('minimap',  'assets/images/minimap.jpg')
    .add('fox_icon',  'assets/images/fox_icon.png')
    .add('panda_icon',  'assets/images/panda_icon.png')

    .load(() => {
      setup_animations()
      setup_filters()
      complete = true
    });
}

const preload_compelete = () => complete

export { preload_assets, preload_compelete }