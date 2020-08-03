
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

  // function selectElement(id, valueToSelect) {    
  //     let element = document.getElementById(id);
  //     element.value = valueToSelect;
  //     return element;
  // }
  
  // element2 = selectElement('correct_answer', '1')

  // console.log('element', element2);

  for(var key in message1) {
    var value = message1[key];
  }

  console.log('value', value);
  // const correctAnswer = document.getElementById('correct_answer').value


  const correctAnswer = document.getElementById('correct_answer')

  // adds the questions to the drop-down list: 

  var options = [];
  var option = document.createElement('option');

  for (var key in message1)
  {
      //var data = '<option value="' + escapeHTML(i) +'">" + escapeHTML(i) + "</option>';
      option.text = message1[key];
      option.value = key;
      options.push(option.outerHTML);
  }

  correctAnswer.insertAdjacentHTML('beforeEnd', options.join('\n'));



  console.log('correct_answer', correct_answer)
  displayElement.innerHTML = value





  var r = document.getElementsByTagName("label");  
  r[1].innerHTML = message1['answera'];
  r[2].innerHTML = message1['answerb'];
  r[3].innerHTML = message1['answerc'];
  r[4].innerHTML = message1['answerd'];

}



refreshDisplay();


submit_button.addEventListener('click', () => {
    console.log('TEST2')
    console.log(document.getElementById('correct_answer').value)

    // const jsonstring2 = '{"mykey": "' + (document.getElementById('happy_thought').value) + '"}'; //this worked

    const name = document.getElementById('name').value;
    const question_id = document.getElementById('correct_answer').value

    const mykey2 = { "name" : name, "question_id" : question_id }
    console.log(mykey2)

    const bobcatStr = JSON.stringify(mykey2);
    console.log(bobcatStr);


    fetch('/current_q_update/', {
      method: 'PUT',
      // body: JSON.stringify(jsonConst),
      // body: '{"mykey": "bigcat2"}',
      body: bobcatStr,
      headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json'
      // 'Content-Type': 'text/plain'

      // 'Content-Type': 'application/x-www-form-urlencoded',
      } 
      }).then(() => {
      // TODO something
      // refreshDisplay();  //add back in when ready to fetch a webpage saying "submission completed"
      console.log('test FETCH');
      // refreshDisplay();
    });


    console.log('TEST');
})








