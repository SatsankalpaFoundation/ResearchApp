/** @type {import('next').NextConfig} */
import TerserPlugin from 'terser-webpack-plugin';

export function webpack(config, { isServer }) {
    if (!isServer) {
        config.optimization.minimizer = [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true, // Remove console.* statements
                    },
                },
            }),
        ];
    }

    return config;
}
