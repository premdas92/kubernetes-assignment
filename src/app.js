const express = require('express');
const { Pool } = require('pg'); // 'pg' handles connection pooling automatically
const app = express();

const PORT = process.env.PORT || 3000;

// Configurations will be injected via Kubernetes ConfigMaps and Secrets
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  max: 10, // Connection pooling max limits
  idleTimeoutMillis: 30000
});

// Service API Tier endpoint to fetch records
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users;');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Database query failed", details: err.message });
  }
});

// Liveness/Readiness probe endpoint for Self-Healing
app.get('/health', (req, res) => {
  res.status(200).send('Healthy');
});

app.listen(PORT, () => {
  console.log(`Server running smoothly on port ${PORT}`);
});