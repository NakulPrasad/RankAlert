import emailjs from '@emailjs/browser';

const SendMail = (formData, templateID) => {
    console.log(formData)
    
    emailjs.send('service_b0x48vf', templateID, formData, 'UViHgP6YAzcduBtRp')
     .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.error(error);
      });
}

export default SendMail