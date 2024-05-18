import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { URLS } from "./lib/URLS.js";
import * as XLSX from 'xlsx';

const App = () => {
  const [exceldata, setExcelData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  // UPLOAD EXCEL AND SEND MAIL
  const handleSend = async () => {
    if (!exceldata.length) return;
    const formData = new FormData();
    formData.append("file", exceldata[0]);

    try {
      await axios.post(URLS.POSTMAIL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to upload file");
    }
  };

  useEffect(() => {
    if (exceldata.length > 0) {
      renderTable();
    }
  }, [exceldata]);

  const renderTable = () => {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            {Object.keys(exceldata[0]).map((key, index) => (
              <th key={index}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {exceldata.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container">
      <h1>Upload Excel and Send Mail</h1>
      <div className="button-container">
        <input
          type="file"
          id="excelUpload"
          accept=".xls,.xlsx"
          className="btn upload-btn"
          onChange={handleFileUpload}
        />
        <button onClick={handleSend} className="btn send-btn">
          Send Mail
        </button>
      </div>
      <div className="table">
        {exceldata.length > 0 && renderTable()}
      </div>
    </div>
  );
};

export default App;
