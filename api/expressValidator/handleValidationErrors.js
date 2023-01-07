const { validationResult } = require("express-validator");

const logger = require("../debug/logger");

const createMessage = (errors) =>
  `${errors
    .map((error) => `"${error.param}"`)
    .join(", ")} value(s) failed validation.`;

const handleValidationErrors = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const { errors } = result;
    const errorsNoDuplicates = errors.filter(
      (error, index, array) =>
        index ===
        array.findIndex(
          (e) =>
            e.value === error.value &&
            e.msg === error.msg &&
            e.param === error.param &&
            e.location === error.location
        )
    );
    const message = createMessage(errorsNoDuplicates);
    logger.debug(message);
    return res.status(400).json({ message });
  }
  next();
};

module.exports = handleValidationErrors;
