const fs = require('fs');

module.exports = {
  requestListener: (req, res) => {
  fs.readFile('./testWebsite.html',  'utf-8', (err, data) => {
    if (err){
      res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`${err}`);
    res.end();
    } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end(); 
    }
  })
}
}

const express = require('express');
const app = express();

const PORT = process.env.PORT || 4004;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


// app.put('/testWebsite/:name/countries', (req, res, next) => {
//   const currencyName = req.params.name;
//   const countries = req.query;
//   currencies[currencyName] = countries;
//   res.send(currencies[currencyName]);
// });
//Work on this section: 

// app.get('/sausages', (req, res, next) => {
//   res.send(sausageTypes);
// })