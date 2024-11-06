import Joi from "joi";

const componentListSchemaValidate = Joi.object({
  componentName: Joi.string().required(),
  componentMasterId: Joi.string().required(),
  componentState: Joi.string().required(),
  wareHouseLocation: Joi.string().optional(),
});

export default componentListSchemaValidate;
