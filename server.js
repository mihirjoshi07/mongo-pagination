const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Sample data to be inserted into the database
const data = [
    { "name": "Alice", "age": 22 },
    { "name": "Bob", "age": 24 },
    { "name": "Charlie", "age": 21 },
    { "name": "Diana", "age": 23 },
    { "name": "Ethan", "age": 22 },
    { "name": "Frank", "age": 20 },
    { "name": "Grace", "age": 19 },
    { "name": "Hannah", "age": 18 },
    { "name": "Irene", "age": 17 },
    { "name": "Jack", "age": 16 },
    { "name": "Katie", "age": 25 },
    { "name": "Leo", "age": 23 },
    { "name": "Mia", "age": 24 },
    { "name": "Nathan", "age": 20 },
    { "name": "Olivia", "age": 22 },
    { "name": "Paul", "age": 21 },
    { "name": "Quinn", "age": 19 },
    { "name": "Riley", "age": 18 },
    { "name": "Sam", "age": 23 },
    { "name": "Tina", "age": 22 },
    { "name": "Ursula", "age": 20 },
    { "name": "Vera", "age": 21 },
    { "name": "Will", "age": 23 },
    { "name": "Xander", "age": 24 },
    { "name": "Yara", "age": 25 }
];

// Mongoose Schema definition for storing name and age
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true }
});

// Mongoose Model for the students collection
const Student = mongoose.model("Student", studentSchema);

// Health route for checking the server status
app.get("/health", (req, res) => {
    res.send("Health route....");
});


app.get("/get-data/:page", async (req, res) => {
    const page = req.params.page;
    const page_size = 5;
    const skip = (page - 1) * page_size;

    const paginatedResults = await Student
        .find()  // Find all documents
        .skip(skip)  // Skip documents based on the page
        .limit(page_size)  // Limit the number of documents per page

    return res.status(200).json({
        result: paginatedResults,
        success: true
    });
})



app.get("/get-data", async (req, res) => {
   

    const paginatedResults = await Student
        .find()  // Find all documents
       

    return res.status(200).json({
        result: paginatedResults,
        success: true
    });
})
// MongoDB URI for local connection
const URI = "mongodb://localhost:27017/pagination";

// Connect to MongoDB
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(async () => {
        console.log("MongoDB connected successfully.");
        // Start the Express server after a successful connection


        // Insert the sample data into the database
        //await Student.insertMany(data);

        //console.log("Sample data inserted successfully.");
        app.listen(3000, () => {
            console.log("App is running on port 3000");
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

