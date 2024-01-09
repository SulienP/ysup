const express = require('express');
const cors = require('cors');

const stuffRoutes = require('./routes/stuff');

const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Allow all origins for demonstration purposes.
app.use(cors());

// Adding router
app.use('/api', stuffRoutes);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.listen(PORT, () => {
    console.log('Server started ! http://localhost:3000');
    console.log(`Server now listening on ${PORT}`);
})