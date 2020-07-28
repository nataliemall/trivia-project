console.log('hello from the results page')


const displayElement = document.getElementById('evaluation');

// - get name index 
// - ask server for "correct" vs "incorrect" value
// - update gif accordingly
// - currently the submission form cannot both updated the database (/guess_update/) 
//   and redirect to the results page  

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const player_name = urlParams.get('name');
const player_guess = urlParams.get('guess');
const current_question = urlParams.get('question');

console.log(player_name, player_guess, current_question);

// const player_letter = urlParams.get('options')



function refreshDisplay() {
  fetch('/score/') // gets /api/messages (GET is the default)
    .then(result => result.json() // console.log(result) 
      ).then(data => displayMessage(data) //console.log(data)
      ).catch(error => console.log('There was an error', error));
}


function displayMessage(message1) {   

//hacky way don't judge me
  console.log('results message', message1); //this currently returns entire database for Question #8
  // console.log('updated', message1.points);
  console.log('updated name', message1.name);
  // Pandu halp.  - us ID doh
  // console.log(message1.name.points)

  // if (player_letter == 'TestA') {
  //   console.log('player is correct');
  //   document.getElementById("myImg").src = "happykitty.gif";
  //   document.getElementById("evaluation").innerHTML = 'Correct!'
  // } else {
  //   console.log('player is incorrect');
  //   document.getElementById("myImg").src ="Pouty Yellow Cat GIF.gif"
  //   document.getElementById("evaluation").innerHTML = 'Sorry, better luck next time!'

  // } 


  // This will be the real way once the database updated upon submission 

  // console.log('results message', message1);
  // console.log(message1.name.points)

  if (message1.name == 1) {
    console.log('player is correct');
    document.getElementById("myImg").src = "happykitty.gif";
  } else if (message1 == 0) {
    console.log('player is incorrect');
    document.getElementById("myImg").src ="Pouty Yellow Cat GIF.gif"
  } 


}

refreshDisplay()
