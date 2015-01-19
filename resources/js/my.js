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

$("#becomeDonorLink").click(function() {
   $("#signUpModal").modal('show');
});

function gotoContacts(){
    $("#studentModal").modal('hide');
    $("#signUpModal").modal('hide'); 
    $("#messageModal").modal('hide');
    $('#navTab li:eq(3) a').tab('show'); 
}
//modal control
$("#signUpForm").submit(function(){
    //$("div#signUpModalContent").html("<div><div class=\"col-sm-2 col-sm-offset-3\"><img src=\"resources/images/loader.gif\" /></div></div>")
    var tmp = $("#donorTitleMenu").text().substring(0,3);
    var title;
    switch(tmp){
        case "Mr.":
            title = "Mr. ";
            break;
        case "Mrs":
            title = "Mrs. ";
            break;
        case "Mis":
            title = "Miss. ";
            break;
        case "Dr.":
            title = "Dr. ";
            break;
        default:
            title = "Mr. ";
    }
    if($('#signUpForm').parsley().isValid()){
        $.post("controllers/donorSignupController.php",{ email:   $("#InputEmail1").val(),
                                                         name:  title + $("#InputName").val(),
                                                         mobile:  $("#InputMobile").val(),
                                                         designation: $("#InputDesignation").val(),
                                                         company: $("#InputCompany").val()
        },function(data,status){
            console.log(data.indexOf("Error"));
            if(data.indexOf("Error") != -1 ){
                $("#signUpModal").modal("hide");
                $("#messageModalHeading").text(":( Ooohps...");
                if(data.indexOf("Duplicate") > 0){
                    $("#messageModalBody").text("This email is already registered.");
                }
                $("#messageModal").modal("show");
            }else{
                $("#signUpModal").modal("hide");
                $("#messageModalHeading").text(":) Thank you");
                $("#messageModalBody").html("We appreciate your help very much "+title+$("#InputName").val() + " . If you have anything to ask please <button class=\"btn-success\" onClick=\"gotoContacts()\">Contact Us</button>");
                $("#messageModal").modal("show");
            }
        });
    }
    return false;
});

$("#studentModal").submit(function(){
    //$("div#signUpModalContent").html("<div><div class=\"col-sm-2 col-sm-offset-3\"><img src=\"resources/images/loader.gif\" /></div></div>")
    if($('#studentForm').parsley().isValid()){
        $.post("controllers/studentSignupController.php",{ 
            name:    $("#studentName").val(),        
            email:   $("#studentEmail").val(),
            address: $("#studentAddress").val(),
            contact: $("#studentContact").val(),
            level:   $("#levelMenu").text().substring(0,7),
            index:   $("#studentIndex").val(),
            income:  $("#studentIncome").val(),
            schols:  $("#studentSchols").val(),
            reason:  $("#studentReason").val()
        },function(data,status){
            if(data.indexOf("Error") != -1){
                $("#studentModal").modal("hide");
                $("#messageModalHeading").text(":( Ooohps...");
                if(data.indexOf("Duplicate") > 0){
                    $("#messageModalBody").text("This email is already registered.");
                }else{
                    $("#messageModalBody").text(data);
                }
                $("#messageModal").modal("show");
            }else{
                $("#studentModal").modal("hide");
                $("#messageModalHeading").text(":) Signed In");
                $("#messageModalBody").html("Hi "+$("#studentName").val()+". We got your application. We'll contact you after reviewing the application. Meanwhile if you need to know anything please <button class=\"btn-success\" onClick=\"gotoContacts()\">Contact Us</button>");
                $("#messageModal").modal("show");
            }
        });
    }
    return false;
});

//level selection
$(".levelSelection").click(function(){
    var sel = $(this).attr("tabindex");
     $("#levelMenu").html("Level "+sel+" <span class=\"caret\"></span>");
});
//title 
$(".donorTitleSelection").click(function(){
    var sel = $(this).attr("tabindex");
        var title;
    switch(sel){
        case "1":
            title = "Mr. ";
            break;
        case "2":
            title = "Mrs. ";
            break;
        case "3":
            title = "Miss. ";
            break;
        case "4":
            title = "Dr. ";
            break;
        default:
            title = "Mr. ";
    }
    $("#donorTitleMenu").html(title+" <span class=\"caret\"></span>");
});