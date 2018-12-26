/******************************************************************************
 *
 * Summary:
 *  This file contains the primary front-end java script functions and logic
 *  for pushing product details from the Burpee website into the plants table
 *
 *****************************************************************************/
$(function() {

  $(document).on("click", ".btn.save", handleScrape);

  var API = {
    save: function(save) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/scrape-product",
        data: JSON.stringify(save)
      }); //end ajax return
    } //end save function
  }; //end var API

  function handleScrape() {
    //set plantCategories as an array
    var plantCategories = [];
    //get values from form
    plantCategories.push($('#plantCategories').val());
    var plantClass = $('#plantClass').val().replace(', ',',').split(',');
    var commonName = $('#commonName').val();
    var variety = $('#variety').val();
    var plantAttrURL = $('#url').val();

    //console.log(plantAttrURL);
    //console.log(plantCategories);
    //console.log(commonName);

    //create object
    var obj = {
      plantCategories: plantCategories,
      plantClass: plantClass,
      commonName: commonName,
      variety: variety,
      plantAttrURL: plantAttrURL
    };
    console.log("Object: "+ obj);

    API.save(obj).then(function() {
      console.log(obj);
      console.log("Saved!");
    });  

  }; //end function handle scrape

}); //end on load js