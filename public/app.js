//triva-crowds
var question_submission_mode = 0; 

console.log('hello from the client side')

const q1 = document.getElementById('q1');
const submit_button = document.getElementById('submit_button');


if (question_submission_mode === 0) {
  const closed = document.getElementById('closed');
  closed.innerHTML = 'sorry, question submissions are now closed. Write down you ideas and save them for later!';

}

if (question_submission_mode === 1) {

submit_button.addEventListener('click', () => {
    console.log('TEST2')
    console.log(document.getElementById('q1').value)

    // const jsonstring2 = '{"mykey": "' + (document.getElementById('happy_thought').value) + '"}'; //this worked

    const name = document.getElementById('name').value;
    const QValue = document.getElementById('q1').value;
    const a1 = document.getElementById('answerA').value;
    const a2 = document.getElementById('answerB').value;
    const a3 = document.getElementById('answerC').value;
    const a4 = document.getElementById('answerD').value;
    const correctAnswer = document.getElementById('correct_answer').value

    const mykey2 = { "name" : name, "mykey" : QValue, "answerA" : a1, "answerB" : a2, 
    "answerC": a3, "answerD" :a4, "correctAnswer" : correctAnswer }

    console.log(QValue)
    console.log(mykey2)

    const bobcatStr = JSON.stringify(mykey2);
    console.log(bobcatStr);
    // var jsonString = JSON.stringify(jsonConst)
    // console.log(jsonConst) // does "mykey" need quotes around it?
    // console.log(jsonString)

    // const jsonConst = '{"mykey": "bigcat2"}';
    // console.log(jsonstring2)
    // const jsonConst2 = JSON.stringify(jsonConst),

    fetch('/table_update/', {
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
    })

    console.log('TEST');
})

} else {
        console.log('Error: closed for submission');
        const still_closed = document.getElementById('still_closed');
        still_closed.innerHTML = 'This button will not actually work-  save your question for the next round!';
      }

