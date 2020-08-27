console.log('hello from the trivia question client side')


const displayElement = document.getElementById('current_question');
const ref_num = document.getElementById('question_ref_num');
const buttona = document.getElementById('optiona');
const submit_button = document.getElementById('submit_button');

var passed_id = '9';

function refreshDisplay() {
  fetch('/retrieve_question/') // gets /api/messages (GET is the default)
    .then(result => result.json() // console.log(result) 
      )
    // .then(console.log(result))
    .then(data => displayMessage(data)
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


function displayMessage(message1) {   


  displayElement.innerHTML = message1['question'];   // clear old stuff in displayElement:
  ref_num.innerHTML = message1['id'];

  buttona.innerHTML = 'TESTbutton';
  document.getElementById("optiona").innerHTML = 
  'TESTbutton2';

  var r = document.getElementsByTagName("label");  
  r[1].innerHTML = message1['answera'];
  r[2].innerHTML = message1['answerb'];
  r[3].innerHTML = message1['answerc'];
  r[4].innerHTML = message1['answerd'];

}

// displayElement.innerHTML = "Here is the question coming from the .js file"; 


const objValue = 'TEST4'
const mykey2 = { "mykey" : objValue};
console.log(objValue)
console.log(mykey2)

const bobcatStr = JSON.stringify(mykey2);
console.log(bobcatStr);


refreshDisplay();

submit_button.addEventListener('click', () => {

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


    fetch('/guess_update/', {
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
          window.location.href = 
          "/results.html?Page=data&name=" + nameParam + "&question=" 
          + questionParam + "&guess=" + guessParam + "&player_eval=" + player_eval;
          }

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

 

})



