
import GameObject from './index'

const particle_color_variant = [0xFFA000, 0xFF3D00, 0x64DD17, 0x2E7D32, 0x4DB6AC, 0x01579B, 0xD50000, 0x512DA8, 0xE91E63]

class Particle extends GameObject {

  constructor (x, y){
    super()
    this.color = particle_color_variant[Math.ceil((Math.random() * particle_color_variant.length))]
    this.renderer = new PIXI.Graphics()
    this.renderer.x = x
    this.renderer.y = y

    // function binding
    this.draw = this.draw.bind(this)

    this.draw()
  }
  draw(){
    this.renderer.beginFill(this.color, 0.5)
    this.renderer.drawCircle(0, 0, 10)
    this.renderer.endFill()
  }
}

export default Particle
