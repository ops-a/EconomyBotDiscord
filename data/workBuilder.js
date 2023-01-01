const works = [
    {
        job: 'You job as a farmer ',
        earn: 50,
    },
    {
        job: 'You job as a milkman ',
        earn: 30,
    },
    {
        job: 'You job as a make up artist ',
        earn: 80,
    },
    {
        job: 'Write an article on climate change ',
        earn: 60,
    },
    {
        job: 'Cook you meal ',
        earn: 20,
    },
    {
        job: 'Deliver a parcel ',
        earn: 100,
    },
    {
        job: 'Mow my lawn ',
        earn: 30,
    },
]

const randomWork = () => {
    const randomInt = Math.floor(Math.random() * works.length);
    return works[randomInt];
}

module.exports = randomWork;