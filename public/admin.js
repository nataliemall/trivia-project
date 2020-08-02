
const displayElement = document.getElementById('question_list');


function refreshDisplay() {
  fetch('/retrieve_list/') // gets /api/messages (GET is the default)
    .then(result => result.json() // console.log(result) 
      )
    // .then(console.log(result))
    .then(data => displayMessage(data)
      )
    .catch(error => console.log('There was an error', error));
}



function displayMessage(message1) {   

  console.log(message1);
  displayElement.innerHTML = message1   // clear old stuff in displayElement:
  // ref_num.innerHTML = message1['id'];

  // buttona.innerHTML = 'TESTbutton';
  // document.getElementById("optiona").innerHTML = 
  // 'TESTbutton2';

  var r = document.getElementsByTagName("label");  
  r[1].innerHTML = message1['answera'];
  r[2].innerHTML = message1['answerb'];
  r[3].innerHTML = message1['answerc'];
  r[4].innerHTML = message1['answerd'];

}

// displayElement.innerHTML = "Here is the question coming from the .js file"; 


refreshDisplay();









