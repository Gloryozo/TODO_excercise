/*- Create PostgresSQL database with some content
- Create simple NodeJS app using JavaScript and Express
- Basic database programming using pg library
- Testing backend with REST Client*/

// Import necessary modules
require('dotenv').config(); // Load environment variables from .env file
console.log(process.env); // Print the value of DB_USER environment variable    
const express = require('express'); // Import the express module
const cors = require('cors'); // Import the cors module
//const { Pool } = require('pg'); // Import the Pool class from pg module
const { query } = require('./helpers/db.js'); // Import the query function from the db module

// Create an instance of express
const app = express();
const port = process.env.PORT // Define the port number

// Enable CORS
app.use(cors());
// Allows reading posted values from the client as JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Define endpoint to handle DELETE requests
app.delete("/delete/:id", async (req, res) => {
    const id = Number(req.params.id); // Extract the task id from the request parameters
    try {
        // Execute the SQL query to delete a task with the specified id
        const result = await query('delete from task where id = $1', [id]);
        // Send a JSON response with the id of the deleted task
        res.status(200).json({ id: id });
    } catch (error) {   
        // Log any errors that occur during the execution of the SQL query
        console.log(error);
        // Set the response status message to the error message
        res.statusMessage = error.message;
        // Send a JSON response with the error message and a 500 status code
        res.status(500).json({ error: error.message });
    }
});

// Define endpoint to handle GET requests
app.get('/', (req, res) => {
    console.log(query); // Log the SQL query to fetch all tasks
    try {
        // Execute the SQL query to select all tasks
        const result = query('select * from task');
        const rows = result.rows ? result.rows : [];
        // Send a JSON response with the retrieved tasks
        res.status(200).json(rows);
    } catch (error) {
        // Log any errors that occur during the execution of the SQL query
        console.log(error);
        // Set the response status message to the error message
        res.statusMessage = error.message;
        // Send a JSON response with the error message and a 500 status code
        res.status(500).json({ error: error.message });
    }
});

// Define endpoint to handle POST requests
app.post('/new', async (req, res) => {
    try {
        // Execute the SQL query to insert a new task
        const result = await query('insert into tasks(description) values ($1) returning *', [req.body.description]);
        
        // Send a JSON response with the ID of the newly inserted task
        res.status(200).json({ id: result.rows[0].id });
    } catch (error) {
        // Log the error
        console.log(error);
        
        // Set the response status message to the error message
        res.statusMessage = error.message;
        
        // Send a JSON response with the error message and a 500 status code
        res.status(500).json({ error: error.message });
    }
});

        // Function to open database connection
const openDb = () => {
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    });
    return pool;
}

// Start listening on the defined port
app.listen(port);













