<?php
    $port = 8000;
    echo "Server running at http://localhost:$port\n";
    exec("php -S localhost:$port -t public");
?>