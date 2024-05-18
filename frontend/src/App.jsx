import React from 'react'
import './App.css'

const App = () => {
  return (
    
      <div class="container">
        <h1>Upload Excel and Send Mail</h1>
        <div class="button-container">
            <form action="/upload" method="post" enctype="multipart/form-data">
                <input type="file" id="excelUpload" name="excelUpload" accept=".xls,.xlsx" class="btn upload-btn"/>
                <button type="submit" class="btn upload-btn">Upload Excel</button>
        </form>
            <button class="btn send-btn">Send Mail</button>
        </div>
    </div>
  
  )
}

export default App