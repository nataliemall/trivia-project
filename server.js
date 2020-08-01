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

    // var id = 7;
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

    var question_id = 8;  //here's where the question is chosen 

    let sql = 'SELECT (question) FROM  trivia_questions WHERE id = $1';
    let sql1 = 'SELECT (answera) FROM  trivia_questions WHERE id = $1';
    let sql2 = 'SELECT (answerb) FROM  trivia_questions WHERE id = $1';
    let sql3 = 'SELECT (answerc) FROM  trivia_questions WHERE id = $1';
    let sql4 = 'SELECT (answerd) FROM  trivia_questions WHERE id = $1';



    // let sql11 = 'SELECT (correctanswer) FROM trivia_questions WHERE id = $1';
    // let params11 = [ref_num];
    // console.log(params11)
    // const  { rows: test11 } = await client11.query(sql11, params11)


    let sql5 = 'SELECT (id) FROM trivia_questions WHERE id = $1';
    let params = [question_id];

    const client = await pool.connect();
    const { rows: name } = await client.query(sql, params)
    client.release();

    const client1 = await pool.connect();
    const { rows: name1 } = await client1.query(sql1, params)
    client1.release();

    const client2 = await pool.connect();
    const { rows: name2 } = await client2.query(sql2, params)
    client2.release();

    const client3 = await pool.connect();
    const { rows: name3 } = await client3.query(sql3, params)
    client3.release();

    const client4 = await pool.connect();
    const { rows: name4 } = await client4.query(sql4, params)
    client4.release();

    const client5 = await pool.connect();
    const { rows: name5 } = await client5.query(sql5, params)
    client5.release();    

    var name_unbracketed = name[0];
    var name1_unbracketed = name1[0];
    var name2_unbracketed = name2[0];
    var name3_unbracketed = name3[0];
    var name4_unbracketed = name4[0];
    var name5_unbracketed = name5[0];

    // var question_mid = JSON.stringify({'id' : question_id});
    // console.log('question_mid', question_mid);
    // var id_unbracketed = JSON.parse(question_mid);
    // console.log('id_unbracketed', id_unbracketed);

    var combined_sender = Object.assign(name5_unbracketed, name_unbracketed, name1_unbracketed, name2_unbracketed, name3_unbracketed, name4_unbracketed);
    console.log('combined', combined_sender); 
    // console.log('result:', name, name2);

    // let params2 = [question_id];

    // client.query(answers, params2).then(res => {
    // const result_answers = res.rows;
    // // console.log('result 2:', res)
    // })

    // .finally(()=> client.end());

    // let router = require('express').Router();
    // let bodyParser = require('body-parser');
    // router.use(bodyParser.json());
    // console.log('res send thing', result_answers)
    res.send(combined_sender);
    
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

  // console.log('querry retrieval:', sql)
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


app.put('/guess_update/', async (req, res) => {
// await fakeNetworkDelay();

  try {

    //select the current 
    const name = req.body.name;
    // const player_answer = req.body.player_answer; //"${message}"
    const guess = req.body.guess;
    const ref_num = req.body.ref_num;
    // console.log('message', question);
    console.log('player guess', name, guess, ref_num);


    
    const dub_submission_check = await pool.connect();


   	// let name_nat = 'Natalie';
    let sql_check = 'SELECT * FROM player_guesses WHERE name = $1';
    let name_nat_param = [ name ];   
    await dub_submission_check.query(sql_check, name_nat_param, function(err, results) {
    	
    	console.log('submission_selection', results.rows[0]);
// make sure you handle errors from here as well,
// including signaling `res` and `done`
    }); 

    // console.log('submission_selection', submission_selection)
    dub_submission_check.release();


    const client = await pool.connect();
    // var id = 7;
    // var name = question;
    let sql10 = 'INSERT INTO player_guesses (name, guess, question) VALUES ($1, $2, $3)';
    let params = [ name, guess, ref_num ];

    await client.query(sql10, params, function(err) {
// make sure you handle errors from here as well,
// including signaling `res` and `done`
    }); 

    client.release(); //changed from 'release' to 'end'



    const client2 = await pool.connect();
    let sql14 = 'SELECT (id) FROM player_guesses WHERE name = $1 AND guess = $2 AND question = $3';

    const  temp  = await client.query(sql14, params );


    console.log('temp', temp.rows)
    //add error catch here for if more than one ID comes up (i.e. answered twice)
    var temp_ids = temp.rows[0];
    console.log('temp_ids', temp_ids)
    var guess_id_formatted = temp_ids.id;


    // console.log('id_val', guess_id_formatted);

    // const {id: test12} = temp.rows;

//     const  {id: test12}  = await client.query(sql14, params, function(err) {
// // make sure you handle errors from here as well,
// // including signaling `res` and `done`
//     });  

    // console.log("test12", test12);
    // var guess_id = test12[0];
    // var guess_id_formatted = guess_id.id;  
    client2.release();

    //use below to update second table if needed
    // const client_insert_current_guess = await pool.connect();

    // let sql_current = 'INSERT INTO recent_guesses (name, guess, question) VALUES ($1, $2, $3)';
    // const temp2 = await client_insert_current_guess.query() ...

    // client_insert_current_guess,release();



    console.log('guess_id_formatted', guess_id_formatted); //send this along to the 
    //send guess_id along to the front end - then use this to extract the correct eval




    const client11 = await pool.connect();
    let sql11 = 'SELECT (correctanswer) FROM trivia_questions WHERE id = $1';
    let params11 = [ref_num];
    console.log(params11);
    const  { rows: test11 } = await client11.query(sql11, params11);

    console.log('test11', test11[0]);
    var answer_key = test11[0];
    var correct_answer = answer_key.correctanswer
    client.release(); //changed from 'release' to 'end'

    if (correct_answer == guess) {
      console.log('answer was correct! direct to results page')
      const client12 = await pool.connect();
      // let sql12 = 'UPDATE (points) FROM player_guesses WHERE id = $1'
      let sql12 = 'UPDATE player_guesses SET points = 1 WHERE question = $1';
      // let params11 = [ref_num];
      client12.query(sql12, params11);


      console.log(params11);

      var current_grade = 'correct';
      //thing to do if correct answer 
    } else {
      console.log('answer incorrect');
      var current_grade = 'incorrect';
    } 
    var current_grade_string = JSON.stringify({grade :current_grade});
    console.log('grade string', current_grade_string);
    res.send( current_grade_string );  // do we actually want to send anything?
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  } 

      
    });

app.get('/score/', async (req, res) => {
  try {
    const client13 = await pool.connect();
    let sql13 = 'SELECT * FROM player_guesses WHERE question = $1'; //needs to update according to question
    params = ['8']
    const { rows: name13 } = await client13.query(sql13, params);

    
    console.log('most recent guess', name13[0]);  //shouldn't the query have all the player_guesses?
    // console.log('player guesses', name13);

    client13.release();
    var player_name = name13[0];

    // player_name_json = JSON.stringify({name: player_name});
    player_name_json = JSON.stringify(name13);
    res.send(player_name_json);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  } 
})


// app.get('/thanks/', async (req, res) => {
//   console.log('thank you for your submission')
// })


//port listening, which happens once at the end of the code 
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});



