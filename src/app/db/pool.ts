import { Pool } from 'pg';

import dotenv from 'dotenv';

dotenv.config();

const databaseConfig = { connectionString: process.env.DATABASE };
const pool : Pool = new Pool(databaseConfig);

export default pool;