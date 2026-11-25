import type { NextConfig } from 'next';

// Static export for Cloudflare Pages, which serves the "dist" folder as plain files.
const nextConfig: NextConfig = { output: 'export', distDir: 'dist', poweredByHeader: false };

export default nextConfig;
