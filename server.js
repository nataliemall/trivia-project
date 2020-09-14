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


app.get('/db', async (req, res) => {     
//creating the database if postgresQL
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


    // add update of reveal_score here
    let sql38 = 'UPDATE current_question SET reveal_scores = $1'
    let params38 = ['false'];
    const  {rows: temp38}  = await client24.query(sql38, params38); 


    let sql24 = 'UPDATE current_question SET id = $1';
    let params24 = [ question_id  ]
    const  temp23  = await client24.query(sql24, params24 ); 
    // console.log('temp24', temp24.rows)
    // //add error catch here for if more than one ID comes up (i.e. answered twice)
    
    // var temp24_ids = temp24.rows[0];
    // console.log('temp24_ids', temp24_ids);
    // var guess_id_formatted23 = temp23_ids.id;

    client24.release();
    var response1 = JSON.stringify({response :"Question updated"});
    res.send(response1);
    } else {
        console.log('incorrect username');
        var response = ('incorrect username');
        // var response2 = JSON.object(response);
        // var incorrect = JSON.stringify(response2);
        var response2 = JSON.stringify({response :"wrong username"});
        console.log('response2', response2);
        res.send(response2);
    }

    } catch (err) {
        console.error(err);
        res.send("Error in adding question: ", err);
    }
    });


app.put('/table_update/', async (req, res) => { 
//adds a question to the trivia_questions database

  try {
    const client = await pool.connect();

    //select the current 
    const name = req.body.name;
    const question = req.body.mykey; //"${message}"
    const answer1 = req.body.answerA;
    const answer2 = req.body.answerB;
    const answer3 = req.body.answerC;
    const answer4 = req.body.answerD;
    const correct_answer = req.body.correctAnswer;



    // scramble the answers: 

    function shuffle(array) {
          var currentIndex = array.length, temporaryValue, randomIndex;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }

          return array;
        }

    // Used like so
    var arr = [answer1, answer2, answer3, answer4];
    shuffle(arr);
    console.log('shuffled array', arr);

    answerA = arr[0];
    answerB = arr[1];
    answerC = arr[2];
    answerD = arr[3]; 

    //match scrambled with correct answer: 
    switch (correct_answer) {
        case "A":
            // console.log('correct answer was A')
            written_answer = answer1
            break;
        case "B":
            // console.log('correct answer was B')
            written_answer = answer2
            break;
        case "C":
            // console.log('correct answer was C')
            written_answer = answer3
            break;
        case "D":
            // console.log('correct answer was D')
            written_answer = answer4
            break;
        }

    switch (written_answer) {
        case answerA:
            // console.log('correct answer is now moved to A')
            answer_location = 'A'
            break;
        case answerB:
            // console.log('correct answer is now moved to B')
            answer_location = 'B'
            break;
        case answerC:
            // console.log('correct answer is now moved to C')
            answer_location = 'C'
            break;
        case answerD:
            // console.log('correct answer is now moved to D')
            answer_location = 'D'
            break;

    }


    console.log('message', question);
    console.log('answers', name, answerA, answerB, answerC, answerD, answer_location);

    let sql = 'INSERT INTO trivia_questions (name, question, answera, answerb, answerc, answerd, correctAnswer) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    let params = [ name, question, answerA, answerB, answerC, answerD, answer_location ];
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
// retrieves list of trivia questions for admin selection

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
// retrieve current question for player to guess
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

app.put('/guess_update/', async (req, res) => {
// updates player's guess into the server, checking beforehand that player hasn't already submitted 

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


app.get('/player_scores/', async (req, res) => {  
// updates players' scores for current question
  
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

    res.send(player_name_json);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  } 
})


app.get('/cumulative_scores/', async (req, res) => {  
//sends the cumulative scores to score_page.js

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

    let sql37 = 'UPDATE current_question SET reveal_scores = $1'
    let params37 = ['true'];
    const  {rows: temp37}  = await client25.query(sql37, params37); 


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


        try {
        // let sql33 = 'SELECT DATE_TRUNC($1, round_start) FROM current_question';
        // let params33 = ['minute']
        let sql33 = 'SELECT round_start_str FROM current_question'
        const {rows: temp33} = await client25.query(sql33);
        console.log('temp33', temp33);
        var game_start_time = temp33[0].round_start_str;
        console.log('game_start_time', game_start_time);
        // var game_start_string = game_start_time.toString();
        // console.log('game_start_string', game_start_string);


        let sql29 = 'SELECT name, sum(points) AS total_score FROM player_guesses WHERE created_at > $1 AND name = $2 GROUP BY name'   
        // ^^ this is where to start tomorrow - put this in the loop below to add to the recent_guesses table
        // 'LEFT JOIN recent_guesses ON recent_guesses.name = player_guesses.name'
        // 'UPDATE '
        // let params29 = [ '2020-09-05 23:13:03', temp30[i].name ]  //HERE
        let params29 = [ game_start_time, temp30[i].name ]  

        console.log('params29', params29)
        const {rows: temp29} = await client25.query(sql29, params29 );
        console.log('temp29', temp29) //cumulate scores of each player

        var player_score = temp29[0].total_score;
        console.log('player_score', player_score);

        let sql31 = 'UPDATE recent_guesses SET cumulative_score = $1 WHERE name = $2' // use inner join to combine subset of recent_guesses with player_guesses
        let params31 = [ temp29[0].total_score , temp30[i].name]
        const {rows: temp31} = await client25.query(sql31, params31)
        } catch {
            console.log('player has not yet won a point:',temp30[i].name);
            let sql34 = 'UPDATE recent_guesses SET cumulative_score = $1 WHERE name = $2' // use inner join to combine subset of recent_guesses with player_guesses
            let params34 = [ '0' , temp30[i].name]
            const {rows: temp31} = await client25.query(sql34, params34)

        }   

    };
    // for i in 
    client25.release();

    // res.send(cumulative_scores)
    }

    // console.log('reveal score code goes here');
})


app.put('/clear_score/', async (req, res) => {  
// updates current_question.round_start_str
// to create new start time

    const name = req.body.name;
    console.log('player question', name);

    if (name === 'Natalie') {
    const client25 = await pool.connect();

    let sql26 = 'SELECT id FROM current_question'
    const  {rows: temp26}  = await client25.query(sql26); 

    let sql35 = 'UPDATE current_question SET round_start_str = $1 WHERE question_written = $2';
    // let sql36 = 'SELECT NOW()' // convert this to GMT (greenwich mean time)
    let sql36 = 'SELECT now()::timestamp' ; // set timezone setting postgres

    const  {rows: temp36}  = await client25.query(sql36); 

    let current_time = temp36[0].now;
    console.log('current_time', current_time)
    let params35 = [ current_time, 'Test']; 
    console.log('params35', params35)
    const  {rows: temp35}  = await client25.query(sql35, params35); 



    }
})


app.get('/retrieve_revealed_question/', async (req, res) => {
// displays revieled question on score_page

  try{

    const q_client = await pool.connect();
    let sql38 = 'SELECT reveal_scores FROM current_question WHERE question_written = $1'
    let params38 = ['Test'];
    const { rows: temp38 } = await q_client.query(sql38, params38)

    reveal_boolean = temp38[0].reveal_scores;
    console.log('reveal_boolean:', reveal_boolean);

    if (reveal_boolean) {

    //reaches into current_question table to retrieve revealed_question
    var q_title = 'Test';
    let sql_q_id = 'SELECT (revealed_question) FROM current_question WHERE question_written = $1';
    let q_params = [q_title];
    const { rows: q_name } = await q_client.query(sql_q_id, q_params)
    q_client.release();    
    var q_unbracketed = q_name[0];
    console.log('q_unbracketed', q_unbracketed);

    var revealed_id_var = q_unbracketed.revealed_question;
    console.log('revealed_id_var', revealed_id_var);

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

    var combined_sender2 = ({reveal_score: 'yes', id: result.rows[0].id, question: result.rows[0].question, answera: result.rows[0].answera, answerb: result.rows[0].answerb, answerc: result.rows[0].answerc, answerd: result.rows[0].answerd, correctanswer : result.rows[0].correctanswer })
    console.log('combined', combined_sender2); 
    res.send(combined_sender2);
    } else {
        // send an alternate version of combines_sender2 that says not to send data over 
        var combined_sender2 = ({reveal_score: 'no'});
        console.log('combined', combined_sender2); 
        res.send(combined_sender2)

    }
  } catch (err) {
        console.error(err);
        res.send("Error " + err);
      } 

  console.log('test retrieve question')
})


app.put('/add_player/', async (req, res) => {
// adds player to the cumulative score database
    let nametoadd = req.body.name_to_add;
    console.log('nametoadd:', nametoadd)
    let add_or_remove = req.body.add_or_remove;
    console.log('nametoadd', nametoadd);
    console.log('add_or_remove', add_or_remove);


    let nametoadd2 = 'Test4'
    let sql39;
    let client39; 
    try {
        client39 = await pool.connect();
        let add_or_remove2 = JSON.stringify(add_or_remove.toString());  // problem here w converting to string
        console.log('add_or_remove2', add_or_remove2);
        if (add_or_remove == 'add') {   
            console.log('Inside if statement')   
            sql39 = 'INSERT INTO recent_guesses(name) VALUES ($1)'
        } else if (add_or_remove == 'remove') {
            sql39 = 'DELETE FROM recent_guesses WHERE name = $1'
        }
    } catch {
        console.log('error1')
    }

    console.log('sql39', sql39)
    try {
        let params39 = [ nametoadd ]
        const  {rows: temp39}  = await client39.query(sql39, params39); 
    } catch (err) {
        console.log('error2', err)
    }


})

// app.get('/check_current_question/', async (req, res) => {
// //checks that question for submission is the up-to-date one, otherwise refreshes page- OBsolete??
//     console.log('made it inside "check_current_question" ' )
//   try{

//     //reaches into current_question table to retrieve current question
//     var q_title = 'Test';
//     let sql_q_id = 'SELECT (id) FROM current_question WHERE question_written = $1';
//     let q_params = [q_title];
//     const q_client = await pool.connect();
//     const { rows: q_name } = await q_client.query(sql_q_id, q_params)
//     q_client.release();    
//     var q_unbracketed = q_name[0];
//     console.log('q_unbracketed', q_unbracketed);

//     var question_id_var = q_unbracketed.id;
//     console.log('question_id_var', question_id_var);

//     } catch (err) {
//         console.log(err)
//     }
//     } );


//port listening, which happens once at the end of the code 
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

