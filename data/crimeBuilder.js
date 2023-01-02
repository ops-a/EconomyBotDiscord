const crimes = [
  {
    crime: "You have been caught jaywalking ",
    fine: 10,
  },
  {
    crime: "You have been caught smuggling drugs ",
    fine: 100,
  },
  {
    crime: "You have committed the crime of arson ",
    fine: 40,
  },
  {
    crime: "The police have caught you stealing a car ",
    fine: 30,
  },
  {
    crime: "You have been caught red handed in a bank robbery ",
    fine: 80,
  },
];

const randomCrime = () => {
  const randomInt = Math.floor(Math.random() * crimes.length);
  return crimes[randomInt];
};
module.exports = randomCrime;
