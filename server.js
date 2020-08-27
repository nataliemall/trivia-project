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

  try {

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
    // console.log('temp24', temp24.rows)
    // //add error catch here for if more than one ID comes up (i.e. answered twice)
    
    // var temp24_ids = temp24.rows[0];
    // console.log('temp24_ids', temp24_ids);
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

} catch (err) {
    console.error(err);
    res.send("Error in adding question: ", err);
}

});

app.put('/table_update/', async (req, res) => { //adds a question to the trivia_questions database

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
    console.log('made it inside "retrieve quesion" ' )
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

    let sql = 'SELECT id, question, answera, answerb, answerc, answerd FROM  trivia_questions WHERE id = $1';

    // let sql5 = 'SELECT (id) FROM trivia_questions WHERE id = $1';
    let params = [question_id_var];

    const client = await pool.connect();
    const result = await client.query(sql, params);
    // const temp123 = await client.query(sql, params)
    // const name = temp123.rows;
    console.log('result', result)
    // return 
    client.release();

    var name5_unbracketed = result.rows[0].id; //question id
    var temp25 = JSON.stringify({id: name5_unbracketed})

    console.log('temp25', temp25);
    // return
    // var combined_sender = Object.assign(temp25);
    var combined_sender = JSON.stringify({id: result.rows[0].id});

    var combined_sender2 = ({id: result.rows[0].id, question: result.rows[0].question, answera: result.rows[0].answera, answerb: result.rows[0].answerb, answerc: result.rows[0].answerc, answerd: result.rows[0].answerd })
    console.log('combined', combined_sender2); 
    res.send(combined_sender2);
    
  } catch (err) {
        console.error(err);
        res.send("Error " + err);
      } 

  console.log('test retrieve question')
})


// app.put('/retrieve_question/', async (req, res) => { //obsolete? 

//   try {
//     const client = await pool.connect();

//     //select the current 
//     const message = req.body.mykey; //"${message}"
//     console.log('message', message);

//     res.send( "sent" );  // do we actually want to send anything?
//     client.release(); //changed from 'release' to 'end'
//   } catch (err) {
//     console.error(err);
//     res.send("Error " + err);
//   } 

//     });


app.put('/guess_update/', async (req, res) => {
// await fakeNetworkDelay();

  // try {

    //select the current 
    const name = req.body.name;
    // const player_answer = req.body.player_answer; //"${message}"
    const guess = req.body.guess;
    const ref_num = req.body.ref_num; // question number from html page
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


    // original_submission = 2
    console.log('refresh test');
    if (temp23_ids) { //if this is an emply array, it means there hasn't been a previous answer submission

        var original_submission = 0;
        console.log('repeat player');

        var submission_string = JSON.stringify({grade :original_submission});
        res.send(submission_string);

     } else {
        console.log('nonrepeater');
        var original_submission = 1;
    }


    // tests if submitting on the correct page
    var q_title = 'Test';
    let sql_q_id = 'SELECT id, revealed_question FROM current_question WHERE question_written = $1';
    let q_params = [q_title];
    const q_client = await pool.connect();
    const { rows: q_name } = await q_client.query(sql_q_id, q_params)
    q_client.release();    
    var q_unbracketed = q_name[0];
    console.log('q_unbracketed', q_unbracketed);

    var question_id_var = parseInt(q_unbracketed.id);
    var revealed_q = parseInt(q_unbracketed.revealed_question);
    console.log('*****');
    console.log('question_id_var', question_id_var);  // checkout 
    console.log('ref_num', parseInt(ref_num));
    console.log('revealed_q', revealed_q);
    var ref_num_int = parseInt(ref_num);


    if (question_id_var !== ref_num_int) { //submitted question must be the current question in order to proceed
        // (otherwise will get caught in this step)

        var original_submission = 5;
        console.log('Wrong question');

        var submission_string = JSON.stringify({grade :original_submission});
        res.send(submission_string);

    } else if (ref_num_int == revealed_q) { //will get caught here if the submitted question is also the revealed question
        console.log('question already revealed');
        var original_submission = 6;
        var submission_string = JSON.stringify({grade :original_submission});
        res.send(submission_string);        

    } else {
        console.log('user on correct question page')
    try {
        console.log('original_submission value', original_submission);
        if  (original_submission == 1) { //occurs if player has not yes submitted for this question
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
        client11.release()
        if (correct_answer == guess) {
          console.log('answer was correct! direct to results page')
          const client12 = await pool.connect();
          // let sql12 = 'UPDATE (points) FROM player_guesses WHERE id = $1'
          let sql12 = 'UPDATE player_guesses SET points = 1 WHERE question = $1 AND name = $2';
          let params12 = [ref_num, name];
          client12.query(sql12, params12);
          client12.release();

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
  // client11.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    } 

    }

    });


app.get('/player_scores/', async (req, res) => {  //this should hopefully be obsolete? - definitely not

  
  try {

    var q_title = 'Test';
    let sql_q_id = 'SELECT (revealed_question) FROM current_question WHERE question_written = $1';
    let q_params = [q_title];
    const q_client = await pool.connect();
    const { rows: q_name } = await q_client.query(sql_q_id, q_params)
    q_client.release();    
    var q_unbracketed = q_name[0];
    console.log('q_unbracketed', q_unbracketed);

    var revealed_id_var = q_unbracketed.revealed_question;
    console.log('revealed_id_var', revealed_id_var);





    const client13 = await pool.connect();
    let sql13 = 'SELECT * FROM player_guesses WHERE question = $1'; //needs to update according to question
    // params = ['53']; //hard-coded for now - fix this
    let params = [ revealed_id_var ]
    const { rows: name13 } = await client13.query(sql13, params);
    // console.log('most recent guess', name13[0]);  //shouldn't the query have all the player_guesses?
    console.log('player guesses', name13);

    client13.release();

    var player_name = name13[0];
    // player_name_json = JSON.stringify({name: player_name});
    player_name_json = JSON.stringify(name13);
    console.log('player_name_json', player_name_json)


    // let sql27 = 'SELECT * FROM trivia_questions WHERE id = $1';
    // const {rows: name27} = await client13.query(sql27, params);
    // var revealed_question = name27[0];
    // console.log('current question name27:', name27);

    // client13.release();



    res.send(player_name_json);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  } 
})


app.get('/cumulative_scores/', async (req, res) => {  //sends the cumulative scores to score_page.js

    try {

        console.log('made it to line 443');
        const client32 = await pool.connect();
        let sql32 = 'SELECT name, cumulative_score FROM recent_guesses'
        const {rows: name32} = await client32.query(sql32);
        console.log('cumulative scores', name32);

        cumulative_scores = JSON.stringify(name32)

        res.send(cumulative_scores);
        client32.release();
    } catch (err) {
        console.error(err);
        res.send("Error on cumulative_scores side" + err);
    }

})



app.put('/reveal_score/', async (req, res) => {  
    // updates revealed_question column of current_question data table 
    // to reveal score of new question
    // will also re-accumulate total scores of active players 

    const name = req.body.name;
    console.log('player question', name);

    if (name === 'Natalie') {
    const client25 = await pool.connect();

    let sql26 = 'SELECT id FROM current_question'
    const  {rows: temp26}  = await client25.query(sql26); 

    // var question_to_reveal = 47  // temporarily hardcoded 
    var question_to_reveal = temp26[0].id 
    let sql25 = 'UPDATE current_question SET revealed_question = $1';
    let params25 = [ question_to_reveal  ]
    const  temp25  = await client25.query(sql25, params25 ); 


    // re-accumulate total scores of active players: 

    let sql28 = 'SELECT name FROM player_guesses WHERE question = $1';
    const {rows: temp28} = await client25.query(sql28, params25 );
    console.log('temp28', temp28);

    // let sql29 = 'SELECT name, sum(points) AS total_score FROM player_guesses WHERE created_at > $1 AND name = $2 GROUP BY name'   
    // // ^^ this is where to start tomorrow - put this in the loop below to add to the recent_guesses table
    // // 'LEFT JOIN recent_guesses ON recent_guesses.name = player_guesses.name'
    // // 'UPDATE '
    // let params29 = [ '2020-08-08', 'Alice' ]
    // const {rows: temp29} = await client25.query(sql29, params29 );
    // console.log('temp29', temp29) //cumulate scores of each player

    // select names of everyone who has played this round (or since a certain time)
    // select totals for each of those players 
    // update recent_guesses to show the cumulative score 

    // var cumulative_scores = temp29[0] // use loop to retrieve every value
    // console.log('cumulative_scores', cumulative_scores )
    //insert cumulative scores into the recent_guesses data table


    let sql30 = 'SELECT name FROM recent_guesses'
    const {rows: temp30} = await client25.query(sql30)
    console.log('names of participants:', temp30)


    var i; 
    for (i = 0; i < temp30.length; i++) {
        console.log(temp30[i].name) // find each of these players' cumulative scores and place each of these into recent_guesses





        let sql29 = 'SELECT name, sum(points) AS total_score FROM player_guesses WHERE created_at > $1 AND name = $2 GROUP BY name'   
        // ^^ this is where to start tomorrow - put this in the loop below to add to the recent_guesses table
        // 'LEFT JOIN recent_guesses ON recent_guesses.name = player_guesses.name'
        // 'UPDATE '
        let params29 = [ '2020-08-08', temp30[i].name ]
        console.log('params29', params29)
        const {rows: temp29} = await client25.query(sql29, params29 );
        console.log('temp29', temp29) //cumulate scores of each player

        var player_score = temp29[0].total_score;
        console.log('player_score', player_score);

        let sql31 = 'UPDATE recent_guesses SET cumulative_score = $1 WHERE name = $2' // use inner join to combine subset of recent_guesses with player_guesses
        let params31 = [ temp29[0].total_score , temp30[i].name]
        const {rows: temp31} = await client25.query(sql31, params31)


    };
    // for i in 
    client25.release();

    res.send(cumulative_scores)
    }

    // console.log('reveal score code goes here');
})


app.get('/closed_submission/', async (req, res) =>{
})


app.get('/retrieve_revealed_question/', async (req, res) => {
// displays revieled question on score_page

  try{

    //reaches into current_question table to retrieve revealed_question
    var q_title = 'Test';
    let sql_q_id = 'SELECT (revealed_question) FROM current_question WHERE question_written = $1';
    let q_params = [q_title];
    const q_client = await pool.connect();
    const { rows: q_name } = await q_client.query(sql_q_id, q_params)
    q_client.release();    
    var q_unbracketed = q_name[0];
    console.log('q_unbracketed', q_unbracketed);

    var revealed_id_var = q_unbracketed.revealed_question;
    console.log('revealed_id_var', revealed_id_var);


    //reaches into current_question table to retrieve current question
    // var q_title = 'Test';
    // let sql_q_id = 'SELECT (id) FROM current_question WHERE question_written = $1';
    // let q_params = [q_title];
    // const q_client = await pool.connect();
    // const { rows: q_name } = await q_client.query(sql_q_id, q_params)
    // q_client.release();    
    // var q_unbracketed = q_name[0];
    // console.log('q_unbracketed', q_unbracketed);

    // var question_id_var = q_unbracketed.id;
    // console.log('question_id_var', question_id_var);


    // var question_id = 8;  //hard-coded way  where the question is chosen 

    let sql = 'SELECT id, question, answera, answerb, answerc, answerd, correctanswer FROM trivia_questions WHERE id = $1';

    // let sql5 = 'SELECT (id) FROM trivia_questions WHERE id = $1';
    let params = [revealed_id_var];

    const client = await pool.connect();
    const result = await client.query(sql, params);
    // const temp123 = await client.query(sql, params)
    // const name = temp123.rows;
    console.log('result', result)
    // return 
    client.release();

    var name5_unbracketed = result.rows[0].id; //question id
    var temp25 = JSON.stringify({id: name5_unbracketed})

    console.log('temp25', temp25);
    // return
    // var combined_sender = Object.assign(temp25);
    var combined_sender = JSON.stringify({id: result.rows[0].id});

    var combined_sender2 = ({id: result.rows[0].id, question: result.rows[0].question, answera: result.rows[0].answera, answerb: result.rows[0].answerb, answerc: result.rows[0].answerc, answerd: result.rows[0].answerd, correctanswer : result.rows[0].correctanswer })
    console.log('combined', combined_sender2); 
    res.send(combined_sender2);
    
  } catch (err) {
        console.error(err);
        res.send("Error " + err);
      } 

  console.log('test retrieve question')
})



app.get('/check_current_question/', async (req, res) => {
    //checks that question for submission is the up-to-date one, otherwise refreshes page- OBsolete??
    console.log('made it inside "check_current_question" ' )
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

    } catch (err) {
        console.log(err)
    }
    } );






//port listening, which happens once at the end of the code 
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

