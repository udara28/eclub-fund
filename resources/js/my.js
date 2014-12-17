function gotoAbout() {
    $('#navTab li:eq(1) a').tab('show');
}

function signUpAction(){
    $("#signUpModal").modal("show");
}

$("#signUpForm").submit(function(){
    //$("div#signUpModalContent").html("<div><div class=\"col-sm-2 col-sm-offset-3\"><img src=\"resources/images/loader.gif\" /></div></div>")
    $.post("controllers/donorSignupController.php",{ email:   $("#InputEmail1").val(),
                                                     password:$("#InputPassword").val(),
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

$("#signInModal").submit(function(){
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
            $("#messageModalBody").text("Hello "+data.substring(9));
            $("#messageModal").modal("show");
        }
    });
    return false;
});