//triva-crowds


console.log('hello from the client side')

const q1 = document.getElementById('q1');
const submit_button = document.getElementById('submit_button');




submit_button.addEventListener('click', () => {
    console.log('TEST2')
    console.log(document.getElementById('q1').value)

    // const jsonstring2 = '{"mykey": "' + (document.getElementById('happy_thought').value) + '"}'; //this worked

    const objValue = document.getElementById('q1').value;

    const mykey2 = { "mykey" : objValue};
    console.log(objValue)
    console.log(mykey2)

    const bobcatStr = JSON.stringify(mykey2);
    console.log(bobcatStr);
    // var jsonString = JSON.stringify(jsonConst)
    // console.log(jsonConst) // does "mykey" need quotes around it?
    // console.log(jsonString)

    // const jsonConst = '{"mykey": "bigcat2"}';
    // console.log(jsonstring2)
    // const jsonConst2 = JSON.stringify(jsonConst),

    fetch('/table_update/', {
      method: 'PUT',
      // body: JSON.stringify(jsonConst),
      // body: '{"mykey": "bigcat2"}',
      body: bobcatStr,
      headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json'
      // 'Content-Type': 'text/plain'

      // 'Content-Type': 'application/x-www-form-urlencoded',
      } 
      }).then(() => {
      // TODO something
      // refreshDisplay();  //add back in when ready to fetch a webpage saying "submission completed"
      console.log('test FETCH');
      // refreshDisplay();
    });

    console.log('TEST');
})



// const http = require('http');
// let {requestListener} = require('./server.js');
// // const PORT = process.env.PORT || 4000; //changed from 4001 to 4004 

// var server = http.createServer(requestListener)

// server.listen(PORT)

// const fs = require('fs')




// const fileStream = fs.createWriteStream('output.txt');  //should these go in this app.js file?


// fileStream.write('This is the first line!'); 
// fileStream.write('This is the second line!');
// fileStream.end();


// let events = require('events');

// let listenerCallback = (data) => {
//     console.log('Celebrate ' + data);
// }

// let myEmitter = new events.EventEmitter();

// myEmitter.on('celebration', listenerCallback);
// myEmitter.emit('celebration', 'birthday party')

