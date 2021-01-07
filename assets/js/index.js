var inputName = document.getElementById('inputName')
var inputEmail= document.getElementById('inputEmailField')  
var submit = document.getElementById('submitButton')
  
  
// Modal open and close for contact us form
// open using contact us button on navbar
    $(".modal-button").click(function() {
    var target = $(this).data("target");
    console.log("target");
// modifier syntax: is-clipped adds the overflow hidden
    $("html").addClass("is-clipped");
    $(target).addClass("is-active");
    })

    // close using the x button
  
    $(".modal-close").click(function() {

    $("html").removeClass("is-clipped");
    console.log(".modal-close");
    $(this).parent().removeClass("is-active");
    
    });

   