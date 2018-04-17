
import Viewport from './Viewport'

class World {
  constructor(width, height){
    this.width = width || window.innerWidth
    this.height = height || window.innerHeight
    this.viewport = new Viewport(width/2, height/2)
  }
}

export default World