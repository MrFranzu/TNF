import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { db } from '../../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const QrScanner = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const [lastScannedData, setLastScannedData] = useState('');
  const [notificationShown, setNotificationShown] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsScanning(false);
    }, 30000); // Stop scanning after 30 seconds

    return () => clearTimeout(timeout);
  }, []);

  const handleResult = async (result, error) => {
    if (error) {
      console.error("Error scanning QR code:", error);
      setError("Error scanning QR code. Please try again.");
      return;
    }

    if (!result) {
      console.log("No QR code detected");
      return;
    }

    const scannedData = result.text.trim();

    // Prevent further processing if loading or the same QR code was scanned
    if (loading || scannedData === lastScannedData) {
      console.warn("Duplicate scan ignored:", scannedData);
      return;
    }

    setLastScannedData(scannedData);
    setResult(scannedData);
    setLoading(true);
    setError('');
    setNotificationShown(false); // Reset notification flag

    const eventRef = doc(db, 'bookings', scannedData);

    try {
      const currentData = await getDoc(eventRef);
      if (currentData.exists()) {
        const scannedCount = currentData.data().scannedCount || 0;

        if (!notificationShown) {
          const confirmScan = window.confirm(`Document exists. Current scan count is ${scannedCount}. Do you want to increment the count?`);
          if (confirmScan) {
            await setDoc(eventRef, { scannedCount: scannedCount + 1 }, { merge: true });
            alert(`Successfully scanned! New count: ${scannedCount + 1}`);
          }
          setNotificationShown(true); // Mark notification as shown
        }
      } else {
        await setDoc(eventRef, { scannedCount: 1 });
        if (!notificationShown) {
          alert("Document did not exist. It has been created with a scanned count of 1.");
          setNotificationShown(true); // Mark notification as shown
        }
        setError("Document did not exist and has been created.");
      }
    } catch (err) {
      console.error("Error accessing Firestore:", err);
      setError("An error occurred while processing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error) => {
    console.error("QrReader Error:", error);
    setError("Unable to access camera. Please check permissions.");
  };

  return (
    <div className="qr-scanner">
      <h2>QR Code Scanner</h2>
      {isScanning && (
        <QrReader
          onResult={handleResult}
          onError={handleError}
          facingMode="environment"
          className="qr-reader"
        />
      )}
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {result && !error && (
        <div>
          <p className="result">Scanned QR Code: {result}</p>
        </div>
      )}
    </div>
  );
};

export default QrScanner;
