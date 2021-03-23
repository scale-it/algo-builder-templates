const rewireYAML = require('react-app-rewire-yaml');
const { override, removeModuleScopePlugin } = require('customize-cra');

function overrides(config, env) {
	config = rewireYAML(config, env);
	return config;
};

module.exports = override(overrides, removeModuleScopePlugin());