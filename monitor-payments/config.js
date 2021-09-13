// indexer config
const indexer_token = "";
const indexer_server = "http://localhost";
const indexer_port = 8980;

/* indexer config for TestNet */
// export const indexer_server = "https://testnet.algoexplorerapi.io/idx2";
// export const indexer_port = '';

// this is the address we will monitor for new payments received.
// https://github.com/scale-it/algo-builder/blob/master/examples/algob.config-template.js#L20
const addrToMonitor = 'WWYNX3TKQYVEREVSW6QQP3SXSFOCE3SKUSEIVJ7YAGUPEACNI5UGI4DZCE';

module.exports = {
  indexer_token: indexer_token,
  indexer_server: indexer_server,
  indexer_port: indexer_port,
  address: addrToMonitor
}
