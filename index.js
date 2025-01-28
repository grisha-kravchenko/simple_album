const through = require('through2');
const fs = require('fs');
const config = require('./config.json');
const scheme = config.scheme || ["<album>", "</album>"];

const processHtml = () => {
  // start by executing all fs commands
  const checkImage = path => path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.jpeg');
  const images = fs.readdirSync(config.src + '/' + config.images).filter(checkImage);
  // copy all images to the dist folder to be able to use them in the html file
  fs.cpSync(config.src + '/' + config.images, config.dist + '/' + config.images, { recursive: true });

  // then start processing the html file
  return through.obj(function (file, _, cb) {
    if (file.isBuffer()) {
    let content = file.contents.toString();

    // replace all <album> tags with the corresponding images
    content = content.replace(new RegExp(scheme[0] + '(.*?)' + scheme[1], 'g'), (match, argument) => {
      // if the album is in the images folder, return the image
      if (images.includes(argument)) return `<img src="./${config.images}/${argument}" alt="${argument}" />`;
      // get all images in the folder
      const folderImages = fs.readdirSync(config.src + '/' + config.images + '/' + argument).filter(checkImage);
      // return the div with the images
      let result = `<div class="album_${argument}">\n`;
      for (const image of folderImages) {
        result += `<img src="./${config.images}/${argument}/${image}" alt="${image}" />\n`;
      }
      result += '</div>';
      return result;
    });
    file.contents = Buffer.from(content);
    }
    cb(null, file);
  });
}

module.exports = processHtml;
