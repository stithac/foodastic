// Faces color toggle
$(".far").on("click", function() {
    $(".far.selected").not(this).removeClass("selected");
    $(this).toggleClass("selected")
});

//Pick
$(".dunno-random-button").on("click", function() {
    $(".dunno-random-button.red").not(this).removeClass("red");
    $(this).toggleClass("red")
});


//Pick
$(".fa-palette").on("click", function() {
    $(".fa-palette.shadow").not(this).removeClass("shadow");
    $(this).toggleClass('shadow')
})

//TODO: if selected remove all other icons selected
//Just surprise me
$(".fa-exclamation-circle").on("click", function() {
    $(".fa-exclamation-circle.exclamation-red");
    $(this).toggleClass("exclamation-red")

})


// Dine in/Dine out icon filters
$(".filterImage").on("click", function() {
    $(".filterImage.shadow-down").not(this).removeClass("shadow-down");
    $(this).toggleClass("shadow-down")
})