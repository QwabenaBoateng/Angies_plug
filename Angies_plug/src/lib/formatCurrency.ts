export function formatCurrencyGHS(amountInGhs: number): string {
	const formatter = new Intl.NumberFormat('en-GH', {
		style: 'currency',
		currency: 'GHS',
		currencyDisplay: 'symbol',
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	});
	return formatter.format(amountInGhs);
}


