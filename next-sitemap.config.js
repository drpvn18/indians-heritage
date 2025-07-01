module.exports = {
    siteUrl: 'https://www.indianheritage.eu',
    generateRobotsTxt: true,

    exclude: [],

    additionalPaths: async (config) => [
        await config.transform(config, '/favicon.ico'),
    ],
};