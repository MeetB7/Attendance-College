import React from 'react'
import AttendanceTable from './AttendanceTable'
import jsonData from '../public/output.json';import ImageUpload from './components/ImageUpload'

const App = () => {
  return (
   <>
     <AttendanceTable data={jsonData} />
   </>
  )
}

export default App