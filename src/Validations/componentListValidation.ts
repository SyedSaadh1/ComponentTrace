import Joi from "joi";

const componentListSchemaValidate = Joi.object({
  componentName: Joi.string().required(),
  componentDescription: Joi.string().optional(),
  category: Joi.string().required(),
  subComponents: Joi.array()
    .items(
      Joi.object({
        componentId: Joi.string().required(),
        componentName: Joi.string().required(),
        quantity: Joi.number().min(1).required(), // Ensures quantity is at least 1
      })
    )
    .optional(),
  createdBy: Joi.string().optional(),
  wareHouseLocation: Joi.string().optional(),
  isAvailable: Joi.boolean().required(),
});

export default componentListSchemaValidate;
