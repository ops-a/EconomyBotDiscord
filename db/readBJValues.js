const readBJValues = async (id) => {
    const row = await db.one("select * from blackjack where int_id=$1", id);

    console.log("Blackjack row: ", row);
    return row;
}

module.exports = readBJValues;