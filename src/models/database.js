import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// database configuration
const connection = [
    {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
    },
    {
    host: process.env.DB_HOST_TEST,
    database: process.env.DB_DATABASE_TEST,
    user: process.env.DB_USER_TEST,
    password: process.env.DB_PASSWORD_TEST,
    port: process.env.DB_PORT_TEST
    }
]

let databaseConnection;

if(process.env.NODE_ENV === 'development') {
    databaseConnection = connection[0]
}
else {
    databaseConnection = connection[1]
}

// instantiate pool
const pool = new pg.Pool(databaseConnection);

pool.on('connect', () => {});

const messageTable = async () => {
    const query = `CREATE TABLE IF NOT EXISTS 
    messages(
        id SERIAL PRIMARY KEY UNIQUE,
        user_id VARCHAR(1500) NOT NULL,
        name VARCHAR(500) NOT NULL,
        sender_email VARCHAR(500) NOT NULL,
        receiver_emails TEXT [] NOT NULL,
        message VARCHAR(1000000) NOT NULL,
        date VARCHAR(200) NOT NULL
    )`;

    try{
        await pool.query(query);
        console.log('message table created');
    }
    catch(e) {
        console.log(e);
    }
};

messageTable();

// drop data base
// const dropTable = async () => {
//     let table = 'messages'
//     const query = `DROP TABLE IF EXISTS ${table}`
//     try {
//         await pool.query(query);
//         console.log(`${table} dropped`)
//     }
//     catch(e) {
//         console.log(e);
//     }
// }

// dropTable();

export default pool;