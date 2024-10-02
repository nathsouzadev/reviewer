export const expirationDate = (): string => {
  const currentDate = new Date();
  const futureDate = new Date(
    currentDate.getFullYear() + 5,
    currentDate.getMonth(),
  );
  const formattedDate = `${(futureDate.getMonth() + 1).toString().padStart(2, '0')}/${futureDate.getFullYear().toString().slice(-2)}`;
  return formattedDate;
};
