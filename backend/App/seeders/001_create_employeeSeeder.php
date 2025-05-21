<?php

require_once __DIR__ . '/../core/database.php';

try {
    $conn = Database::getInstance()->getConnection();

    $adminUser = [
        'EmployeeID'   => '1',
        'FirstName'    => 'nurse01',
        'Role'         => 'nurse',
        'Email'        => 'nurse@example.com',
        'PasswordHash' => password_hash('love', PASSWORD_DEFAULT)
    ];

    $stmt = $conn->prepare("
        INSERT INTO employees (EmployeeID, FullName, Role, Email, PasswordHash)
        VALUES (:EmployeeID, :FirstName, :Role, :Email, :PasswordHash)
    ");

    if ($stmt->execute($adminUser)) {
        echo "Admin user created successfully!\n";
    } else {
        echo "Failed to insert admin.\n";
    }
} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage() . "\n";
}
