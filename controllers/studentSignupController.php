<?php
    $method = $_SERVER['REQUEST_METHOD'];
    if( $method == 'POST'){
        $name       = ">".$_POST["name"];
        $email      = ">".$_POST["email"];
        $address    = ">".$_POST["address"];
        $contact    = ">".$_POST["contact"];
        $level      = ">".$_POST["level"];
        $index      = ">".$_POST["index"];
        $income     = ">".$_POST["income"];
        $schols     = ">".$_POST["schols"];
        $reason     = ">".$_POST["reason"];
        
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
        
        $sql = "insert into students(name,email,address,contact,level,uni_index,income,schols,reason) "
                    ."values('".$name."','".$email."','".$address."','".$contact."','".$level."','".$index."','".$income."','".$schols."','".$reason."')" ;
        
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