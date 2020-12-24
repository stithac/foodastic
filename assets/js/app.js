var mainContainer = document.getElementById("myData");

var settings = {
  url: sessionStorage.getItem('yelpURL'),
  //"https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?open_now=true&term=Starbucks&latitude=37.786882&longitude=-122.399972",
  method: "GET",
  timeout: 0,
  headers: {
    Authorization:
      "Bearer 3O5kyW6F4g5mDywsBmxsp0roWlT-dciawIInefnOItXxFkZFSR3rvRenorOaVfIEtnNRdlOHqVEXwHJQat0PkPa-YBt9EIf_NTTOo0S1AmHCbk3ALK0mPPXCCSLeX3Yx",
  },
};

$.ajax(settings).done(function (response) {
  console.log(response, response.businesses.length);

  // for (var i = 0; i < response.businesses.length; i++) {
  //   var div = document.createElement("div");
  //   div.innerHTML =
  //     "Name: " +
  //     response.businesses[i].name +
  //     "<br />" +
  //     "Phone: " +
  //     response.businesses[i].display_phone +
  //     "<br />" +
  //     "Rating: " +
  //     response.businesses[i].rating +
  //     "<br />" +
  //     "Reviews: " +
  //     response.businesses[i].review_count +
  //     "<br />" +
  //     "Price: " +
  //     response.businesses[i].price +
  //     "<br /><br />";
  //   mainContainer.appendChild(div);
  // }
});

$("#btnSearch").click(yelpSearch);

function yelpSearch() {
  sessionStorage.setItem('yelpURL','https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?open_now=true&term=Starbucks&latitude=37.786882&longitude=-122.399972');
  window.location = "results.html";
}
