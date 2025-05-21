import React, { useState } from 'react';
import AddNewPatientApi from '../../api/AddNewPatientApi';

const AddNewPatient = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    dateOfAdmission: '',
    timeOfAdmission: '',
    medicalRecordNumber: '',
    allergies: '',
    primaryLanguage: '',
    chiefComplaint: '',
    pastMedicalHistory: '',
    passMedication: '',
    socialHistory: '',
    vitalSigns: {
      temperature: '',
      pulse: '',
      respiratoryRate: '',
      bloodPressure: '',
    },
    generalAppearance: '',
    musculoskeletalAssessment: '',
    diagnosis: {
      primary: '',
      secondary: ''
    },
    medication: '',
    procedures: '',
    laboratoryTest: '',
    diet: '',
    doctorOrders: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

  
    if (name.includes('vitalSigns.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        vitalSigns: {
          ...prev.vitalSigns,
          [key]: value
        }
      }));
    } else if (name.includes('diagnosis.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        diagnosis: {
          ...prev.diagnosis,
          [key]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AddNewPatientApi(formData)
      .then(response => {
        console.log('Patient added successfully', response);
      })
      .catch(error => {
        console.error('Failed to add patient', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className='w-[90%] shadow-2xl flex flex-col items-center gap-10'>

      {/* --- PATIENT DATA --- */}
      <fieldset className='border w-[80%] pl-10 pt-6'>
        <legend className='font-bold'>PATIENT DATA</legend>
        <div className='w-[95%]  grid grid-cols-2 gap-8 '>
          <div className="flex items-center gap-2 w-[250px] ">
            <label>Name:</label>
            <input name="name" value={formData.name} onChange={handleChange} type="text" className='border-b-2 border-black outline-none w-full py-1' />
          </div>
          <div className="flex items-center gap-2  w-[250px]">
            <label>Age:</label>
            <input name="age" value={formData.age} onChange={handleChange} type="text" className='border-b-2 border-black outline-none w-[50px] py-1' />
          </div>
          <div className='flex items-center gap-6 border-b-2 border-black outline-none w-full py-1'>
            <h2>Gender:</h2>
            <label className='flex items-center gap-1'>
              <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Male
            </label>
            <label className='flex items-center gap-1'>
              <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Female
            </label>
          </div>
          <div className="flex items-center gap-2  w-[250px]">
            <label>Date of Admission:</label>
            <input name="dateOfAdmission" value={formData.dateOfAdmission} onChange={handleChange} type="date" className='border-b-2 border-black outline-none w-full py-1' />
          </div>
          <div className="flex items-center gap-2  w-[250px]">
            <label>Time of Admission:</label>
            <input name="timeOfAdmission" value={formData.timeOfAdmission} onChange={handleChange} type="time" className='border-b-2 border-black outline-none w-full py-1' />
          </div>
          <div className="flex items-center w-[250px]">
            <label>Medical Record:</label>
            <input name="medicalRecordNumber" value={formData.medicalRecord} onChange={handleChange} type="text" className='border-b-2 border-black outline-none w-full pt-10' />
          </div>
          <div className="flex items-center gap-2 w-[250px]">
            <label>Allergies:</label>
            <input name="allergies" value={formData.allergies} onChange={handleChange} type="text" className='border-b-2 border-black outline-none w-full py-1' />
          </div>
          <div className="flex items-center gap-2  w-[250px]">
            <label>Primary Language:</label>
            <input name="primaryLanguage" value={formData.primaryLanguage} onChange={handleChange} type="text" className='border-b-2 border-black outline-none w-full py-1' />
          </div>
        </div>
      </fieldset>

      {/* --- PATIENT HISTORY --- */}
      <fieldset className='border w-[80%] pl-10 pt-6'>
        <legend className='font-bold'>PATIENT HISTORY</legend>
        <div className='w-[95%]  grid grid-cols-2 gap-8 '>
          <div className="flex items-center gap-2 w-[250px] ">
            <label>Chief Complaint:</label>
            <input name="chiefComplaint" value={formData.chiefComplaint} onChange={handleChange} type="text" className='border-b-2 border-black outline-none w-full py-1' />
          </div>
          <div className="flex items-center gap-2 w-[250px] ">
            <label>Past Medical History:</label>
            <input name="pastMedicalHistory" value={formData.pastMedicalHistory} onChange={handleChange} type="text" className='border-b-2 border-black outline-none w-full py-1' />
          </div>
          <div className="flex items-center gap-2 w-[250px] ">
            <label>Medication:</label>
            <input name="passMedication" value={formData.passMedication} onChange={handleChange} type="text" className='border-b-2 border-black outline-none w-full py-1' />
          </div>
          <div className="flex items-center gap-2 w-[250px] ">
            <label>Social History:</label>
            <input name="socialHistory" value={formData.socialHistory} onChange={handleChange} type="text" className='border-b-2 border-black outline-none w-full py-1' />
          </div>
        </div>
      </fieldset>

      {/* --- ASSESSMENT --- */}
      <fieldset className="border w-[80%] pt-6">
        <legend className="font-bold">ASSESSMENT</legend>
        <table className="table-fixed border border-black w-full text-center">
          <thead>
            <tr>
              <th colSpan="4" className="border border-black italic text-lg py-2">Vital Signs</th>
            </tr>
            <tr>
              <th className="border border-black italic py-2">Temperature</th>
              <th className="border border-black italic">Pulse</th>
              <th className="border border-black italic">Respiratory Rate</th>
              <th className="border border-black italic">Blood Pressure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {['temperature', 'pulse', 'respiratoryRate', 'bloodPressure'].map((vital) => (
                <td key={vital} className="border border-black italic">
                  <input
                    type="text"
                    name={`vitalSigns.${vital}`}
                    value={formData.vitalSigns[vital]}
                    onChange={handleChange}
                    placeholder="Input Here"
                    className="w-full text-center italic"
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <br />
        <div className='flex flex-col gap-6'>
          <h2>Physical Examination: </h2>
          <div className='grid grid-cols-2 gap-8'>
            <div className="flex items-center gap-2 w-[250px] ">
              <label>General Appearance:</label>
              <input name="generalAppearance" value={formData.generalAppearance} onChange={handleChange} type="text" className='border-b-2 border-black outline-none w-full py-1' />
            </div>
            <div className="flex items-center gap-2 w-[250px] ">
              <label>Musculoskeletal Assessment:</label>
              <input name="musculoskeletalAssessment" value={formData.musculoskeletalAssessment} onChange={handleChange} type="text" className='border-b-2 border-black outline-none w-full py-1' />
            </div>
          </div>
        </div>
      </fieldset>

      {/* Additional sections (Diagnosis, Medications, etc.) follow same pattern */}
      {/* Example for diagnosis: */}
      <fieldset className="border w-[80%] pl-10 pt-6">
        <legend className="font-bold">DIAGNOSIS</legend>
        <div className="flex flex-col gap-4 w-[95%]">
          <input name="diagnosis.primary" value={formData.diagnosis.primary} onChange={handleChange} type="text" placeholder="Primary Diagnosis" className="border-b-2 border-black outline-none py-1 w-full" />
          <input name="diagnosis.secondary" value={formData.diagnosis.secondary} onChange={handleChange} type="text" placeholder="Secondary Diagnosis" className="border-b-2 border-black outline-none py-1 w-full" />
        </div>
      </fieldset>

      {['medication', 'procedures', 'laboratoryTest', 'diet', 'doctorOrders'].map(section => (
        <fieldset key={section} className="border w-[80%] pl-10 pt-6">
          <legend className="font-bold">{section.replace(/([A-Z])/g, ' $1').toUpperCase()}</legend>
          <div className="flex flex-col gap-4 w-[95%]">
            <input
              name={section}
              value={formData[section]}
              onChange={handleChange}
              type="text"
              placeholder="Please use comma for multiple inputs"
              className="border-b-2 border-black outline-none py-1 w-full"
            />
          </div>
        </fieldset>
      ))}

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10">
        Submit
      </button>
    </form>
  );
};

export default AddNewPatient;
