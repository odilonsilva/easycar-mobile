import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { createContext, useEffect } from "react";
import translations from "../constants/translations";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const i18n = new I18n(translations);

  useEffect(() => {
    i18n.locale = getLocales()[0].languageCode;
    console.log(`languageCode`, i18n.locale);
  }, []);

  function textLocalized(text) {
    return i18n.t(text);
  }

  return (
    <LanguageContext.Provider value={{ textLocalized }}>
      {children}
    </LanguageContext.Provider>
  );
}
