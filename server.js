//trivia-crowd


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

// app.get('/submitted_question/', (req, res, send) => {
//     res.send('Your question was submitted')
//     })

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

// app.get('/somewhere_else/', async (req, res) => {
//   console.log('Here we will place the confirmation page')
// })

app.put('/table_update/', async (req, res) => {
// await fakeNetworkDelay();

  try {
    const client = await pool.connect();

    //select the current 
    const name = req.body.name;
    const question = req.body.mykey; //"${message}"
    const answerA = req.body.answerA;
    const answerB = req.body.answerB;
    const answerC = req.body.answerC;
    const answerD = req.body.answerD;
    const correct_answer = req.body.correctAnswer;

    console.log('message', question);
    console.log('answers', name, answerA, answerB, answerC, answerD, correct_answer);

    var id = 7;
    // var name = question;
    let sql = 'INSERT INTO trivia_questions (name, question, answera, answerb, answerc, answerd, correctAnswer) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    let params = [ name, question, answerA, answerB, answerC, answerD, correct_answer ];

    client.query(sql, params, function(err) {
// make sure you handle errors from here as well,
// including signaling `res` and `done`
    }); 

    res.send( "sent" );  // do we actually want to send anything?
    client.release(); //changed from 'release' to 'end'
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  } 

      
    });

app.get('/retrieve_question/', async (req, res) => {

  try{
    const client = await pool.connect();

    var question_id = 8;
    let sql = 'SELECT (question) FROM  trivia_questions WHERE id = $1';
    let params = [question_id];

    const { rows: name } = await client.query(sql, params)
      console.log('result:', name)
    


    let answers = 'SELECT (answera) FROM  trivia_questions WHERE id = $1';
    let params2 = [question_id];

    // client.query(answers, params2).then(res => {
    // const result_answers = res.rows;
    // // console.log('result 2:', res)
    // })

    // .finally(()=> client.end());

    // let router = require('express').Router();
    // let bodyParser = require('body-parser');
    // router.use(bodyParser.json());
    // console.log('res send thing', result_answers)
    res.send(name);
    client.release();
  } catch (err) {
        console.error(err);
        res.send("Error " + err);
      } 
// client.query('SELECT 1 + 4').then(res => {

//     const result = R.head(R.values(R.head(res.rows)));

//     console.log(result);
// }).finally(() => client.end());



  // console.log('current question:', current_question)
  // res.send('question sent')

  console.log('querry retrieval:', sql)
  console.log('test retrieve question')
})



app.put('/retrieve_question/', async (req, res) => {
// await fakeNetworkDelay();

  try {
    const client = await pool.connect();

    //select the current 
    const message = req.body.mykey; //"${message}"
    console.log('message', message);

//     // client.query(`INSERT INTO test_table(name) VALUES ( "${message}")`);
//     // ^^commented out until the display can display all messages

//     var id = 7;
//     var name = message;
//     let sql = 'INSERT INTO test_table (id, name) VALUES ($1, $2)';
//     let params = [ id, name ];
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






// app.get('/thanks/', async (req, res) => {
//   console.log('thank you for your submission')
// })


//port listening, which happens once at the end of the code 
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});



