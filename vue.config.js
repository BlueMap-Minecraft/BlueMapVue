/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    publicPath: './',
    outputDir: 'dist/',
    devServer: {
        proxy: {
            '/data': {
                target: 'https://maps.freeserver.pro/bluemap',
                changeOrigin: true,
            },
            '/assets/playerheads': {
                target: 'https://maps.freeserver.pro/bluemap',
                changeOrigin: true,
            },
            '/live': {
                target: 'https://maps.freeserver.pro/bluemap',
                changeOrigin: true,
            },
        }
    }
}
