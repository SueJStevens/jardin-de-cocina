var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

/*
Example url = "https://www.burpee.com/vegetables/artichokes/artichoke-imperial-star-hybrid-prod000566.html";
*/

module.exports = function(app) {
  //routes

  // Load scrape-product page
  app.get("/scrape-product", function(req, res) {
    res.render('scrape-product', {
      title: 'Jardin de Cocina',
      nav: true
    });
  });  

  app.post("/api/scrape-product", function(req, res) {
    console.log(req.body);
    var URL = req.body.plantAttrURL
    // First, we grab the body of the html with axios
    axios.get(URL).then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
  
      // Save an empty result object
      var prodAttrArray = [];
      var attributeTitle = "";
      var attributeDescription = "";
      // Add the text and href of every link, and save them as properties of the result object
      $(".b-product_attribute").each(function(i, element) {
        x = [];
        attributeTitle = $(element).find($(".b-product_attribute-title")).text().replace(/(\r\n\t|\n|\r\t)/gm,"").replace(" ","").replace(" ","");
        attributeDescription = $(element).find($(".b-product_attribute-description")).text().replace(/(\r\n\t|\n|\r\t)/gm,"");
        //push each product attribute into the product array
        x.push(attributeTitle);
        x.push(attributeDescription);
        prodAttrArray.push(x);
      });
      //reduce the prodAttrArry to an object
      plantAttrObj = prodAttrArray.reduce(function(prev,curr){prev[curr[0]]=curr[1];return prev;},{})
      //Add as a property of the Plant object
      req.body.plantAttributes = plantAttrObj;
      console.log(req.body);
      //Create new Plant
      db.Plant.create(req.body);
    });
  });

  /* GET home page. */
  app.get('/index', function (req, res, next) {
    res.render('index', {
      title: 'Jardin de Cocina',
      nav: true
    });
  });

  /* GET home page. */
  app.get('/', function (req, res, next) {
    res.render('index', {
      title: 'Jardin de Cocina',
      nav: true
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });


};




  // // A GET route for scraping the indicated website
  // router.get("/scrape", function(req, res) {
  //   // First, we grab the body of the html with axios
  //   axios.get(url).then(function(response) {
  //     // Then, we load that into cheerio and save it to $ for a shorthand selector
  //     var $ = cheerio.load(response.data);
  //       // An empty array to save the data that we'll scrape
  //     var results = [];
  //     $(".b-product_attribute").each(function(i, element) {

  //       //var title = $(element).children().text();
    
  //       var title = $(element).find($(".b-product_attribute-title")).text();
  //       var description = $(element).find($(".b-product_attribute-description")).text();
    
  //       // Save these results in an object that we'll push into the results array we defined earlier
  //       results.push({
  //         title: title,
  //         description: description
  //       });
  //     });
    
  //     // Log the results once you've looped through each of the elements found with cheerio
  //     console.log(results);
  