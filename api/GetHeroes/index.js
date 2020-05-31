const https = require("https");
const url = require("url");
const md5 = require("js-md5");

module.exports = async function (context, req) {

  const newUrl = new URL(req.url);
  const search_params = newUrl.searchParams;
  const limit = search_params.get('limit');
  const offset = search_params.get('offset');

  let ts = new Date().toISOString();
  let private_key = process.env["Private_Key"];
  let public_key = process.env["Public_Key"];
  let prehash = ts + private_key + public_key;
  let hash = md5(prehash);

  let url =
    "https://gateway.marvel.com:443/v1/public/characters?ts=" +
    ts +
    "&apikey=" +
    public_key +
    "&hash=" +
    hash +
    "&limit=" +
    limit +
    "&offset=" +
    offset;
    
  https
    .get(url, (resp) => {
      let data = "";

      // A chunk of data has been recieved.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        console.log(JSON.parse(data).data);
        result = JSON.parse(data).data;
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });

  context.res = {
    body: {
      result,
    },
  };

};
