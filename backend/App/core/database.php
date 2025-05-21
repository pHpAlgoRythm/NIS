<?php

class Database {
    private static $instance = null;
    private $conn;

    private $host = '127.0.0.1';
    private $port = '3338';
    private $user = 'root';
    private $password = '';
    private $dbName = 'NIS';

    private function __construct() {
        try {
            // Initial connection to create the DB
            $pdo = new PDO("mysql:host={$this->host};port={$this->port}", $this->user, $this->password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$this->dbName}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

            // Connect to the newly created DB
            $this->conn = new PDO("mysql:host={$this->host};port={$this->port};dbname={$this->dbName}", $this->user, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());  
        }
    }

    public static function getInstance() {
        if (!self::$instance) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->conn;
    }
}

?>
