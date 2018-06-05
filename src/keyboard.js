
const keycode_map = {
  'w': 87,
  'a': 65,
  's': 83,
  'd': 68
}

const key_pressed = {}

const keydown_listener = (e) => (key_pressed[e.keyCode] = true)

const keyup_listener = (e) => (key_pressed[e.keyCode] = false)

export { keycode_map, key_pressed, keydown_listener, keyup_listener }