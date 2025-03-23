<?php

    require_once __DIR__ . '/../app/controllers/authController.php';

    header("Content-Type: application/json");

    header("Access-Control-Allow-Origin: *");

    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    $auth = new authController();

    $requestUri = explode("?", $_SERVER['REQUEST_URI'])[0];

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        
        $data = json_decode(file_get_contents("php://input"));

        if($requestUri === "/emploLogin"){
            echo $auth->emploLogin($data->email, $data->password);
        }

    }elseif($_SERVER['REQUEST_METHOD'] === 'GET'){
        if($requestUri === "/logout"){
            echo $auth->logout();
        }
    }

?>