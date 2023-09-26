const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const checkEnvVars = require("./beforeRun/checkEnvVars");
const { NODE_ENV, API_PORT } = require("./constants/env");
const setLogs = require("./debug/setLogs");
const logger = require("./debug/logger");
const removeOldMessages = require("./helpers/removeOldMessages");
const isValidUsernameFormat = require("./helpers/isValidUsernameFormat");
const isUsernameBusy = require("./helpers/isUsernameBusy");
//const rootRouter = require("./routes");

checkEnvVars();

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

  //expressServer.use("/", rootRouter);

  setLogs(expressServer, ioServer);

  const namedUsers = [];
  let allMessages = [];

  const emitDataUpdate = () => {
    ioServer.emit("data_update", {
      users: Object.values(namedUsers).map((user) => user.username),
      messages: allMessages,
    });
  };

  setInterval(() => {
    const newMessages = removeOldMessages(allMessages);
    if (allMessages.length !== newMessages.length) {
      allMessages = newMessages;
      emitDataUpdate();
    }
  }, 3000);

  ioServer.on("connection", (socket) => {
    logger.info("user connected");

    const removeUserFromList = (socketId) => {
      // nothing will happen, no error thrown, if no socketId key
      delete namedUsers[socketId];
      emitDataUpdate();
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
        const username = namedUsers[socket.id]?.username || null;
        if (username) {
          logger.info(`user '${username}' removed username`);
        }
        socket.emit("remove_username_response");
        // If an anonymous user will emit remove_username that's ok,
        // nothing will happen and they will receive the response, so
        // they will be able to redirect to the enter username screen.
        removeUserFromList(socket.id);
      });

      // update user list
      namedUsers[socket.id] = { username };
      socket.emit("select_username_response", { selectedUsername: username });
      emitDataUpdate();
      logger.info(`user selected username: '${username}'`);
    });

    socket.on("text_message", ({ author, content }) => {
      logger.info(`[text] [${author}] ${content}`);
      const timestamp = new Date();
      const message = { author, category: "text", content, timestamp };
      allMessages.push(message);
      emitDataUpdate();
    });

    socket.on("emoji_message", ({ author, emojiName }) => {
      logger.info(`[emoji] [${author}] ${emojiName}`);
      const timestamp = new Date();
      const message = { author, category: "emoji", emojiName, timestamp };
      allMessages.push(message);
      emitDataUpdate();
    });

    socket.on("disconnect", () => {
      const username = namedUsers[socket.id]?.username || null;
      if (username) {
        logger.info(`user '${username}' disconnected`);
      } else {
        logger.info("anonymous user disconnected");
      }
      removeUserFromList(socket.id);
    });
  });

  httpServer.listen(API_PORT, () =>
    logger.info(
      `server started on port: ${API_PORT} with NODE_ENV: ${NODE_ENV}`
    )
  );
} catch (err) {
  logger.error("An error occured:");
  logger.error(err);
}

module.exports = httpServer;
