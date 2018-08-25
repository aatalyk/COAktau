export const calculate = (amount, numberOfPeople) => {
	const result = Math.abs(Math.floor((amount / 3 / numberOfPeople - 15531) * 7));
	return result;
};
