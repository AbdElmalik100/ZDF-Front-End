/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "assets.aceternity.com"
            },
            {
                protocol: "https",
                hostname: "**"  // Matches all hostnames with any subdomain
            },
            {
                protocol: "http",
                hostname: "**"  // Matches all hostnames with any subdomain
            }
        ]
    }
};

export default nextConfig;
