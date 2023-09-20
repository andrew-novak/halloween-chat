import { useEffect } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";

import {
  NODE_ENV,
  API_URL,
  SOCKET_IO_BASE,
  SOCKET_IO_PATH,
  SHOW_LOGS,
} from "constants/env";
import setSocket from "actions/setSocket";
import EnterUsernameScreen from "screens/EnterUsernameScreen";
import ChatScreen from "screens/ChatScreen";

const Routes = ({ socket, username, setSocket }) => {
  // Socket.IO event logging
  useEffect(() => {
    if (!SHOW_LOGS || !socket) return;

    // Log every emitted event
    const originalEmit = socket.emit;
    socket.emit = function (event, ...args) {
      console.log(`Sending event: '${event}'`, ...args);
      originalEmit.apply(socket, [event, ...args]);
    };

    // Log every received event
    const logEveryEvent = (event, ...args) => {
      console.log(`Received event: '${event}'`, ...args);
    };
    socket.onAny(logEveryEvent);
    return () => {
      socket.offAny(logEveryEvent);
    };
  }, [socket]);

  // Connect to Socket.IO
  useEffect(() => {
    const basePath = NODE_ENV === "production" ? SOCKET_IO_BASE : API_URL;
    const customPath = NODE_ENV === "production" && SOCKET_IO_PATH;
    if (SHOW_LOGS) {
      console.log(
        `An attempt to establish a connection to Socket.IO using following:`
      );
      console.log("--- Socket.IO base:", basePath);
      console.log("--- Socket.IO path:", customPath || "/socket.io (default)");
    }

    const sock = io.connect(basePath, {
      path: customPath,
    });

    sock.on("connect", () => {
      console.log("Connected to Socket.IO");
      setSocket(sock);
    });
    sock.on("disconnect", () => {
      setSocket(null);
    });
    sock.on("connect_error", (err) => {
      console.error(
        `An error occurred during a connection attempt (connect_error):`,
        err
      );
    });
    return () => sock.disconnect();
  }, []);

  if (!username) return <EnterUsernameScreen />;
  return <ChatScreen />;
};

const mapState = (state) => {
  const { socket, username } = state.chat;
  return { socket, username };
};

export default connect(mapState, { setSocket })(Routes);
