/*- Create PostgresSQL database with some content
- Create simple NodeJS app using JavaScript and Express
- Basic database programming using pg library
- Testing backend with REST Client*/

// Import necessary modules
const express = require('express'); // Import the express module
const cors = require('cors'); // Import the cors module
const { Pool } = require('pg'); // Import the Pool class from pg module

// Create an instance of express
const app = express();
const port = 3001; // Define the port number

// Enable CORS
app.use(cors());
// Allows reading posted values from the client as JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define endpoint to handle DELETE requests
app.delete("/delete/:id", async (req, res) => {
    const pool = openDb(); // Open a database connection
    const id = parseInt(req.params.id);

    // Execute the SQL query to delete a task with the specified id
    pool.query('delete from task where id = $1',
        [id],
        (error, result) => {
            if (error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(200).json({ id: id });
            }
        });
});

// Define endpoint to handle GET requests
app.get('/', (req, res) => {
    const pool = openDb(); // Open a database connection

    // Execute the SQL query to select all tasks
    pool.query('select * from task', (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json(result.rows);
    });
});

// Define endpoint to handle POST requests
app.post('/new', (req, res) => {
    const pool = openDb(); // Open a database connection

    // Execute the SQL query to insert a new task
    pool.query('insert into tasks(description) values ($1) returning *', [req.body.description],
        (error, result) => {
            if (error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(200).json({ id: result.rows[0].id });
            }
        });
});

// Function to open database connection
const openDb = () => {
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'todo',
        password: 'Gliffy',
        port: 5432
    });
    return pool;
}

// Start listening on the defined port
app.listen(port);













