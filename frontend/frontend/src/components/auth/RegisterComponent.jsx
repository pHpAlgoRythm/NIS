import React, { useState } from 'react'
import RegisterApi from '../../api/RegisterApi'

const RegisterComponent = () => {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        RegisterApi(name, email, password)
    }

  return (
  
    <div className='flex flex-col pt-12 gap-4'>

        <div className='w-full border-b-2 border-black md:w-[250px] lg:w-full'>

            <input type="text" placeholder='Name' className="border-0 outline-0 p-1" 
                value={name} onChange={(e) => setName(e.target.value)}
            />

        </div>


        <div className='w-full border-b-2 border-black md:w-[250px] lg:w-full'>

            <input type="text" placeholder='Email' className="border-0 outline-0 p-1" 
                value={email} onChange={(e) => setEmail(e.target.value)}
            />

        </div>


        <div className='w-full border-b-2 border-black md:w-[250px] lg:w-full'>

            <input type="password" placeholder='Password' className="border-0 outline-0 p-1" 
                value={password} onChange={(e) => setPassword(e.target.value)}
            />

        </div>
     
        <button className='bg-[#4E5672] text-white h-[35px] rounded-sm' onClick={handleSubmit}>Register</button>

    </div>

  )
}

export default RegisterComponent
