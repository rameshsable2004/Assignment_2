// Import packages
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(require('./routes/index.routes'))
app.get('/', (req, res) => {
    res.json({ message: 'Server is running.' })
})
// Starting server
app.listen('3000', () => console.log(`App listening on port 3000!`))