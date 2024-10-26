import Joi from "joi";

const componentMasterSchemaValidate = Joi.object({
  componenMasterId: Joi.string().guid().optional(),
  componentMasterName: Joi.string().required(),
  componentMasterDescription: Joi.string().optional(),
  category: Joi.string().required(),
  quantity: Joi.number().required(),
  components: Joi.array()
    .items(
      Joi.object({
        componentMasterName: Joi.string().required(),
        quantity: Joi.number().required(),
      })
    )
    .optional(),
  createdBy: Joi.string().required(),
});

export default componentMasterSchemaValidate;
