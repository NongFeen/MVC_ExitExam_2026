const express = require('express');
const path = require('path');

const petRoutes = require("./routes/petRoutes");
const app = express();

app.use('/css', express.static(path.join(__dirname, 'views/css')));//css

app.use(express.json());
//route

app.use("/pets", petRoutes);

app.get('/home', (req, res) => {//main page
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/dragon', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dragon.html'));
});
app.get('/phoenix', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'phoenix.html'));
});
app.get('/owl', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'owl.html'));
});

app.listen(3000, () => {
    //server running
    console.log('Server is running on port 3000');
});
