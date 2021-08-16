const generateFormattedResponseData = (
  data = null,
  statusCode = 200,
  message = ""
) => {
  return { data, statusCode, message };
};

const throwAPIResponse = (res, data, statusCode, message) => {
  res.status(statusCode).json(generateFormattedResponseData(data, statusCode, message));
};

const isBoolean = (val) => "boolean" === typeof val;

const generateUpdatedTodo = (oldTodo, newTodo) => {
  const { text, editMode, done, createdAt, updatedAt } = oldTodo;
  const updatedTodo = { text, editMode, done, createdAt, updatedAt };
  if (newTodo?.text?.trim()) {
    updatedTodo["text"] = newTodo.text.trim();
  }
  if (isBoolean(newTodo?.editMode)) {
    updatedTodo["editMode"] = newTodo.editMode;
  }
  if (isBoolean(newTodo?.done)) {
    updatedTodo["done"] = newTodo.done;
  }
  return updatedTodo;
};

module.exports = {
  generateFormattedResponseData,
  throwAPIResponse,
  isBoolean,
  generateUpdatedTodo,
};
