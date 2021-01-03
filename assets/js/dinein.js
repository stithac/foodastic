var apiKey = "214f60134dc9416a9544280f08aa9f0b"

//filter variables
var cuisine;

var limit = 2;
var ids = [];
var recipes = [];

$(".result").hide(); //Hide results divs on page load

//getFilters() function is called when the searchBtn is clicked. The filter values are taken from the left-hand filters and stored in an object "parameters". It is then passed to the getQueryURL() function
function getFilters() {

    //get selected ingredients from #ingredientSelections
    var ingredients = [];
    $("#ingredientSelections input:checked").each(function() {
        ingredients.push($(this).attr("id"));
    })
    console.log(ingredients); //testing

    //get recipe name from #nameInput
    var name = $("#nameInput").val();
    console.log(name); //testing

    //get selected cuisine from #cusineSelections
    var cuisine = $("#cuisineSelections").val();
    console.log(cuisine); //testing

    //get selected category from #categorySelections
    var category = $("#categorySelections").val();
    console.log(category); //testing

    //create parameters object to hold all parameter values stored from filters
    var parameters = {
        ingredients: ingredients,
        name: name,
        cuisine: cuisine,
        category: category,
    }

    createQueryURL(parameters); //call createQueryURL and pass in parameters object

} //End of getFilters()

//createQueryURL() takes in an object and creates a queryURL based on the parameters passed in.  It then passes the URL to the getResults() function
function createQueryURL(params) {

    var queryURL1 = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&includeNutrition=true&addRecipeInformation=true&includeIngredients=" + params.ingredients.toString() + "&titleMatch=" + params.name + "&cuisine=" + params.cuisine + "&type=" + params.category;

    console.log(queryURL1); //testing

    getResults(queryURL1); //Pass query URL to the getResults function

} //End of createQueryURL()

//getResults() function takes in the queryURL and makes the AJAX call.  The response is then passed to the populateRecipes function
function getResults(url) {

    $.ajax({
        url: url,
        method: "GET"
    }).then(function(response) {
        console.log(response);

    });

} //End of getResults()

// function getRecipeDetails(ids){

//     for (i = 0; i < ids.length; i++){

//         var queryURL2 = "https://api.spoonacular.com/recipes/" + ids[i] + "/information" + "/?apiKey=" + apiKey;

//         $.ajax({
//             url: queryURL2,
//             method: "GET"
//         }).then(function(response) {

//             recipes.push(response);
//             console.log(recipes);

//             populateResults(recipes);
//         });
//     }
// }

function populateResults(recipes) {
    console.log(recipes);
    var j = 1;

    for (i = 0; i < limit; i++) {

        $("#pic" + j).attr("src", recipes[i].image);
        $("#title" + j).text(recipes[i].title);
        $("#rating" + j).text("Rating: " + recipes[i].spoonacularScore + "/100");

        if (parseInt(recipes[i].pricePerServing) <= 100) {
            $("#price" + j).text("$");
        } else if (parseInt(recipes[i].pricePerServing) > 100 && parseInt(recipes[i].pricePerServing) < 600) {
            $("#price" + j).text("$$");
        } else {
            $("#price" + j).text("$$$");
        }

        $("#blurb" + j).text(response[i].summary);

        j++;
    }
}

//Event Listeners
$(searchBtn).on("click", function(event) {

    event.preventDefault();
    // getResults();
    getFilters();

});

$(".filterImage").on("click", function(event) {

        event.preventDefault();
        var id = $(this).attr("id");
        console.log(id);

        var parameters = {};

        if (id === "spicy") {
            parameters = {
                ingredients: "",
                name: "",
                cuisine: "african",
                category: ""
            }
        } else if (id === "savory") {
            parameters = {
                ingredients: "onion",
                name: "",
                cuisine: "",
                category: ""
            }

        } else if (id === "onepot") {
            parameters = {
                ingredients: "",
                name: "casserole",
                cuisine: "",
                category: ""
            }

        } else if (id === "special") {
            parameters = {
                ingredients: "",
                name: "",
                cuisine: "french",
                category: ""
            }
        } else if (id === "surprise") {
            parameters = {
                ingredients: "",
                name: "",
                cuisine: "",
                category: "main course"
            }
        } else if (id === "healthy") {
            parameters = {
                ingredients: "",
                name: "",
                cuisine: "",
                category: ""
            }
        }

    }) //End of filterImage click event

$(".result").on("click", function(event) {

    event.preventDefault();
    // console.log("Result clicked");
    // console.log($(this).children(".title")[0].innerHTML);
    var title = $(this).children(".recipeTitle")[0].innerHTML;
    // console.log(recipes);

    index = recipes.findIndex(x => x.title === title);
    console.log(index);

    recipe = recipes[index];
    img = recipe.image;
    console.log(img);

    var ingredients = [];

    for (i = 0; i < recipe.extendedIngredients.length; i++) {
        ingredients.push(recipe.extendedIngredients[i].name);
    }
    // ingredients = recipe.extendedIngredients;
    console.log(ingredients);

    var instructions = recipe.instructions.replace(/\./g, ".\n");
    console.log(instructions);

    var readyInMinutes = recipe.readyInMinutes;
    console.log(readyInMinutes);

    var servings = recipe.servings;
    console.log(servings);

    var mask = "diamondMask";

    var backgroundImage = "none";

});