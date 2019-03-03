const downloader = require('image-downloader');
const puppeteer = require('puppeteer');
const fs = require('fs');
const dest = __dirname + '/result';

async function getImagesFromPage(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const imgSrcs = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('.FFVAD'));
    const imgUrls = imgs.map(img => img.getAttribute('src'));
    return imgUrls;
  })
  await browser.close();  
  return imgSrcs;
}

async function main() {
  if(!fs.existsSync('./result'))
    fs.mkdirSync('./result');

  const images = await getImagesFromPage('https://www.instagram.com/gaixinhchonloc/');
  images.forEach(image => {
    downloader({
      url: image,
      dest: dest
    });
  })
}
main();