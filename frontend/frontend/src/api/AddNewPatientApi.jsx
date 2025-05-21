import React from 'react'
import axios from './axios'

const AddNewPatientApi = async (data) => {
  try{
      const response = await axios.post('/createPatient', data)
  
      if(response.status === 200){
          
    alert('Patient Added Successfully');
    window.location.reload();
      }
   }catch(error){
            console.error('Error creating post:', error);
            throw error;
   }
}

export default AddNewPatientApi
