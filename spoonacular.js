
var apiKey = ""
var cuisine;
var limit = 2;
var ids = [];
var recipes = [];

$(".result").hide();

function getResults(){

    var recipeId;

    cuisine = $("#cuisines").val();

    var queryURL1 ="https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&includeNutrition=true&cuisine="+ cuisine;

    $.ajax({
    url: queryURL1,
    method: "GET"
    }).then(function(response) {
        // console.log("Spoonacular search by cuisine: " + cuisine);
        console.log(response);

        for (i = 0; i < limit; i++){

            recipeId = response.results[i].id;
            ids.push(recipeId);

        }
            console.log(ids);
            $(".result").show();
            $(".placeholder").hide();
            getRecipeDetails(ids);

    });

}

function getRecipeDetails(ids){

    for (i = 0; i < ids.length; i++){

        var queryURL2 = "https://api.spoonacular.com/recipes/" + ids[i] + "/information" + "/?apiKey=" + apiKey;

            $.ajax({
                url: queryURL2,
                method: "GET"
                }).then(function(response) {

                    recipes.push(response);
                    console.log(recipes);

                    populateResults(recipes);
                });

    }
}

function populateResults(recipes){
    console.log(recipes);
    var j = 1;

    for (i = 0; i < limit; i++){

            $("#pic"+ j).attr("src", recipes[i].image);


            $("#title" + j).text(recipes[i].title);
            $("#rating" + j).text("Rating: " + recipes[i].spoonacularScore + "/100");

            if(parseInt(recipes[i].pricePerServing) <= 100){
                $("#price" + j).text("$");
            }else if(parseInt(recipes[i].pricePerServing) > 100 && parseInt(recipes[i].pricePerServing) < 600 ){
                $("#price" + j).text("$$");
            }else{
                $("#price" + j).text("$$$");
            }
    //         // $("#blurb" + j).text(response[i].summary);
            j++;
        }
}

//Event Listeners
$(searchBtn).on("click",function(event){

    event.preventDefault();
    getResults();

});

$(".result").on("click", function(event){

    event.preventDefault();
    console.log("Result clicked");
    $(".result").hide();
});