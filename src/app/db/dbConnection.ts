import pool from './pool';
import { query, queryDatabase } from './dbQuery'

pool.on('connect', () => {
    console.log('Connection to database established');
});

pool.on('remove', () => {
    console.log('Client removed from Database');
});

/* Database Stuff */

const createTestTable = () => {
    const testsCreateQuery: string = 
        `CREATE TABLE IF NOT EXISTS tests
        (
            id INT PRIMARY KEY,
            name VARCHAR(100) NOT NULL
        )`;
    
    queryDatabase(testsCreateQuery);
};

const dropTestTable = () => {
    const testsDropQuery = 'DROP TABLE IF EXISTS users';
    queryDatabase(testsDropQuery);
};

// Update this when creating a new table
const createAllTables = () => {
    createTestTable();
};

const dropAllTables = () => {
    dropTestTable;
};

export {
    createAllTables,
    dropAllTables
};

require('make-runnable');