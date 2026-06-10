import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Ensure the SUSE .ttf font files (loaded at runtime via process.cwd() in
  // lib/pdf/reportTemplate.tsx) are traced into the PDF API route's serverless
  // bundle on Vercel. Without this the fonts silently fall back to Helvetica.
  outputFileTracingIncludes: {
    '/api/download-report/[id]': ['./lib/pdf/fonts/**/*'],
  },
};

export default withNextIntl(nextConfig);
