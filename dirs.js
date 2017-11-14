const Promise = require("bluebird");
const fs = require('fs');

const dirs = [
    'dir-1/dir-1-1',
    'dir-1/dir-1-2',
    'dir-1/dir-1-2/dir-1-2-1',
    'dir-2/dir-2-1/dir-2-1-1',
    'dir-2/dir-2-2/dir-2-2-1',
    'dir-2/dir-2-1/dir-2-2-2/dir-2-2-2-1',
    'dir-3/dir-3-1',
    'dir-3',
    'dir-3/dir-3-2/dir-3-2-1',
    'dir-3/dir-3-3/dir-3-3-1'
  ];

  Promise.mapSeries(dirs, (dir) => {
      return dir.split('/');
  }).then((val) => {
      for(let paths of val){
          let startDirPath = './files/';
          for(let path of paths){
              startDirPath += path + '/';
              if(!fs.existsSync(startDirPath))
                fs.mkdirSync(startDirPath);
          }
      }
  })