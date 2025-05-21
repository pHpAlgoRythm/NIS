import React, {useEffect} from 'react'
import NavBar from '../components/dashboard/NavBar'
import LargerScreen from '../components/dashboard/LargerScreen'

const DashBoard = () => {

useEffect(() => {
    if (!window.hasSpoken) {
      const name = localStorage.getItem('name') || '';
      const textToSpeak = "Welcome " + name;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      window.speechSynthesis.speak(utterance);
      window.hasSpoken = true; 
    }
  }, []);



  return (
    <div className=''>
        <nav>
            <NavBar/>
        </nav>

        <main className='mt-[150px]'>
          <LargerScreen/>
        </main>
    </div>
  )
}

export default DashBoard
