import React, { useRef, useState } from "react";
import SendMail from "../lib/SendMail";
import * as XLSX from "xlsx";

const BulkMail = () => {
  const form = useRef();

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

      const fieldsToKeep = ["NAME", "EMAIL", "COLLEGE"];
      const recipientsArray = jsonData.map((obj) =>
        fieldsToKeep.reduce((newObj, field) => {
          if (obj.hasOwnProperty(field)) {
            newObj[field] = obj[field];
          }
          return newObj;
        }, {})
      );
      setExcelData(recipientsArray);
    };
    reader.readAsBinaryString(file);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!exceldata.length) return;

    const addField = {
      subject: document.getElementById("emailSubject").value,
      message: document.getElementById("emailContent").value,
    };
    // console.log(exceldata);

    const newRecipientsArray = exceldata.map((obj) => ({
      ...obj,
      ...addField,
    }));
    // console.log(newArray);

    // const templateParams = {
    //   to_email: document.getElementById("recipientEmail").value, // Assuming 'recipientEmail' is the ID of your recipient email input field
    //   subject: document.getElementById("emailSubject").value,
    //   message: document.getElementById("emailContent").value,
    // };

    const templateId = "template_is4uhr2";
    newRecipientsArray.forEach((recipient) => {
      SendMail(recipient, templateId);
    });
  };

  return (
    <div className="container mt-5">
      <form id="emailForm" className="row g-3" ref={form} onSubmit={handleSend}>
        <div className="col-md-6">
          <label htmlFor="recipientEmail" className="form-label">
            Recipient Email
          </label>
          <input
            type="file"
            id="excelUpload"
            accept=".xls,.xlsx"
            className="btn upload-btn"
            onChange={handleFileUpload}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="emailSubject" className="form-label">
            Email Subject
          </label>
          <input
            type="text"
            className="form-control"
            id="emailSubject"
            name="subject"
            placeholder="Email Subject"
            required
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="emailContent" className="form-label">
            Email Content
          </label>
          <textarea
            className="form-control"
            id="emailContent"
            name="text"
            placeholder="Email Content"
            required
          ></textarea>
        </div>
        <div className="col-md-12 text-end">
          <button type="submit" className="btn btn-primary">
            Send Email
          </button>
        </div>
      </form>
    </div>
  );
};

export default BulkMail;
