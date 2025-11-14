// Imports Express
const express = require("express");
const path = require('path'); // Import the 'path' module Hossam
const cookieParser = require('cookie-parser');
//const cors = require('cors');



const serverRoute = require('./routes/Server')
const authRoute = require('./routes/auth')
//const apiRoute = require('./routes/api')
const loggedIn = require('./middleware/auth_middleware')

// Initialize Express app
const app = express();

// // Middleware to Enable parsing cookies and JSON body.
app.use(cookieParser());
app.use(express.json());

// Configure CORS to allow credentials
//app.use(cors({
//    origin: 'https://localhost',
//    credentials: true
//  }));



// Create a variable for the PORT number
 const PORT =  process.env.PORT || 3000;


// Routes
app.use('/server', loggedIn, serverRoute);
app.use('/user', authRoute)
//app.use('/api', loggedIn, apiRoute)
/*app.get("/", (req, res) => {
  res.send("Hello World");
});*/

// Serve static files from the 'public' directory  
 app.use(express.static(path.join(__dirname +'/public')));  // Hossam
// simple route => define a GET route which is simple for test.
app.get("/", (req, res) => {
  //res.json({ message: "Welcome to bezkoder application." });
  res.sendFile(path.join(__dirname, '/public/login.html')); // Hossam

});

app.get("/newUser", (req, res) => {
  // res.json({ message: "Welcome to bezkoder application." });
  res.sendFile(path.join(__dirname, '/public/newUser.html')); // Hossam
 
 });

app.use((req, res, next) => {
    res.status(404).json({
        "statusCode": 404,
        "message": "Endpoint not found"
    });
})
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        statusCode:statusCode,
        message: err.message,
        stack: err.stack,
    });
})

// Listen for request
//app.listen(PORT);
//app.listen(PORT)
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});