const db = require('./dbConnect')

const updateUserBalance = (cashInHand, bankBalance) => {

    // Update balance here
    console.log('Update cash: ', cashInHand, ' update bank: ', bankBalance)
}

module.exports = updateUserBalance;