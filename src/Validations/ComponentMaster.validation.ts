import Joi from "joi";

const componentMasterSchemaValidate = Joi.object({
  componenMasterId: Joi.string().optional(),
  componentMasterName: Joi.string().required(),
  componentMasterDescription: Joi.string().optional(),
  category: Joi.string().required(),
  components: Joi.array()
    .items(
      Joi.object({
        componentMasterName: Joi.string().required(),
        quantity: Joi.number().required(),
      })
    )
    .optional(),
  createdBy: Joi.string().optional(),
});

export default componentMasterSchemaValidate;
