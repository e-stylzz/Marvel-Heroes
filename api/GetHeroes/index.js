const https = require("https");
md5 = require("js-md5");

module.exports = async function (context, req) {
  let ts = new Date().toISOString();
  let private_key = process.env["Private_Key"];
  let public_key = process.env["Public_Key"];
  let prehash = ts + private_key + public_key;
  let hash = md5(prehash);

  console.log("Hash: ", hash);
  let url =
    "https://gateway.marvel.com:443/v1/public/characters?ts=" +
    ts +
    "&apikey=" +
    public_key +
    "&hash=" +
    hash;

  https
    .get(url, (resp) => {
      //console.log("----------------------", resp);
      let data = "";

      // A chunk of data has been recieved.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        console.log(
          "----------------------------------------------------",
          JSON.parse(data).data
        );
        result = JSON.parse(data).data;
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });

  console.log("result: ", result);
  context.res = {
    body: {
      result,
    },
  };

  // if (req.query.name || (req.body && req.body.name)) {
  //     context.res = {
  //         // status: 200, /* Defaults to 200 */
  //         body: "Hello " + (req.query.name || req.body.name)
  //     };
  // }
  // else {
  //     context.res = {
  //         status: 400,
  //         body: "Please pass a name on the query string or in the request body"
  //     };
  // }
};
