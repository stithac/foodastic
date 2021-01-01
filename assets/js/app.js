$("#btnSearch").click(yelpSearch);

function yelpSearch() {

    var yelpURL =
        "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=6&term=Starbucks";

    //Ensure either city or zip is present
    var citySearch = $("#cityInput").val();
    var zipSearch = $("#zipInput").val();

    if (citySearch.length === 0 && !(isNaN(zipSearch)) && zipSearch.length != 5) {
        alert("Please provide a city or a 5-digit ZIP code");
        return;
    } else {
        if (citySearch.length > 0) {
            yelpURL += "&location=" + citySearch
        } else {
            yelpURL += "&location=" + zipSearch
        }
    }
    console.log(yelpURL);

    // get radius option
    var radius = $("#radiusOptions option:selected").val();

    // if () {

    // }
    //Empty the contents to make room for the cards
    $("#imageContainer").empty();

    var settings = {
        url: yelpURL,
        method: "GET",
        timeout: 0,
        headers: {
            Authorization: "Bearer 3O5kyW6F4g5mDywsBmxsp0roWlT-dciawIInefnOItXxFkZFSR3rvRenorOaVfIEtnNRdlOHqVEXwHJQat0PkPa-YBt9EIf_NTTOo0S1AmHCbk3ALK0mPPXCCSLeX3Yx",
        },
    };

    $.ajax(settings).done(function(response) {
        console.log(response, response.businesses.length);

        for (var i = 0; i < response.businesses.length; i++) {

            //check to see if the price is defined
            if ("price" in response.businesses[i]) {
                var priceHTML = "Price: " + response.businesses[i].price;
            } else {
                var priceHTML = "Price: Unavailable";
            }
            $(
                '<div class="card"><img src="' +
                response.businesses[i].image_url +
                '" class="card-img-top" alt=""><div class="card-body"><h5 class="card-title">Name: ' +
                response.businesses[i].name +
                '</h5><p class="card-text">Phone: ' +
                response.businesses[i].display_phone +
                "<br />" +
                "Rating: " +
                response.businesses[i].rating +
                "<br />" +
                "Reviews: " +
                response.businesses[i].review_count +
                "<br />" +
                priceHTML +
                //"Price: " + response.businesses[i].price +
                '</p><a href="#" class="btn btn-primary">See More</a></div></div>'
            ).insertAfter("#imageContainer");
        }
    });
}