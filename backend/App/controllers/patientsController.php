<?php

    require_once __DIR__ . '/../models/Patients.php';

    
    class patientController {

        private $patients; 

        public function __construct(){
            $this->patients = new Patients();
        }

        public function createNewPatientRecord($data)
        {

            $created = $this->patients->createNewPatient($data);

            if(!$created){
                http_response_code(400);

                return json_encode([
                'error' => 'Failed to create new patient.'
                ]);
            }

            return json_encode([
                'message' => 'Patient Created Successfully',
                'data' => $created
            ]);

        }

        public function displayAllPatient()
        {
            $data = $this->patients->displayAllPatients();
            
            if(!$data){
               http_response_code(400);
               return json_encode(["error" => "There is no data to display"]);
            }

            
                return json_encode([
                    'message' => 'This are the patients datas',
                    'patientsData' => $data
                ]);
            

        }

        public function addPatientVitalSigns($id, $newVitalData)
        {
            $result = $this->patients->addNewInstanceToVitalSign($id, $newVitalData);

            if ($result) {
                return json_encode([
            'message' => "New vital signs added successfully for patient ID $id."
                ]);
            } else {
                http_response_code(400);
                return json_encode([
            'error' => "Failed to add new vital signs. Patient ID $id may not exist."
                ]);
            }
        }


        public function deletePatient($id)
        {
            $this->patients->deletePatientRecord($id);

            return json_encode([
                'message' => 'deleted successfully'
            ]);
        }



    }

?>