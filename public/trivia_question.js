console.log('hello from the trivia question client side')


const displayElement = document.getElementById('current_question');
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

  var message_parsed = message1[0];
  var current_question = message_parsed['question'];
  // console.log('test11', test11);

  displayElement.innerHTML = current_question;    // clear old stuff in displayElement:

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
    console.log('TEST2')
    // console.log(document.getElementById('q1').value)

    // const jsonstring2 = '{"mykey": "' + (document.getElementById('happy_thought').value) + '"}'; //this worked

    const name = document.getElementById('name').value;
    // const player_guess = document.getElementById('player_guess').value;

    // const mykey2 = { "name" : name, "mykey" : QValue, "answerA" : a1, "answerB" : a2, 
    // "answerC": a3, "answerD" :a4, "correctAnswer" : correctAnswer }

    // console.log(QValue)
    // console.log(mykey2)

    // const bobcatStr = JSON.stringify(mykey2);
    // console.log(bobcatStr);

    // fetch('/table_update/', {
    //   method: 'PUT',
    //   body: bobcatStr,
    //   headers: {
    //   'Content-Type': 'application/json'
    //   } 
    //   }).then(() => {
    //   // TODO something
    //   // refreshDisplay();  //add back in when ready to fetch a webpage saying "submission completed"
    //   console.log('test FETCH');
    //   // refreshDisplay();
    // });

    // fetch('/thanks_for_answering/', {  //include later once a thankyou page is complete
    //   method: 'GET'
    // });


    console.log('TEST');
})



