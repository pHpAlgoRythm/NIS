import React, { useEffect, useState } from 'react'
import AddNewPatient from './AddNewPatient'
import PatientCard from './PatientCard'
import FullPatientDetails from './FUllPatientDetails'
import PatientDetailApi from '../../api/PatientDetailApi'

const LargerScreen = () => {
  const [showAddPatient, setShowAddPatient] = useState(false)
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)

  const handleToggle = () => {
    setShowAddPatient(prev => !prev)
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      const data = await PatientDetailApi()
      console.log('API response:', data)
      setPatients(data.patientsData)
    } catch (error) {
      console.error('Failed to fetch patients:', error)
    }
  }

  const handleShowMore = (patient) => {
    setSelectedPatient(patient)
  }

  return (
    <div className='flex w-full h-screen overflow-hidden'>
      <aside className='shadow-2xl w-1/4 h-full overflow-y-auto'>
        <div className="p-4 w-full flex flex-col gap-4" style={{ height: '1500px' }}>
          <button 
            className="mb-4 sticky top-0 bg-green-500 h-[40px] z-10 cursor-pointer" 
            onClick={handleToggle}
          >
            + Add New Patient
          </button>

          {patients.map((patient, index) => (
            <PatientCard
              key={index}
              name={patient.name}
              age={patient.age}
              recordNumber={patient.medicalRecordNumber}
              onShowMore={() => handleShowMore(patient)}
            />
          ))}
        </div>
      </aside>

      <section className='w-3/4 h-screen overflow-y-auto'>
        <div className="print-section p-8" style={{ height: '1500px' }}>
          {showAddPatient && <AddNewPatient />}
          {selectedPatient && <FullPatientDetails patient={selectedPatient} />}
        </div>
      </section>
    </div>
  )
}

export default LargerScreen
