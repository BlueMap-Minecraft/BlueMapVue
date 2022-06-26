/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            '/maps': {
                target: 'https://localhost:8100',
                changeOrigin: true,
            },
            '/assets/playerheads': {
                target: 'https://bluecolored.de/bluemap',
                changeOrigin: true,
            }
        }
    }
}