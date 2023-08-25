const logger = require("./logger");

const setLogs = (expressServer, ioServer) => {
  // Express requests
  expressServer.use((req, res, next) => {
    logger.debug(`Express request: ${req.method} ${req.url}`);
    next();
  });

  // Socket.IO event received
  ioServer.use((socket, next) => {
    socket.onAny((eventName, ...args) => {
      logger.debug(
        `Socket.IO event received: nsp:"${socket.nsp.name}" event:"${eventName}" socId:"${socket.id}"  url:"${socket.request.url}" args:`,
        args
      );
    });
    next();
  });

  // Socket.IO event emitted using 'ioServer.emit'
  const originalEmit = ioServer.emit;
  ioServer.emit = function (event, ...args) {
    logger.debug(`Socket.IO event ioServer.emit: '${event}'`, args);
    originalEmit.apply(ioServer, [event, ...args]);
  };

  // Socket.IO event emitted using 'socket.emit'
  ioServer.use((socket, next) => {
    const originalEmit = socket.emit;
    socket.emit = function (event, ...args) {
      logger.debug(`Socket.IO event socket.emit: '${event}'`, args);
      originalEmit.apply(socket, [event, ...args]);
    };
    next();
  });
};

module.exports = setLogs;
