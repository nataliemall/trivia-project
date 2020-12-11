
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

}



refreshDisplay();

change_5x_button.addEventListener('click', () => {
// admin clicks to change question 

    // const jsonstring2 = '{"mykey": "' + (document.getElementById('happy_thought').value) + '"}'; //this worked

    const name = document.getElementById('name').value;
    const question_id = document.getElementById('correct_answer').value

    const mykey2 = { "name" : name, "question_id" : question_id }
    console.log(mykey2)

    const bobcatStr = JSON.stringify(mykey2);
    console.log(bobcatStr);

    var response_text = "";
    const submission_response = document.getElementById('submission_response');

    function change_question() {

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
        }).then((result) => result.json()
        ).then((variable) => {
          try{
            console.log('question update:', variable)
            var response_text = JSON.stringify(variable.response);
            console.log('question text:', variable.response);


            submission_response.innerHTML = response_text;
          } catch {
            console.log('Something else went wrong')
          }

        });
    }

    change_question()

    console.log('TEST');
    })




submit_button.addEventListener('click', () => {
// admin clicks to change question 

    // const jsonstring2 = '{"mykey": "' + (document.getElementById('happy_thought').value) + '"}'; //this worked

    const name = document.getElementById('name').value;
    const question_id = document.getElementById('correct_answer').value

    const mykey2 = { "name" : name, "question_id" : question_id }
    console.log(mykey2)

    const bobcatStr = JSON.stringify(mykey2);
    console.log(bobcatStr);

    var response_text = "";
    const submission_response = document.getElementById('submission_response');

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
      }).then((result) => result.json()
      ).then((variable) => {
        try{
          console.log('question update:', variable)
          var response_text = JSON.stringify(variable.response);
          console.log('question text:', variable.response);


          submission_response.innerHTML = response_text;
        } catch {
          console.log('Something else went wrong')
        }

      });

    console.log('TEST');
    })

total_score_button.addEventListener('click', () => {
//admin clicks to reveal total score

  function refreshDisplay() {

    fetch('/reveal_score/', {
          method: 'PUT',
          body: bobcatStr,
          headers: {
          'Content-Type': 'application/json'
          } 
          }
          )

    }

  const name = document.getElementById('name').value;
  // var name = 'test_name'
  const mykey2 = { "name" : name }     
  console.log("mykey2", mykey2)

  const bobcatStr = JSON.stringify(mykey2);
  console.log(bobcatStr);      

  refreshDisplay()

  });

current_score_button.addEventListener('click', () => {
//admin clicks to reveal CURRENT score (much less likely to crash)

  function refreshDisplay() {

    fetch('/reveal_current_score/', {
          method: 'PUT',
          body: bobcatStr,
          headers: {
          'Content-Type': 'application/json'
          } 
          }
          )

    }

  const name = document.getElementById('name').value;
  // var name = 'test_name'
  const mykey2 = { "name" : name }     
  console.log("mykey2", mykey2)

  const bobcatStr = JSON.stringify(mykey2);
  console.log(bobcatStr);      

  refreshDisplay()

  });

test_button.addEventListener('click', () => {
//admin clicks to reveal score x 5 

  function refreshDisplay() {

    fetch('/reveal_score/', {
          method: 'PUT',
          body: bobcatStr,
          headers: {
          'Content-Type': 'application/json'
          } 
          }
          )

    }

  const name = document.getElementById('name').value;
  // var name = 'test_name'
  const mykey2 = { "name" : name }     
  console.log("mykey2", mykey2)

  const bobcatStr = JSON.stringify(mykey2);
  console.log(bobcatStr);      

  refreshDisplay()
  refreshDisplay()
  refreshDisplay()
  refreshDisplay()
  refreshDisplay()

  });



start_new.addEventListener('click', () => {
// fetch something from server that replaces the current_question.round_start with now()

  function areYouSure() {
  confirm("Are you sure? This will clear all scores!");
  }

  function clear_score() {

    fetch('/clear_score/', {
            method: 'PUT',
            body: bobcatStr,
            headers: {
            'Content-Type': 'application/json'
              } 
            }
          )
    }

  const name = document.getElementById('name').value;
  const mykey2 = { "name" : name }     
  console.log("mykey2", mykey2)

  const bobcatStr = JSON.stringify(mykey2);
  console.log(bobcatStr);      

  areYouSure();
  clear_score();

})

add_players.addEventListener('click', () => {

  const name_to_add = document.getElementById('name_to_add').value;
  const name2addkey = { "name_to_add" : name_to_add, "add_or_remove" : 'add' }  
  const bobcatStr = JSON.stringify(name2addkey);
 
  fetch('/add_player/', {
            method: 'PUT',
            body: bobcatStr,
            headers: {
            'Content-Type': 'application/json'
              } 
  })
})

remove_players.addEventListener('click', () => {

  const name_to_add = document.getElementById('name_to_remove').value;
  const name2addkey = { "name_to_add" : name_to_add, "add_or_remove" : 'remove' }  
  const bobcatStr = JSON.stringify(name2addkey);
 
  fetch('/add_player/', {
            method: 'PUT',
            body: bobcatStr,
            headers: {
            'Content-Type': 'application/json'
              } 
  })
})





