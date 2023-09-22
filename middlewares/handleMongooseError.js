const handleMongooseError = (error, data, next) => {
  const { name, code } = error;

  const status = name === 'MongoServerError' && code === 11000 ? 409 : 400;

  error.status = status;

  if (name === 'ValidationError') {
    error.message = 'Помилка від Joi або іншої бібліотеки валідації';
  }

  next();
};

module.exports = handleMongooseError;
