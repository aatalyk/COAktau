import { faqLogic } from './faqLogic';
import { newsLogic } from './newsLogic';
import { servicesLogic } from './servicesLogic';
import { notifsLogic } from './notifsLogic';
import { aboutLogic } from './aboutLogic';
import { calcLogic } from './calcLogic';
import { dictionaryLogic } from './dictionaryLogic';
import { myCityLogic } from './myCityLogic';
import { contactLogic } from './contactLogic';
import { taxiLogic } from './taxiLogic';

export const logicArr = [
	...faqLogic,
	...newsLogic,
	...notifsLogic,
	...servicesLogic,
	...aboutLogic,
	...calcLogic,
	...dictionaryLogic,
	...myCityLogic,
	...contactLogic,
	...taxiLogic
];
