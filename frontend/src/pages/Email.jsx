import React, { useRef } from 'react';
import SendMail from '../lib/SendMail';

const Email = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      to_email: document.getElementById('recipientEmail').value, // Assuming 'recipientEmail' is the ID of your recipient email input field
      subject: document.getElementById('emailSubject').value,
      message: document.getElementById('emailContent').value,
    };

    const templateId = 'template_is4uhr2';

    SendMail(templateParams,templateId);

  };

  return (
    <div className="container mt-5">
      <form id="emailForm" className="row g-3" ref={form} onSubmit={sendEmail}>
        <div className="col-md-6">
          <label htmlFor="recipientEmail" className="form-label">Recipient Email</label>
          <input type="email" className="form-control" id="recipientEmail" name="to" placeholder="Recipient Email" required />
        </div>
        <div className="col-md-6">
          <label htmlFor="emailSubject" className="form-label">Email Subject</label>
          <input type="text" className="form-control" id="emailSubject" name="subject" placeholder="Email Subject" required />
        </div>
        <div className="col-md-12">
          <label htmlFor="emailContent" className="form-label">Email Content</label>
          <textarea className="form-control" id="emailContent" name="text" placeholder="Email Content" required></textarea>
        </div>
        <div className="col-md-12 text-end">
          <button type="submit" className="btn btn-primary">Send Email</button>
        </div>
      </form>
    </div>
  );
};

export default Email;
