// indexer config
const YAMLData = require("../../contracts/artifacts/scripts/deploy.js.cp.yaml");
export const indexerToken = "";
export const indexerServer = "http://localhost";
export const indexerPort = 8980;

export const toAddress =
	"WK73JQQGCRQCZ5GLQHCXXB6OXIGF6SD22F5P7HPXF5PNH23YUUALUMKOZ4";

export const assetIndex = YAMLData.default.asa["warcraft-token"].assetIndex;
export const appIndex = Object.values(
	YAMLData.default.ssc["stateful.py-clear.py"]
)[0].appID;
