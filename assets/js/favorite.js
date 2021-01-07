var apiKey1 = "214f60134dc9416a9544280f08aa9f0b";
var apiKey2 = "dDXCEOuFO9JSMVQHXuQ0f_DK5y9AD2FFbHB6Ru9_oX5gPxDUXWqs1y__DTsKXd7rBGezL5GhwlInm5uVEaQNN2UWjsaeqVb-z7SanE7e9tLoVkPI_1SIRb5i2sD0X3Yx";

var favorites = [];

$(".detailInformation").hide();

//Checks to see if there are any favorites in localStorage. If there are favorites saved in localStorage, they are stored in favorites variable.
var storedFavorites = JSON.parse(localStorage.getItem("favorites"));

if (storedFavorites !== null){
    favorites = storedFavorites;
    console.log(favorites);//testing

    $("#recipeFaves").html("<b>Your favorite recipes:</b>");
    $("#restaurantFaves").html("<b><br/><br/>Your favorite restaurants:</b>");

    for(i = 0; i < favorites.length; i++){
        if(favorites[i].type == "recipe"){
             $("#recipeFaves").append("<br/><br/><a class='recipe' src='' id=" + favorites[i].id +">" + favorites[i].name + "</a>" )
        }else if (favorites[i].type == "restaurant"){
            $("#restaurantFaves").append("<br/><br/><a class='restaurant' id=" + favorites[i].id +">" + favorites[i].name +"</a>" )
        }
    }
}

$("#recipeFaves a").on("click", function(){
    console.log("clicked");//testing
    $("#LoadingImage").show();

   if($(this).hasClass("recipe")){
       console.log("recipe");

       var recipeId = $(this).attr("id");
       console.log(recipeId);

       var queryURL1 = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=" + apiKey1;

        $.ajax({
            url: queryURL1,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            $("#recipeFaves").hide();
            $("#restaurantFaves").hide();
            $("#LoadingImage").hide();
            $(".detailInformation").show();
            $("#detailTitle").html("<b>" + response.title + "</b>");
            $("#detailImage").attr("src", response.image);

            $("#detailSummary").html("<b>RECIPE SUMMARY: </b><br/>" + response.summary);
            $("#detailInstructions").html("<b>INSTRUCTIONS (if available): </b><br/>");

            for (i = 0; i < response.analyzedInstructions[0].steps.length; i++){

                $("#detailInstructions").append("<b> Step " + i + ": </b>" + response.analyzedInstructions[0].steps[i].step +"<br/>");
                // console.log(recipe.analyzedInstructions[0].steps[i]);
            }

            $("#detailTime").html("<b> Ready in: </b>" +  response.readyInMinutes + " minutes");

            if($("#favIcon").hasClass("nonfave")){

                $("#favIcon").attr("src", "./assets/img/red-heart.png");
                $("#favIcon").addClass("fave");
                $("#favIcon").removeClass("nonfave");

            }else{
                $("#favIcon").attr("src", "./assets/img/white-heart.png");
                $("#favIcon").addClass("nonfave");
                $("#favIcon").removeClass("fave");
            }
            $("#favIcon").attr("resultId", response.id);
        });


   }

})

$("#restaurantFaves a").on("click", function(){
    if ($(this).hasClass("restaurant")){

        $("#LoadingImage").show();
           var restaurantId = $(this).attr("id");


           var queryURL2 = "https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/" + restaurantId ;

           $.ajax({
            url: queryURL2,
            method: "GET",
            // dataType: "jsonp",
            // 'cache': true,
            headers: {
                "Authorization": "Bearer " + apiKey2,
                "accept": "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            }).then(function(response) {
                console.log(response);

                $("#recipeFaves").hide();
                $("#restaurantFaves").hide();
                $("#LoadingImage").hide();
                $(".detailInformation").show();
                $("#detailTitle").html("<b>" + response.name + "</b>");
                $("#detailImage").attr("src", response.image_url);

                $("#detailSummary").html("<b>Restaurant website: </b> <a href = "+ response.url + "'>" + response.name + " website </a><br/><br/><b>Phone Number: </b>" + response.phone + "<br/><br/> <b>Address: </b>");

            for (i = 0; i < response.location.display_address.length; i++){
                $("#detailSummary").append(response.location.display_address[i] + " ");
            }

            if($("#favIcon").hasClass("nonfave")){

                $("#favIcon").attr("src", "./assets/img/red-heart.png");
                $("#favIcon").addClass("fave");
                $("#favIcon").removeClass("nonfave");

            }else{
                $("#favIcon").attr("src", "./assets/img/white-heart.png");
                $("#favIcon").addClass("nonfave");
                $("#favIcon").removeClass("fave");
            }

                $("#favIcon").attr("resultId", response.id);
            });
       }
})

