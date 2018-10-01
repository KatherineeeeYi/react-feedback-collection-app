const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({hi: 'there'});
});

// 5000 in development, process.env.PORT in production
const PORT = process.env.PORT || 5000;
app.listen(PORT);