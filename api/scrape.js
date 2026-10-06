const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    try {
            const targetUrl = req.query.url || 'https://internshala.com/internships/physiotherapy-internship/';
                    
                            const response = await axios.get(targetUrl, {
                                        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
                                                });
                                                        
                                                                const $ = cheerio.load(response.data);
                                                                        const pageTitle = $('title').text(); 
                                                                                
                                                                                        res.status(200).json({ 
                                                                                                    success: true, 
                                                                                                                message: "Lightweight Scraping Successful! 🎉",
                                                                                                                            job_title: pageTitle
                                                                                                                                    });

                                                                                                                                        } catch (error) {
                                                                                                                                                res.status(500).json({ success: false, error: error.message });
                                                                                                                                                    }
                                                                                                                                                    };
                                                                                                                                                    