const isUsernameBusy = (usernameToCheck, currentUsers) => {
  for (const socketId in currentUsers) {
    const user = currentUsers[socketId];
    if (user.username === usernameToCheck) {
      return true; // Username is already in use
    }
  }
  return false; // Username is not in use
};

module.exports = isUsernameBusy;
