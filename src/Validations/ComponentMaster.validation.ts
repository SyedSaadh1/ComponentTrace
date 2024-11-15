import Joi from "joi";

const componentMasterSchemaValidate = Joi.object({
  componenMasterId: Joi.string().optional(),
  componentMasterName: Joi.string().required(),
  componentMasterDescription: Joi.string().optional(),
  category: Joi.string().required(),
  components: Joi.array()
    .items(
      Joi.object({
        componentMasterId: Joi.string().required(),
        componentMasterName: Joi.string().required(),
        quantity: Joi.number().required(),
      })
    )
    .optional(),
  createdBy: Joi.string().optional(),
  isFinalProduct: Joi.boolean().required(),
});

export default componentMasterSchemaValidate;
