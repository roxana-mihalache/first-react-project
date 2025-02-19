import enMessages from "./en.json";
import roMessages from "./ro.json";

type Messages = {
  [key: string]: string;
};

type LocaleMessages = {
  en: Messages;
  ro: Messages;
};

export const messages: LocaleMessages = {
  en: enMessages,
  ro: roMessages,
};

export type Language = keyof LocaleMessages;
