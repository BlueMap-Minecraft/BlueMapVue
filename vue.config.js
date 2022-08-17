/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            '/settings.json': {
                target: 'http://localhost:8100',
                //target: 'https://bluecolored.de/bluemap-dev',
                changeOrigin: true,
            },
            '/maps': {
                target: 'http://localhost:8100',
                //target: 'https://bluecolored.de/bluemap-dev',
                changeOrigin: true,
            },
            '/assets/playerheads': {
                target: 'http://localhost:8100',
                //target: 'https://bluecolored.de/bluemap-dev',
                changeOrigin: true,
            }
        }
    }
}