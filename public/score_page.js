console.log('hello from the score_page')

const displayElement = document.getElementById('current_question');


// function myFunction() {
//   var table = document.getElementById("scoreTable");
//   var row = table.insertRow(0);
//   var cell1 = row.insertCell(0);
//   var cell2 = row.insertCell(1);
//   cell1.innerHTML = "NEW CELL1";
//   cell2.innerHTML = "NEW CELL2";
// }


function displayMessage(message1) {   


  console.log('message1', message1);

  console.log(message1[1])


  var lengthm = message1.length;
  var table = document.getElementById("scoreTable");
  var i;
  for (i = 0; i < message1.length; i++) {
    // text += cars[i] + "<br>";
    var row = table.insertRow(i+1);
    var cell1 = row.insertCell(0)
    cell1.innerHTML = message1[i].name;

    var cell2 = row.insertCell(1)
    cell2.innerHTML = message1[i].guess;


  }

//   for (var key in message1)
// {
//     //var data = '<option value="' + escapeHTML(i) +'">" + escapeHTML(i) + "</option>';
//     option.text = message1[key];
//     option.value = key;
//     options.push(option.outerHTML);
// }

  // console.log('message2', message2);

  // displayElement.innerHTML = message2;   // clear old stuff in displayElement:

  // myFunction()
  // ref_num.innerHTML = message1['id'];

  // buttona.innerHTML = 'TESTbutton';
  // document.getElementById("optiona").innerHTML = 
  // 'TESTbutton2';

  // var r = document.getElementsByTagName("label");  
  // r[1].innerHTML = message1['answera'];
  // r[2].innerHTML = message1['answerb'];
  // r[3].innerHTML = message1['answerc'];
  // r[4].innerHTML = message1['answerd'];

}


function display_results() {

    fetch('/player_scores/')
    .then(result => result.json() // console.log(result) 
      )
    // .then(console.log(result))
    .then(data => displayMessage(data)
      )
    .catch(error => console.log('There was an error', error));

};


display_results();



