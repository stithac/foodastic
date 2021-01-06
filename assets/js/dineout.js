//////////////WORKING CODE 1/4 - 4:14pm
console.log("hello");

var apiKey = "Cx23_JQh8GT1YzyuG6ozLIGRwIjI7TWKmwOL0leh4B35y_Kfy7y0GdfSbwU7TjuUanJ2XRpW7PiDhQL8vs3P1K2-e3E_p9CEf0MZoWLuFPFddvLxsnIkspS5Vq3bX3Yx"
var apiKey2 = "3O5kyW6F4g5mDywsBmxsp0roWlT-dciawIInefnOItXxFkZFSR3rvRenorOaVfIEtnNRdlOHqVEXwHJQat0PkPa-YBt9EIf_NTTOo0S1AmHCbk3ALK0mPPXCCSLeX3Yx"
    // var term = [];
var categories;
var categories2;
var cuisine;
var price = [];
var parameters;
// var term;
var results = [];
var radius;
var image;
var name;
var pRating;
var spanInfo;
var phone;
var pPrice;
var infoDiv;
var col;
var figure;
var divCard;
// Initailize search
$("#btnSearch").on("click", function() {

    getFilters();
});


function getFilters() {
    categories = [];
    // get checked items from# sepcialitySelections
    $("#specialitySelections input:checked").each(function() {
        categories.push($(this).attr("id"));
    })
    console.log(categories);

    //get cuisine from #cuisineSelections
    cuisine = $("#cuisineSelections").val();
    if (cuisine != "") {
        categories.push(cuisine);
    }
    console.log(categories);

    // if (categories2 !== []) {
    //     categories.push(categories2);
    // } 

    //number of $ signs
    price = [];
    $("#pricePref input:checked").each(function() {
        price.push($(this).attr("id"));
    });
    console.log(price);

    radius = $("#radiusOptions").val();
    console.log(radius);

    parameters = {
        categories: categories,
        price: price,
        radius: radius,
    }
    console.log(parameters);

    buildURL(parameters);
};

//Build URL from sidebar filters
function buildURL(param) {
    url =
        "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=6&term=restaurants";
    console.log(url);

    //Ensure either city or zip is present -- MOVED TO GLOBAL
    var citySearch = $("#cityInput").val();
    var zipSearch = $("#zipInput").val();
    // var radiusOptions = $("#radiusOptions");

    if (citySearch.length === 0 && !(isNaN(zipSearch)) && zipSearch.length != 5) {
        alert("Please provide a city or a 5-digit ZIP code");
        return;
    } else {
        if (citySearch.length > 0) {
            url += "&location=" + citySearch
            console.log(citySearch)
        } else {
            url += "&location=" + zipSearch
        }
    }
    //to avoid empty spaces in url
    if (param.categories != "") {
        url += "&categories=" + categories;
    }

    if (param.price != "") {
        url += "&price=" + price;
    }
    if (param.radius != "") {
        url += "&radius=" + radius;
    }

    $("#imageContainer").html("");
    getYelpResults(url);
}

////////////////////////////
//AJAX call
function getYelpResults(url) {

    var settings = {
        url: url,
        method: "GET",
        timeout: 0,
        headers: {
            "accept": "application/json",
            // "x-requested-with": "xmlhttprequest",
            "Access-Control-Allow-Origin": "*",

            "Authorization": `Bearer ${apiKey2}`,
        },
    };

    $.ajax(settings).done(function(response) {
        console.log(response, response.businesses.length);

        //load results for page render function
        for (var i = 0; i < response.businesses.length; i++) {
            result = response.businesses[i];
            results.push(result);
            console.log(response); //Test
            console.log(results); //Test
        }
        $(".iconHide").hide();
        renderResults(response);
    });
}

function renderResults(response) {
    console.log(response); //Test

    for (var i = 0; i < response.businesses.length; i++) {

        // check to see if the price is defined
        if ("price" in response.businesses[i]) {
            var priceHTML = "Price: " + response.businesses[i].price;
        } else {
            var priceHTML = "Price: Unavailable";
        };

        //build image-info div


        image = $("<img class='image yelp-img is3by4'>").attr("src", `${response.businesses[i].image_url}`)
        figure = $("<figure>").append(image);

        pName = $("<p class='name'>").html(`<a class="blink" href=${response.businesses[i].url}>${response.businesses[i].name}</a>`);
        pRating = $("<p class='btext brating'>").text(`Rating: ${response.businesses[i].rating}`);
        spanInfo = $("<span class='binfo'>").text(`${response.businesses[i].review_count} Reviews`);
        pRating.append(spanInfo);
        // var pAddress = $("<p class='binfo'>").html(`<span> ${businesses[i].location.display_address}</span>`);
        pPhone = $("<p class='btext'>").text(`Phone: ${response.businesses[i].display_phone}`);
        pPrice = $("<p class='btext'>").text(priceHTML);

        infoDiv = $("<div class='do-info-div'>").append(figure, pName, pRating, pPhone, pPrice);
        divCard = $("<div class='box yelp-img-box'>").append(infoDiv);
        col = $("<div class='column is-4'>").append(divCard);
        $("#imageContainer").append(col);
    };
}

//filterImages listener events
$(".filterImage").on("click", function(event) {

    //add to parameters - consolidate this step later
    event.preventDefault();
    var id = $(this).attr("id");
    console.log(id);

    //check for price and radius
    price = [];
    $("#pricePref input:checked").each(function() {
        price.push($(this).attr("id"));
    });

    radius = $("#radiusOptions").val();
    console.log(radius);

    // parameters = {};
    if (id === "spicy") {
        categories = ["thai", "korean", "indian", "chicken_wings"];
        parameters = {
            categories: categories,
            price: price,
            radius: radius,
        }
    };
    if (id === "savory") {
        categories = ["spanish", "greek", "indian", "italian"];
        parameters = {
            categories: categories,
            price: price,
            radius: radius,
        }
    };
    if (id === "cheapeats") {
        categories = ["barbeque", "chicken_wings", "chili", "cafes", "diners"];
        price = [1, 2];
        parameters = {
            categories: categories,
            price: price,
            radius: radius,
        }
    };
    if (id === "special") {
        categories = ["french", "italian", "steak"];
        price = [3, 4];
        parameters = {
            categories: categories,
            price: price,
            radius: radius,
        }
    };
    if (id === "healthy") {
        categories = ["vegan", "vegetarian", "salad"];
        parameters = {
            categories: categories,
            price: price,
            radius: radius,
        }
    }
    if (id === "surprise") {
        categories = ["local_flavors", "hot_and_new"];
        parameters = {
            categories: categories,
            price: price,
            radius: radius,
        }
    }

    buildURL(parameters);

});



$(".filterImageBack").on("click", function(event) {
    event.preventDefault();
    $("#imageContainer").html("");
    $(".iconHide").show();

});
// // /////////////////////JENNER CODE




// //build image-info div















/////////////////////////////// RABIA'S ORIGINAL CODE 


// $("#btnSearch").click(yelpSearch);

// function yelpSearch() {

//     var yelpURL =
//         "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=6&term=starbucks";

//     //Ensure either city or zip is present
//     var citySearch = $("#cityInput").val();
//     var zipSearch = $("#zipInput").val();

//     if (citySearch.length === 0 && !(isNaN(zipSearch)) && zipSearch.length != 5) {
//         alert("Please provide a city or a 5-digit ZIP code");
//         return;
//     } else {
//         if (citySearch.length > 0) {
//             yelpURL += "&location=" + citySearch
//         } else {
//             yelpURL += "&location=" + zipSearch
//         }
//     }



//     console.log(yelpURL);

//     // get radius option
//     var radius = $("#radiusOptions option:selected").val();

//     // if () {

//     // }
//     //Empty the contents to make room for the cards
//     $("#imageContainer").empty();

//     var settings = {
//         url: yelpURL,
//         method: "GET",
//         timeout: 0,
//         headers: {
//             Authorization: "Bearer 3O5kyW6F4g5mDywsBmxsp0roWlT-dciawIInefnOItXxFkZFSR3rvRenorOaVfIEtnNRdlOHqVEXwHJQat0PkPa-YBt9EIf_NTTOo0S1AmHCbk3ALK0mPPXCCSLeX3Yx",
//         },
//     };

//     $.ajax(settings).done(function(response) {
//         console.log(response, response.businesses.length);

//         for (var i = 0; i < response.businesses.length; i++) {

//             //check to see if the price is defined
//             if ("price" in response.businesses[i]) {
//                 var priceHTML = "Price: " + response.businesses[i].price;
//             } else {
//                 var priceHTML = "Price: Unavailable";
//             }


//             var figure = $("<figure>");
//             var image = $("<img class='image api-img is3by4'>").attr("src", `${response.businesses[i].image_url}`)
//             var figimg = figure.append(image);

//             var divCard = $("<div class='box img-box card'>").append(figimg);

//             var col = $("<div class='column is-4'>");
//             var pName = $("<p>").text(`${response.businesses[i].name}`);
//             var pRating = $("<p>").text(`Rating: ${response.businesses[i].rating}`);
//             var pName = $("<p>").text(`Name ${response.businesses[i].name}`);
//             var pPhone = $("<p>").text(`Phone: ${response.businesses[i].display_phone}`);

//             var pReview = $("<p>").text(`Reviews: ${response.businesses[i].review_count}`);
//             // var pPrice = $("<p>").text(`Price: ${response.businesses[i].price}`);
//             var pPrice = $("<p>").text(priceHTML);



//             divCard.append(figimg, pName, pPhone, pRating, pReview, pPrice);
//             col.append(divCard);
//             $("#imageContainer").append(col);


//         }
//     });
// }
// /////////////////////////END RABIA CODE




///////////// Returns TO WORK WITH LATER
// var bname = businesses[x].name;
// var btitle = businesses[x].categories[x].title;
// var bphone = businesses[x].display_phone;
// var bdistance = businesses[x].distance // in meters from search location - convert to mi
// var busID = businesses[x].id // needed for reviews, if we decide to use
// var bImage = businesses[x].image_url;
// var bdisplayAddress = businesses[x].location.display_address // will use if format is correct
// var baddress1 = businesses[x].location.address1
// var bcity = businesses[x].location.city;
// var bstate = businesses[x].location.state;
// var bzip = businesses[x].location.zip_code;
// var bprice = businesses[x].price //price rating $ - $$$$
// var brating = businesses[x].rating // value 1, 1.5, 3, 3.5 to 5 total
// var bratingCount = businesses[x].review_count;

// // Variables
// var citySearch = $("#cityInput").val();
// var zipSearch = $("#zipInput").val();
// var radiusOptions = $("#radiusOptions");

//// Returns
// var bname = businesses[x].name;
// var btitle = businesses[x].categories[x].title;
// var bphone = businesses[x].display_phone;
// var bdistance = businesses[x].distance // in meters from search location - convert to mi
// var busID = businesses[x].id // needed for reviews, if we decide to use
// var bImage = businesses[x].image_url;
// var bdisplayAddress = businesses[x].location.display_address // will use if format is correct
// var baddress1 = businesses[x].location.address1
// var bcity = businesses[x].location.city;
// var bstate = businesses[x].location.state;
// var bzip = businesses[x].location.zip_code;
// var bprice = businesses[x].price //price rating $ - $$$$
// var brating = businesses[x].rating // value 1, 1.5, 3, 3.5 to 5 total
// var bratingCount = businesses[x].review_count;

// // Variables
// var citySearch = $("#cityInput").val();
// var zipSearch = $("#zipInput").val();
// var radiusOptions = $("#radiusOptions");