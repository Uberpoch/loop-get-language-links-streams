const fs = require('fs');
const jsonexport = require('jsonexport');

exports.generateFile = async(res, file) => {
  const json = res;
  // const xlsx = json2xlsx(json);

  jsonexport(json, function(err, csv){
    if (err) return console.error(err);
    fs.writeFileSync(`${file}.csv`, csv);
  });

    console.log('file created');
  };

