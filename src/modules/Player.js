

class Particle extends GameObject {
  constructor (limit_h, limit_w, app){
    super()
    this.x = Math.random() * limit_w
    this.y = Math.random() * limit_h
    this.color = particle_color_variant[Math.ceil((Math.random() * particle_color_variant.length))]
    this.move_to = this.move_to.bind(this)

    this.instance = new PIXI.Graphics()
    this.instance.beginFill(this.color, 0.5)
    this.instance.drawCircle(x, y, 5)
    this.instance.endFill()
    app.stage.addChild(this.instance)

  }
  move_to(x, y){
    this.instance.moveTo(x, y)
  }

  static generate(amount, limit_w, limit_h){
    return Array(amount).fill(0).map(i => new Particle(limit_w, limit_h))
  }

}

export default Player