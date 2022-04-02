const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
	transpileDependencies: true,
	configureWebpack: {
		resolve: {
			fallback: {
				crypto: require.resolve("crypto-browserify"),
				stream: require.resolve("stream-browserify"),
				buffer: require.resolve("buffer"),
			},
		},
		plugins: [
			new webpack.ProvidePlugin({
				Buffer: ["buffer", "Buffer"],
			}),
		],
	},
});
