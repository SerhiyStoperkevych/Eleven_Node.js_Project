const setupSocket = (io) => {
    io.on('connection', (socket) => {
      console.log('New client connected');
  
      socket.on('message', (message) => {
        io.emit('message', message);
      });
  
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
};
  
module.exports = setupSocket;
  
