const axios = require("axios");
const qs = require('querystring');
const cheerio = require('cheerio');
const { format } = require("path");


async function tiktok(url1) {
  const url = 'https://ssstik.io/abc?url=dl';
  const data = {
    id: url1,  // Gunakan url1 dari query parameter
    locale: 'id',
    tt: 'Z3FFWlE2',
  };
  const headers = {
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
    'Content-Length': '67',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie': '_ga=GA1.1.312068484.1720012625; cf_clearance=...',
    'hx-current-url': 'https://ssstik.io/id',
    'hx-request': 'true',
    'hx-target': 'target',
    'hx-trigger': '_gcaptcha_pt',
    Origin: 'https://ssstik.io',
    'Priority': 'u=1, i',
    Referer: 'https://ssstik.io/id',
    'Sec-CH-UA': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
    'Sec-CH-UA-Arch': '"x86"',
    'Sec-CH-UA-Bitness': '"64"',
    'Sec-CH-UA-Full-Version': '"128.0.6613.138"',
    'Sec-CH-UA-Full-Version-List': '"Chromium";v="128.0.6613.138", "Not;A=Brand";v="24.0.0.0", "Google Chrome";v="128.0.6613.138"',
    'Sec-CH-UA-Mobile': '?0',
    'Sec-CH-UA-Model': '""',
    'Sec-CH-UA-Platform': '"Windows"',
    'Sec-CH-UA-Platform-Version': '"15.0.0"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
  };

  try {
    const response = await axios.post(url, qs.stringify(data), { headers });
    const html = response.data;
    const $ = cheerio.load(html);
    const link = $('#dl_btns a.download_link').attr('href');

    if (link) {
      let result = {
        url: link
      };
      return result;
    } else {
      throw new Error('Download link not found');
    }

  } catch (error) {
    console.error('Error fetching the download link:', error);
    return { error: error.message };
  }
}


module.exports = {
  tiktok
}