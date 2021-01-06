var apiKey1 = "214f60134dc9416a9544280f08aa9f0b";
// var apiKey2 = "Cx23_JQh8GT1YzyuG6ozLIGRwIjI7TWKmwOL0leh4B35y_Kfy7y0GdfSbwU7TjuUanJ2XRpW7PiDhQL8vs3P1K2-e3E_p9CEf0MZoWLuFPFddvLxsnIkspS5Vq3bX3Yx";

// var apiKey2 = "oTnHrNvfv_FD3_ZDg5QIUKHNbMbXvkowMU_TZMvjbF7I8_8JKQD0et_Scz_JwrnDvP0y2sqhnF9k2sz1PSvcM9iIQ2GfaLsFN52Rsw3YxocCyqTamA-qKIFOO3jaX3Yx"

var apiKey2 = "dDXCEOuFO9JSMVQHXuQ0f_DK5y9AD2FFbHB6Ru9_oX5gPxDUXWqs1y__DTsKXd7rBGezL5GhwlInm5uVEaQNN2UWjsaeqVb-z7SanE7e9tLoVkPI_1SIRb5i2sD0X3Yx";

//filter variables
var cuisine;
var city;
var zipCode;

var limit = 10;
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
    $(".close").on("click", function (){
        //select the modal element by id , and apply display none when close is clicked
        //this will close the modal on click
        $("#modal").css("display", "none")
    });

    $(".okay").on("click", function(){
        city = $("#cityInput").val();
        zipCode = $("#zipInput").val();

        if(city == "" && zipCode == ""){

            $("#helpText").text("Please enter your city or zip code.");
            // $("#zipInput").val(zipCode)
        }else{
            $("#modal").css("display", "none")
        }
    })//end of .okay event listener


/****** createQueryURL() function:
- Invoked at end of getFilters() function.
- Takes in an object and creates a queryURL based on the parameters passed in.
- It then passes the URL to the getResults() function.
******/
function createQueryURL(params){

    var queryURL1 = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey1 + "&includeNutrition=true&addRecipeInformation=true&includeIngredients=" + params.ingredients.toString() + "&titleMatch=" + params.name + "&cuisine=" + params.cuisine + "&type=" + params.category;

    var queryURL2 =
    "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?&categories=" + params.category2 + "&attributes=" + params.attributes + "&location=" + city + zipCode;
    console.log(queryURL2);

    getResults(queryURL1, queryURL2); //Pass query URL to the getResults function

} //End of createQueryURL()


/****** getResults() function:
- Invoked at end of createQueryURL() function.
- Takes in the queryURL and makes the AJAX call.
- The response is then passed to the populateRecipes function.
******/
function getResults(url, url2){

    $("#LoadingImage").show();

    $.ajax({
        url: url2,
        method: "GET",
        // dataType: "jsonp",
        // 'cache': true,
        headers: {
            "Authorization": "Bearer " + apiKey2,
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*",
        },
    }).then(function(response) {

        for (i = 0; i <response.businesses.length; i++){
            var restaurant = response.businesses[i];
            restaurants.push(restaurant);
        }

        var obj2 = {};
        obj2 = response
        $(obj2).attr("dataId","restaurant");
        $("#LoadingImage").hide();
        populateResults(obj2);
    });
    $.ajax({
        url: url,
        method: "GET"
    }).then(function(response) {


        for(i = 0; i < response.results.length; i++){
            var recipe = response.results[i];
            recipes.push(recipe);
        }
        var obj = {};
        obj = response
        $(obj).attr("dataId","recipe");

        $("#recipesTitle").text("Recipes:");
        $("#restaurantsTitle").html("Restaurants: ");
        $("#restaurantResults").show();
        populateResults(obj);

    });

} //End of getResults()


/****** populateResults() function:
- Invoked from getResults() function.
- Takes in response from AJAX call and updates DOM elements with appropriate parameters
******/
function populateResults(response){
    // console.log(response.results.length);

    // $(".result").show();

    var j;
    var results;

    var dataId = $(response).attr("dataId");
    $(".recipeTitle").val("");

    if( dataId === "recipe"){

        results = response;
        console.log(results);
        j = 1;

        for (i = 0; i < 6; i++){

            $("#pic"+ j).attr("src", results.results[i].image);
            $("#title" + j).text(results.results[i].title);
            $("#rating" + j).text("Rating: " + results.results[i].spoonacularScore + "/100");

            if(parseInt(results.results[i].pricePerServing) <= 100){
                $("#price" + j).text("$");
            }else if(parseInt(results.results[i].pricePerServing) > 100 && parseInt(results.results[i].pricePerServing) < 600 ){
                $("#price" + j).text("$$");
            } else {
                $("#price" + j).text("$$$");
            }

            if($("#title"+j) !== ""){
                $("#result" + j).show();
                j++;
            }else {
                $("#result" + j).hide();
            }
            // console.log(j);
        }
    }else if( dataId === "restaurant"){
        j = 7;
        results = response;
        console.log(results);
        for (i = 0; i < 7; i++){

            console.log(j);
               $("#pic"+ j).attr("src", results.businesses[i].image_url);
               $("#title" + j).text(results.businesses[i].name);
               $("#rating" + j).text("Rating: " + results.businesses[i].rating + "/5");
               $("#price" + j).text(results.businesses[i].price);

               $("#result" + j).show();
               j++;
            }

    }

}//End of populateResults()


/******
 Event Listeners
******/

//searchBtn event listener
$("#btnSearch").on("click",function(event){

    event.preventDefault();
    console.log("Search button clicked");

});

//filterImages event listener
$(".dunnoIcon").on("click", function(event){

    event.preventDefault();
    var id = $(this).attr("id");
    console.log(id);

    var parameters = {};

    if (id === "goodIcon"){
        parameters = {
            ingredients: "berries",
            name: "",
            cuisine: "",
            category: "",
            category2: "cafe",
            attributes: ""
        }

    }else if(id === "sadIcon"){
        parameters = {
            ingredients: "",
            name: "pizza",
            cuisine: "",
            category: "",
            category2: "pizza",
            attributes: ""
        }

    }else if(id === "mehIcon"){
        parameters = {
            ingredients: "",
            name: "",
            cuisine: "",
            category: "soup",
            category2: "soup",
            attributes: ""
        }

    }else if(id === "kissIcon"){
        parameters = {
            ingredients: "chocolate",
            name: "",
            cuisine: "",
            category: "",
            category2: "fondue",
            attributes: ""
        }

    }else if(id === "angryIcon"){
        parameters = {
            ingredients: "",
            name: "bbq",
            cuisine: "",
            category: "",
            category2: "bbq",
            attributes: ""
        }

    }else if(id === "eyesIcon"){
        parameters = {
            ingredients: "",
            name: "sweet",
            cuisine: "",
            category: "",
            category2: "creperies",
            attributes: ""
        }
    }else if(id === "veniBtn"){
        parameters = {
            ingredients: "",
            name: "",
            cuisine: "",
            category: "appetizer",
            category2: "diners",
            attributes: ""
        }
    }else if(id === "vidiBtn"){
        parameters = {
            ingredients: "",
            name: "",
            cuisine: "",
            category: "dinner",
            category2: "dinnertheater",
            attributes: ""
        }
    }else if(id === "viciBtn"){
        parameters = {
            ingredients: "",
            name: "",
            cuisine: "",
            category: "breakfast",
            category2: "breakfast_brunch",
            attributes: ""
        }
    }else if(id === "normalCheck"){
        parameters = {
            ingredients: "",
            name: "",
            cuisine: "american",
            category: "",
            category2: "newamerican,tradamerican",
            attributes: ""
        }
    }else if(id === "awesomeCheck"){
        parameters = {
            ingredients: "",
            name: "",
            cuisine: "cajun",
            category: "",
            category2: "cajun",
            attributes: ""
        }
    }else if(id === "longCheck"){
        parameters = {
            ingredients: "",
            name: "quick",
            cuisine: "",
            category: "",
            category2: "hotdogs",
            attributes: ""
        }
    }else if(id === "crazyCheck"){
        parameters = {
            ingredients: "",
            name: "sandwich",
            cuisine: "",
            category: "",
            category2: "sandwiches",
            attributes: ""
        }
    }else if(id === "whateverCheck"){
        parameters = {
            ingredients: "",
            name: "",
            cuisine: "",
            category: "side dish",
            category2: "nightfood",
            attributes: ""
        }
    }else if(id === "batCheck"){
        parameters = {
            ingredients: "salmon",
            name: "",
            cuisine: "",
            category: "",
            category2: "seafood",
            attributes: ""
        }
    }else if(id === "mothCheck"){
        parameters = {
            ingredients: "cheese",
            name: "",
            cuisine: "",
            category: "",
            category2: "comfortfood",
            attributes: ""
        }
    }else if(id === "butterflyCheck"){
        parameters = {
            ingredients: "asparagus",
            name: "",
            cuisine: "",
            category: "",
            category2: "vegetarian",
            attributes: ""
        }
    }else if(id === "redIcon"){
        parameters = {
            ingredients: "tomato",
            name: "",
            cuisine: "",
            category: "",
            category2: "tex-mex,spanish",
            attributes: ""
        }
    }else if(id === "greenIcon"){
        parameters = {
            ingredients: "kale",
            name: "",
            cuisine: "",
            category: "",
            category2: "sushi",
            attributes: ""
        }
    }else if(id === "brownIcon"){
        parameters = {
            ingredients: "",
            name: "",
            cuisine: "chinese",
            category: "",
            category2: "chinese",
            attributes: ""
        }
    }else if(id === "blueIcon"){
        parameters = {
            ingredients: "",
            name: "fish",
            cuisine: "",
            category: "",
            category2: "seafood",
            attributes: ""
        }
    }else if(id === "yellowIcon"){
        parameters = {
            ingredients: "",
            name: "",
            cuisine: "",
            category: "breakfast",
            category2: "waffles",
            attributes: ""
        }
    }else if(id === "blackIcon"){
        parameters = {
            ingredients: "",
            name: "",
            cuisine: "european",
            category: "",
            category2: "eastern_euoropean",
            attributes: ""
        }
    }else if(id === "surpriseIcon"){
        parameters = {
            ingredients: "",
            name: "",
            cuisine: "",
            category: "main course",
            category2: "restaurants",
            attributes: ""
        }
    }

    //hide filter images / results and clear recipeTitles
    $(".filterImage").hide();
    $(".result").hide();

    createQueryURL(parameters);

})//End of filterImage click event

$(".random").on("click", function(event){

    event.preventDefault();
    var id = $(this).attr("id");
    console.log(id);

    var parameters = {};

    if (id === "goodIcon"){
        parameters = {
            ingredients: "berries",
            name: "",
            cuisine: "",
            category: ""
        }
    }else if(id === "sadIcon"){
        parameters = {
            ingredients: "",
            name: "",
            cuisine: "",
            category: "dessert"
        }

    }else if(id === "mehIcon"){
        parameters = {
            ingredients: "",
            name: "",
            cuisine: "",
            category: "soup"
        }

    }else if(id === "kissIcon"){
        parameters = {
            ingredients: "chocolate",
            name: "",
            cuisine: "",
            category: ""
        }

    }else if(id === "angryIcon"){
        parameters = {
            ingredients: "",
            name: "bbq",
            cuisine: "",
            category: ""
        }

    }else if(id === "eyesIcon"){
        parameters = {
            ingredients: "",
            name: "sweet",
            cuisine: "",
            category: ""
        }
    }

    createQueryURL(parameters);

})//End of random click event


function getRecipeDetails(resultId){

    var queryURL2 = "https://api.spoonacular.com/recipes/" + resultId + "/information?apiKey=" + apiKey1;

    $.ajax({
        url: queryURL2,
        method: "GET"
        }).then(function(response) {
            console.log(response);
            showRecipeDetails(response);
        });

}//End of getRecipeDetails()

function showRecipeDetails(recipe){
    $(".result").hide();
    $(".detailInformation").show();
    $("#favIcon").attr("resultId", recipe.id);

    console.log(recipe.id);
    console.log(recipe);

    //Checks to see if there are any favorites in localStorage. If there are favorites saved in localStorage, they are stored in favorites variable.
    var storedFavorites = JSON.parse(localStorage.getItem("favorites"));

    console.log(storedFavorites);
    if (storedFavorites !== null){
        favorites = storedFavorites;
    }

    var item = favorites.find(item => item.id == recipe.id);

    if (item !== undefined){
        $("#favIcon").attr("src", "./assets/img/red-heart.png"),
        $("#favIcon").attr("class", "fave");

    }

    $("#detailTitle").html("<b>" + recipe.title + "</b>");
    $("#detailImage").attr("src", recipe.image);

    $("#detailSummary").html("<b>Summary: </b><br/><br/>" + recipe.summary);
    $("#detailInstructions").html("<b>Instructions: </b><br/><br/>");

    for (i = 0; i < recipe.analyzedInstructions[0].steps.length; i++){

        $("#detailInstructions").append("<b> Step " + i + ": </b>" + recipe.analyzedInstructions[0].steps[i].step +"<br/><br/>");
        // console.log(recipe.analyzedInstructions[0].steps[i]);
    }

    $("#detailTime").html("<b> Ready in: </b>" +  recipe.readyInMinutes + " minutes");

    console.log(recipe);

}

function showRestaurantDetails(restaurant){
    $(".result").hide();
    $(".detailInformation").show();
    $("#favIcon").attr("resultId", restaurant.id);

    //Checks to see if there are any favorites in localStorage. If there are favorites saved in localStorage, they are stored in favorites variable.
    var storedFavorites = JSON.parse(localStorage.getItem("favorites"));

    console.log(storedFavorites);
    if (storedFavorites !== null){
        favorites = storedFavorites;
    }

    var item = favorites.find(item => item.id == restaurant.id);

    if (item !== undefined){
        $("#favIcon").attr("src", "./assets/img/red-heart.png"),
        $("#favIcon").attr("class", "fave");

    }

    $("#detailTitle").html("<b>" + restaurant.name + "</b>");
    $("#detailImage").attr("src", restaurant.image_url);

    $("#detailSummary").html("<b>Restaurant website: </b> <a href = "+ restaurant.url + "'>" + restaurant.name + " website </a><br/><br/><b>Phone Number: </b>" + restaurant.phone + "<br/><br/> <b>Address: </b>");

    for (i = 0; i < restaurant.location.display_address.length; i++){
        $("#detailSummary").append(restaurant.location.display_address[i] + " ");
    }

}

//.result event listener
$(".result").on("click", function(event){

    event.preventDefault();
    console.log("Result clicked");
    // console.log($(this).children(".title")[0].innerHTML);
    $("#restaurantResults").hide();
    $("#recipesTitle").empty();
    var title = $(this).children(".recipeTitle")[0].innerText;
    console.log(title);

    console.log(recipes);

    index = recipes.findIndex(x => x.title === title);
    console.log(index);

    recipe = recipes[index];
    img = recipe.image;

    getRecipeDetails(recipe.id);

}); //End of .result event listener

$(".restaurant").on("click", function(event){

    event.preventDefault();
    console.log($(this));

    $("#restaurantResults").hide();
    $("#recipesTitle").empty();
    var title = $(this).children(".recipeTitle")[0].innerText;

    console.log(title);
    console.log(restaurants);

    index = restaurants.findIndex(x => x.name === title);
    console.log(index);

    showRestaurantDetails(restaurants[index]);
})

$("#favIcon").on("click", function(){

    if($("#favIcon").attr("class") == "nonfave"){

        $("#favIcon").attr("src", "./assets/img/red-heart.png");
        $("#favIcon").attr("class", "fave");
    }else{
        $("#favIcon").attr("src", "./assets/img/white-heart.png");
        $("#favIcon").attr("class", "nonfave");
    }

    var id = $("#favIcon").attr("resultId")
    var item = favorites.find(item => item.id == recipe.id);

    var index2 = recipes.findIndex(x => x.id == id);

    if (item == undefined) {
        var favorite = {
            id: id,
            name: recipes[index2].title,
        }

        favorites.push(favorite);
        console.log(id);
        console.log(favorites);

        localStorage.setItem("favorites", JSON.stringify(favorites)); //Updates favorites array in local storage
    }
})

