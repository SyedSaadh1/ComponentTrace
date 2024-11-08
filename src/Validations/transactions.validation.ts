import Joi from "joi";

const transactionsValidation = Joi.object({
  transactionId: Joi.string().required(),
  poId: Joi.string().required(),
  componentsSummary: Joi.array()
    .items(
      Joi.object({
        componentMasterId: Joi.string().required(),
        componentIds: Joi.array().items(Joi.string()).required(),
        quantity: Joi.number().positive().required(),
      })
    )
    .required(),
  to: Joi.string().required(),
  from: Joi.string().required(),
  sentDate: Joi.date().required(),
});

export default transactionsValidation;
