<?php
    $method = $_SERVER['REQUEST_METHOD'];
    if( $method == 'POST'){
        $email      = $_POST["email"];
        $password   = sha1($_POST["password"]);
        
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
        
        $sql = "select * from donors where email='".$email."' and pwd='".$password."'";
        $result = $conn->query($sql);
        if($result->num_rows == 0){
            echo "Error: Invalid Login";
        }else{
            echo "Success: $email";
        }            
        
        $conn->close();
    }else{
        echo "not POST\n";
    }
?>