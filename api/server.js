const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const checkEnvVars = require("./beforeRun/checkEnvVars");
const logger = require("./debug/logger");
//const rootRouter = require("./routes");

checkEnvVars();
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PUBLIC_HALLOWEEN_CHAT_API_PORT;
const SOCKET_IO_PATH = process.env.PUBLIC_HALLOWEEN_CHAT_SOCKET_IO_PATH;

let httpServer;
try {
  const app = express();
  httpServer = http.Server(app);
  const ioServer = new socketIo.Server(httpServer, {
    ...(NODE_ENV === "development" && {
      cors: { origin: "http://localhost:3000" },
    }),
    path: SOCKET_IO_PATH,
  });

  // app.use(cors());

  app.use(express.json({ limit: "10mb" }));

  // log requests
  app.use((req, res, next) => {
    logger.debug(`Express request: ${req.method} ${req.url}`);
    next();
  });
  ioServer.use((socket, next) => {
    socket.onAny((eventName, ...args) => {
      logger.debug(
        `Socket.IO event: "${socket.nsp.name}" "${socket.id}" "${eventName}" "${socket.request.url}" Arguments:`,
        args
      );
    });
    next();
  });

  //app.use("/", rootRouter);

  const allMessages = [];

  ioServer.on("connection", (socket) => {
    logger.info("a user connected");

    ioServer.of("");

    socket.on("text message", (message) => {
      logger.info("text message received:", message);
      allMessages.push(message);
      logger.info("messages:", allMessages);
      ioServer.emit("text message", message);
    });

    socket.on("emoji message", (message) => {
      logger.info("emoji message received:", message);
      allMessages.push(message);
      logger.info("messages:", allMessages);
      ioServer.emit("emoji message", message);
    });

    socket.on("disconnect", () => {
      logger.info("a user disconnected");
    });
  });

  httpServer.listen(PORT, () =>
    logger.info(
      `server started on port: ${PORT} with NODE_ENV: ${NODE_ENV} & SOCKET_IO_PATH: ${SOCKET_IO_PATH}`
    )
  );
} catch (err) {
  logger.error("An error occured:");
  logger.error(err);
}

module.exports = httpServer;
