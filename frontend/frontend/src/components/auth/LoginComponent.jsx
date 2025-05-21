import React, { useState } from 'react'
import LoginApi from '../../api/LoginApi'
import { useNavigate } from 'react-router-dom'

const LoginComponent = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        LoginApi(email, password, navigate)
    }

  return (
    <div className='flex flex-col pt-12 gap-4'>
        <form onSubmit={handleSubmit}>
        <div className='w-full border-b-2 border-black md:w-[250px] lg:w-full'>

            <input type="email" placeholder='Email' className="border-0 outline-0 p-1" 
                 value={email} onChange={(e)=>setEmail(e.target.value)} 
            />

        </div>


        <div className='w-full border-b-2 border-black md:w-[250px] lg:w-full'>

            <input type="password" placeholder='Password' className="border-0 outline-0 p-1" 
            value={password}  onChange={(e) => setPassword(e.target.value)}
            />

        </div>

     
        <button className='bg-[#4E5672] text-white w-full mt-4 h-[35px] rounded-sm cursor-pointer' type='submit'>LOGIN</button>
        </form>
    </div>
  )
}

export default LoginComponent
