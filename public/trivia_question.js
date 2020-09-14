console.log('hello from the trivia question client side')


const displayElement = document.getElementById('current_question');
const ref_num = document.getElementById('question_ref_num');
const buttona = document.getElementById('optiona');
const submit_button = document.getElementById('submit_button');

var passed_id = '9';
// var player_eval = 'tbd'

function refreshRetrieval() {
  fetch('/retrieve_question/') // gets /api/messages (GET is the default)
    .then(result => result.json() // console.log(result) 
      )
    // .then(console.log(result))
    .then(data => displayCurrentQ(data)
      )
    .catch(error => console.log('There was an error', error));
}

// var player_eval = 'test';
function wasitcorrect(data){
    console.log('put the function here');
    console.log('wasitcorrect', data);
    var player_eval = data['grade'];
    console.log('player_eval:', player_eval);
    if (player_eval == 0) {
      const repeat = document.getElementById('already_submitted');
      repeat.innerHTML = 'Sorry, you already submitted an answer';  // pandu how to prevent from continuing to the next page 
      // setTimeout(function() {}, 10);
      setTimeout(function(){ alert("Sorry, you've already submitted an answer!"); }, 1000);
      //put here to insert warning that player already submitted 
    } else if (player_eval == 5) {
      console.log('Wrong question! Try refreshing')
      setTimeout(function(){ alert("Whoops, wrong question, try refreshing the page!"); }, 1000);

    } else if (player_eval == 6) {
      console.log('Sorry, answer has already been revealed')
      setTimeout(function(){ alert("Sorry, the answer has already been revealed, better luck next time!"); }, 1000);

    } else {
    return player_eval;
    };

    // fetch('/results.html', {method: 'GET'}) //this doesn't work 
}


function displayCurrentQ(message1) {   


  displayElement.innerHTML = message1['question'];   // clear old stuff in displayElement:
  ref_num.innerHTML = message1['id'];

  buttona.innerHTML = 'TESTbutton';
  document.getElementById("optiona").innerHTML = 
  'TESTbutton2';

  var r = document.getElementsByTagName("label");  
  r[0].innerHTML = message1['answera'];
  r[1].innerHTML = message1['answerb'];
  r[2].innerHTML = message1['answerc'];
  r[3].innerHTML = message1['answerd'];

}

// displayElement.innerHTML = "Here is the question coming from the .js file"; 


const objValue = 'TEST4'
const mykey2 = { "mykey" : objValue};
console.log(objValue)
console.log(mykey2)

const bobcatStr = JSON.stringify(mykey2);
console.log(bobcatStr);


refreshRetrieval();

submit_button.addEventListener('click', () => {


    async function getPlayerSubmission() {

    if (document.getElementById("optiona").checked == true) {
        var player_answer = 'A'
        console.log('Option A was checked by the user')
    } else if (document.getElementById("optionb").checked == true) {
        var player_answer = 'B'
    } else if (document.getElementById("optionc").checked == true) {
        var player_answer = 'C'
    } else if (document.getElementById("optiond").checked == true) {
        var player_answer = 'D'
    }; 
    console.log('player answer:', player_answer)
        
    // const jsonstring2 = '{"mykey": "' + (document.getElementById('happy_thought').value) + '"}'; //this worked

    const name = document.getElementById('player_name').value;

    var ref_num2 = ref_num.innerHTML
    console.log('ref num:', ref_num2) //question_id - compare this number to current_question.id

    const mykey2 = { "name" : name, "guess" : player_answer, "ref_num" : ref_num2}     
    console.log("mykey2", mykey2)

    const bobcatStr = JSON.stringify(mykey2);
    console.log(bobcatStr);

    var nameParam = name;
    var questionParam = ref_num2;
    var guessParam = player_answer;


    var player_eval = await fetch('/guess_update/', {
      //puts guess into database 
      method: 'PUT',
      body: bobcatStr,
      headers: {
      'Content-Type': 'application/json'
      } 
      }
      ).then(result => result.json())
        .then(data => wasitcorrect(data))
        // .then(console.log('wasitcorrect has passed'))
        .then( (player_eval) => {
          console.log('player_eval', player_eval)

          if (player_eval) {

          console.log('player_eval has a value:', player_eval);
          // window.location.href = 
          // "/results.html?Page=data&name=" + nameParam + "&question=" 
          // + questionParam + "&guess=" + guessParam + "&player_eval=" + player_eval;


          }
          return player_eval
          }) //is there a way to get the res.send file from this? 

    // fetch('/')
      // ).then(result => result.json())
      //   .then(data => wasitcorrect(data))
      //   .then(console.log('wasitcorrect has passed'))
      //   .catch(error => console.log('There was an error', error));

    // fetch('/results.html', {method: 'GET'});  //this does not currently work
    // window.location.href = "http://trivia_.com";
    // window.location.href = '/results.html'; //relative to domain


    console.log('href location')

 


// ******************* Individual player eval ****************

// const displayElement = document.getElementById('evaluation');

// - get name index 
// - ask server for "correct" vs "incorrect" value
// - update gif accordingly
// - currently the submission form cannot both updated the database (/guess_update/) 
//   and redirect to the results page  

// const queryString = window.location.search;
// console.log(queryString);
// const urlParams = new URLSearchParams(queryString);
// const player_name = urlParams.get('name');
// const player_guess = urlParams.get('guess');
// const current_question = urlParams.get('question');
// const player_eval = urlParams.get('player_eval');

// console.log(player_name, player_guess, current_question);

  return player_eval;
  }


    async function displayInvidualEval(player_eval) {   

      let playerEval = await getPlayerSubmission()

      console.log('player eval after submitting:', playerEval)
      // console.log('player eval after submitting:', player_eval);

      if (playerEval == 'correct') {
        console.log('player is correct');

        var randomInt = Math.floor(Math.random() * 10);

        // case randomInt == 1
        switch (randomInt) {
          case 0:
            document.getElementById("myImg").src = "/success_folder/happykitty.gif";
                    document.getElementById("evaluation").innerHTML = 'Correct!'

            var test = '0';
            break;
          case 1: 
            document.getElementById("myImg").src = "/success_folder/success_baby.jpg";
                    document.getElementById("evaluation").innerHTML = 'Correct!'

            var test = '1';
            break;
          case 2:
            document.getElementById("myImg").src = "/success_folder/spongebob.jpg";
                        document.getElementById("myImg").height = "300";

                    document.getElementById("evaluation").innerHTML = 'Correct!'
            var test = '2';
            break;
          case 3:
            document.getElementById("myImg").src = "/success_folder/willywonka.jpg";
            document.getElementById("myImg").height = "300";

            document.getElementById("evaluation").innerHTML = 'Your doing pretty well'

            var test = '3';
            break;
          case 4:
                  document.getElementById("evaluation").innerHTML = 'Correct!'

            var test = '4';
            break;
          case 5:
                  document.getElementById("evaluation").innerHTML = 'Correct!'

            var test = '5';
            break;
          default: 
            document.getElementById("evaluation").innerHTML = 'Correct!'

        }

      console.log('randomInt', randomInt)


        // document.getElementById("evaluation").innerHTML = 'Correct!'
      } else {
        console.log('player is incorrect');
        // document.getElementById("myImg").src ="Pouty Yellow Cat GIF.gif"
        document.getElementById("evaluation").innerHTML = 'Sorry, better luck next time!'

      } 



        

    }

    displayInvidualEval();

})



// ***************** SCORE PAGE ********************


console.log('hello from the score_page')

const displayTitle = document.getElementById('recentQuestionResults')
const displayPastQuestion = document.getElementById('past_question');
const answers = document.getElementById('past_answers');
var reveal_score = 'yes';

async function displayQuestion(message1) { 

  var reveal_score = message1.reveal_score
  console.log('displayQuestion reveal_score:', reveal_score)
  displayTitle.innerHTML = '' //blank when question not yet revealed

  if (reveal_score == 'yes') {

    console.log('message1', message1);
    // console.log(message1[1])
    
    displayTitle.innerHTML = 'Player Results from past question:'
    displayPastQuestion.innerHTML = message1.question;
    var info = Object.keys(message1).length;

    var correctanswer = message1.correctanswer

    function generateTableHead(table) {
      let thead = table.createTHead();
      let row = thead.insertRow();
        // let th = document.createElement("th");
        // let text = document.createTextNode(key);
        // th.appendChild(text);
        // row.appendChild(th);

      for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
      }
    }

    let table = document.querySelector("table");
    let data = ['Correct Answer:', correctanswer];
    generateTableHead(table);

    answers.innerHTML =  ( 'A) ' + message1.answera + '<br>' );
    answers.innerHTML += ( 'B) ' + message1.answerb + '<br>' );
    answers.innerHTML += ( 'C) ' + message1.answerc + '<br>' );
    answers.innerHTML += ( 'D) ' + message1.answerd + '<br>' );
  } else {
      console.log('score not to be revealed at this time')
  }

    return reveal_score;
  }


//table head creator 
function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
    // let th = document.createElement("th");
    // let text = document.createTextNode(key);
    // th.appendChild(text);
    // row.appendChild(th);
    
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

async function refreshDisplay() {
  return fetch('/retrieve_revealed_question/') // gets /api/messages (GET is the default)
    .then(result => result.json() // console.log(result) 
      )
    .then(data => displayQuestion(data) //displays past question
      )
    .catch(error => console.log('There was an error', error))
}




function displayMessage(scores) {   // displays players' most recent guesses 
  // console.log('scores', scores);
  // console.log(scores[0])
  var table = document.getElementById("scoreTable");
  console.log('table', table);

  let data = ['Name:', 'Guess:'];
  generateTableHead(table, data);
  console.log('scores:', scores);
  var i;
  for (i = 0; i < scores.length; i++) {
    // text += cars[i] + "<br>";
    var row = table.insertRow(i+1);
    var cell1 = row.insertCell(0)
    cell1.innerHTML = scores[i].name;
    

    var cell2 = row.insertCell(1)
    cell2.innerHTML = scores[i].guess;

  }
  var testReturn = 'Test return_thing'
  return reveal_score

}

function foo(thing) {
  var foodie = 'foodie1'
  console.log('FOODIE')
  return foodie
}

async function display_results(reveal_score) {
    if (reveal_score == 'yes') {

    fetch('/player_scores/')  //how to put a return here without breaking - Pandu
    .then(result => {
      result.json() // console.log(result) 
      console.log('result:', result)
      })
    .then(data => displayMessage(data)
      )
    .catch(error => console.log('There was an error', error));
    } else {
      console.log('not set to reveal the score')
    }

};


function displayTotals(cumulative_scores) {   //still needs to be updated 

  console.log('inside cumulative_scores function');
  try {
  console.log('cumulative_scores', cumulative_scores);

  console.log('cumulative as object', cumulative_scores[0])


  var lengthm = cumulative_scores.length;
  var cumulativeTable = document.getElementById("cumulativeTable");

  let data = ['Name:', 'Cumulative Score:'];
  generateTableHead(cumulativeTable, data);


  var i;
  console.log('table2', cumulativeTable);
  for (i = 0; i < cumulative_scores.length; i++) {
    // text += cars[i] + "<br>";
    // var row = table.insertRow(i+1);
    console.log('cumulative_scores_array_val', cumulative_scores[i])
    var name = cumulative_scores[i].name;
    console.log('name', name)
    // find where "name" == name in the table, else insert row 
    try {
      // new idea: just put scores in a new table 

      var row = cumulativeTable.insertRow(i+1);
      var cell1 = row.insertCell(0)
      cell1.innerHTML = cumulative_scores[i].name;

      var cell2 = row.insertCell(1)
      cell2.innerHTML = cumulative_scores[i].cumulative_score;


      // var j; 
      // var displayed_names = cumulativeTable.rows[1].cells.item(0).innerHTML;
      // console.log('displayed_names', displayed_names);

      // console.log('inserting first player here under written player name');
      // var cell1 = table.insertCell(2);  //update cell with matching name with score in 3rd column 
      // cell1.innerHTML = cumulative_scores[i].cumulative_score;   //add cumulative scores 
    } catch (err) {
      console.log('creating new player row for person who did not guess this round', err);
    }
  }

  } catch (err) {
    console.log('error in displaying cumulative score', (err))
  }

}

function display_cumulative_scores(reveal_score) {
      if (reveal_score == 'yes') { //this should have been switched to no - pandu why
  fetch('/cumulative_scores/')
  .then(console.log('already fetched cumulative_scores'))
  .then(console.log('reveal_score display_cumulative_scores', reveal_score))
  .then(result => result.json()
    )
  .then(console.log('result achieved'))
  .then(data => displayTotals(data)
    )
  .catch(error => console.log('Error in displaying cumulative_scores', error))
    }
};


function display_updates() {
  refreshDisplay() // retrieves and displaysthe revealed past question
  .then((reveal_score) => {
    console.log('reveal_score', reveal_score); 
    display_results(reveal_score)}  //retrieves and displayes and most recent guesses 
  ).then((test) => {display_cumulative_scores(test) //retrieves and displays past scores
    console.log('test thing from display_cumulative_scores', test)
  })
}

  
  display_updates()
  
  //retrieves revealed question

// console.log('reveal_score', reveal_score);
// if (reveal_score == 'yes') {
// display_updates()
  


