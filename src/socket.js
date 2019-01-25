
import io from 'socket.io-client'

const socket = io(SERVER, {
  transports: ['websocket'], 
  upgrade: false, 
  autoConnect: false
});

socket.on('connect_error', () => window.location.reload())
socket.on('disconnect', () => window.location.reload())

export default socket
