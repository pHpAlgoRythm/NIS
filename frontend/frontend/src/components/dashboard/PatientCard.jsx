import React from 'react'

const PatientCard = ({ name, age, recordNumber, onShowMore }) => {
  return (
    <div className='bg-stone-100 shadow-2xl h-[170px] flex flex-col gap-4 rounded-lg pt-4 pl-2'>
        <h2>Name: {name}</h2>
        <h2>Age: {age}</h2>
        <h2>Record Number: {recordNumber}</h2>
        <button 
          className='bg-blue-200 w-1/3 ml-auto mr-2 rounded cursor-pointer'
          onClick={onShowMore}
        >
          Show More
        </button>
    </div>
  )
}

export default PatientCard
