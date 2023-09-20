const removeOldMessages = (messages) => {
  const currentTime = new Date();
  const filteredMessages = messages.filter((message) => {
    const timeDifference = currentTime - message.timestamp;
    const oneHourInMilliseconds = 60 * 60 * 1000; // 1 hour in milliseconds
    return timeDifference <= oneHourInMilliseconds;
  });
  return filteredMessages;
};

module.exports = removeOldMessages;
