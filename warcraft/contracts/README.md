This is a `algob` project with which demonstrates ASA payments to deliver a service.

The code consist of escrow contract and a stateful contract
- Escrow is used to receive payments and approve transaction only if stateful application is called.
- Stateful contract keeps track of registration of a user account, It registers users if warcraft token is paid to escrow

To deploy contracts:

  - `algob deploy`