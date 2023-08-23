const envKeys = [
  "PUBLIC_HALLOWEEN_CHAT_API_PORT",
  "PUBLIC_HALLOWEEN_CHAT_SOCKET_IO_PATH",
];

const checkEnv = (keys) => {
  for (key of keys) {
    if (!process.env.hasOwnProperty(key)) {
      throw new Error(`Environemnt variable ${key} not found.`);
    }
  }
};

const checkEnvVars = () => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV !== "development" && NODE_ENV !== "production")
    throw new Error(
      `Environment variable NODE_ENV must be set to either "development or "production".`
    );
  checkEnv(envKeys);
};

module.exports = checkEnvVars;
