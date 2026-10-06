import type { APIRoute } from 'astro';
import siteConfig from '../content/site.config.json';

const robotsTxt = `
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${siteConfig.siteUrl}/sitemap-index.xml
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
