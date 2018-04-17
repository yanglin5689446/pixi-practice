

import GameObject from './GameObject/GameObject'

const particle_color_variant = [0xFFA000, 0xFF3D00, 0x64DD17, 0x2E7D32, 0x4DB6AC, 0x01579B, 0xD50000, 0x512DA8, 0xE91E63]

class Particle extends GameObject {

  constructor (limit_h, limit_w){
    super()
    this.color = particle_color_variant[Math.ceil((Math.random() * particle_color_variant.length))]
    this.move = this.move.bind(this)
    
    this.instance = new PIXI.Graphics()
    this.instance.beginFill(this.color, 0.5)
    this.instance.x = Math.random() * limit_w
    this.instance.y = Math.random() * limit_h

    this.instance.drawCircle(0, 0, 10)

    this.instance.endFill()

  }
  move(dx, dy){
    this.instance.x += dx
    this.instance.y += dy
  }

  static generate(amount, limit_w, limit_h){
    return Array(amount).fill(0).map(i => new Particle(limit_w, limit_h))
  }

}

export default Particle
