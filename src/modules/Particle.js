

import GameObject from './GameObject/GameObject'

const particle_color_variant = [0xFFA000, 0xFF3D00, 0x64DD17, 0x2E7D32, 0x4DB6AC, 0x01579B, 0xD50000, 0x512DA8, 0xE91E63]

class Particle extends GameObject {

  constructor (limit_h, limit_w){
    super()
    this.color = particle_color_variant[Math.ceil((Math.random() * particle_color_variant.length))]
    this.instance = new PIXI.Graphics()
    this.instance.x = Math.random() * limit_w
    this.instance.y = Math.random() * limit_h

    // function binding
    this.draw = this.draw.bind(this)

    this.draw()
  }
  draw(){
    this.instance.beginFill(this.color, 0.5)
    this.instance.drawCircle(0, 0, 10)
    this.instance.endFill()
  }
}

export default Particle
