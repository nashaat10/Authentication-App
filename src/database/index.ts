import { Pool } from 'pg';

import config from '../../config';

const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: Number(config.dbPort),
});

pool.on('error', (error: Error) => {
  console.error(error.message);
});

export default pool;
