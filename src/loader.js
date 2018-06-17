
import * as PIXI from 'pixi.js'
import { setup_animations } from './Effects/animations'
import { setup_filters } from './Effects/filters'

let complete = false

const preload_assets = () => {
  const loader = PIXI.loader
  PIXI.loader
    .add('fox',  'assets/images/fox.png')
    .add('fox_icon',  'assets/images/fox_icon.png')
	  .add('fox_big_icon',  'assets/images/fox_big_icon.png')
    .add('fox_minion',  'assets/images/fox_minion.png')
    .add('panda',  'assets/images/panda.png')
    .add('panda_icon',  'assets/images/panda_icon.png')
	  .add('panda_big_icon',  'assets/images/panda_big_icon.png')
    .add('panda_minion',  'assets/images/panda_minion.png')

    .add('fox_tower1',  'assets/images/fox_tower1.png')
    .add('fox_tower2',  'assets/images/fox_tower2.png')
	  .add('panda_tower1',  'assets/images/panda_tower1.png')
    .add('panda_tower2',  'assets/images/panda_tower2.png')
    .add('bamboo_icon',  'assets/images/bamboo_icon.png')
    .add('plum_icon',  'assets/images/plum_icon.png')
    .add('ground',  'assets/images/ground.jpg')
    .add('minimap',  'assets/images/minimap.jpg')
    .add('coin',  'assets/images/coin.png')
    .add('coin_icon',  'assets/images/coin_icon.png')
    .add('normal_attack',  'assets/images/attack.png')
  	.add('attack_damage', 'assets/images/attack_damage.png')
  	.add('attack_speed', 'assets/images/attack_speed.png')
  	.add('max_hp', 'assets/images/max_hp.png')
  	.add('reachable_range', 'assets/images/reachable_range.png')
  	.add('speed', 'assets/images/speed.png')
    .add('upgrade', 'assets/images/upgrade.png')
	.add('upgrade_mouseover', 'assets/images/upgrade_mouseover.png')
  	.add('gold_cup', 'assets/images/gold_cup.png')
  	.add('silver_cup', 'assets/images/silver_cup.png')
  	.add('bronze_cup', 'assets/images/bronze_cup.png')

    .load(() => {
      setup_animations()
      setup_filters()
      complete = true
    });
}

const preload_compelete = () => complete

export { preload_assets, preload_compelete }