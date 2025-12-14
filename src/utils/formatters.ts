export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const amountInWords = (amount: number): string => {
  if (amount === 0) return 'Zero Only';
  
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  const convertLessThanOneThousand = (n: number): string => {
    if (n === 0) return '';

    if (n < 10) return ones[n];

    if (n < 20) return teens[n - 10];

    if (n < 100) {
      return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
    }

    return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertLessThanOneThousand(n % 100) : '');
  };

  const convert = (n: number): string => {
    if (n === 0) return '';
    
    if (n >= 1000000000) {
      return convert(Math.floor(n / 1000000000)) + ' Billion ' + convert(n % 1000000000);
    }
    
    if (n >= 1000000) {
      return convert(Math.floor(n / 1000000)) + ' Million ' + convert(n % 1000000);
    }
    
    if (n >= 1000) {
      return convert(Math.floor(n / 1000)) + ' Thousand ' + convert(n % 1000);
    }

    return convertLessThanOneThousand(n);
  };

  const words = convert(amount).trim();
  return `BDT - ${words} Only`;
};
