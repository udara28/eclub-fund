var my_session;

function gotoAbout() {
    $('#navTab li:eq(1) a').tab('show');
}

function signUpAction(){
    $("#signUpModal").modal("show");
}
//navigation
$("#procedureLink").click(function() {
   $('#navTab li:eq(2) a').tab('show');
});

$("#getDonatedLink").click(function() {
   $("#studentModal").modal('show');
});
//modal control
$("#signUpForm").submit(function(){
    //$("div#signUpModalContent").html("<div><div class=\"col-sm-2 col-sm-offset-3\"><img src=\"resources/images/loader.gif\" /></div></div>")
    $.post("controllers/donorSignupController.php",{ email:   $("#InputEmail1").val(),
                                                     name:$("#InputName").val(),
                                                     mobile:  $("#InputMobile").val(),
                                                     designation: $("#InputDesignation").val(),
                                                     company: $("#InputCompany").val()
    },function(data,status){
        if(data.contains("Error")){
            $("#signUpModal").modal("hide");
            $("#messageModalHeading").text(":( Ooohps...");
            if(data.contains("Duplicate")){
                $("#messageModalBody").text("This email is already registered.");
            }
            $("#messageModal").modal("show");
        }else{
            $("#signUpModal").modal("hide");
            $("#messageModalHeading").text(":) Thank you");
            $("#messageModalBody").text("You can now sign in...");
            $("#messageModal").modal("show");
        }
    });
    return false;
});

$("#studentModal").submit(function(){
    //$("div#signUpModalContent").html("<div><div class=\"col-sm-2 col-sm-offset-3\"><img src=\"resources/images/loader.gif\" /></div></div>")
    $.post("controllers/donorSigninController.php",{ email:   $("#signInEmail").val(),
                                                     password:$("#signInPassword").val()
    },function(data,status){
        if(data.contains("Error")){
            $("#signInModal").modal("hide");
            $("#messageModalHeading").text(":( Ooohps...");
            $("#messageModalBody").text(data);
            $("#messageModal").modal("show");
        }else{
            $("#signInModal").modal("hide");
            $("#messageModalHeading").text(":) Signed In");
            my_session = data.substring(9,49);
            $("#messageModalBody").text("Hello "+data.substring(50));
            $("#messageModal").modal("show");
        }
    });
    return false;
});

//level selection
$(".levelSelection").click(function(){
    var sel = $(this).attr("tabindex");
     $("#levelMenu").html("Level "+sel+" <span class=\"caret\"></span>");
});
