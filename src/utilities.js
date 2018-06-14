

function distance_between(object1, object2){
  const x1 = object1.renderer.position.x, y1 = object1.renderer.position.y
  const x2 = object2.renderer.position.x, y2 = object2.renderer.position.y
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
}

export { distance_between }