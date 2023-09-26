import { useRef, useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { connect } from "react-redux";

import removeReduxUsername from "actions/removeReduxUsername";
import {
  receiveDataUpdate,
  receiveRemoveUsernameResponse,
} from "actions/receive";
import { sendRemoveUsername, sendText, sendEmoji } from "actions/send";
import Screen from "components/Screen";
import ChatHeader from "components/ChatHeader";
import ChatBody from "components/ChatBody";
import ChatFooter from "components/ChatFooter";
import EmojiButton from "components/EmojiButton";
import UsersModal from "components/UsersModal";
import icon from "assets/brand-icon.svg";

const ChatScreen = ({
  socket,
  username,
  users,
  messages,
  removeReduxUsername,
  receiveDataUpdate,
  receiveRemoveUsernameResponse,
  sendRemoveUsername,
  sendText,
  sendEmoji,
}) => {
  const theme = useTheme();

  const textInputRef = useRef();
  const footerRef = useRef();
  const [footerHeight, setFooterHeight] = useState(0);
  const [messageInput, setMessageInput] = useState("");
  const [isDisplayingEmojis, setIsDisplayingEmojis] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);

  // Socket.IO
  useEffect(() => {
    if (!socket && username) {
      removeReduxUsername();
    }
    if (socket) {
      socket.on("data_update", receiveDataUpdate);
      socket.on("remove_username_response", receiveRemoveUsernameResponse);
      return () => {
        socket.off("data_update", receiveDataUpdate);
        socket.off("remove_username_response", receiveRemoveUsernameResponse);
      };
    }
  }, [socket, receiveDataUpdate, receiveRemoveUsernameResponse]);

  // Listen to Footer Height Changes
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === footerRef.current) {
          setFooterHeight(entry.target.offsetHeight);
        }
      }
    });

    if (footerRef.current) {
      // capture initial height
      setFooterHeight(footerRef.current.offsetHeight);
      // start observing
      resizeObserver.observe(footerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Always focus TextField
  useEffect(() => {
    if (textInputRef.current) {
      const handleFocus = () => {
        textInputRef.current.focus();
      };
      window.addEventListener("click", handleFocus);
      return () => {
        window.removeEventListener("click", handleFocus);
      };
    }
  }, []);

  const submitText = () => {
    if (!socket)
      return console.error(
        "Unable to submit a text message, 'socket' is 'null'"
      );
    sendText(socket, username, messageInput);
    setMessageInput("");
  };

  const submitEmoji = (emojiName) => {
    if (!socket)
      return console.error(
        "Unable to submit an emoji message, 'socket' is 'null'"
      );
    sendEmoji(socket, username, emojiName);
    setIsDisplayingEmojis(false);
  };

  return (
    <Screen>
      {/* ChatBody first, or otherwise it would cover the ChatHeader*/}
      <ChatBody
        maxWidth={600}
        users={users}
        messages={messages}
        username={username}
        footerHeight={footerHeight}
      />
      <ChatHeader
        username={username}
        removeUsername={() => sendRemoveUsername(socket)}
        showUsersModal={() => setIsModalShown(true)}
      />
      <ChatFooter
        maxWidth={600}
        footerRef={footerRef}
        textInputRef={textInputRef}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        isDisplayingEmojis={isDisplayingEmojis}
        setIsDisplayingEmojis={setIsDisplayingEmojis}
        submitText={submitText}
        submitEmoji={submitEmoji}
      />
      <UsersModal
        users={users}
        isShown={isModalShown}
        hide={() => setIsModalShown(false)}
      />
    </Screen>
  );
};

const mapState = (state) => {
  const { socket, username, users, messages } = state.chat;
  return { socket, username, users, messages };
};

export default connect(mapState, {
  removeReduxUsername,
  receiveDataUpdate,
  receiveRemoveUsernameResponse,
  sendRemoveUsername,
  sendText,
  sendEmoji,
})(ChatScreen);
