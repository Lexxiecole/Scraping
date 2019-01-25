var cheerio = require("cheerio");
var axios = require("axios");

// First, tell the console what server2.js is doing
console.log("\n******************************************\n" +
            "Grabbing every article headline and link\n" +
            "from the NHL website:" +
            "\n******************************************\n");

// Making a request via axios for `nhl.com`'s homepage
axios.get("https://www.nhl.com/").then(function(response) {


  var $ = cheerio.load(response.data);
  var jersey = $(element).text();


  var results = [];
  $("h4.headline-link").each(function(i, element) {


    var jersey = $(element).text();

    var link = $(element).parent().attr("href");

results.push({
      title: title,
      link: link
    })
});
