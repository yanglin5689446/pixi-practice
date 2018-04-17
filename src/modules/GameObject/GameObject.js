
class GameObject {
	constructor(){
    
    this.in = this.in.bind(this)
    this.distance_between = this.distance_between.bind(this)
  }
  distance_between(another_object){
    const i = this.instance, i2 = another_object.instance
    return (i1.x - i2.x)*(i1.x - i2.x) + (i1.x - i2.y)*(i1.x - i2.y)
  }
  in(viewport){
    return viewport.left <= this.x && this.x <= viewport.right && viewport.bottom <= this.y && this.y <= viewport.top
  }
}

export default GameObject