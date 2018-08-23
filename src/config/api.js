import { database } from './firebase';

export const fetch = path => {
	return new Promise((resolve, reject) => {
		const refer = database.ref(path);
		refer.on(
			'value',
			snapshot => {
				const items = [];
				snapshot.forEach(child => {
					const item = child.val();
					items.push(item);
				});
				resolve(items);
			},
			error => {
				reject(error);
			}
		);
	});
};
