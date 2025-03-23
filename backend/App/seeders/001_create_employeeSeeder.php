<?php
// app/seeders/001_create_employeeSeeder.php

require_once __DIR__ . '/../core/database.php';

try {
    // Get the database connection (assuming Database::getInstance()->getConnection() returns a PDO instance)
    $conn = Database::getInstance()->getConnection();

    // Define the admin user data
    $adminUser = [
        'EmployeeID'   => '1',
        'FirstName'    => 'nurse',
        'LastName'     => '01',
        'Role'         => 'nurse',
        'Email'        => 'nurse@example.com',
        'PasswordHash' => password_hash('love', PASSWORD_DEFAULT)
    ];

    // Prepare the SQL statement with named placeholders
    $stmt = $conn->prepare("
        INSERT INTO employees (EmployeeID, FirstName, LastName, Role, Email, PasswordHash)
        VALUES (:EmployeeID, :FirstName, :LastName, :Role, :Email, :PasswordHash)
    ");

    // Execute the statement with bound parameters
    if ($stmt->execute($adminUser)) {
        echo "Admin user created successfully!\n";
    } else {
        echo "Failed to insert admin.\n";
    }
} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage() . "\n";
}
