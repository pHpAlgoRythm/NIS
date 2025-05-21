<?php

require_once __DIR__ . '/../core/database.php';

$conn = Database::getInstance()->getConnection();

$passMedicalHistory = [
    "asthma" => true,
    "diabetes" => false,
    "heartDisease" => true
];

$vitalSigns = [
    "temperature" => "37.2",
    "heartRate" => "80",
    "bloodPressure" => "120/80"
];

$allergies = ["None Reported"];

$sql = "INSERT INTO patients (
    name, age, gender, dateOfAdmission, medicalRecordNumber, allergies, 
    primaryLanguage, chiefComplaint, passMedicalHistory, vitalSigns
) VALUES (:name, :age, :gender, :dateOfAdmission, :medicalRecordNumber, :allergies, 
          :primaryLanguage, :chiefComplaint, :passMedicalHistory, :vitalSigns)";

$stmt = $conn->prepare($sql);

$name = "Emily Brown";
$age = 34;
$gender = "Female";
$dateOfAdmission = "2025-01-25";
$medicalRecordNumber = "MRN12345";
$primaryLanguage = "English";
$chiefComplaint = "Severe pain in the right knee after a fall while jogging two days ago.";

$alergiesJson = json_encode($allergies);
$passMedicalHistoryJson = json_encode($passMedicalHistory);
$vitalSignsJson = json_encode($vitalSigns);

$stmt->bindParam(':name', $name);
$stmt->bindParam(':age', $age);
$stmt->bindParam(':gender', $gender);
$stmt->bindParam(':dateOfAdmission', $dateOfAdmission);
$stmt->bindParam(':medicalRecordNumber', $medicalRecordNumber);
$stmt->bindParam(':allergies', $allergiesJson);
$stmt->bindParam(':primaryLanguage', $primaryLanguage);
$stmt->bindParam(':chiefComplaint', $chiefComplaint);
$stmt->bindParam(':passMedicalHistory', $passMedicalHistoryJson);
$stmt->bindParam(':vitalSigns', $vitalSignsJson);

if ($stmt->execute()) {
    echo "Patient inserted successfully!";
} else {
    echo "Error: " . $stmt->errorInfo()[2];
}

?>
