export const calculate = (revenue, numberOfPeople, povertyMin, livingCost) => {
	const monthlyRevenue = revenue / 3;
	const revenuePerPerson = monthlyRevenue / numberOfPeople;
	const result = Math.floor(Math.abs(revenuePerPerson - povertyMin) * numberOfPeople);
	const year = new Date().getFullYear();
	return { result, revenuePerPerson, povertyMin, livingCost, year };
};
