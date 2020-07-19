console.log('hello from the trivia question client side')


const displayElement = document.getElementById('current_question');
const ref_num = document.getElementById('question_ref_num');
const buttona = document.getElementById('optiona');
const submit_button = document.getElementById('submit_button');


// fetch('/retrieve_question/', {
//   method: 'GET',
//   // body: JSON.stringify(jsonConst),
//   // body: '{"mykey": "bigcat2"}',
//   // body: bobcatStr,
//   // headers: {
//   // // 'Accept': 'application/json',
//   // 'Content-Type': 'application/json'
//   // 'Content-Type': 'text/plain'

//   // 'Content-Type': 'application/x-www-form-urlencoded',
//   // } 
//   }).then(() => {
//   // TODO something
//   // refreshDisplay();  //add back in when ready to fetch a webpage saying "submission completed"
//   console.log('test FETCH');
//   // refreshDisplay();
// });

function refreshDisplay() {
  fetch('/retrieve_question/') // gets /api/messages (GET is the default)
    .then(result => result.json() // console.log(result) 
      )
    // .then(console.log(result))
    .then(data => displayMessage(data) //console.log(data)
      )
    .catch(error => console.log('There was an error', error));
}

function wasitcorrect(data){
    console.log('put the function here')
    // fetch('/results.html', {method: 'GET'})
}
// fetch('/retrieve_question/') // gets /api/messages (GET is the default)
//     .then(result => result.json() // console.log(result) 
//       )
//     // .then(console.log(result))
//     .then(data => displayMessage(data) //console.log(data)
//       )
//     .catch(error => console.log('There was an error', error));


function displayMessage(message1) {   

  // var test5 = JSON.stringify(recent_quotes); // stringify = recipricol (parse)
  // var test7 = JSON.parse(test5);
  // console.log(message_parsed)

  // var current_question = message_parsed['row'];
  // console.log('test11', test11);

  // console.log(message1);
  // console.log(message1['id']);
  // var question_id = message1['id'];
  // console.log(question_id);

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



  // var label = document.getElementsByTagName('label') [0];
   // this does not work
  // label.innerHTML = 'junk';
  // var i;
  //   for (i = 0; i < info; i++) {
  //   // text += cars[i] + "<br>";
  //   variable_name = test7[i];
  //   console.log(variable_name);

  //   displayElement.innerHTML += ( test7[i].name + '<br>' )
  //   // .map(record => JSON.stringify(record))
  //   // .join('<br>');
  //   }
}

// displayElement.innerHTML = "Here is the question coming from the .js file"; 

// const objValue = document.getElementById('happy_thought').value;

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
        

    // console.log(document.getElementById('q1').value)

    // const jsonstring2 = '{"mykey": "' + (document.getElementById('happy_thought').value) + '"}'; //this worked

    const name = document.getElementById('player_name').value;
    // const question_ref_num = document.getElementById('ref_num').value;
    // var question_id = message1['id'];
    // console.log('the question id:', question_id);

    var ref_num2 = ref_num.innerHTML
    console.log('ref num:', ref_num2)

    const mykey2 = { "name" : name, "guess" : player_answer, "ref_num" : ref_num2}     
    // const mykey2 = { "name" : name, "guess" : player_answer, "question" : question_id }

    // console.log(QValue)
    console.log("mykey2", mykey2)

    const bobcatStr = JSON.stringify(mykey2);
    console.log(bobcatStr);

    fetch('/guess_update/', {
      method: 'PUT',
      body: bobcatStr,
      headers: {
      'Content-Type': 'application/json'
      } 
      }).then(response => response.json())
        .then(data => wasitcorrect(data));

    fetch('/results.html', {method: 'GET'});

    // var current_score = data;
    // console.log('was she correct?', current_score);

    // console.log('the question id:', question_id);

    // fetch('/thanks_for_answering/', {  //include later once a thankyou page is complete
    //   method: 'GET'
    // });


    console.log('TEST');
})



