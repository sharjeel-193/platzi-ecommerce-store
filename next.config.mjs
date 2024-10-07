/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // This allows images from any external domain
            },
        ],
    },
};

export default nextConfig;
