
import React, { Suspense, lazy, useState } from "react";

const LoginComponent = lazy(() => import("../components/auth/LoginComponent"))
const RegisterComponent = lazy(()=>import("../components/auth/RegisterComponent"))

 
const AuthPage = () => {

    const [isLogin, setIsLogin] = useState(true);


  return (
    <div className='flex'>

        <div className='hidden lg:flex w-[60%] h-screen justify-center items-center pl-4 '>
            <video autoPlay loop muted playsInline>
                <source src="./src/assets/assets/video.mp4" type="video/mp4" />
            </video>
        </div>

        <div className='w-full h-screen flex flex-col items-center pt-20 lg:w-[40%] h-screen shadow-lg '>

            <img src="./src/assets/assets/logo.jpg" className='w-[200px] md:w-[250px] lg:w-[200px] '  />
            
           <Suspense fallback={<div>Loading...</div>}>
                {isLogin ? <LoginComponent /> : <RegisterComponent />}
                    <button onClick={() => setIsLogin(!isLogin)} className=" cursor-pointer">
                        {isLogin ? <span> Don't have an Account? <p className="text-blue-500">Register</p> </span> : <span>Already have an account? <p className="text-blue-500">Login</p> </span>}
                    </button>
            </Suspense>

        </div>

    </div>
  )
}

export default AuthPage
