/*- Create PostgresSQL database with some content
- Create simple NodeJS app using JavaScript and Express
- Basic database programming using pg library
- Testing backend with REST Client*/

const express = require('express');
const cors = require('cors');
const { Pool } = require ('pg')


const app = express();
const port = 3001;

app.use(cors());
// allows reading posted values from the client as JSON.
app.use(express.json())

app.get('/',(req,res) => {
    const pool = openDb()

    pool.query('select * from task', (error, result) => {
        if (error){
            res.status(500).json({error: error.message})  
        }
        res.status(200).json(result.rows)
    })
})
app.post('/new',(req,res) => {
    const pool = openDb()
    pool.query('insert into tasks(description) values ($1) returning *', [req.body.description],
    (error, result) => {
        if (error){
            res.status(500).json({error: error.message})  
        } else {
            res.status(200).json({id : result.rows[0].id})
        }
    }) 
});
const openDb = () => {
    const pool = new Pool ({
        user: 'postgres',
        host: 'localhost',
        database: 'todo',
        password: 'Gliffy',
        port: 5432
    })
    return pool
}
app.listen(port)













