require("dotenv").config();
const app = require("./app");
const env = require("./src/config/env");
const connectDB=require("./src/config/db");

require("./src/queue/worker");

async function start() {
  await connectDB();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });
}

start();

