const Promise = require('bluebird');
const fs = Promise.promisifyAll(require("fs"));
const path = require('path');

const dirs = [
    'dir-1/dir-1-1',
    'dir-1/dir-1-2',
    'dir-1/dir-1-2/dir-1-2-1',
    'dir-2/dir-2-1/dir-2-1-1',
    'dir-2/dir-2-2/dir-2-2-1',
    'dir-2/dir-2-1/dir-2-2-2/dir-2-2-2-1',
    'dir-3',
    'dir-3/dir-3-1',
    'dir-3/dir-3-2/dir-3-2-1',
    'dir-3/dir-3-3/dir-3-3-1'
];

let arrOfPaths = [];
dirs.forEach((dir) => {
    let dirArr = dir.split('/');
    let pathOfDir = './files/';
    dirArr.forEach((dir) => {
        pathOfDir += dir + path.sep;
        if(arrOfPaths.indexOf(pathOfDir) < 0){
            arrOfPaths.push(pathOfDir);
        }
    })
})
Promise.mapSeries(arrOfPaths, (path) => {
    return fs.mkdirAsync(path);
})


/*
let arr = [];     
dirs.forEach((dir) => { 
let dirArray = dir.split('/'); 
let dirPath = './files/'; 
dirArray.forEach((item) => { 
dirPath += item + path.sep; 
if (arr.indexOf(dirPath) == -1) { 
arr.push(dirPath) 
} 
}); 
}); 
console.log(arr) 
Promise.mapSeries(arr, (path) => { 
return fs.mkdirAsync(path); 
}).then(() => { 
console.log('all done') 
}); */