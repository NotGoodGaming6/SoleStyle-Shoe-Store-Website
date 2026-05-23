export const formatCurrency = (amount, settings) => {
  if (!settings) return `$${Number(amount).toLocaleString()}`;

  const { currency, exchangeRates } = settings;
  const rate = exchangeRates?.[currency] || 1;
  const convertedAmount = (Number(amount) * rate).toFixed(2);

  const symbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'AZN': '₼',
    'TRY': '₺'
  };

  const symbol = symbols[currency] || '';
  
  const formattedNumber = Number(convertedAmount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return `${symbol}${formattedNumber}`;
};

export const getCurrencySymbol = (currency) => {
  const symbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'AZN': '₼',
    'TRY': '₺'
  };
  return symbols[currency] || '$';
};
