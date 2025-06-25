/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        domains: ['drive.google.com', 'firebasestorage.googleapis.com'],
    },
};

export default nextConfig;