import { database } from './firebase';

export const fetchFAQ = async callback => {
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
			callback(items, null);
		});
	} catch (error) {
		callback([], error);
	}
};
