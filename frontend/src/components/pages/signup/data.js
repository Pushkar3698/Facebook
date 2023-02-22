const dates = new Array(31);

for (let i = 0; i < dates.length; i++) {
  dates[i] = i + 1;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = new Array(102);
let first = 1922;
for (let i = 0; i < years.length; i++) {
  years[i] = first;
  first++;
}

export const userData = {
  dates,
  months,
  years,
};
