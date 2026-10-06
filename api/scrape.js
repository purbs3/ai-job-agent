const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');

module.exports = async (req, res) => {
    // Vercel par heavy tasks ko timeout se bachane ke liye limit check
        if (req.method !== 'GET') {
                return res.status(405).json({ error: 'Only GET requests are allowed' });
                    }

                        try {
                                console.log("🚀 Vercel Serverless Browser start ho raha hai...");
                                        
                                                // Setup Chromium for Serverless execution
                                                        const browser = await puppeteer.launch({
                                                                    args: chromium.args,
                                                                                defaultViewport: chromium.defaultViewport,
                                                                                            executablePath: await chromium.executablePath(),
                                                                                                        headless: chromium.headless,
                                                                                                                    ignoreHTTPSErrors: true,
                                                                                                                            });

                                                                                                                                    const page = await browser.newPage();
                                                                                                                                            
                                                                                                                                                    // Testing ke liye ek basic job search page open kar rahe hain
                                                                                                                                                            const targetUrl = req.query.url || 'https://www.linkedin.com/jobs/search?keywords=Physiotherapist&location=India';
                                                                                                                                                                    await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
                                                                                                                                                                            
                                                                                                                                                                                    // Page ka title aur basic text nikalna
                                                                                                                                                                                            const pageTitle = await page.title();
                                                                                                                                                                                                    
                                                                                                                                                                                                            await browser.close();
                                                                                                                                                                                                                    
                                                                                                                                                                                                                            res.status(200).json({ 
                                                                                                                                                                                                                                        success: true, 
                                                                                                                                                                                                                                                    message: "Scraping Successful!",
                                                                                                                                                                                                                                                                job_title: pageTitle,
                                                                                                                                                                                                                                                                            url_scraped: targetUrl
                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                        } catch (error) {
                                                                                                                                                                                                                                                                                                console.error("❌ Scraping error:", error);
                                                                                                                                                                                                                                                                                                        res.status(500).json({ success: false, error: error.message });
                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                            };
                                                                                                                                                                                                                                                                                                            