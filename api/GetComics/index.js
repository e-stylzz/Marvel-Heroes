const https = require("https");
const url = require("url");
const md5 = require("js-md5");

module.exports = async function (context, req) {
  const newUrl = new URL(req.url);
  const search_params = newUrl.searchParams;
  const limit = search_params.get("limit");
  const offset = search_params.get("offset");

  let ts = new Date().toISOString();
  let private_key = process.env["Private_Key"];
  let public_key = process.env["Public_Key"];
  let prehash = ts + private_key + public_key;
  let hash = md5(prehash);

  let url =
    "https://gateway.marvel.com:443/v1/public/comics?ts=" +
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

      resp.on("data", (chunk) => {
        data += chunk;
      });

      resp.on("end", () => {
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
