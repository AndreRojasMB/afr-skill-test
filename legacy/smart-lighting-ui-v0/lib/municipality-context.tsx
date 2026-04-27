'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Municipality {
  id: string;
  name: string;
  region: string;
}

const MUNICIPALITIES: Municipality[] = [
  { id: 'madrid-centro', name: 'Madrid Centro', region: 'Central' },
  { id: 'madrid-norte', name: 'Madrid Norte', region: 'North' },
  { id: 'madrid-sur', name: 'Madrid Sur', region: 'South' },
  { id: 'madrid-este', name: 'Madrid Este', region: 'East' },
  { id: 'madrid-oeste', name: 'Madrid Oeste', region: 'West' },
];

interface MunicipalityContextType {
  selectedMunicipality: Municipality;
  setSelectedMunicipality: (municipality: Municipality) => void;
  allMunicipalities: Municipality[];
}

const MunicipalityContext = createContext<MunicipalityContextType | undefined>(undefined);

export function MunicipalityProvider({ children }: { children: React.ReactNode }) {
  const [selectedMunicipality, setSelectedMunicipalityState] = useState<Municipality>(MUNICIPALITIES[0]);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('selectedMunicipality');
    if (saved) {
      const municipality = MUNICIPALITIES.find(m => m.id === saved);
      if (municipality) {
        setSelectedMunicipalityState(municipality);
      }
    }
  }, []);

  const setSelectedMunicipality = (municipality: Municipality) => {
    setSelectedMunicipalityState(municipality);
    localStorage.setItem('selectedMunicipality', municipality.id);
  };

  return (
    <MunicipalityContext.Provider
      value={{
        selectedMunicipality,
        setSelectedMunicipality,
        allMunicipalities: MUNICIPALITIES,
      }}
    >
      {children}
    </MunicipalityContext.Provider>
  );
}

export function useMunicipality() {
  const context = useContext(MunicipalityContext);
  if (context === undefined) {
    throw new Error('useMunicipality must be used within MunicipalityProvider');
  }
  return context;
}
