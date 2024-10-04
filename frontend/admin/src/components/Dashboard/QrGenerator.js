// src/components/Dashboard/QrGenerator.js
import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './QrGenerator.css'; // Importing the CSS file

const QrGenerator = () => {
  const [inputValue, setInputValue] = useState('');
  const [qrValue, setQrValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleGenerate = () => {
    setQrValue(inputValue);
  };

  return (
    <div className="qr-generator">
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Paste QR Code here."
      />
      <br />
      <button onClick={handleGenerate}>
        Generate QR Code
      </button>
      <div className="qr-code">
        {qrValue && <QRCodeSVG value={qrValue} size={256} />}
      </div>
    </div>
  );
};

export default QrGenerator;
