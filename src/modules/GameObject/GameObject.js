
class GameObject {
	constructor(){
    this.distance_between = this.distance_between.bind(this)
  }
  distance_between(another_object){
    const i1 = this.instance, i2 = another_object.instance
    return Math.sqrt((i1.x - i2.x)*(i1.x - i2.x) + (i1.y - i2.y)*(i1.y - i2.y))
  }
}

export default GameObject