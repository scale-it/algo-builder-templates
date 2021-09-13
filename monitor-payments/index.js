const http = require('http');
const algosdk = require('algosdk');

const { indexer_token, indexer_server, indexer_port, address } = require('./config');

const hostname = '127.0.0.1';
const port = 3000;

// client for indexerV2
const indexerClient = new algosdk.Indexer(indexer_token, indexer_server, indexer_port);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Monitoring payments in server using algorand indexer');
});

server.listen(port, hostname, async () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log(`Monitoring payments to address:${address} using algorand-indexer`);

  /*
   * Here we are scanning all payment transactions.
   * For optimal result, if you have a control of the indexer PostgreSQL, you should
   * create a trigger with COPY statement to write a log. */
  let currRound = 1;
  setInterval(async () => {
    const health = await indexerClient.makeHealthCheck().do();
    if (currRound !== health.round) {
      currRound = health.round;
      let response = await indexerClient.searchForTransactions()
        .address(address).txType('pay').round(currRound)
        .do();

      const transactions = response["transactions"];
      for (const transaction of transactions) {
        const paymentTxParams = transaction['payment-transaction'];
        if (paymentTxParams.receiver === address) { // we only log the transactions where address is "receiver" of payment
          console.log(`\nReceived ${paymentTxParams.amount} microalgos from addr:${transaction.sender} at round:${transaction['confirmed-round']}`);
        }
      }
    }
  }, 1000);
});