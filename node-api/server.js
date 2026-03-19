require("dotenv").config();
const app = require("./app");
const env = require("./src/config/env");
require("./src/queue/worker");

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
});