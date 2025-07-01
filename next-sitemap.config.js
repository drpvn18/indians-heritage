module.exports = {
    siteUrl: 'https://www.indianheritage.eu',
    generateRobotsTxt: true,

    exclude: [],

    additionalPaths: async (config) => [
        await config.transform(config, '/favicon.ico'),
        await config.transform(config, '/videos/why_indian_heritage-1.mp4'),
    ],
};