Date.prototype.addDays = addDays;

interface Date {
  addDays: typeof addDays;
}

function addDays(this: Date, days: number): Date {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
