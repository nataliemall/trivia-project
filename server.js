//trivia-crowd



// const fs = require('fs');

// module.exports = {
//   requestListener: (req, res) => {
//   fs.readFile('./testWebsite.html',  'utf-8', (err, data) => {
//     if (err){
//       res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(`${err}`);
//     res.end();
//     } else {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     res.end(); 
//     }
//   })
// }
// }




const PORT = process.env.PORT || 5000;

const express = require('express');
const app = express();
//database stuff: 
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(express.json()) // for parsing application/json

let router = require('express').Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());


// const PORT = process.env.PORT || 4002;

app.use(express.static('public'));

app.get('/submitted_question/', (req, res, send) => {
    res.send('Your question was submitted')
    })

app.get('/db', async (req, res) => {     //creating the database if postgresQL
try {
  const client = await pool.connect();
  const result = await client.query('SELECT * FROM trivia_questions');
  const results = { 'results': (result) ? result.rows : null};
  res.send( results );
  client.release();
} catch (err) {
  console.error(err);
  res.send("Error " + err);
} 
})


app.put('/table_update/', async (req, res) => {
// await fakeNetworkDelay();

  try {
    const client = await pool.connect();

    //select the current 
    const message = req.body.mykey; //"${message}"
    console.log('message', message);

    var id = 7;
    var name = message;
    let sql = 'INSERT INTO test_table (id, name) VALUES ($1, $2)';
    let params = [ id, name ];

//     client.query(sql, params, function(err) {
// // make sure you handle errors from here as well,
// // including signaling `res` and `done`
// }); 

    res.send( "sent" );  // do we actually want to send anything?
    client.release(); //changed from 'release' to 'end'
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  } 

      
    });



//port listening, which happens once at the end of the code 
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});



