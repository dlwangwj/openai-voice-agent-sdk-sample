const https = require("https");
const fs = require("fs");
const path = require("path");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "certs/server.key")),
  cert: fs.readFileSync(path.join(__dirname, "certs/server.crt")),
};

app.prepare().then(() => {
  https.createServer(httpsOptions, (req, res) => {
    return handle(req, res);
  }).listen(3001,"0.0.0.0", () => {
    console.log("✅ Next.js HTTPS dev server running on https://localhost:3000");
  });
});