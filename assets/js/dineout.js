console.log("hello");

var apiKey = "Cx23_JQh8GT1YzyuG6ozLIGRwIjI7TWKmwOL0leh4B35y_Kfy7y0GdfSbwU7TjuUanJ2XRpW7PiDhQL8vs3P1K2-e3E_p9CEf0MZoWLuFPFddvLxsnIkspS5Vq3bX3Yx"

$("#btnSearch").click(yelpSearch);
// $("#btnSearch").click(getFilters);

var alias = [];
var pricePref = [];
location = [];


//test filters
function getFilters() {

    //get checked items from #sepcialitySelections
    $("#specialitySelections input:checked").each(function() {
        alias.push($(this).attr("id"));
    })
    console.log(title);

    //get cuisine from #cuisineSelections
    var title = $("#cuisineSelections").val();
    console.log(title)

    //get city if included -- push to location: {city: }
    var city = $("#cityInput").val();
    location
    console.log(location);


    //TODO: //get zipif included -- push to location: {zip_code: }
    var zipcode = $("#zipInput").val();
    console.log(zipcode);

    //get radius if included
    var radius = $("#radiusOptions");
    console.log(radius);

    //get price preference if included
    var price = $("#price input:checked").each(function() {
        pricePref.push($(this).attr("id"));
        console.log(price);
    })
};


// function yelpSearch() {

var yelpURL =
    "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=6&price=1,2&category=thai";



getFilters();
//Ensure either city or zip is present
// var citySearch = $("#cityInput").val();
// console.log(citySearch);

// var zipSearch = $("#zipInput").val();

// if (citySearch.length === 0 && !(isNaN(zipSearch)) && zipSearch.length != 5) {
//     alert("Please provide a city or a 5-digit ZIP code");
//     return;
// } else {
//     if (citySearch.length > 0) {
//         yelpURL += "&location=" + citySearch
//     } else {
//         yelpURL += "&location=" + zipSearch
//     }
// }
console.log(yelpURL);

// get radius option
var radius = $("#radiusOptions option:selected").val();

//     // if () {

//     // }
//     //Empty the contents to make room for the cards
//     // $("#imageContainer").empty();

var settings = {
    url: yelpURL,
    method: "GET",
    timeout: 0,
    headers: {
        Authorization: "Bearer 3O5kyW6F4g5mDywsBmxsp0roWlT-dciawIInefnOItXxFkZFSR3rvRenorOaVfIEtnNRdlOHqVEXwHJQat0PkPa-YBt9EIf_NTTOo0S1AmHCbk3ALK0mPPXCCSLeX3Yx",
    },
};



//     $.ajax(settings).done(function(response) {
//         console.log(response, response.businesses.length);

//         for (var i = 0; i < response.businesses.length; i++) {

//             //check to see if the price is defined
//             if ("price" in response.businesses[i]) {
//                 var priceHTML = "Price: " + response.businesses[i].price;
//             } else {
//                 var priceHTML = "Price: Unavailable";
//             }

//             // //GOOD -- REVISED CODE - JLG
//             var figure = $("<figure>");
//             var image = $("<img>").attr("src", `${response.businesses[i].image_url}`)
//             var figimg = figure.append(image);

//             var divCard = $("<div class='box img-box'>").append(figimg);

//             var col = $("<div class='column is-4'>");
//             var pName = $("<p>").text(`Name ${response.businesses[i].price}`);
//             var pPhone = $("<p>").text(`Phone: ${response.businesses[i].display_phone}`);
//             var pRating = $("<p>").text(`Rating: ${response.businesses[i].rating}`);
//             var pReview = $("<p>").text(`Reviews: ${response.businesses[i].review_count}`);
//             // var pPrice = $("<p>").text(`Price: ${response.businesses[i].price}`);
//             var pPrice = $("<p>").text(`Price: ${priceHTML}`);


//             //check to see if the price is defined
//             if ("price" in response.businesses[i]) {
//                 var priceHTML = "Price: " + response.businesses[i].price;
//             } else {
//                 var priceHTML = "Price: Unavailable";
//             }

//             divCard.append(figimg, pName, pPhone, pRating, pReview, pPrice);
//             col.append(divCard);
//             $("#imageContainer").append(col);

// DELETE - based on old dineout page
// $(
//     '<div class="card"><img src="' +
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
// };
// });
// }

//GOOD -- REVISED CODE - JLG
// var figure = $("<figure>");
// var image = $("<img>").attr("src", `${response.businesses[i].image_url}`)
// var figimg = figure.append(image);

// var divCard = $("<div class='box img-box'>").append(figimg);

// var col = $("<div class='column is-4'>");
// var pName = $("<p>").text(`Name ${response.businesses[i].price}`);
// var pPhone = $("<p>").text(`Phone: ${response.businesses[i].display_phone}`);
// var pRating = $("<p>").text(`Rating: ${response.businesses[i].rating}`);
// var pReview = $("<p>").text(`Reviews: ${response.businesses[i].review_count}`);
// // var pPrice = $("<p>").text(`Price: ${response.businesses[i].price}`);
// var pPrice = $("<p>").text(`Price: ${priceHTML}`);


// //check to see if the price is defined
// if ("price" in response.businesses[i]) {
//     var priceHTML = "Price: " + response.businesses[i].price;
// } else {
//     var priceHTML = "Price: Unavailable";
// }

// divCard.append(figimg, pName, pPhone, pRating, pReview, pPrice); col.append(divCard); $("#imageContainer").append(col);
//         }
//     });
// }