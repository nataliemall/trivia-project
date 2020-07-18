console.log('hello from the trivia question client side')


const displayElement = document.getElementById('current_question');
const submit_button = document.getElementById('submit_button');

displayElement.innerHTML = "Here is the question coming from the .js file"; 

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



