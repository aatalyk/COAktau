import { combineReducers } from "redux";
import { faqReducer } from "./faqReducer";
import { settingsReducer } from "./settingsReducer";
import { newsReducer } from "./newsReducer";
import { notifsReducer } from "./notifsReducer";
import { servicesReducer } from "./servicesReducer";
import { aboutReducer } from "./aboutReducer";

export const rootReducer = combineReducers({
  faq: faqReducer,
  settings: settingsReducer,
  news: newsReducer,
  notifs: notifsReducer,
  services: servicesReducer,
  about: aboutReducer
});
