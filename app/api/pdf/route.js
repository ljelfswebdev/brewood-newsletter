export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import chromium from '@sparticuz/chromium';



chromium.setHeadlessMode = true;
chromium.setGraphicsMode = false;

async function launchBrowser() {
  if (process.platform !== 'linux') {
    const { default: puppeteer } = await import('puppeteer'); // local dev only
    return puppeteer.launch({
      headless: 'new',
      defaultViewport: { width: 1200, height: 1700, deviceScaleFactor: 2 }
    });
  }
  const { default: puppeteer } = await import('puppeteer-core');
  const executablePath =
    process.env.PUPPETEER_EXECUTABLE_PATH || (await chromium.executablePath());
  return puppeteer.launch({
    args: chromium.args,
    executablePath,
    headless: chromium.headless ?? true,
    defaultViewport: { width: 1200, height: 1700, deviceScaleFactor: 2 }
  });
}

export async function POST(req) {
  try {
    const { pages } = await req.json();
    const { origin } = new URL(req.url);

    const browser = await launchBrowser();
    const page = await browser.newPage();

    // Inject data into localStorage BEFORE navigating to /print
    await page.goto('about:blank');
    await page.evaluateOnNewDocument((data) => {
      try {
        localStorage.setItem('newsletter-pages', JSON.stringify(data || []));
      } catch (_) {
        // fall through
      }
    }, pages || []);

    // Now load the print view (no query string!)
    await page.goto(`${origin}/print`, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    await browser.close();

    return new Response(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="newsletter.pdf"',
      },
    });
  } catch (err) {
    console.error('PDF route error:', err);
    const message =
      err?.message ||
      (typeof err === 'string' ? err : 'Unknown PDF generation error');
    return new Response(message, { status: 500 });
  }
}