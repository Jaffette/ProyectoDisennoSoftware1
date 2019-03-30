const express = require('express');
const app = express();


app.get('api/hello', function(req, res) {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('App is listening in port 3000');
});