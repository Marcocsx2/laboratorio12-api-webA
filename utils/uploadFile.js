const path = require('path');
const moment = require('moment-timezone');

const time = moment().tz('America/Lima').format('DD-MM-YYYY-HH:mm:ss');

const uploadFile = async (file) => {
  let fileName = `${time}${file.name.replace(/ /g, '')}`;
  let uploadPath = path.resolve(__dirname, '../public/images/' + fileName);
  await file.mv(uploadPath, (err) => {
    if (err) {
      return res.json({
        err,
      });
    }
    console.log('El archivo se ubico en: ', uploadPath);
  });
  return fileName;
};

module.exports = uploadFile;
