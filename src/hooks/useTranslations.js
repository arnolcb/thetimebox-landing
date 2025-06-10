import { useState } from 'react';
import translations from '../data/translations.json';

export const useTranslations = () => {
  const [language, setLanguage] = useState('en');
  
  return {
    language,
    setLanguage,
    t: translations[language]
  };
};