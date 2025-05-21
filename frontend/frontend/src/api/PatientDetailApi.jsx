import React from 'react'
import axios from './axios'

const PatientDetailApi = async () => {
 try {
    const response = await axios.get('/getAllPatients');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default PatientDetailApi
