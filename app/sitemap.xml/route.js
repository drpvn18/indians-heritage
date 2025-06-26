// app/sitemap.xml/route.js

export async function GET() {
    const urls = [
        'https://www.indianheritage.eu',
        'https://www.indianheritage.eu/indiankitchen',
        'https://www.indianheritage.eu/category/all',
        'https://www.indianheritage.eu/category/organic-products',
        'https://www.indianheritage.eu/category/gi-products',
        'https://www.indianheritage.eu/shipping-policy',
        'https://www.indianheritage.eu/privacy-policy',
        'https://www.indianheritage.eu/terms-conditions',
        'https://www.indianheritage.eu/refund-return-policy'
    ];

    // const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    // <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    //   ${urls.map(url => `
    //     <url>
    //       <loc>${url}</loc>
    //       <lastmod>${new Date().toISOString()}</lastmod>
    //       <changefreq>monthly</changefreq>
    //       <priority>1.0</priority>
    //     </url>`).join('')}
    // </urlset>`;

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map(url => `
        <url>
          <loc>${url}</loc>
        </url>`).join('')}
    </urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
