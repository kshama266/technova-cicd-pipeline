const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'TechNova CI/CD Pipeline',
    version: '1.0.0',
    status: 'Running successfully! 🚀',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint (used by Docker and load balancers)
app.get('/health', (req, res) => {
  res.json({ 
    health: 'OK',
    uptime: process.uptime()
  });
});

// API endpoint example
app.get('/api/info', (req, res) => {
  res.json({
    project: 'TechNova',
    description: 'CI/CD Pipeline Demo',
    technologies: ['Node.js', 'Express', 'Docker', 'Jenkins', 'Terraform', 'AWS']
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📡 API info: http://localhost:${PORT}/api/info`);
});