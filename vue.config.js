/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            '/data': {
                target: 'https://bluecolored.de/bluemap-dev',
                changeOrigin: true,
            },
            '/assets/playerheads': {
                target: 'https://bluecolored.de/bluemap',
                changeOrigin: true,
            },
            '/live': {
                target: 'https://bluecolored.de/bluemap',
                changeOrigin: true,
            },
        }
    }
}