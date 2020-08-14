console.log('hello from the score_page')

const displayElement = document.getElementById('past_question');
const answers = document.getElementById('past_answers');


function displayQuestion(message1) {   

  console.log('message1', message1);
  // console.log(message1[1])
  
  displayElement.innerHTML = message1.question;
  var info = Object.keys(message1).length;

  var correctanswer = message1.correctanswer

  function generateTableHead(table) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  }

  let table = document.querySelector("table");
  generateTableHead(table);

  answers.innerHTML =  ( 'A) ' + message1.answera + '<br>' );
  answers.innerHTML += ( 'B) ' + message1.answerb + '<br>' );
  answers.innerHTML += ( 'C) ' + message1.answerc + '<br>' );
  answers.innerHTML += ( 'D) ' + message1.answerd + '<br>' );
  }


function refreshDisplay() {
  fetch('/retrieve_revealed_question/') // gets /api/messages (GET is the default)
    .then(result => result.json() // console.log(result) 
      )
    .then(data => displayQuestion(data)
      )
    .catch(error => console.log('There was an error', error));
}


var table = document.getElementById("scoreTable");
console.log('table', table);



function displayMessage(scores) {   
  // console.log('scores', scores);
  // console.log(scores[0])

  var i;
  for (i = 0; i < scores.length; i++) {
    // text += cars[i] + "<br>";
    var row = table.insertRow(i+1);
    var cell1 = row.insertCell(0)
    cell1.innerHTML = scores[i].name;

    var cell2 = row.insertCell(1)
    cell2.innerHTML = scores[i].guess;

  }

}

async function display_results() {

    fetch('/player_scores/')
    .then(result => result.json() // console.log(result) 
      )
    .then(data => displayMessage(data)
      )
    .catch(error => console.log('There was an error', error));

};


function displayTotals(cumulative_scores) {   //still needs to be updated 

  console.log('inside cumulative_scores function');
  try {
  console.log('cumulative_scores', cumulative_scores);

  console.log('cumulative as object', cumulative_scores[0])


  var lengthm = cumulative_scores.length;
  var cumulativeTable = document.getElementById("cumulativeTable");
  var i;
  console.log('table2', table);
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

function display_cumulative_scores() {
  fetch('/cumulative_scores/')
  .then(console.log('already fetched cumulative_scores'))
  .then(result => result.json()
    )
  .then(console.log('result achieved'))
  .then(data => displayTotals(data)
    )
  .catch(error => console.log('Error in displaying cumulative_scores', error))
};

refreshDisplay();


function display_updates() {
  display_results()
  .then(display_cumulative_scores())
}

display_updates();


