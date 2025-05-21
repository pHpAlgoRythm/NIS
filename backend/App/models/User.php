<?php


require_once __DIR__ . '/../core/database.php';

class User{
    private $conn; 

    public function __construct(){
        $this->conn = Database::getInstance()->getConnection();
    }
    
    public function getUserByEmail($email){
        $stmt = $this->conn->prepare('SELECT * FROM employees WHERE email = :email');
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
    
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function register($fullName, $email, $password)
{
  
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    
    $role = "nurse"; 
    $dateOfJoining = date("Y-m-d");

  
    $stmt = $this->conn->prepare("INSERT INTO employees (FullName, Role, Email, PasswordHash, DateOfJoining) 
                                  VALUES (:FullName, :Role, :Email, :Password, :DateOfJoining)");


    $stmt->bindParam(':FullName', $fullName, PDO::PARAM_STR);
    $stmt->bindParam(':Role', $role, PDO::PARAM_STR);
    $stmt->bindParam(':Email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':Password', $hashedPassword, PDO::PARAM_STR);
    $stmt->bindParam(':DateOfJoining', $dateOfJoining, PDO::PARAM_STR);

   
    if ($stmt->execute()) {
        return $this->conn->lastInsertId();
    } else {
        return false; 
    }
}

    
}

?>