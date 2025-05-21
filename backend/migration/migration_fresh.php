<?php

    require_once __DIR__ . '/../App/core/database.php';


    $pdo = $conn = Database::getInstance()->getConnection();

    $pdo->exec("SET FOREIGN_KEY_CHECK = 0");

    $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);

    foreach ($tables as $table){
        $pdo->exec("DROP TABLE IF EXIST `$table`");
        echo "dropped table: $table\n";

    }

    $pdo->exec("SET FOREIGN_KEY_CHECKS = 1");

    $files = glob(__DIR__ . '/../App/migrations/*.php');
    
    sort($files);

        foreach ($files as $file) {
             require_once $file;
        }

        echo "Fresh migration complete.\n";

?>