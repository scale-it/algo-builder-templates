const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const rewireYAML = require('react-app-rewire-yaml');

module.exports = function override(config, env) {
	config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
	config = rewireYAML(config, env);
	return config;
};