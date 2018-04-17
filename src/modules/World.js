
let instance = null

const canvas = { width: window.innerWidth, height: window.innerHeight }

class World extends PIXI.Application{
  constructor(width, height, props){
    super(props)
        // singleton
    if(!instance)instance = this
    else return instance

    this.width = width || window.innerWidth
    this.height = height || window.innerHeight
    this.view_port = { x:0, y:0 }

    // function binding
    this.draw_borders = this.draw_borders.bind(this)
    this.draw_grids = this.draw_grids.bind(this)
    this.add_object = this.add_object.bind(this)

    // configuration
    this.renderer.view.style.position = 'absolute';
    this.renderer.view.style.display = 'block';
    this.renderer.autoResize = true;
    this.renderer.resize(canvas.width, canvas.height);
    this.stage.interactive = true
    this.mouse_position = { x: 0, y: 0 }

    // draw border
    this.draw_borders()
    this.draw_grids()

  }

  static get instance() {
    return instance
  }

  add_object(game_object){
    this.stage.addChild(game_object.instance)
  }
  add_objects(game_objects){
    game_objects.forEach(game_object => this.stage.addChild(game_object.instance))
  }
  remove_object(game_object){
    this.stage.removeChild(game_object.instance)
  }

  exceed_boundary(position){
    return 0 <= position.x && position.x < this.width && 0 <= position.y && position.y < this.height
  }

  draw_grids(){
    let grids = new PIXI.Graphics()
    grids.lineStyle(2, 0xBDBDBD)
    for(let x = 0; x < this.width; x += 50)
       grids.moveTo(x, 0).lineTo(x, this.height)
    for(let y = 0; y < this.height; y += 50)
       grids.moveTo(0, y).lineTo(this.width, y)    
    this.stage.addChild(grids)
  }

  draw_borders(){
    let borders = new PIXI.Graphics()
    borders.lineStyle(2, 0xBDBDBD)
       .moveTo(0, 0)
       .lineTo(0, this.height)
       .lineTo(this.width, this.height)
       .lineTo(this.width, 0)
       .lineTo(0, 0)

    this.stage.addChild(borders)
  }

  set viewport(vw){
    this.stage.x = -vw.x + canvas.width/2
    this.stage.y = -vw.y + canvas.height/2
  }


  set game_loop(callback) {
    this.ticker.add(callback)
  }




}

export default World