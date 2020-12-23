
var apiKey = "214f60134dc9416a9544280f08aa9f0b";
var cuisine;
// var i = 0;
var limit = 4;
var recipes = [];


function getResults(){

    var recipeId;

    console.log($("#cuisines").val());

    cuisine = $("#cuisines").val();
    console.log(cuisine);

    var queryURL1 ="https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&includeNutrition=true&cuisine="+ cuisine;

    $.ajax({
    url: queryURL1,
    method: "GET"
    }).then(function(response) {
        console.log("Spoonacular search by cuisine: " + cuisine);
        console.log(response);

        for (i = 0; i < limit; i++){

            recipeId = response.results[i].id;

            var queryURL2 = "https://api.spoonacular.com/recipes/" + recipeId + "/information" + "/?apiKey=" + apiKey;

                    $.ajax({
                        url: queryURL2,
                        method: "GET"
                        }).then(function(response) {
                            // console.log(response);
                            // time = "Ready in: " + response.readyInMinutes + " minutes";
                            // console.log(time + " id: " + response.id);
                            // $("time[class == 'response.id']").text(response.readyInMinutes);
                            recipes.push(response);
                            console.log(response);
                        });
                        console.log(recipes);

        }

        populateResults(response);

    });


}

function populateResults(response){

    var j=1;

    for (i = 0; i < limit; i++){

            $("#pic"+ j).attr("src", response.results[i].image);
            console.log($("#pic"+j));

            

            $("#title" + j).text(response.results[i].title);
            $("#blurb" + j).text(response.results[i].summary);
            console.log(response.results[i]);
            j++;
        }
}

$(searchBtn).on("click",function(event){
    // event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the search button from trying to submit a form when clicked
    event.preventDefault();

    getResults();

});