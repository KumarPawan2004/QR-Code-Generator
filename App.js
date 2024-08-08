// import React, { useState } from 'react';
// import './QR.css';

// function QRCodeGenerator() {
//   // State to manage the input text and QR code image URL
//   const [text, setText] = useState('');
//   const [qrImageUrl, setQrImageUrl] = useState('');

//   // Function to handle the QR code generation
//   const generateQR = () => {
//     if (text.length > 0) {
//       // Generate the QR code URL with the input text
//       setQrImageUrl(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`);
//     } else {
//       // If input is empty, briefly show an error animation
//       const inputElement = document.getElementById('qrText');
//       inputElement.classList.add('error');
//       setTimeout(() => {
//         inputElement.classList.remove('error');
//       }, 1000);
//     }
//   };

//   return (
//     <div className="container">
//       <p>Enter Your Text or URL</p>
//       <input
//         type="text"
//         placeholder="Text or URL"
//         id="qrText"
//         value={text}
//         onChange={(e) => setText(e.target.value)} // Update the text state on input change
//       />
//       <div id="imgBox" className={qrImageUrl ? 'show-img' : ''}>
//         {qrImageUrl && <img src={qrImageUrl} alt="QR Code" id="qrImage" />}
//       </div>
//       <button onClick={generateQR}>Generate QR</button>
//     </div>
//   );
// }

// export default QRCodeGenerator;

// AXIOMS USED

import React, { useState } from 'react';
import axios from 'axios';
import './QR.css';

function QRCodeGenerator() {
  // State to manage the input text and QR code image URL
  const [text, setText] = useState('');
  const [qrImageUrl, setQrImageUrl] = useState('');
  const [error, setError] = useState(false);

  // Function to handle the QR code generation
  const generateQR = async () => {
    if (text.length > 0) {
      try {
        // Make the API request to fetch the QR code image URL
        const response = await axios.get(`https://api.qrserver.com/v1/create-qr-code/`, {
          params: {
            size: '150x150',
            data: text
          },
          responseType: 'blob' // Expecting a blob response to handle image data
        });

        // Create a URL for the blob response
        const url = URL.createObjectURL(response.data);
        setQrImageUrl(url);
        setError(false); // Clear any previous error state
      } catch (error) {
        console.error("Error generating QR code:", error);
        setError(true);
      }
    } else {
      // If input is empty, briefly show an error animation
      setError(true);
      const inputElement = document.getElementById('qrText');
      inputElement.classList.add('error');
      setTimeout(() => {
        inputElement.classList.remove('error');
      }, 1000);
    }
  };

  return (
    <div className="container">
      <p>Enter Your Text or URL</p>
      <input
        type="text"
        placeholder="Text or URL"
        id="qrText"
        value={text}
        onChange={(e) => setText(e.target.value)} // Update the text state on input change
      />
      <div id="imgBox" className={qrImageUrl ? 'show-img' : ''}>
        {qrImageUrl && <img src={qrImageUrl} alt="QR Code" id="qrImage" />}
      </div>
      <button onClick={generateQR}>Generate QR</button>
      {error && <p className="error-message">Please enter some text or URL.</p>}
    </div>
  );
}

export default QRCodeGenerator;
