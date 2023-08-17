import React, { useEffect, useState } from 'react';
import { Text } from 'components/Texts';
import {
  Html5Qrcode,
  Html5QrcodeScanner,
  Html5QrcodeSupportedFormats,
} from 'html5-qrcode';

function ReadQR() {
  const [scanResult, setScanResult] = useState(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null); // Specify the type explicitly

  useEffect(() => {
    const html5QrCode = new Html5Qrcode('qr-reader');
    //     verbose: false,
    //     formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
    //   });

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
  }, []);

  return (
    <div>
      {scanResult ? (
        <div>
          <Text>Código escaneado correctamente</Text>
        </div>
      ) : (
        <div>
          <div id="qr-reader" style={{ width: '600px' }}></div>
        </div>
      )}
    </div>
  );
}

export default ReadQR;
