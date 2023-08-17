import React, { useEffect, useState } from 'react';
import { Text } from 'components/Texts';
import {
  Html5Qrcode,
  Html5QrcodeScanner,
  Html5QrcodeSupportedFormats,
} from 'html5-qrcode';

function ReadQR() {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'reader',
      {
        qrbox: {
          width: 250,
          height: 350,
        },
        fps: 5,
        rememberLastUsedCamera: true,
        supportedScanTypes: [0],
        showTorchButtonIfSupported: false,
      },
      false
    );

    let isScanning = true;

    const config = {
      facingMode: { exact: 'user' },
    };

    scanner.render(success, error);

    setTimeout(function time() {
      scanner.applyVideoConstraints(config);
      console.log('as');
    }, 2000);

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
    /*
    const html5QrCode = new Html5Qrcode('reader', {
      verbose: false,
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
    });
    const qrCodeSuccessCallback = (decodedText: any, decodedResult: any) => {
      setScanResult(decodedResult);
      console.log('readed');
    };

    function error(err: any) {
      console.warn(err);
    }

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    html5QrCode.start(
      { facingMode: 'user' },
      config,
      qrCodeSuccessCallback,
      error
    );
*/
  }, []);

  return (
    <div>
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
