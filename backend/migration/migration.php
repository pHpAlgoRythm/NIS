<?php

    $files = glob(__DIR__ . '/../App/migrations/*.php' );

    sort($files);

    foreach($files as $file){
        require_once $file;
    }

    echo 'Done Migrating';

?>