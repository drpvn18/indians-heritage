export async function GET() {
    const content = `
  User-agent: *
  Allow: /
  Disallow: /private/
  Sitemap: https://www.indianheritage.eu/sitemap.xml
  `.trim();

    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
