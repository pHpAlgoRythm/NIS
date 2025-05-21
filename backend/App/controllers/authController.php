<?php

    require_once __DIR__ . '/../models/User.php';

    class authController{
        private $userModel;

        public function __construct(){
            $this->userModel = new User();
        }

        public function emploLogin($email, $password)
        {
                session_start();

                $user = $this->userModel->getUserByEmail($email);

                if(!$user || !password_verify($password, $user['PasswordHash'])){
                    http_response_code(401);
                    return json_encode(["error" => "invalid credentials"]);
                }

                $_SESSION['user_id'] = $user['EmployeeID'];
                $_SESSION['user_name'] = $user['FullName'];

                http_response_code(200); 
                header('Content-Type: application/json');
                return json_encode([
                    'message' => 'Login Successfully',
                    'user' => $user
                ]);
        }

        public function register($name, $email, $password)
        {
            $user = $this->userModel->register($name, $email, $password);

           http_response_code(200);
           header('Content-Type : application/json');

           return json_encode([
                'message' => 'Registered Succesfully',
                'user' => $user
           ]);
        }

        public function logout()
        {
            session_start();
            session_destroy();

            return json_encode(['message' => 'Logged out  Successfully']);
        }
    }

?>