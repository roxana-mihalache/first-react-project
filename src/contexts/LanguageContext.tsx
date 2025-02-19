import { createContext, useState, useContext, PropsWithChildren } from 'react';
import { Language } from '../assets/translations/messages';
import { IntlProvider } from 'react-intl';
import enMessages from '../assets/translations/en.json';
import roMessages from '../assets/translations/ro.json';


const messages = { en: enMessages, ro: roMessages };

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const defaultState: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
};

const LanguageContext = createContext<LanguageContextType>(defaultState);

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <IntlProvider locale={language} messages={messages[language]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider >
  );
};