const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const checkEnvVars = require("./beforeRun/checkEnvVars");
const setLogs = require("./debug/setLogs");
const logger = require("./debug/logger");
const isValidUsernameFormat = require("./helpers/isValidUsernameFormat");
const isUsernameBusy = require("./helpers/isUsernameBusy");
//const rootRouter = require("./routes");

checkEnvVars();
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PUBLIC_HALLOWEEN_CHAT_API_PORT;

let httpServer;
try {
  const expressServer = express();
  httpServer = http.Server(expressServer);
  const ioServer = new socketIo.Server(httpServer, {
    ...(NODE_ENV === "development" && {
      cors: { origin: "http://localhost:3000" },
    }),
  });

  // expressServer.use(cors());

  expressServer.use(express.json({ limit: "10mb" }));

  setLogs(expressServer, ioServer);

  //expressServer.use("/", rootRouter);

  const namedUsers = [];
  const allMessages = [];

  ioServer.on("connection", (socket) => {
    logger.info("user connected");

    // ioServer.of("");
    // ioServer.of("/");

    const removeUserFromList = (socketId) => {
      // nothing will happen, no error thrown, if no socketId key
      delete namedUsers[socketId];
      ioServer.emit("user_list", Object.values(namedUsers));
    };

    socket.on("select_username", (username) => {
      // check if incorrect format
      if (!isValidUsernameFormat(username)) {
        return socket.emit("select_username_response", {
          errorMessage:
            "The username must contain only letters, numbers, hyphens, and underscores.",
        });
      }
      // check if busy
      if (isUsernameBusy(username, namedUsers)) {
        return socket.emit("select_username_response", {
          errorMessage: "The username is currently taken.",
        });
      }

      socket.on("remove_username", () => {
        removeUserFromList(socket.id);
        socket.emit("remove_username_response");
      });

      // update user list
      namedUsers[socket.id] = { username };
      socket.emit("select_username_response", { selectedUsername: username });
      ioServer.emit("user_list", Object.values(namedUsers));
      logger.info(`user selected username: '${username}'`);
    });

    socket.on("text_message", (message) => {
      logger.info("text message received:", message);
      allMessages.push(message);
      logger.info("messages:", allMessages);
      ioServer.emit("text_message", message);
    });

    socket.on("emoji_message", (message) => {
      logger.info("emoji message received:", message);
      allMessages.push(message);
      logger.info("messages:", allMessages);
      ioServer.emit("emoji_message", message);
    });

    socket.on("disconnect", () => {
      logger.info("user disconnected");
      removeUserFromList(socket.id);
    });
  });

  httpServer.listen(PORT, () =>
    logger.info(`server started on port: ${PORT} with NODE_ENV: ${NODE_ENV}`)
  );
} catch (err) {
  logger.error("An error occured:");
  logger.error(err);
}

module.exports = httpServer;
