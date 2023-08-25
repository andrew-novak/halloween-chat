const isValidUsernameFormat = (username) => {
  const regex = /^[a-zA-Z0-9_-]+$/;
  return regex.test(username);
};

module.exports = isValidUsernameFormat;
