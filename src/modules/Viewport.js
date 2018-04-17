
class Viewport {
  constructor(x, y){
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.set_center(x, y)
  }
  set_center(x, y){
    this.center = {x, y};
    this.left = this.center.x - this.width/2;
    this.right = this.center.x + this.width/2;
    this.bottom = this.center.y - this.height/2;
    this.top = this.center.y + this.height/2;
  }
}

export default Viewport