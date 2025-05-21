import React from 'react';
import { Button } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const FullPatientDetails = ({ patient }) => {
  const VitalSigns = JSON.parse(patient.vitalSigns);
  const diagnosis = JSON.parse(patient.diagnosis);
  const procedures = JSON.parse(patient.procedures);
  const labTest = JSON.parse(patient.laboratoryTest);
  const diet = JSON.parse(patient.diet);
  const docOrder = JSON.parse(patient.doctorOrders);

  const formatList = (data) => {
  // returns JSX li elements as you have it — good for display
  // your existing implementation is fine
  const result = [];
  let current = '';
  let insideParentheses = false;

  for (let i = 0; i < data.length; i++) {
    const char = data[i];

    if (char === '(') {
      insideParentheses = true;
    } else if (char === ')') {
      insideParentheses = false;
    }

    if (char === '.' && !insideParentheses) {
      if (current.trim()) {
        result.push(current.trim() + '.');
      }
      current = '';
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    result.push(current.trim());
  }

  return result.map((item, idx) => <li key={idx}>{item}</li>);
};

const formatListForSpeech = (data) => {
  // returns array of strings — good for speech synthesis
  const result = [];
  let current = '';
  let insideParentheses = false;

  for (let i = 0; i < data.length; i++) {
    const char = data[i];

    if (char === '(') {
      insideParentheses = true;
    } else if (char === ')') {
      insideParentheses = false;
    }

    if (char === '.' && !insideParentheses) {
      if (current.trim()) {
        result.push(current.trim() + '.');
      }
      current = '';
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    result.push(current.trim());
  }

  return result; // just return array of strings
};

  
const read = () => {
  const VitalSigns = patient.vitalSigns ? JSON.parse(patient.vitalSigns) : {};
  const diagnosis = patient.diagnosis ? JSON.parse(patient.diagnosis) : { primary: '', secondary: '' };
  const medications = patient.medication ? formatListForSpeech(JSON.parse(patient.medication)) : [];
  const procedures = patient.procedures ? formatListForSpeech(JSON.parse(patient.procedures)) : [];
  const labTests = patient.laboratoryTest ? formatListForSpeech(JSON.parse(patient.laboratoryTest)) : [];
  const diet = patient.diet ? formatListForSpeech(JSON.parse(patient.diet)) : [];
  const doctorOrders = patient.doctorOrders ? formatListForSpeech(JSON.parse(patient.doctorOrders)) : [];
  const allergies = patient.allergies ? JSON.parse(patient.allergies) : 'No allergies reported';
  const pastMedicalHistories = patient.pastMedicalHistory ? formatListForSpeech(JSON.parse(patient.pastMedicalHistory)) : [];
  const pastMedication = patient.passMedication ? formatListForSpeech(JSON.parse(patient.passMedication)) : [];
  const socialHistories = patient.socialHistory ?  formatListForSpeech(JSON.parse(patient.socialHistory)) : [];
  const musculoskeletalAssessments = patient.musculoskeletalAssessment ? formatListForSpeech(JSON.parse(patient.musculoskeletalAssessment)) : [];

  const arrayToSpeech = (arr, label) => {
    if (!Array.isArray(arr) || arr.length === 0) return `${label} are not available.`;
    return `${label}: ${arr.join(', ')}.`; // arr is array of strings here
  };

  const medicalRecordSpaced = String(patient.medicalRecordNumber).split('').join(' ');

  const textToSpeak = `
    Patient Information. A Musculoskeletal Case.
    Name: ${patient.name}.
    Age: ${patient.age} years.
    Gender: ${patient.gender}.
    Date of Admission: ${new Date(patient.dateOfAdmission).toLocaleDateString('en-US')}.
    Time of Admission: ${new Date(`1970-01-01T${patient.timeOfAdmission}Z`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}.
    Medical Record Number: ${medicalRecordSpaced}.
    Allergies: ${allergies}.
    Primary Language: ${patient.primaryLanguage}.
    Chief Complaint: ${patient.chiefComplaint}.
    ${arrayToSpeech(pastMedicalHistories, 'Past Medical History')}
    ${arrayToSpeech(pastMedication, 'Medications')}
    ${arrayToSpeech(socialHistories, 'Social History')}
    Vital Signs: Temperature ${VitalSigns.temperature || 'N/A'} degrees Fahrenheit, Pulse ${VitalSigns.pulse || 'N/A'} beats per minute, Respiratory Rate ${VitalSigns.respiratoryRate || 'N/A'} breaths per minute, Blood Pressure ${VitalSigns.bloodPressure ? VitalSigns.bloodPressure.replace('/', 'over') : 'N/A'} millimeters of mercury.
    General Appearance: ${patient.generalAppearance}.
    ${arrayToSpeech(musculoskeletalAssessments, 'Musculoskeletal Assessments') }
    Primary Diagnosis: ${diagnosis.primary}.
    Secondary Diagnosis: ${diagnosis.secondary}.
    ${arrayToSpeech(medications, 'Medications')}
    ${arrayToSpeech(procedures, 'Procedures')}
    ${arrayToSpeech(labTests, 'Laboratory and Diagnostic Tests')}
    ${arrayToSpeech(diet, 'Diet')}
    ${arrayToSpeech(doctorOrders, "Doctor's Orders")}
  `;

  const utterance = new SpeechSynthesisUtterance(textToSpeak.trim());
  utterance.rate = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};



return (


    <div className="bg-white p-10 shadow-lg rounded max-w-4xl mx-auto print:p-0 print:shadow-none print:bg-white text-[16px] leading-relaxed print:text-black">
      <div className='w-full flex justify-end  gap-10 print:hidden '>
        <Button 
          variant="contained"
          color="primary"
          startIcon={<PrintIcon />}
          onClick={() => window.print()} className=" text-white px-4 py-2 rounded cursor-pointer">
          Print
        </Button>

        <Button 
          variant="contained"
          color="primary"
          startIcon={<VolumeUpIcon />}
          onClick={read}
          className="text-white px-4 py-2 rounded cursor-pointer">
            Read
        </Button>

      </div>

      <br />
      <br />
      <br />

      <h1 className="text-3xl font-bold mb-6 text-center">
        Patient Information a Musculoskeletal Case
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 underline">Patient Data</h2>
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Age:</strong> {patient.age} years</p>
        <p><strong>Gender:</strong> {patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1).toLowerCase()}</p>
        <p><strong>Date of Admission:</strong> {new Date(patient.dateOfAdmission).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        <p><strong>Time of Admission:</strong> {new Date(`1970-01-01T${patient.timeOfAdmission}Z`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} CST</p>
        <p><strong>Medical Record Number:</strong> {patient.medicalRecordNumber}</p>
        <p><strong>Allergies:</strong> {JSON.parse(patient.allergies)}</p>
        <p><strong>Primary Language:</strong> {patient.primaryLanguage}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 underline">Patient History</h2>
        <p><strong>Chief Complaint:</strong> {patient.chiefComplaint}</p>
        <p><strong>Past Medical History:</strong></p>
        <ul className="list-disc list-inside">{formatList(JSON.parse(patient.pastMedicalHistory))}</ul>
        <p><strong>Medications:</strong></p>
        <ul className="list-disc list-inside">{formatList(JSON.parse(patient.passMedication))}</ul>
        <p><strong>Social History:</strong></p>
        <ul className="list-disc list-inside">{formatList(JSON.parse(patient.socialHistory))}</ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 underline">Assessment</h2>
        <p><strong>Vital Signs:</strong></p>
        <ul className="list-disc list-inside ml-4">
          <li>Temperature: {VitalSigns.temperature}°F</li>
          <li>Pulse: {VitalSigns.pulse.trim()} bpm</li>
          <li>Respiratory Rate: {VitalSigns.respiratoryRate.trim()} breaths/min</li>
          <li>Blood Pressure: {VitalSigns.bloodPressure.replace('\\/', '/')} mmHg</li>
        </ul>
        <p><strong>General Appearance:</strong> {patient.generalAppearance}</p>
        <p><strong>Musculoskeletal Assessment:</strong></p>
        <ul className="list-disc list-inside">{formatList(JSON.parse(patient.musculoskeletalAssessment))}</ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 underline">Diagnosis</h2>
        <p><strong>Primary Diagnosis:</strong> {diagnosis.primary}</p>
        <p><strong>Secondary Diagnosis:</strong> {diagnosis.secondary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 underline">Medications</h2>
        <ul className="list-disc list-inside">{formatList(JSON.parse(patient.medication))}</ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 underline">Procedures</h2>
        <ul className="list-disc list-inside">{formatList(procedures)}</ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 underline">Laboratory/Diagnostic Tests</h2>
        <ul className="list-disc list-inside">{formatList(labTest)}</ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 underline">Diet</h2>
        <ul className="list-disc list-inside">{formatList(diet)}</ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 underline">Doctor's Orders</h2>
        <ul className="list-disc list-inside">{formatList(docOrder)}</ul>
      </section>
    </div>
  );
};

export default FullPatientDetails;
