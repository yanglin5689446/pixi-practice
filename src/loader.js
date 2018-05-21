
let complete = false

const preload_assets = () => {
  const loader = PIXI.loader
  PIXI.loader
    .add('fox',  'assets/images/fox.png')
    .add('fox_minon',  'assets/images/fox_minon.png')
    .add('main_tower',  'assets/images/main_tower.png')
    .add('sub_tower',  'assets/images/sub_tower.png')
    .load(() => (complete = true));
}

const preload_compelete = () => complete

export { preload_assets, preload_compelete }