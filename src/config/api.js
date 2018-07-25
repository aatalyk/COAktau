import { database } from './firebase';

export const fetch = () => {
  return new Promise((resolve, reject) => {
    const refer = database.ref('coaktau');
    refer.on(
      'value',
      (snapshot) => {
        const items = [];
        snapshot.forEach((child) => {
          const item = child.val();
          items.push({
            title: item.title,
            description: item.description,
          });
        });
        resolve(items);
      },
      (error) => {
        reject(error);
      },
    );
  });
};
