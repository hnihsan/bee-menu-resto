const formatCurrency = (amount: string) => {
  let currency = parseFloat(amount);
  return currency.toFixed(2);
};

export default formatCurrency;
