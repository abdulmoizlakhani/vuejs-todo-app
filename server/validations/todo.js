const Joi = require("joi");

const validateTodo = (data) => {
  const todoSchema = Joi.object({
    text: Joi.string().min(12).max(36).required(),
    editMode: Joi.boolean().default(false),
    done: Joi.boolean().default(false),
  });

  return todoSchema.validateAsync(data);
};

module.exports = validateTodo;
