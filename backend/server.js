const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const PUBLIC_DIST = "/data/www/public";
const HOME_DIST = "/data/www/home";
const ROVERPI_URL = process.env.ROVERPI_URL || "http://192.168.1.186:5000";

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

app.use(cors());
app.use(express.json());

function isHome(req) {
  return req.hostname === "home.codescripting.com";
}

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    server: "codescripting",
    host: req.hostname,
    roverpi: ROVERPI_URL,
    time: new Date().toISOString(),
  });
});

// RoverPi API proxy ONLY for home.codescripting.com
app.use((req, res, next) => {
  if (!isHome(req)) return next();

  const roverPaths = [
    "/status",
    "/esp32_status",
    "/battery",
    "/gyro",
    "/health",
    "/map",
    "/video",
    "/cmd",
    "/auto",
    "/mode",
    "/cam",
  ];

  if (roverPaths.some((p) => req.path === p || req.path.startsWith(p + "/"))) {
    return createProxyMiddleware({
      target: ROVERPI_URL,
      changeOrigin: true,
      ws: false,
      timeout: 10000,
      proxyTimeout: 10000,
    })(req, res, next);
  }

  next();
});

// Serve static files based on hostname
app.use((req, res, next) => {
  const dist = isHome(req) ? HOME_DIST : PUBLIC_DIST;
  express.static(dist)(req, res, next);
});

// SPA fallback based on hostname
app.get("*", (req, res) => {
  const dist = isHome(req) ? HOME_DIST : PUBLIC_DIST;
  res.sendFile(path.join(dist, "index.html"));
});

app.listen(3000, "127.0.0.1", () => {
  console.log("Express running on http://127.0.0.1:3000");
  console.log(`Public site: ${PUBLIC_DIST}`);
  console.log(`Home dashboard: ${HOME_DIST}`);
  console.log(`Proxying RoverPi: ${ROVERPI_URL}`);
});