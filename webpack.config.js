const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);

    // Ensure svg files are handled by @svgr/webpack on web so import Svg from './foo.svg' works
    // Find existing asset rule that handles svg and exclude svg from it
    const assetRule = config.module.rules.find(
        (r) => r.test && r.test.toString().includes('svg'),
    );
    if (assetRule) {
        assetRule.exclude = /\\.svg$/i;
    }

    config.module.rules.push({
        test: /\\.svg$/i,
        issuer: /\\.[jt]sx?$/,
        use: ['@svgr/webpack'],
    });

    return config;
};
