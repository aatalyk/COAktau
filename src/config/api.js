import { database } from './firebase';

export const fetch = async () => {
	try {
		const ref = await database.ref().child('coaktau');
		ref.on('value', snapshot => {
			const items = [];
			snapshot.forEach(child => {
				const item = child.val();
				items.push({
					title: item.title,
					description: item.description
				});
			});
			return Promise.resolve(items);
		});
	} catch (error) {
		Promise.reject(error);
	}
};
