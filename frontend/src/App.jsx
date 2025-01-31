import React from 'react'
import AttendanceTable from './AttendanceTable'
import jsonData from '../public/output.json';
const App = () => {
  return (
   <>
     <AttendanceTable data={jsonData} />
   </>
  )
}

export default App