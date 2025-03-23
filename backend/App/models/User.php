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
    
}

?>