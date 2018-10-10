import { createLogic } from 'redux-logic';

import { FETCH_MY_CITY_REQUESTED, fetchMyCitySucceeded, fetchMyCityFailed } from '../actions';

const url = 'http://soaktau.kz/api/v1.00/news';

const data = [
	{
		imageUrls: [
			'https://sportshub.cbsistatic.com/i/r/2018/09/13/358b7d4f-ad4c-434a-89e7-089c39bd7d96/thumbnail/770x433/333e34ee5754a4291d887656c1ad4f2e/gennady-golovkin-training-canelo.jpg',
			'https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/embed/public/2018/09/28/canelo-alvarez-gennady-golovkin.jpg'
		],
		image:
			'https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/embed/public/2018/09/28/canelo-alvarez-gennady-golovkin.jpg',
		title:
			'Not too bad. However, you’re not seeing the real benefits since its on WiFi. Lets see the same image loading on 3G.',
		body: 'Body ma ne mynau'
	},
	{
		imageUrls: [
			'https://sportshub.cbsistatic.com/i/r/2018/09/13/358b7d4f-ad4c-434a-89e7-089c39bd7d96/thumbnail/770x433/333e34ee5754a4291d887656c1ad4f2e/gennady-golovkin-training-canelo.jpg',
			'https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/embed/public/2018/09/28/canelo-alvarez-gennady-golovkin.jpg'
		],
		image:
			'https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/embed/public/2018/09/28/canelo-alvarez-gennady-golovkin.jpg',
		title: 'Title goi mynau',
		body: 'Body ma ne mynau'
	},
	{
		video:
			'https://firebasestorage.googleapis.com/v0/b/coaktau-274df.appspot.com/o/0hh1.mp4?alt=media&token=1f45206a-dee6-4f3e-b71b-cd500426556a',
		image:
			'https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/embed/public/2018/09/28/canelo-alvarez-gennady-golovkin.jpg',
		title: 'Title goi mynau',
		body: 'Body ma ne mynau'
	}
];

const fetchMyCityLogic = createLogic({
	type: FETCH_MY_CITY_REQUESTED,
	process: ({ getState }, dispatch, done) => {
		const { lang } = getState().settings;
		fetch(url)
			.then(response => response.json())
			.then(json => {
				const news = json[lang] ? json[lang] : [];
				dispatch(fetchMyCitySucceeded(data));
			})
			.catch(error => {
				dispatch(fetchMyCityFailed(error));
			})
			.then(() => done());
	}
});

export const myCityLogic = [fetchMyCityLogic];
