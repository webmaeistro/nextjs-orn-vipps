import React, { useState, useContext } from 'react';

// A simple context for handling the current settings
export const SettingsContext = React.createContext({
  language: 'Nb',
  currency: 'NOK'
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({
  language: lang,
  currency: cur,
  children
}) => {
  const [language, setLanguage] = useState(lang);
  const [currency, setCurrency] = useState(cur);

  return (
    <SettingsContext.Provider
      value={{ language, setLanguage, currency, setCurrency }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
