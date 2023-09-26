const { MESSAGE_EXPIRATION_MS } = require("../constants/general");

const removeOldMessages = (messages) => {
  const currentTime = new Date();
  const filteredMessages = messages.filter((message) => {
    const timeDifference = currentTime - message.timestamp;
    return timeDifference <= MESSAGE_EXPIRATION_MS;
  });
  return filteredMessages;
};

module.exports = removeOldMessages;
