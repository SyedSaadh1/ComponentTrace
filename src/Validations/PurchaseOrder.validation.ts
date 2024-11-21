import Joi from "joi";

const purchaseOrderSchemaValidation = Joi.object({
  orderDetails: Joi.array()
    .items(
      Joi.object({
        componentMasterName: Joi.string().required(),
        quantity: Joi.number().required(),
        expectedDate: Joi.date().required(),
      })
    )
    .required(),
  orderedFrom: Joi.string().required(),
  orderedTo: Joi.string().required(),
  address: Joi.string().required(),
  description: Joi.string().optional(),
});

export default purchaseOrderSchemaValidation;
