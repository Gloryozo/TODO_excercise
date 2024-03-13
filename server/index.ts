const express = require('express');
const cors = require('cors');
const { Pool } = require ('pg')


const app = express();
const port = 3001;

app.use(cors());

app.get('/',(req: Request,res:Response) => {
    const pool = openDb()

    pool.query('select * from task', (error,result) => {
        if (error){
            res.status(500).json({error: error.message})  
        }
        res.status(200).json(result.rows)
    })
})
const openDb = (): Pool => {
    const pool: Pool = new Pool ({
        user: 'postgres',
        host: 'localhost',
        database: 'todo',
        password: 'root',
        port: 5432
    })
    return pool
}
app.listen(port)
