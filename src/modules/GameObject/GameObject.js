
class GameObject {
	constructor(){
    
    this.in = this.in.bind(this)
  }
  in(viewport){
    return viewport.left <= this.x && this.x <= viewport.right && viewport.bottom <= this.y && this.y <= viewport.top
  }
}

export default GameObject