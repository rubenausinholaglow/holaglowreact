import React, { useEffect, useState } from 'react';
import { Professional, ProfessionalType } from '@interface/clinic';
import clinicService from '@services/ClinicService';
import { ERROR_FETCHING_PROFESSIONALS } from '@utils/textConstants';

export const ClinicProfessional = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [selectedProfessional, setSelectedProfessional] =
    useState<Professional | null>(null);
  const [showProfessionalList, setShowProfessionalList] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const clinicId = 'A1C0941E-5DC2-4433-9B03-2E5A9857F2C5';
        const professionalType = ProfessionalType.Medical;
        const professionalsData = await clinicService.getProfessionalsByClinic(
          clinicId,
          professionalType
        );
        if (typeof professionalsData === 'string') {
          setError(professionalsData);
        } else {
          setProfessionals(professionalsData);
        }
      } catch (error) {
        setError(ERROR_FETCHING_PROFESSIONALS + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  const handleProfessionalClick = (professional: Professional) => {
    if (selectedProfessional?.name === professional.name) {
      setShowProfessionalList(prevState => !prevState);
    } else {
      setSelectedProfessional(professional);
      setShowProfessionalList(true);
    }
  };

  const handleToggleProfessionalList = () => {
    setShowProfessionalList(prevState => !prevState);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        {professionals.map(professional => (
          <div
            key={professional.name}
            onClick={() => handleProfessionalClick(professional)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#ccc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '10px',
              cursor: 'pointer',
            }}
          >
            {showProfessionalList ? (
              <p style={{ margin: 0, fontWeight: 'bold' }}>
                {professional.name}
              </p>
            ) : (
              <p style={{ margin: 0, fontWeight: 'bold' }}>
                {professional.name.slice(0, 2)}
              </p>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleToggleProfessionalList}>
        {showProfessionalList}
      </button>
    </div>
  );
};
