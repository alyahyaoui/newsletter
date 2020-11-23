const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const https = require('https')

app.listen(port, () => console.log('you are connected'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {

  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {

  
  const jsonData = JSON.stringify(({ members: [{ email_address: req.body.email,status:'subscribed' }] }));
  const url = 'https://us18.api.mailchimp.com/3.0/lists/9bb7beda86';
  const options = {
    method: 'POST',
    auth: 'shagrouth:b430a3286ccb92da425640a179dc44be-us18',
  };
    
  const request = https.request(url, options, (reponse) => {
    if (reponse.statusCode === 200) {
      res.sendFile(__dirname + '/success.html');
    } else {
      res.sendFile(__dirname + '/failure.html');
    }
    reponse.on('data', (data) => {
      console.log(JSON.parse(data),)
    })
  })
  request.write(jsonData);
  request.end();
});

//mailchimp apikey 
//list ic 
