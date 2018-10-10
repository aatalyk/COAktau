import { faqLogic } from './faqLogic';
import { newsLogic } from './newsLogic';
import { servicesLogic } from './servicesLogic';
import { notifsLogic } from './notifsLogic';
import { aboutLogic } from './aboutLogic';
import { calcLogic } from './calcLogic';

export const logicArr = [...faqLogic, ...newsLogic, ...notifsLogic, ...servicesLogic, ...aboutLogic, ...calcLogic];
