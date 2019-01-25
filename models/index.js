var cheerio = require("cheerio");
var axios = require("axios");



axios.get("http://www.awwwards.com/websites/clean/").then(function(response) {

  var $ = cheerio.load(response.data);

  var results = [];

 $("figure.rollover").each(function(i, element) {



