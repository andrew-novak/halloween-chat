const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const checkEnvVars = require("./beforeRun/checkEnvVars");
const logger = require("./debug/logger");
//const rootRouter = require("./routes");

checkEnvVars();
if (
  process.env.NODE_ENV != "development" &&
  process.env.NODE_ENV != "production"
) {
  process.env.NODE_ENV = "development";
}
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PUBLIC_CHAT_API_PORT;
const app = express();
const httpServer = http.Server(app);
const ioServer = new socketIo.Server(httpServer, {
  cors: { origin: "http://localhost:3000" },
});

// app.use(cors());

app.use(express.json({ limit: "10mb" }));
/*
app.use((req, res, next) => {
  logger.debug(`got request: ${req.method} ${req.url}`);
  next();
});
*/

//app.use("/", rootRouter);

ioServer.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (message) => {
    console.log("chat message received:", message);
  });
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

httpServer.listen(PORT, () => logger.info(`server started on port: ${PORT}`));

module.exports = httpServer;
