console.log("hello");

var apiKey = "Cx23_JQh8GT1YzyuG6ozLIGRwIjI7TWKmwOL0leh4B35y_Kfy7y0GdfSbwU7TjuUanJ2XRpW7PiDhQL8vs3P1K2-e3E_p9CEf0MZoWLuFPFddvLxsnIkspS5Vq3bX3Yx"

// Returns
var bname = businesses[x].name;
var btitle = businesses[x].categories[x].title;
var bphone = businesses[x].display_phone;
var bdistance = businesses[x].distance // in meters from search location - convert to mi
var busID = businesses[x].id // needed for reviews, if we decide to use
var bImage = businesses[x].image_url;
var bdisplayAddress = businesses[x].location.display_address // will use if format is correct
var baddress1 = businesses[x].location.address1
var bcity = businesses[x].location.city;
var bstate = businesses[x].location.state;
var bzip = businesses[x].location.zip_code;
var bprice = businesses[x].price //price rating $ - $$$$
var brating = businesses[x].rating // value 1, 1.5, 3, 3.5 to 5 total
var bratingCount = businesses[x].review_count;



var term = []


function getFilters() {

    //get checked items from #sepcialitySelections
    $("#specialitySelections input:checked").each(function() {
        term.push($(this).attr("id"));
    })
    console.log(term);

    //get cuisine from #cuisineSelections
    var title = $("#cuisineSelections").each(function() {
        term.push($(this).val())
    });
    console.log(term)

    //get city if included -- push to location: {city: }
    var location = $("#cityInput").val();
    console.log(location);

    // var zipcode = $("#zipInput").val();
    // console.log(zipcode);

    //get radius if included
    // var radius = $("#radiusOptions").val();
    // console.log(radius);

    //get price preference if included
    var price = $("#price input:checked").each(function() {
        pricePref.push($(this).attr("id"));
        console.log(price);
    })
};






////////////////////////////

$("#btnSearch").click(yelpSearch);
// $("#btnSearch").click(getFilters);

function yelpSearch() {

    var yelpURL =
        "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=6&term=Black Salt";


    // "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/{id}/reviews";

    //Ensure either city or zip is present
    var citySearch = $("#cityInput").val();
    var zipSearch = $("#zipInput").val();
    var radiusOptions = $("#radiusOptions");

    if (citySearch.length === 0 && !(isNaN(zipSearch)) && zipSearch.length != 5) {
        alert("Please provide a city or a 5-digit ZIP code");
        return;
    } else {
        if (citySearch.length > 0) {
            yelpURL += "&location=" + citySearch
            console.log(citySearch)
        } else {
            yelpURL += "&location=" + zipSearch
        }
    }
    console.log(yelpURL);

    // get radius option
    var radius = $("#radiusOptions option:selected").val();
    if (radius) {
        yelpURL += "&radius<=" + radiusOptions;
    }


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

            var figure = $("<figure>");
            var image = $("<img>").attr("src", `${response.businesses[i].image_url}`)
            var figimg = figure.append(image);

            var divCard = $("<div class='box img-box'>").append(figimg);

            var col = $("<div class='column is-4'>");
            var pName = $("<p>").text(`${response.businesses[i].name}`);
            var pName = $("<p>").text(`Name ${response.businesses[i].name}`);
            var pPhone = $("<p>").text(`Phone: ${response.businesses[i].display_phone}`);
            var pRating = $("<p>").text(`Rating: ${response.businesses[i].rating}`);
            var pReview = $("<p>").text(`Reviews: ${response.businesses[i].review_count}`);
            // var pPrice = $("<p>").text(`Price: ${response.businesses[i].price}`);
            var pPrice = $("<p>").text(priceHTML);



            divCard.append(figimg, pName, pPhone, pRating, pReview, pPrice);
            col.append(divCard);
            $("#imageContainer").append(col);




        }
    });
}







/// OLD CODE
// $(
//   '<div class="card"><img src="' +
//     response.businesses[i].image_url +
//     '" class="card-img-top" alt=""><div class="card-body"><h5 class="card-title">Name: ' +
//     response.businesses[i].name +
//     '</h5><p class="card-text">Phone: ' +
//     response.businesses[i].display_phone +
//     "<br />" +
//     "Rating: " +
//     response.businesses[i].rating +
//     "<br />" +
//     "Reviews: " +
//     response.businesses[i].review_count +
//     "<br />" +
//     priceHTML +
//     //"Price: " + response.businesses[i].price +
//     '</p><a href="#" class="btn btn-primary">See More</a></div></div>'
// ).insertAfter("#imageContainer");