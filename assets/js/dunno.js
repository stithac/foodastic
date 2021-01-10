var apiKey1 = "214f60134dc9416a9544280f08aa9f0b";
// var apiKey2 = "Cx23_JQh8GT1YzyuG6ozLIGRwIjI7TWKmwOL0leh4B35y_Kfy7y0GdfSbwU7TjuUanJ2XRpW7PiDhQL8vs3P1K2-e3E_p9CEf0MZoWLuFPFddvLxsnIkspS5Vq3bX3Yx";

// var apiKey2 = "oTnHrNvfv_FD3_ZDg5QIUKHNbMbXvkowMU_TZMvjbF7I8_8JKQD0et_Scz_JwrnDvP0y2sqhnF9k2sz1PSvcM9iIQ2GfaLsFN52Rsw3YxocCyqTamA-qKIFOO3jaX3Yx"

var apiKey2 = "niMDXDEIx28W6kVP8Bs8oTlmzECwV5853cqETWmyfxWN-ggxYrpJcx0XPiSkO5e-rgllcs3CpbV57NiYuh43Z0psPVmHpXjU8AzfucLh85am1UQS3rN_3pK88nP3X3Yx"

//filter variables
var cuisine;
var city;
var zipCode;

var limit = 10; //Number of results to bring back

//Indicators for dunno analyzer
var goodIndicator = 0;
var sadIndicator = 0;
var badIndicator = 0;

var price; //variable to hold value of left-hand price filter selection

var ids = [];
var recipes = [];
var restaurants = [];
var favorites = [];

/******************************
Start of the application's functions
******************************/

$(".result").hide(); //Hide results divs on page load
$(".restaurant").hide();
$("#restaurantResults").hide();
$(".detailInformation").hide() //Hide detail information div on page load

$("#modal").fadeIn(); //Show modal on page load

//select the modal close button by class and apply a click even listener
$(".close").on("click", function() {
    //select the modal element by id , and apply display none when close is clicked
    //this will close the modal on click
    $("#modal").css("display", "none")
});

$(".okay").on("click", function() {
        city = $("#city").val();

        zipCode = $("#zip").val();

        if (city == "" && zipCode == "") {

            $("#helpText").text("Please enter your city or zip code.");

        } else {
            $("#modal").css("display", "none");
            $("#zipInput").val(zipCode);
            $("#cityInput").val(city);
        }
    }) //end of .okay event listener

function getFilters(elem) {

    var id = elem.attr("cardId");
    // console.log(id);

    // $("#check" + id).attr("src", "./assets/img/check.png");

    var total = goodIndicator + sadIndicator + badIndicator;
    console.log(total);

    var parameters = {};

    if (total < 4) {
        if (elem.hasClass("good-mood")) {
            goodIndicator++;
            console.log("Good: " + goodIndicator);
        } else if (elem.hasClass("sad-mood")) {
            sadIndicator++;
            console.log("Sad: " + sadIndicator);
        } else if (elem.hasClass("bad-mood")) {
            badIndicator++;
            console.log("Bad: " + badIndicator);
        }
    } else if (total >= 4) {

        if (goodIndicator >= sadIndicator && goodIndicator >= badIndicator) {

            parameters = {
                ingredients: "",
                name: "",
                cuisine: "american,thai",
                category: "",
                category2: "mexican,sushi",
                attributes: "",
                term: "restaurants"
            }
        } else if (sadIndicator >= goodIndicator && sadIndicator >= badIndicator) {
            parameters = {
                ingredients: "",
                name: "casserole",
                cuisine: "",
                category: "",
                category2: "thai,italian,seafood",
                attributes: "",
                term: "restaurants"
            }
        } else if (badIndicator >= goodIndicator && badIndicator >= sadIndicator) {
            parameters = {
                ingredients: "",
                name: "soup",
                cuisine: "",
                category: "",
                category2: "comfortfood,soulfood",
                attributes: "",
                term: "restaurants"
            }
        } else {
            parameters = {
                ingredients: "",
                name: "",
                cuisine: "african,american,cajun,chinese,french,italian,mexican,southern,thai,spanish",
                category: "",
                category2: "",
                attributes: "",
                term: "restaurants"
            }
        }
        createQueryURL(parameters);
    }
}


/****** createQueryURL() function:
- Invoked at end of getFilters() function.
- Takes in an object and creates a queryURL based on the parameters passed in.
- It then passes the URL to the getResults() function.
******/
function createQueryURL(params) {

    var queryURL1 = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey1 + "&includeNutrition=true&addRecipeInformation=true&includeIngredients=" + params.ingredients.toString() + "&titleMatch=" + params.name + "&cuisine=" + params.cuisine + "&type=" + params.category;

    var queryURL2 =
        "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?&categories=" + params.category2 + "&attributes=" + params.attributes + "&term=" + params.term + "&location=" + city + zipCode;
    console.log(queryURL2);

    getResults(queryURL1, queryURL2); //Pass query URL to the getResults function

} //End of createQueryURL()


/****** getResults() function:
- Invoked at end of createQueryURL() function.
- Takes in the queryURL and makes the AJAX call.
- The response is then passed to the populateRecipes function.
******/
function getResults(url, url2) {

    $("#LoadingImage").show();
    //hide filter images / results and clear recipeTitles
    $(".filterImage").hide();
    //ADDED - turn speedy eat's bar yellow to signify it's clickable/can return to filter images
    $("#filterImageBack").attr("style", "background-color: #fdc407");
    // $(".result").hide();

    $.ajax({
        url: url2,
        method: "GET",
        // dataType: "jsonp",
        // 'cache': true,
        headers: {
            "accept": "application/json",
            "x-requested-with": "xmlhttprequest",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + apiKey2,
        },
    }).then(function(response) {

        for (i = 0; i < response.businesses.length; i++) {
            var restaurant = response.businesses[i];
            restaurants.push(restaurant);
        }

        var obj2 = {};
        obj2 = response
        $(obj2).attr("dataId", "restaurant");
        $("#LoadingImage").hide();
        populateResults(obj2);

        $.ajax({
            url: url,
            method: "GET"
        }).then(function(response) {


            for (i = 0; i < response.results.length; i++) {
                var recipe = response.results[i];
                recipes.push(recipe);
            }
            var obj = {};
            obj = response
            $(obj).attr("dataId", "recipe");

            // $("#recipesTitle").addClass("allcaps");
            $("#recipesTitle").css("fontSize", "28px");
            $("#recipesTitle").text("Recipes:");

            $("#restaurantsTitle").css("fontSize", "28px");
            $("#restaurantsTitle").html("Restaurants: ");
            $("#restaurantResults").show();
            populateResults(obj);

        });
    });


} //End of getResults()


/****** populateResults() function:
- Invoked from getResults() function.
- Takes in response from AJAX call and updates DOM elements with appropriate parameters
******/
function populateResults(response) {
    // console.log(response.results.length);

    $(".result").show();

    var j;
    var results;

    var dataId = $(response).attr("dataId");
    $(".recipeTitle").val("");

    if (dataId === "recipe") {

        results = response;
        console.log(results);
        j = 1;

        for (i = 0; i < 6; i++) {

            $("#pic" + j).attr("src", results.results[i].image);
            $("#title" + j).text(results.results[i].title);
            $("#rating" + j).text("Rating: " + results.results[i].spoonacularScore + "/100");

            if (parseInt(results.results[i].pricePerServing) <= 100) {
                $("#price" + j).text("$");
            } else if (parseInt(results.results[i].pricePerServing) > 100 && parseInt(results.results[i].pricePerServing) < 600) {
                $("#price" + j).text("$$");
            } else {
                $("#price" + j).text("$$$");
            }

            if ($("#title" + j) !== "") {
                $("#result" + j).show();
                j++;
            } else {
                $("#result" + j).hide();
            }
            // console.log(j);
        }
    } else if (dataId === "restaurant") {
        j = 7;
        results = response;
        console.log(results);
        for (i = 0; i < 7; i++) {

            console.log(j);
            $("#pic" + j).attr("src", results.businesses[i].image_url);
            $("#title" + j).text(results.businesses[i].name);
            $("#rating" + j).text("Rating: " + results.businesses[i].rating + "/5");
            $("#price" + j).text(results.businesses[i].price);

            $("#result" + j).show();
            j++;
        }
    }

} //End of populateResults()

function showDetails(obj) {
    console.log(obj);

    $(".result").hide();
    $("#restaurantResults").hide();
    $("#recipesTitle").hide();
    $(".detailInformation").show();
    // $("#favIcon").attr("resultId", recipe.id);

    var title = obj.children(".recipeTitle")[0].innerText;

    //Checks to see if there are any favorites in localStorage. If there are favorites saved in localStorage, they are stored in favorites variable.
    var storedFavorites = JSON.parse(localStorage.getItem("favorites"));


    if (storedFavorites !== null) {
        favorites = storedFavorites;
        console.log(favorites);
    }

    var item = favorites.find(item => item.name == title);

    if (item !== undefined) {

        $("#favIcon").attr("src", "./assets/img/red-heart.png"),
            $("#favIcon").attr("class", "fave");

    }

    // console.log(obj.attr("resultType"));//testing

    if (obj.attr("resultType") == "recipe") {
        $("#favIcon").addClass("recipe");

        var index = recipes.findIndex(x => x.title === title);

        var recipe = recipes[index];
        console.log(recipe);

        $("#detailTitle").html("<b>" + recipe.title + "</b>");
        $("#detailImage").attr("src", recipe.image);

        $("#detailSummary").html("<b>RECIPE SUMMARY: </b><br/>" + recipe.summary);
        $("#detailInstructions").html("<b>INSTRUCTIONS (if available): </b><br/>");

        for (i = 0; i < recipe.analyzedInstructions[0].steps.length; i++) {

            $("#detailInstructions").append("<b> Step " + i + ": </b>" + recipe.analyzedInstructions[0].steps[i].step + "<br/>");
            // console.log(recipe.analyzedInstructions[0].steps[i]);
        }

        $("#detailTime").html("<b> Ready in: </b>" + recipe.readyInMinutes + " minutes");

        $("#favIcon").attr("resultId", recipe.id);

    } else if (obj.attr("resultType") == "restaurant") {
        $("#favIcon").addClass("restaurant");

        var index2 = restaurants.findIndex(x => x.name === title);

        var restaurant = restaurants[index2];

        $("#detailTitle").html("<b>" + restaurant.name + "</b>");
        $("#detailImage").attr("src", restaurant.image_url);

        $("#detailSummary").html("<b>Restaurant website: </b> <a href = " + restaurant.url + "'>" + restaurant.name + " website </a><br/><br/><b>Phone Number: </b>" + restaurant.phone + "<br/><br/> <b>Address: </b>");

        for (i = 0; i < restaurant.location.display_address.length; i++) {
            $("#detailSummary").append(restaurant.location.display_address[i] + " ");
        }

        $("#favIcon").attr("resultId", restaurant.id);
    }

}

function getRecipeDetails(resultId) {

    var queryURL2 = "https://api.spoonacular.com/recipes/" + resultId + "/information?apiKey=" + apiKey1;

    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        showRecipeDetails(response);
    });

} //End of getRecipeDetails()


/******
 Event Listeners
******/

//searchBtn event listener
$("#btnSearch").on("click", function(event) {

    event.preventDefault();
    console.log("Search button clicked");

});

//filterImages event listener
$(".dunnoIcon").on("click", function() {

        getFilters($(this)); //Call getFilters() function and pass the obj that was clicked

    }) //End of filterImage click event

$("#surpriseIcon").on("click", function() {

    parameters = {
        ingredients: "",
        name: "",
        cuisine: "african,american,cajun,chinese,french,italian,mexican,southern,thai,spanish",
        category: "",
        category2: "",
        attributes: "",
        term: "restaurants"
    }

    createQueryURL(parameters);
})

//.result event listener
$(".resultEl").on("click", function() {

    console.log("Result clicked");
    var title = $(this).children(".recipeTitle")[0].innerText;
    console.log(title);

    showDetails($(this)); //call showDetails and pass clicked object

}); //End of .result event listener



$("#favIcon").on("click", function() {

    var index;
    var id = $("#favIcon").attr("resultId");

    if ($("#favIcon").hasClass("nonfave")) {

        $("#favIcon").attr("src", "./assets/img/red-heart.png");
        $("#favIcon").addClass("fave");
        $("#favIcon").removeClass("nonfave");

    } else {
        $("#favIcon").attr("src", "./assets/img/white-heart.png");
        $("#favIcon").addClass("nonfave");
        $("#favIcon").removeClass("fave");
    }

    if ($("#favIcon").hasClass("recipe")) {

        index = recipes.findIndex(x => x.id == id);
        console.log(recipes);
        console.log(recipes[index]);
        var item = favorites.find(item => item.id == index);

        if (item == undefined) {
            var favorite = {
                id: id,
                name: recipes[index].title,
                type: "recipe"
            }

            favorites.push(favorite);
            console.log(id);
            console.log(favorites);

            localStorage.setItem("favorites", JSON.stringify(favorites)); //Updates favorites array in local storage
        }

    } else if ($("#favIcon").hasClass("restaurant")) {
        index = restaurants.findIndex(x => x.id == id);

        console.log(restaurants[index]);
        var item = favorites.find(item => item.id == index);

        if (item == undefined) {
            var favorite = {
                id: id,
                name: restaurants[index].name,
                type: "restaurant"
            }

            favorites.push(favorite);
            console.log(id);
            console.log(favorites);

            localStorage.setItem("favorites", JSON.stringify(favorites)); //Updates favorites array in local storage
        }
    }

})

$("#filterImageBack").on("click", function() {
    $(".filterImage").show();
    // $("nameInput").val("");
    //ADDED - turn speedy eat's bar back to white
    $("#filterImageBack").attr("style", "background-color: #fff");
    $(".detailInformation").hide();
    // $("#surpriseIcon").show();

});