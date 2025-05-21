<?php 

require_once __DIR__ . '/../core/database.php';


$conn = Database::getInstance()->getConnection();

$sql = "CREATE TABLE IF NOT EXISTS patients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    age TINYINT UNSIGNED NOT NULL,
    gender VARCHAR(10) NOT NULL,
    dateOfAdmission Date NOT NULL,
    timeOfAdmission TIME NOT NULL,
    medicalRecordNumber VARCHAR(20) NOT NULL,
    allergies JSON,
    primaryLanguage VARCHAR(100) NOT NULL,
    chiefComplaint TEXT NOT NULL,
    pastMedicalHistory JSON,
    passMedication JSON,
    socialHistory JSON,
    vitalSigns JSON NOT NULL,
    generalAppearance TEXT, 
    musculoskeletalAssessment JSON, 
    diagnosis JSON,
    medication JSON,
    procedures JSON,
    laboratoryTest JSON,
    diet JSON,
    doctorOrders JSON
)";

if($conn->query($sql)){
    echo "table created succesfully";
}else{
    echo "Error creating table: " . $conn->error;
}

?>