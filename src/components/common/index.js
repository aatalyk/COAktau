export * from './IconButton';
export * from './SearchBar';
export * from './MessageScreen';
export * from './ScaledImage';

export function getFormattedDate(createdAt) {
	const date = new Date(createdAt);
	var year = date.getFullYear();

	var month = (1 + date.getMonth()).toString();
	month = month.length > 1 ? month : '0' + month;

	var day = date.getDate().toString();
	day = day.length > 1 ? day : '0' + day;

	return month + '/' + day + '/' + year;
}
