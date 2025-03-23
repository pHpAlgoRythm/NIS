<?php

require_once __DIR__ . '/../core/database.php';

$conn = Database::getInstance()->getConnection();

$sql = "CREATE TABLE IF NOT EXISTS Employees (
    EmployeeID VARCHAR(10) PRIMARY KEY,  
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Role VARCHAR(50) NOT NULL,           
    Department VARCHAR(50),              
    ContactNumber VARCHAR(15),
    Email VARCHAR(100) UNIQUE,
    Address VARCHAR(255),
    DateOfJoining DATE,
    ShiftSchedule VARCHAR(50),                 
    PasswordHash VARCHAR(255),           
    Qualifications TEXT,                
    Certifications TEXT,                
    Specializations TEXT,                
    LicenseNumber VARCHAR(50),           
    EmergencyContactName VARCHAR(100),
    EmergencyContactNumber VARCHAR(15),
    Relationship VARCHAR(50),            
    NotificationPreferences VARCHAR(50), 
    LastLogin TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

    if($conn->query($sql)){
        echo "table created succesfully";
    }else{
        echo "Error creating table: " . $conn->error;
    }

?>