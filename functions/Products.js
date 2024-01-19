const dotenv = require("dotenv");
dotenv.config();
const Airtable = require("airtable-node");
const airtable = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
})
  .base(process.env.REACT_APP_BASE)
  .table(process.env.REACT_APP_TABLE);
exports.handler = async function () {
  try {
    const response = await airtable.list({ maxRecords: 200 });
     console.log('######');
    console.log(response);
    console.log('######');
    const products = response.records.map((product) => {
      const { id, fields } = product;
      const {
        name,
        featured,
        price,
        colors,
        company,
        description,
        category,
        shipping,
        images,
      } = fields;

      const {url} =  images[0]
      return {
        id,
        name,
        featured,
        price,
        colors,
        company,
        description,
        category,
        shipping,
        image:url,
      };
    });
    // console.log('######');
    // console.log(products);
    // console.log('######');
    return {
      statusCode: 200,
      body:JSON.stringify(products),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: "There was an error",
    };
  }
};
