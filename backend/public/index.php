<?php

require_once __DIR__ . '/../app/controllers/authController.php';
require_once __DIR__ . '/../app/controllers/patientsController.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$auth = new authController();
$patient = new patientController();

$requestUri = explode("?", $_SERVER['REQUEST_URI'])[0];
$method = $_SERVER['REQUEST_METHOD'];

$data = json_decode(file_get_contents("php://input"), true);


// AUTH ROUTES

if ($method === 'POST') {
    switch ($requestUri) {
        case "/emploLogin":
            if (!isset($data['email']) || !isset($data['password'])) {
                http_response_code(400);
                echo json_encode(["message" => "Missing some credentials"]);
                exit();
            }
            echo $auth->emploLogin($data['email'], $data['password']);
            break;

        case "/register":
            if (!isset($data['name']) || !isset($data['email']) || !isset($data['password'])) {
                http_response_code(400);
                echo json_encode(["message" => "Missing some credentials"]);
                exit();
            }
            echo $auth->register($data['name'], $data['email'], $data['password']);
            break;

      
        // PATIENT ROUTES 
        
        case "/createPatient":
            echo $patient->createNewPatientRecord($data);
            break;

        case "/addVitalSigns":
            if (!isset($data['id']) || !isset($data['vitalSigns'])) {
                http_response_code(400);
                echo json_encode(["message" => "Missing patient ID or vital signs"]);
                exit();
            }
            echo $patient->addPatientVitalSigns($data['id'], $data['vitalSigns']);
            break;
    }
}

if ($method === 'GET') {
    switch ($requestUri) {
        case "/logout":
            echo $auth->logout();
            break;

        case "/getAllPatients":
            echo $patient->displayAllPatient();
            break;
    }
}

if ($method === 'DELETE') {
    if ($requestUri === "/deletePatient") {
        if (!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Missing patient ID"]);
            exit();
        }
        echo $patient->deletePatient($data['id']);
    }
}
