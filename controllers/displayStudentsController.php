<?php

    $ini_array = parse_ini_file("../config.ini",true);
        
    $host = $ini_array["database"]["host"];
    $port   =  $ini_array["database"]["port"];
    $user   =  $ini_array["database"]["user"];
    $pwd    =  $ini_array["database"]["password"];
    $database= $ini_array["database"]["database"];
        
    $conn = new mysqli($host, $user, $pwd, $database);
        
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $sql = "select name,email,address,contact,level,uni_index,income,schols,reason from students";
    $result = $conn->query($sql);
    
    //setting the style .css files
    echo 
    "
    <link rel=\"stylesheet\" href=\"../resources/css/bootstrap.min.css\" type=\"text/css\" >
    <link rel=\"stylesheet\" href=\"../resources/css/my.css\" type=\"text/css\" >
    ";
    
    //title setting up
    echo
    "<h1>List of Students</h1>" .
    "<p> Total number of students : " .
    $result->num_rows .
    "</p>";
    
    echo
    "<table class=\"table table-bordered\">";
    
    echo
    "<th>#</th>".
    "<th>Name</th>".
    "<th>Email</th>".
    "<th>Address</th>".
    "<th>Contact</th>".
    "<th>Level</th>".
    "<th>Index no</th>".
    "<th>Parent's<br>income</th>".
    "<th>Sum of<br>scholarships</th>".
    "<th>Reasons for<br>application</th>";
    
    for($row_no = 0; $row_no < $result->num_rows ; $row_no++){
        echo "<tr>";
        echo "<td>".($row_no+1)."</td>";
        $result->data_seek($row_no);
        $row = $result->fetch_assoc();
        foreach($row as $val){
            echo "<td>".substr($val,1)."</td>";
        }
        echo "</tr>";
    }
    echo "</table>";
    
    $conn->close();
    //Copyright notice
    echo "<h6 class=\"pull-right\">Automatically generated page. For any issue contact <a href=\"mailto:udara28@live.com\">Udara Piumal</a>   .</h6>";


?>