// Import necessary modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // Import JWT module
const crypto = require('crypto');
const registerUser = require('../Server/Schema');
const insentiveDetails=require('../Server/Schema3')
const registerAdmin=require('../Server/Schema2')

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Insentive');
mongoose.connection
    .once('open', () => { console.log("Connected to the database"); })
    .on('error', () => { console.log("Connection to the database failed"); });

// Create Express app
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Secret key for JWT
const secretKey = process.env.JWT_SECRET_KEY || 'your_default_secret_key';

// User Register endpoint
app.post('/userRegister', async (req, res) => {
    try {
        const existUser = await registerUser.findOne({ email: req.body.email });
        if (existUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const userDetails = new registerUser(req.body);
        const saveUser = await userDetails.save();
        res.status(201).json(saveUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User Login endpoint
app.post('/userlogin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await registerUser.findOne({ email, password });
        if (user) {
            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, secretKey);
            res.json({ token }); // Return token to the client upon successful login
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});



// adminLogin
app.post('/adminlogin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await registerAdmin.findOne({ email, password });
        if (user) {
            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, secretKey);
            res.json({ token }); // Return token to the client upon successful login
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});





// Protected route to get user details
app.get('/getUser', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId; // Extract user ID from the authenticated request
        const user = await registerUser.findById(userId);
        if (user) {
            res.json(user); // Return user data
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


///Protected Route to get Admin details 
app.get('/getAdmin',authenticateToken,async(req,res)=>{
    try{
        const adminId=req.user.userId;
        const user=await registerAdmin.findById(adminId);
        if(user){
            res.json(user);

        }else{
            res.status(404).json({message:'User not found'});
        }

    }catch(error){
        res.status(500).json({message:'Intenal server error'});
    }
})



// Authentication middleware to verify JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401); // No token provided

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token
        req.user = user;
        next();
    });
}


///incentive details
app.post('/incentive',async(req,res)=>{

    try{
        const insentive=new insentiveDetails(req.body);
        const saveData =await insentive.save();
        res.status(201).json(saveData);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }


})




// const verifyToken = (req, res, next) => {
//     // Assuming you have some logic to extract token from the request headers
//     const token = req.headers.authorization;
  
//     // Check if token is present
//     if (!token) {
//       return res.status(401).json({ message: 'Authorization token not provided' });
//     }
  
//     // Verify token validity
//     jwt.verify(token, 'your-secret-key', (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: 'Invalid token' });
//       }
//       // If token is valid, attach the decoded user information to the request object for further use
//       req.user = decoded;
//       next(); // Call next middleware
//     });
// };


// Get user details endpoint based on empId
// Get user details endpoint based on empId
app.get('/users/:empId', async (req, res) => {
    const empId = req.params.empId;

    console.log('Requested empId:', empId); // Log the empId received in the request

    try {
        // Assuming you have a model named registerUser to fetch user details
        const user = await insentiveDetails.find({ empId: empId });

        if (!user) {
            // If user is not found, log a message and return 404 Not Found status with a message
            console.log('User not found for empId:', empId);
            return res.status(404).json({ message: 'User not found' });
        }

        // If user is found, send user details as a JSON response
        res.json(user);
    } catch (error) {
        // If an error occurs during the process, log the error and return 500 Internal Server Error status with a message
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});






///Register Admin
app.post('/adminRegister',async(req,res)=>{

    try{
        const existUser=await registerAdmin.findOne({email:req.body.email})
        if(existUser){
            return res.status(400).json({ message: 'User already exists' });

        }
        const AdminDetails = new registerAdmin(req.body);
        const saveAdmin = await AdminDetails.save();
        res.status(201).json(saveAdmin);

    }
    catch(error){
        res.status(500).json({ message: error.message });
    }

    })






app.get('/get', async (req, res) => {
    try {
        const item = await insentiveDetails.find();
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


 
// Endpoint to get user details by empId
app.get('/userDetails/:empId', async (req, res) => {
    try {
        const empId = req.params.empId;
        const user = await insentiveDetails.find({ empId: empId });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

         


// Example of verifyToken function










// Endpoint to find matching users
app.get('/holidayPackages/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const packageData = await insentiveDetails.findById(id);
        if (packageData) {
            res.json(packageData);
        } else {
            res.status(404).send('Holiday package not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint to update a holiday package by ID
app.put('/holidayPackages/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { destination, duration, cost } = req.body;
        const updatedPackage = await insentiveDetails.findByIdAndUpdate(id, { destination, duration, cost }, { new: true });
        if (updatedPackage) {
            res.json({ message: 'Holiday package updated successfully' });
        } else {
            res.status(404).send('Holiday package not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

  
// Backend endpoint to update total sales
app.put('/updateTotalSales/:empId', async (req, res) => {
    try {
        const empId = req.params.empId;
        const { totalSales } = req.body;

        // Find the user by ID and update the total sales field
        await insentiveDetails.findOneAndUpdate({ empId: empId }, { totalSales: totalSales });

        res.status(200).json({ message: 'Total sales updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Server Connection
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
