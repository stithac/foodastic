
var apiKey = "214f60134dc9416a9544280f08aa9f0b"

//filter variables
var cuisine;

var limit = 10;
var ids = [];
var recipes = [];

/******************************
Start of the application's functions
******************************/

$(".result").hide(); //Hide results divs on page load
$(".detailInformation").hide() //Hide detail information div on page load

/****** getFilters() function:
- Called when the searchBtn is clicked.
- The filter values are taken from the left-hand filters and stored in an object "parameters".
- It is then passed to the getQueryURL() function.
******/
function getFilters(){

    //get selected ingredients from #ingredientSelections
    var ingredients = [];
    $("#ingredientSelections input:checked").each(function(){
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

}//End of getFilters()


/****** createQueryURL() function:
- Invoked at end of getFilters() function.
- Takes in an object and creates a queryURL based on the parameters passed in.
- It then passes the URL to the getResults() function.
******/
function createQueryURL(params){

    var queryURL1 ="https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&includeNutrition=true&addRecipeInformation=true&includeIngredients=" + params.ingredients.toString() + "&titleMatch="+ params.name + "&cuisine=" + params.cuisine + "&type=" + params.category;

    console.log(queryURL1); //testing

    getResults(queryURL1); //Pass query URL to the getResults function

}//End of createQueryURL()


/****** getResults() function:
- Invoked at end of createQueryURL() function.
- Takes in the queryURL and makes the AJAX call.
- The response is then passed to the populateRecipes function.
******/
function getResults(url){

    $.ajax({
    url: url,
    method: "GET"
    }).then(function(response) {
        console.log(response);

        for(i = 0; i < response.results.length; i++){
            recipe = response.results[i];
            recipes.push(recipe);
        }
        populateResults(response);
    });

}//End of getResults()


/****** populateResults() function:
- Invoked from getResults() function.
- Takes in response from AJAX call and updates DOM elements with appropriate parameters
- The response is then passed to the populateRecipes function.
******/
function populateResults(recipes){
    console.log(recipes.results.length);

    // $(".result").show();

    var j = 1;

    //hide filter images / results and clear recipeTitles
    $(".filterImage").hide();
    $(".result").hide();
    $(".recipeTitle").val("");


    for (i = 0; i < recipes.results.length; i++){

        console.log(recipes.results[i]); //testing

        $("#pic"+ j).attr("src", recipes.results[i].image);
        $("#title" + j).text(recipes.results[i].title);
        $("#rating" + j).text("Rating: " + recipes.results[i].spoonacularScore + "/100");

        if(parseInt(recipes.results[i].pricePerServing) <= 100){
            $("#price" + j).text("$");
        }else if(parseInt(recipes.results[i].pricePerServing) > 100 && parseInt(recipes.results[i].pricePerServing) < 600 ){
            $("#price" + j).text("$$");
        }else{
            $("#price" + j).text("$$$");
        }

        if($("#title"+j) !== ""){
            $("#result" + i).show();
            j++;
        }else {
            $("#result" + i).hide();
        }

    }

}//End of populateResults()


/******
 Event Listeners
******/

//searchBtn event listener
$(searchBtn).on("click",function(event){

    event.preventDefault();
    // getResults();

    getFilters();

});

//filterImages event listener
$(".filterImage").on("click", function(event){

    event.preventDefault();
    var id = $(this).attr("id");
    console.log(id);

    var parameters = {};

    if (id === "spicy"){
        parameters = {
            ingredients: "",
            name: "",
            cuisine: "african",
            category: ""
        }
    }else if(id === "savory"){
        parameters = {
            ingredients: "onion",
            name: "",
            cuisine: "",
            category: ""
        }

    }else if(id === "onepot"){
        parameters = {
            ingredients: "",
            name: "casserole",
            cuisine: "",
            category: ""
        }

    }else if(id === "special"){
        parameters = {
            ingredients: "",
            name: "",
            cuisine: "french",
            category: ""
        }

    }else if(id === "surprise"){
        parameters = {
            ingredients: "",
            name: "",
            cuisine: "",
            category: "main course"
        }

    }else if(id === "healthy"){
        parameters = {
            ingredients: "",
            name: "",
            cuisine: "",
            category: ""
        }
    }

    createQueryURL(parameters);

})//End of filterImage click event


function getRecipeDetails(recipeId){

    var queryURL2 = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=" + apiKey;

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

    $("#detailImage").attr("src", recipe.image);
    $("#detailTitle").text(recipe.title);
    $("#detailSummary").text(recipe.summary);
    $("#detailIngredients").text(recipe.analyzedInstructions);
    $("#detailTime").text("Ready in: " +  recipe.readyInMinutes + " minutes");

    console.log(recipe);

}

//.result event listener
$(".result").on("click", function(event){

    event.preventDefault();
    console.log("Result clicked");
    // console.log($(this).children(".title")[0].innerHTML);
    var title = $(this).children(".recipeTitle")[0].innerHTML;
    console.log(title);

    console.log(recipes);

    index = recipes.findIndex(x => x.title === title);
    console.log(index);

    recipe = recipes[index];
    img = recipe.image;
    console.log(img);

    getRecipeDetails(recipe.id);

}); //End of .result event listener


