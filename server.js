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

//settings - adjust for player entry periods: 
var question_answer_mode = 1; 
var reveal_mode = 0; 

app.use(express.json()) // for parsing application/json

let router = require('express').Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());

// const PORT = process.env.PORT || 4002;

app.use(express.static('public'));


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

app.put('/current_q_update/', async (req, res) => {
// for admin to update the current question available to players

  // try {

    //select the current 
    const name = req.body.name;
    // const player_answer = req.body.player_answer; //"${message}"
    const question_id = req.body.question_id;
    // const ref_num = req.body.ref_num;

    // console.log('name', question);
    console.log('player question', name, question_id);


    if (name === 'Natalie') {
    const client24 = await pool.connect();
    let sql24 = 'UPDATE current_question SET id = $1';
    let params24 = [ question_id  ]
    const  temp23  = await client24.query(sql24, params24 ); 
    console.log('temp24', temp24.rows)
    //add error catch here for if more than one ID comes up (i.e. answered twice)
    
    var temp24_ids = temp24.rows[0];
    console.log('temp24_ids', temp24_ids);
    // var guess_id_formatted23 = temp23_ids.id;

    client24.release();
    } else {
        console.log('incorrect username');
        var response = ('incorrect username');
        // var response2 = JSON.object(response);
        // var incorrect = JSON.stringify(response2);
        var response2 = JSON.stringify({incorrect :"wrong username"});
        console.log('response2', response2);
        res.send(response2);
    }

});

app.put('/table_update/', async (req, res) => {

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


app.get('/retrieve_list/', async (req, res) => {

    var sql_q_list = 'SELECT * FROM trivia_questions ORDER BY id DESC LIMIT 20';
    // var id_list = 'SELECT '
    const list_client = await pool.connect();
    const { rows: q_list } = await list_client.query(sql_q_list);


    list_client.release();   

    console.log('q_list', q_list[0]);

    var q_list_qs = q_list[0].question;
    console.log(q_list_qs)
    console.log('length', q_list.length);

    
    var i;
    var complete_list = [];
    var id_list = [];
    for (i = 0; i < q_list.length; i++) {
        complete_list[i] = q_list[i].question;
        id_list[i] = q_list[i].id;
    }

    // creates key:value pairs
    var n;
    var q_object = {};
    for (n = 0; n < q_list.length; n++) {
        q_object[(id_list[n])] = complete_list[n];
    }

    var test2 = JSON.stringify(q_object);

    console.log('test2', test2)

    console.log('object_list', q_object)


    console.log('complete_list', complete_list, id_list)

    var question_list = 'question_list_placeholder'
    var question_obj = Object.assign(test2);
    res.send(q_object);

});




app.get('/retrieve_question/', async (req, res) => {

  try{

    //reaches into current_question table to retrieve current question
    var q_title = 'Test';
    let sql_q_id = 'SELECT (id) FROM current_question WHERE question_written = $1';
    let q_params = [q_title];
    const q_client = await pool.connect();
    const { rows: q_name } = await q_client.query(sql_q_id, q_params)
    q_client.release();    
    var q_unbracketed = q_name[0];
    console.log('q_unbracketed', q_unbracketed);

    var question_id_var = q_unbracketed.id;
    console.log('question_id_var', question_id_var);


    // var question_id = 8;  //hard-coded way  where the question is chosen 

    let sql = 'SELECT (question) FROM  trivia_questions WHERE id = $1';
    let sql1 = 'SELECT (answera) FROM  trivia_questions WHERE id = $1';
    let sql2 = 'SELECT (answerb) FROM  trivia_questions WHERE id = $1';
    let sql3 = 'SELECT (answerc) FROM  trivia_questions WHERE id = $1';
    let sql4 = 'SELECT (answerd) FROM  trivia_questions WHERE id = $1';


    let sql5 = 'SELECT (id) FROM trivia_questions WHERE id = $1';
    let params = [question_id_var];

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
    var name5_unbracketed = name5[0]; //question id

    console.log('question_id', name5_unbracketed);

    var combined_sender = Object.assign(name5_unbracketed, name_unbracketed, name1_unbracketed, name2_unbracketed, name3_unbracketed, name4_unbracketed);
    console.log('combined', combined_sender); 

    res.send(combined_sender);
    
  } catch (err) {
        console.error(err);
        res.send("Error " + err);
      } 

  console.log('test retrieve question')
})


app.put('/retrieve_question/', async (req, res) => { //obsolete? 

  try {
    const client = await pool.connect();

    //select the current 
    const message = req.body.mykey; //"${message}"
    console.log('message', message);

    res.send( "sent" );  // do we actually want to send anything?
    client.release(); //changed from 'release' to 'end'
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  } 

    });


app.put('/guess_update/', async (req, res) => {
// await fakeNetworkDelay();

  // try {

    //select the current 
    const name = req.body.name;
    // const player_answer = req.body.player_answer; //"${message}"
    const guess = req.body.guess;
    const ref_num = req.body.ref_num;
    // console.log('message', question);
    console.log('player guess', name, guess, ref_num);
    var original_submission = 2;  //declare this variable outside the function so it's defined later & accessible


    const client23 = await pool.connect();
    let sql23 = 'SELECT (id) FROM player_guesses WHERE name = $1 AND question = $2';
    let params23 = [ name, ref_num ]
    const  temp23  = await client23.query(sql23, params23 ); 
    console.log('temp23', temp23.rows)
    //add error catch here for if more than one ID comes up (i.e. answered twice)
    
    var temp23_ids = temp23.rows[0];
    console.log('temp23_ids', temp23_ids);
    // var guess_id_formatted23 = temp23_ids.id;

    client23.release();

    console.log('temp_ids_after_release', temp23_ids);

    function myExecutor(resolve, reject){
        if (temp23_ids) {
          resolve('Player has already submitted');
        }
        else {
          reject('This is the first submission');
        }
        }

    function check_submission(){
      
      const myFirstPromise = new Promise(myExecutor);
      return myFirstPromise
    }

    var orderPromise = check_submission()

    console.log('orderPromise', orderPromise)
    // console.log('guess_idTEST', guess_id_formatted23 )


        original_submission = 2
        console.log('refresh test');
        if (temp23_ids) { //if this is an emply array, it means there hasn't been a previous answer submission

            var original_submission = 0;
            console.log('repeat player');

         } else {
            console.log('nonrepeater');
            var original_submission = 1;
        }

    try {

    console.log('original_submission value', original_submission);
        if  (original_submission == 1) {
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


    const client22 = await pool.connect();
    let sql14 = 'SELECT (id) FROM player_guesses WHERE name = $1 AND guess = $2 AND question = $3';

    const  temp  = await client22.query(sql14, params ); //this was where it went wonky - July 31 2020


    console.log('temp', temp.rows)
    //add error catch here for if more than one ID comes up (i.e. answered twice)
    var temp_ids = temp.rows[0];
    console.log('temp_ids', temp_ids)
    var guess_id_formatted = temp_ids.id;
 
    client22.release();


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
    // client.release(); //changed from 'release' to 'end'  //this was a type release statement 

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

    } else {
        console.log('Player already submitted');
    }
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  } 

  client11.release();
      
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

app.get('/closed_submission/', async (req, res) =>{
    
})


//port listening, which happens once at the end of the code 
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

