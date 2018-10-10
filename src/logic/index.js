import { faqLogic } from './faqLogic';
import { newsLogic } from './newsLogic';
import { servicesLogic } from './servicesLogic';
import { notifsLogic } from './notifsLogic';
import { aboutLogic } from './aboutLogic';
import { calcLogic } from './calcLogic';
import { chatRoomsLogic } from './chatRoomsLogic';
import { myCityLogic } from './myCityLogic';
import { contactLogic } from './contactLogic';

export const logicArr = [
	...faqLogic,
	...newsLogic,
	...notifsLogic,
	...servicesLogic,
	...aboutLogic,
	...calcLogic,
	...chatRoomsLogic,
	...myCityLogic,
	...contactLogic
];
