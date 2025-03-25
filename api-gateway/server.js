require('dotenv').config();
const express = require('express')
const cors = require('cors')
const {createProxyMiddleware} = require('http-proxy-middleware')

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Proxy to producer-service
app.use('/producer', createProxyMiddleware({
    target: process.env.PRODUCER_SERVICE_URL,
    changeOrigin: true,
    onError: (err, req, res) => {
      console.error('Proxy error:', err);
      res.status(500).json({ error: 'Service Unavailable' });
  },
  onProxyReq: (proxyReq, req) => {
    console.log(`Proxying request to Producer: ${req.method} ${req.originalUrl}`);
},
timeout: 60000, // 60 seconds
    proxyTimeout: 60000,
}));

// Proxy to monitoring-service
app.use('/monitoring', createProxyMiddleware({
    target: process.env.MONITORING_SERVICE_URL,
    changeOrigin: true,
    onError: (err, req, res) => {
      console.error('Proxy error:', err);
      res.status(500).json({ error: 'Service Unavailable' });
  },
  onProxyReq: (proxyReq, req) => {
    console.log(`Proxying request to Producer: ${req.method} ${req.originalUrl}`);
},
timeout: 60000, // 60 seconds
    proxyTimeout: 60000,
}));

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("🚀 API Gateway is running...");
});

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 API Gateway is running at http://localhost:${PORT}`);
});