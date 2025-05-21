import React from 'react'
import SearchIcon from '@mui/icons-material/Search';


const NavBar = () => {
  return (
    <div className='bg-blue-200 w-full h-[100px] flex items-center justify-center gap-6 pl-2 md:h-[150px] md:gap-30 lg:gap-40 fixed top-0 left-0 z-50'> 

      <div className='flex items-center gap-2'>
        <img src="./src/assets/assets/icon.png" alt="Riverside Medical Center logo" className='w-[50px] md:w-[100px]' />
        <h2 className='hidden lg:block whitespace-nowrap font-bold'>RIVERSIDE MEDICAL CENTER, INC.</h2>
      </div>


      <div className='w-[200px] h-[40px] md:w-[300px] md:h-[50px] lg:w-[350px] border flex items-center bg-white rounded-3xl'>
        <input type="text" placeholder='Search Patient' className='w-[85%] h-[100%] rounded-3xl pl-2 outline-0'/>
        <SearchIcon/>
      </div>

      <div className='w-[50px] md:w-[60px] border border-white rounded-full'>
        <img src="./src/assets/assets/default-profile.png" alt="" className='w-full rounded-full'/>
      </div>

    </div>
  )
}

export default NavBar
