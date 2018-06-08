
import io from 'socket.io-client'

const socket = io(SERVER, {
  transports: ['websocket'], 
  upgrade: false, 
  autoConnect: false 
});

export default socket