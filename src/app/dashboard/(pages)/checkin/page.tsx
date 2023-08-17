'use client';
import React, { useState } from 'react';
import { Button } from 'components/Buttons/Buttons';
import { Flex } from 'components/Layouts/Layouts';
import { Text, Title } from 'components/Texts';
import CheckHydration from 'utils/CheckHydration';

import ReadQr from './ReadQr';
import useFormHook from './useFormHook';

export default function Page() {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const { formData, errors, handleInputChange, handleSubmit } = useFormHook();

  const handleScan = (data: string | null) => {
    if (data) {
      setQrCode(data);
      setIsScanning(false);
    }
  };

  const handleError = (error: any) => {
    console.error(error);
  };

  const startScan = () => {
    setIsScanning(true);
  };

  return (
    <CheckHydration>
      <Flex layout="col-center" className="w-full">
        <Title size="2xl" className="text-left mb-4">
          Bienvenid@ a Holaglow!
        </Title>
        <Text>¡Escanea el QR que te hemos enviado!</Text>
        {isScanning ? (
          <>
            <ReadQr />
          </>
        ) : (
          <>
            <Button
              size="sm"
              style="primary"
              type="button"
              onClick={startScan}
              className="px-4 mt-auto"
            >
              Escanear QR
            </Button>
            {qrCode && (
              <div>
                <p>QR Code: {qrCode}</p>
              </div>
            )}
          </>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Correo Electrónico:</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => handleInputChange('email', e.target.value)}
            />
            {errors.email && (
              <span style={{ color: 'red' }}>{errors.email}</span>
            )}
          </div>
          <div>
            <label>Teléfono:</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => handleInputChange('phone', e.target.value)}
            />
            {errors.phone && (
              <span style={{ color: 'red' }}>{errors.phone}</span>
            )}
          </div>
          <button type="submit">Checkin</button>
        </form>
      </Flex>
    </CheckHydration>
  );
}
