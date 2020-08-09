console.log('hello from the score_page')

const displayElement = document.getElementById('past_question');
const answers = document.getElementById('past_answers');



function displayQuestion(message1) {   


  console.log('message1', message1);

  console.log(message1[1])


  var lengthm = message1.length;
  // var table = document.getElementById("past_question");
  
  displayElement.innerHTML = message1.question;
  
  var info = Object.keys(message1).length;
  
  // var i;
  //   for (i = 0; i < info; i++) {
  //   // text += cars[i] + "<br>";
  //   variable_name = test7[i];
  //   console.log(variable_name);

  answers.innerHTML = ( message1.answera + '<br>' );
  answers.innerHTML += ( message1.answerb + '<br>' );
  answers.innerHTML += ( message1.answerc + '<br>' );
  answers.innerHTML += ( message1.answerd + '<br>' );

  // }

//   for (var key in message1) {
//     //var data = '<option value="' + escapeHTML(i) +'">" + escapeHTML(i) + "</option>';
//     // option.text = message1[key];
//     // option.value = key;
//     // options.push(option.outerHTML);

//     answers.innerHTML += ( message1[key].name + '<br>' )
// }

  }



function refreshDisplay() {
  fetch('/retrieve_revealed_question/') // gets /api/messages (GET is the default)
    .then(result => result.json() // console.log(result) 
      )
    // .then(console.log(result))
    .then(data => displayQuestion(data)
      )
    .catch(error => console.log('There was an error', error));
}


function displayMessage(scores) {   


  console.log('scores', scores);

  console.log(scores[1])


  var lengthm = scores.length;
  var table = document.getElementById("scoreTable");
  var i;
  for (i = 0; i < scores.length; i++) {
    // text += cars[i] + "<br>";
    var row = table.insertRow(i+1);
    var cell1 = row.insertCell(0)
    cell1.innerHTML = scores[i].name;

    var cell2 = row.insertCell(1)
    cell2.innerHTML = scores[i].guess;


  }

//   for (var key in message1)
// {
//     //var data = '<option value="' + escapeHTML(i) +'">" + escapeHTML(i) + "</option>';
//     option.text = message1[key];
//     option.value = key;
//     options.push(option.outerHTML);
// }

  // console.log('message2', message2);

  // displayElement.innerHTML = message2;   // clear old stuff in displayElement:

  // myFunction()
  // ref_num.innerHTML = message1['id'];

  // buttona.innerHTML = 'TESTbutton';
  // document.getElementById("optiona").innerHTML = 
  // 'TESTbutton2';

  // var r = document.getElementsByTagName("label");  
  // r[1].innerHTML = message1['answera'];
  // r[2].innerHTML = message1['answerb'];
  // r[3].innerHTML = message1['answerc'];
  // r[4].innerHTML = message1['answerd'];

}


function display_results() {

    fetch('/player_scores/')
    .then(result => result.json() // console.log(result) 
      )
    // .then(console.log(result))
    .then(data => displayMessage(data)
      )
    .catch(error => console.log('There was an error', error));

};


refreshDisplay();
display_results();



