# Commands

## Database Modification Commands

1. **/connect** - Registers the user, if not registered already.
2. **/addmon <user> <amount>** - Adds money to an account from the supply. Only available to administrators.
3. **/transfer <user> <amount>** - Transfer money from the user's account to another account. Valid values for <amount> are either a positive number or 'all'.
4. **/wd <amount>** - Withdraws money from account to cash balance. <amount> is same as transfer.
5. **/dp <amount>** - Deposits cash balance into the account. <amount> is same as transfer.
6. **/work** - User can earn tokens by doing some work. A time limit of 12 hours.
7. **/crime** - A 50/50 chance that the user earns/loses tokens. A time limit of 6 hours.
8. **/rob** - A 50/50 chance that a user successfully robs another user's cash. Otherwise is fined. A time limit of 6 hours.
9. **/slut** - A 50/50 chance that user earns/loses money by engaging in sexual activities. A time limit of 12 hours.
10. **/bj <amount>** - Play the blackjack game and bet the specified <amount>. A time limit of 6 hours.

## Database Lookup commands

11. **/bal** - Show the account balance info. Cash balance, Account balance, and total.
11. **/lb** - Display the leaderboard and the user ranking. Ranking is based on total tokens.
12. **/rank** - Show the user's rank.

## Commands not added yet

14. **/collect** - Collects role income. A time limit of 12 hours.

## Admin commands

15. **/setworkrole <role> <amount>** - Adds the role to the list of work roles so that only those who have any of those roles can use the /work command.
16. **/removeworkrole <role>** - Removes the role from the list of the work roles.
17. **/listworkroles** - Lists all the work roles.
18. **/removerole <role> <user>** - Remove a certain role from the user.
19. **/setrole <role> <user>** - Set a certain role to the user.
20. **/listincomeroles** - List all the income roles.
21. **/setincomerole** <role> <amount>** Sets income role.
22. **/removeincomerole** <role>** Removes income role.

## Time limits

1. **/work** - 24 hours.
2. **/crime** - 12 hours.
3. **/slut** - 12 hours.
4. **/collect** - 24 hours.
5. **/rob** - 24 hours.
6. **/bj <amount>** - NA