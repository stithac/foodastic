//////////////WORKING CODE 1/4 - 4:14pm
console.log("hello");

var apiKey = "Cx23_JQh8GT1YzyuG6ozLIGRwIjI7TWKmwOL0leh4B35y_Kfy7y0GdfSbwU7TjuUanJ2XRpW7PiDhQL8vs3P1K2-e3E_p9CEf0MZoWLuFPFddvLxsnIkspS5Vq3bX3Yx"

// var term = [];
var categories = [];
var cuisine;
var price;
var parameters;
var results = [];
var radius;

var image;
var name;
var pRating;
var spanInfo;
var phone;
var priceHTML

// Initailize search
$("#btnSearch").on("click", function() {
    getFilters();
    $(".iconHide").hide();
});


function getFilters() {

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

    //number of $ signes
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

    buildURL1(parameters);
    console.log(yelpURL1);
};





//GOOD CODE
//Build URL from sidebar filters
function buildURL1(param) {
    yelpURL1 =
        "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=12&term=restaurants"

    //Ensure either city or zip is present -- MOVED TO GLOBAL
    var citySearch = $("#cityInput").val();
    var zipSearch = $("#zipInput").val();
    // var radiusOptions = $("#radiusOptions");

    if (citySearch.length === 0 && !(isNaN(zipSearch)) && zipSearch.length != 5) {
        alert("Please provide a city or a 5-digit ZIP code");
        return;
    } else {
        if (citySearch.length > 0) {
            yelpURL1 += "&location=" + citySearch
            console.log(citySearch)
        } else {
            yelpURL1 += "&location=" + zipSearch
        }
    }
    //to avoid empty spaces in url
    if (param.categories != "") {
        yelpURL1 += "&categories=" + categories;
    }

    if (param.price != "") {
        yelpURL1 += "&price=" + price;
    }
    if (param.radius != "") {
        yelpURL1 += "&radius=" + radius;
    }
    getYelpResults(yelpURL1);
}

////////////////////////////
//AJAX call
function getYelpResults(url) {

    var settings = {
        url: url,
        method: "GET",
        timeout: 0,
        headers: {
            // Authorization: "Bearer 3O5kyW6F4g5mDywsBmxsp0roWlT-dciawIInefnOItXxFkZFSR3rvRenorOaVfIEtnNRdlOHqVEXwHJQat0PkPa-YBt9EIf_NTTOo0S1AmHCbk3ALK0mPPXCCSLeX3Yx",
            Authorization: "Bearer Cx23_JQh8GT1YzyuG6ozLIGRwIjI7TWKmwOL0leh4B35y_Kfy7y0GdfSbwU7TjuUanJ2XRpW7PiDhQL8vs3P1K2-e3E_p9CEf0MZoWLuFPFddvLxsnIkspS5Vq3bX3Yx",
        },

    };

    $.ajax(settings).done(function(response) {
        console.log(response, response.businesses.length);

        //load results for page render function
        for (var i = 0; i < response.businesses.length; i++) {
            result = response.businesses[i];
            results.push(result);
            console.log(results);

            //check to see if the price is defined
            if ("price" in response.businesses[i]) {
                priceHTML = "Price: " + response.businesses[i].price;
            } else {
                priceHTML = "Price: Unavailable";
            }
            //Create image div
            var figure = $("<figure>");
            image = $("<img class='image api-img is3by4'>").attr("src", `${response.businesses[i].image_url}`)
            var figimg = figure.append(image);
            //Construct remaining result info
            var divCard = $("<div class='box img-box card'>").append(figimg);
            var col = $("<div class='column is-4'>");
            pName = $("<p class='name'>").html(`<a class="blink" href=${response.businesses[i].url}>${response.businesses[i].name}</a>`);

            pRating = $("<p class='btext'>").text(`Rating: ${response.businesses[i].rating}`);
            spanInfo = $("<span class='info'>").text(`${response.businesses[i].review_count} Reviews`);
            pRating.append(spanInfo);
            // var pReview = $("<p>").text(`Reviews: ${response.businesses[i].review_count}`);
            pPhone = $("<p class='btext'>").text(`Phone: ${response.businesses[i].display_phone}`);
            var pPrice = $("<p>").text(priceHTML);
            var infoDiv = $("<div class='infoDiv'>").append(pName, pRating, pPhone, pPrice);
            divCard.append(figimg, infoDiv);
            col.append(divCard);
            $("#imageContainer").append(col);
        }
    });
}







//filterImages event listener
$(".filterImage").on("click", function(event) {

    event.preventDefault();
    var id = $(this).attr("id");
    console.log(id);

    var parameters = {};

    if (id === "spicy") {
        parameters = {
                term: "spicy",
                categories: [thai,
                    indian,
                    pakistani,
                    korean
                ],
                price: price,
                radius: radius,
            }
            // } else if (id === "savory") {
            //     parameters = {
            //         term = "savory",
            //         categories: [italian, spanish, mexican, greek],
            //         price: price,
            //         radius: radius,
            //     }

        // } else if (id === "onepot") {
        //     parameters = {
        //         ingredients: "",
        //         name: "casserole",
        //         cuisine: "",
        //         category: ""
        //     }

        // } else if (id === "special") {
        //     parameters = {
        //         ingredients: "",
        //         name: "",
        //         cuisine: "french",
        //         category: ""
        //     }

        // } else if (id === "surprise") {
        //     parameters = {
        //         ingredients: "",
        //         name: "",
        //         cuisine: "",
        //         category: "main course"
        //     }

        // } else if (id === "healthy") {
        //     parameters = {
        //         ingredients: "",
        //         name: "",
        //         cuisine: "",
        //         category: ""
        //     }
    }

    createQueryURL(parameters);

});










// function renderResults(results) {


//     // image = response.businesses[i].image_url;
//     // pName = response.businesses[i].url;
//     // pRating = response.businesses[i].rating;
//     // pPhone = response.businesses[i].display_phone;
//     // response.businesses[i].review_count;



//     for (var i = 0; i < results.length; i++) {
//         //check to see if the price is defined
//         if ("price" in response.businesses[i]) {
//             var priceHTML = "Price: " + response.businesses[i].price;
//         } else {
//             var priceHTML = "Price: Unavailable";
//         }
//         //Create image div
//         var figure = $("<figure>");
//         var image = $("<img class='image api-img is3by4'>").attr("src", `${response.businesses[i].image_url}`)
//         var figimg = figure.append(image);
//         //Construct remaining result info
//         var divCard = $("<div class='box img-box card'>").append(figimg);
//         var col = $("<div class='column is-4'>");
//         var pName = $("<p class='name'>").html(`<a class="blink" href=${response.businesses[i].url}>${response.businesses[i].name}</a>`);
//         var pRating = $("<p>").text(`Rating: ${response.businesses[i].rating}`);
//         var pReview = $("<p>").text(`Reviews: ${response.businesses[i].review_count}`);
//         var pPhone = $("<p>").text(`Phone: ${response.businesses[i].display_phone}`);
//         var pPrice = $("<p>").text(priceHTML);
//         var infoDiv = $("<div class='infoDiv'>").append(pName, pRating, pReview, pPhone, pPrice);
//         divCard.append(figimg, infoDiv);
//         col.append(divCard);
//         $("#imageContainer").append(col);
//     }




// }

///////////////END GOOD CODE














///////////////////////////////// RABIA'S ORIGINAL CODE 

// $("#btnSearch").click(yelpSearch);

// function yelpSearch() {

//     var yelpURL =
//         "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=6&term=soup&categories=Vietnamese,ramen";

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