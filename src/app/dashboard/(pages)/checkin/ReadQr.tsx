import React, { useEffect, useState } from 'react';
import { Text } from 'components/Texts';
import { Html5QrcodeScanner } from 'html5-qrcode';

function ReadQR() {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'reader',
      {
        qrbox: {
          width: 850,
          height: 950,
        },
        fps: 5,
        rememberLastUsedCamera: true,
        supportedScanTypes: [0],
        showTorchButtonIfSupported: false,
      },
      false
    );

    let isScanning = true;

    scanner.render(success, error);

    function success(result: any) {
      if (isScanning) {
        //TODO - SEND CONFIRMATION
        scanner.clear();
        setScanResult(result);
        isScanning = false;
      }
    }

    function error(err: any) {
      console.warn(err);
    }
  }, []);

  return (
    <div className="App">
      {scanResult ? (
        <div>
          <Text>Código escaneado correctamente</Text>
        </div>
      ) : (
        <div>
          <div id="reader" className="width:600px"></div>
        </div>
      )}
    </div>
  );
}

export default ReadQR;
