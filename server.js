axios.get("https://www.mjbizdaily.com").then(function(response) {
  var $ = cheerio.load(response.data);

var cheerio = require("cheerio");
var axios = require("axios");

  var results = [];

  $("article.css-180b3ld").each(function(i, element) {

    var title = $(element).children().text();
    var link = $(element).find("a").attr("href");

    results.push({
      title: title,
      link: link
    });
  });

  console.log(results);


    $(".theme-summary").each(function(i, element) {

        var head = $(this)
          .children(".story-heading")
          .text()
          .trim();
  
        if (head & sum & url) {

          var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ");
          var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ");
  




});
