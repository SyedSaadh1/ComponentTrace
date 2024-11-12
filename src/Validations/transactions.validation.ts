import Joi from "joi";

const transactionsValidation = Joi.object({
  poId: Joi.string().required(),
  componentsDetails: Joi.array()
    .items(
      Joi.object({
        componentMasterId: Joi.string().required(),
        componentIds: Joi.array().items(Joi.string()).required(),
        quantity: Joi.number().positive().required(),
      })
    )
    .required(),
  componentsSummary: Joi.string().required(),
  to: Joi.string().required(),
  from: Joi.string().required(),
  sentDate: Joi.date().required(),
});
// const grnValidation=Joi.object({
//   poId:Joi.string().required(),
//   receivedDate:Joi.date().required();
// })
export default transactionsValidation;
