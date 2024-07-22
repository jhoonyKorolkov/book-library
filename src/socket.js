import { Server } from 'socket.io'

const startSocketIo = server => {
  const io = new Server(server, {
    connectionStateRecovery: {}
  });
 

  io.on('connection', socket => {
    console.log('a user connected')


    // socket.on('comment message', (msg) => {
    //   socket.broadcast.emit('comment message', msg);
    //   socket.emit('comment message', msg);
    // });

    socket.on('comment message', (msg) => {
      io.emit('comment message', msg);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}

export default startSocketIo
