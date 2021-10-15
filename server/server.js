const path = require('path');
const express = require('express');

const app = express();
const port = 3030;

app.use(express.static('client/dist'));
app.use(express.json());

app.listen(port, (e) => {
  console.log(e ? `Unable to start Express server: ${e}` : `Server Listening at http://localhost:${port}`);
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})