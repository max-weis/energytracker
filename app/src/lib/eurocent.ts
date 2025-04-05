export const formatEuroCents = (euroCents: number): string => {
  const euros = euroCents / 100;

  const formattedNumber = euros.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${formattedNumber} €`;
}
