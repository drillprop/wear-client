const formatDBDate = (date: string) =>
  date.replace('T', ' ').split('').splice(0, 19).join('');

export default formatDBDate;
