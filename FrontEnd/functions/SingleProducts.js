const dotenv = require("dotenv");
dotenv.config();
const Airtable = require("airtable-node");
const airtable = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
})
  .base(process.env.REACT_APP_BASE)
  .table(process.env.REACT_APP_TABLE);

exports.handler = async function (event, context, cd) {
  const { id } = event.queryStringParameters;
  if (id) {
    try {
      let singleProduct = await airtable.retrieve(id);
      if (singleProduct.error) {
        return {
          statusCode: 404,
          body: `No product with id of ${id}`,
        };
      }
      singleProduct = { id: singleProduct.id, ...singleProduct .fields};
      
      return {
        statusCode: 200,
        body: JSON.stringify(singleProduct),
      };
    } catch (error) {}
    return {
      statusCode: 500,
      body: "Server error",
    };
  }
};
