const db = require('./dbConnect')

const updateUserBalance = async (cashInHand, bankBalance, id) => {

    // Update balance here
    console.log('Update cash: ', cashInHand, ' update bank: ', bankBalance)
    await db.none('update users set cashinhand=$1, bankbalance=$2 where userid=$3', [cashInHand, bankBalance, id])

}

module.exports = updateUserBalance;