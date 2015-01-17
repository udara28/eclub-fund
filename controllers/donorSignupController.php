<?php
    $method = $_SERVER['REQUEST_METHOD'];
    if( $method == 'POST'){
        $email      = $_POST["email"];
        $donor_name = $_POST["name"];
        $mobile     = $_POST["mobile"];
        $designation= $_POST["designation"];
        $company    = $_POST["company"];
        
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
        
        $sql = "insert into donors(name,email,mobile,designation,company) "
                    ."values('".$donor_name."','".$email."','".$mobile."','".$designation."','".$company."')" ;
        
        if($conn->query($sql) == TRUE){
            echo "Data added successfully.";
        }else{
            echo "Error: ". $conn->error;
        }            
        
        $conn->close();
    }else{
        echo "not POST\n";
    }
?>