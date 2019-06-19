const fs = require('fs');

const readData = (filePath)=> {
  return new Promise((res, rej)=> {
    fs.readFile(filePath, (err, data)=> {
      if(err){
        return rej(err);
      }
      try{
        res(JSON.parse(data));
      }
      catch(ex){
        rej(ex);
      }
    });
  });
};

const writeData = (filePath, data)=> {
  return new Promise((res, rej)=> {
    try{
      fs.writeFile(filePath, JSON.stringify(data), (err)=> {
        if(err){
          return rej(err);
        }
        res();
      });
    }
    catch(ex){
      rej(ex);
    }
  });
};

module.exports = {
  readData, writeData
};
