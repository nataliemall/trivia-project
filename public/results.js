console.log('hello from the results page')


const displayElement = document.getElementById('evaluation');

//get name index 
// ask server for "correct" vs "incorrect" value
// update gif accordingly

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const player_name = urlParams.get('player_name')
console.log(player_name);

const player_letter = urlParams.get('options')


// var c = queryString.searchParams.get("player_name");
// console.log(c);

function refreshDisplay() {
  fetch('/score/') // gets /api/messages (GET is the default)
    .then(result => result.json() // console.log(result) 
      )
    // .then(console.log(result))
    .then(data => displayMessage(data) //console.log(data)
      )
    .catch(error => console.log('There was an error', error));
}


function displayMessage(message1) {   

//hacky way don't judge me
  console.log('results message', message1);
  console.log(message1.name.points)

  if (player_letter == 'TestA') {
    console.log('player is correct');
    document.getElementById("myImg").src = "happykitty.gif";
    document.getElementById("evaluation").innerHTML = 'Correct!'
  } else {
    console.log('player is incorrect');
    document.getElementById("myImg").src ="Pouty Yellow Cat GIF.gif"
    document.getElementById("evaluation").innerHTML = 'Sorry, better luck next time!'

  } 



  // console.log('results message', message1);
  // console.log(message1.name.points)

  // if (message1.name.points == 1) {
  //   console.log('player is correct');
  //   document.getElementById("myImg").src = "happykitty.gif";
  // } else if (message1.name == 0) {
  //   console.log('player is incorrect');
  //   document.getElementById("myImg").src ="Pouty Yellow Cat GIF.gif"
  // } 


}

refreshDisplay()
// fetch('/score/')

// function wasitcorrect(data) {
// 	console.log('the data', data)
// 	console.log('was it correct?');

// }


// function retrieve_correct_incorrect() {
//   fetch('/retrieve_question/') // gets /api/messages (GET is the default)
//     .then(result => result.json() // console.log(result) 
//       )
//     // .then(console.log(result))
//     .then(data => displayMessage(data) //console.log(data)
//       )
//     .catch(error => console.log('There was an error', error));
// };

// fetch('/guess_update/', {method: 'PUT'}
// 	).then(response => response.json())
//     .then(data => wasitcorrect(data));
