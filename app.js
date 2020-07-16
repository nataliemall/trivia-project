const http = require('http');
let {requestListener} = require('./callbackFile.js');
const PORT = process.env.PORT || 4001;

var server = http.createServer(requestListener)

server.listen(PORT)

const fs = require('fs')




const fileStream = fs.createWriteStream('output.txt');  //should these go in this app.js file?


fileStream.write('This is the first line!'); 
fileStream.write('This is the second line!');
fileStream.end();


let events = require('events');

let listenerCallback = (data) => {
    console.log('Celebrate ' + data);
}

let myEmitter = new events.EventEmitter();

myEmitter.on('celebration', listenerCallback);
myEmitter.emit('celebration', 'birthday party')

