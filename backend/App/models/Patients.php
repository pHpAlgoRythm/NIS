<?php

require_once __DIR__ . '/../core/database.php';

class Patients {
    private $conn;

    protected $fillable = [
        'name', 'age', 'gender', 'dateOfAdmission', 'timeOfAdmission',
        'medicalRecordNumber', 'allergies', 'primaryLanguage', 'chiefComplaint',
        'pastMedicalHistory', 'passMedication', 'socialHistory', 'vitalSigns',
        'generalAppearance', 'musculoskeletalAssessment', 'diagnosis',
        'medication', 'procedures', 'laboratoryTest', 'diet', 'doctorOrders'
    ];

    public function __construct() {
        $this->conn = Database::getInstance()->getConnection();
    }

   public function createNewPatient(array $data) {

    $filteredData = array_intersect_key($data, array_flip($this->fillable));
    $fields = array_keys($filteredData);
    $placeholders = array_map(fn($key) => ':' . $key, $fields);

    $jsonFields = [
        'allergies', 'pastMedicalHistory', 'passMedication', 'socialHistory',
        'vitalSigns', 'musculoskeletalAssessment', 'diagnosis', 'medication',
        'procedures', 'laboratoryTest', 'diet', 'doctorOrders'
    ];

    $sql = "INSERT INTO patients (" . implode(',', $fields) . ") VALUES (" . implode(',', $placeholders) . ")";
    $stmt = $this->conn->prepare($sql);

    foreach ($filteredData as $key => $value) {
        if (in_array($key, $jsonFields)) {
            $value = json_encode($value);
        }
        $stmt->bindValue(':' . $key, $value);
    }

    return $stmt->execute();
}


    public function displayAllPatients() {
        $sql = "SELECT * FROM patients ORDER BY id DESC";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function deletePatientRecord($id) {
        $sql = "DELETE FROM patients WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function addNewInstanceToVitalSign($id, array $newVitalData) {
        $sql = "SELECT vitalSigns FROM patients WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $existing = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$existing) return false;

        $vitalSigns = json_decode($existing['vitalSigns'], true);
        if (!is_array($vitalSigns)) $vitalSigns = [];

       
        $vitalSigns[] = $newVitalData;

        $updateSql = "UPDATE patients SET vitalSigns = :vitalSigns WHERE id = :id";
        $updateStmt = $this->conn->prepare($updateSql);
        $updateStmt->bindValue(':vitalSigns', json_encode($vitalSigns));
        $updateStmt->bindValue(':id', $id, PDO::PARAM_INT);

        return $updateStmt->execute();
    }
}

?>
