const algosdk = require("algosdk");

const { getDefaultAccountAddr } = require("./payment-widget");
const {
  indexerToken,
  indexerServer,
  indexerPort,
  assetIndex,
  toAddress,
} = require("../config");

const indexerClient = new algosdk.Indexer(
  indexerToken,
  indexerServer,
  indexerPort
);

// after_time function in indexer accepts RFC 3339 date-time format
// https://stackoverflow.com/questions/7244246/generate-an-rfc-3339-timestamp-similar-to-google-tasks-api
function toISODateString(d) {
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  return (
    d.getUTCFullYear() +
    "-" +
    pad(d.getUTCMonth() + 1) +
    "-" +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    ":" +
    pad(d.getUTCMinutes()) +
    ":" +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

// Detect if user made weekly payment.(returns true if user did)
export async function detectPayment() {
  const address = await getDefaultAccountAddr();
  // time before 7 days
  let beforeTime = new Date();
  beforeTime.setDate(beforeTime.getDate() - 7);

  let response = await indexerClient
    .searchForTransactions()
    .address(address)
    .afterTime(toISODateString(beforeTime))
    .txType("axfer")
    .assetID(assetIndex)
    .currencyGreaterThan(0)
    .do();
  console.log(response);
  for (let transaction of response.transactions) {
    if (transaction["asset-transfer-transaction"].receiver === toAddress) {
      return true;
    }
  }
  return false;
}
